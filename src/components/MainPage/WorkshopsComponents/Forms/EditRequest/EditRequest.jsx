import { useEffect, useState, useContext } from 'react';
import './EditRequest.scss';
import 'Utils/Form/Form.scss';
import InputDate from 'Utils/Form/InputDate/InputDate.jsx';
import InputText from 'Utils/Form/InputText/InputText.jsx';
import InputUser from 'Utils/Form/InputUser/InputUser.jsx';
import InputProducts from 'Utils/Form/InputProducts/InputProducts.jsx';
import Button from 'Utils/Form/Button/Button.jsx';
import UserContext from '../../../../../App.js';
import {
  editRequest,
  editProductsToRequest,
  addProductsToRequest,
  deleteProductsToRequest,
  getRequestById,
  connectClientToRequest,
} from 'Utils/RequestsAPI/requests';
import { requestStatuses, workshops } from '../../workshopVariables.js';
import SelectClient from '../../../Clients/SelectClients/SelectClients.jsx';
import {
  getRequestRedirectUrl,
  getRequestsEditingDefaultInputs,
} from '../../functions.js';
import { useForm } from 'Utils/hooks';

const EditRequest = (props) => {
  const [requestId, setRequestId] = useState(1);
  const userContext = useContext(UserContext);
  const requestsDefaultInputs = getRequestsEditingDefaultInputs(
    userContext.userData.username,
    props.type,
  );
  const {
    handleInputChange,
    formInputs,
    formErrors,
    setFormErrors,
    formIsValid,
    updateFormInputs,
    errorWindow,
  } = useForm(requestsDefaultInputs);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = () => {
    // return console.log(formInputs);
    if (!formIsValid()) return;
    setIsLoading(true);
    editRequest(formInputs, requestId)
      .then(() => {
        const productsArr = formInputs.requestProducts.map((selected) => {
          let edited = false;
          let oldItem = null;
          formInputs.oldProducts.map((item) => {
            if (item.id === selected.id) {
              edited = true;
              oldItem = item;
              return;
            }
          });
          if (oldItem === selected) return;
          return edited
            ? editProductsToRequest(
                {
                  requestId: requestId,
                  quantity: selected.quantity,
                  status: selected.status,
                  packaging: selected.packaging,
                  name: selected.name,
                },
                selected.id,
              )
            : addProductsToRequest({
                requestId: requestId,
                quantity: selected.quantity,
                packaging: selected.packaging,
                status: selected.status,
                name: selected.name,
              });
        });
        return Promise.all(productsArr).then(() => {
          //DELETE products removed by user
          const productsArr = formInputs.oldProducts.map((item) => {
            let deleted = true;
            formInputs.requestProducts.map((selected) => {
              if (selected.id === item.id) {
                deleted = false;
                return;
              }
            });
            return deleted && deleteProductsToRequest(item.id);
          });
          return Promise.all(productsArr);
        });
      })
      .then(() => {
        if (formInputs.client?.id !== formInputs.clientId) {
          return connectClientToRequest(requestId, formInputs.clientId);
        }
      })
      .then(() =>
        props.history.push(
          getRequestRedirectUrl(props.history, 'edit/', props.type, formInputs),
        ),
      )
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
      });
  };

  useEffect(() => {
    document.title = 'Редактирование заявки';
    const id = props.history.location.pathname.split('edit/')[1];
    if (isNaN(Number.parseInt(id))) {
      alert('Неправильный индекс заявки!');
      props.history.push(workshops[props.type].redirectURL);
    } else {
      setRequestId(id);
      getRequestById(id)
        .then((res) => res.json())
        .then((oldRequest) => {
          updateFormInputs({
            date: oldRequest.date,
            oldProducts: oldRequest.requestProducts,
            requestProducts: oldRequest.requestProducts,
            quantity: oldRequest.quantity,
            responsible: oldRequest.responsible,
            status: oldRequest.status,
            shippingDate:
              oldRequest.shippingDate !== null
                ? oldRequest.shippingDate
                : new Date(),
            comment: oldRequest.comment,
            factory: oldRequest.factory,
            sum: oldRequest.sum,
            client: oldRequest.client,
            clientId: oldRequest.client ? oldRequest.client.id : 0,
          });
        })
        .catch((error) => {
          console.log(error);
          alert('Неправильный индекс заявки!');
          props.history.push(workshops[props.type].redirectURL);
        });
    }
  }, []);

  return (
    <div className="edit-request">
      <div className="main-form">
        <form className="main-form__form">
          <div className="main-form__header main-form__header--full">
            <div className="main-form__title">{`Редактирование заявки ${
              workshops[props.type].title
            }`}</div>
          </div>
          {errorWindow}
          <div className="main-form__row">
            {userContext.userHasAccess([
              'ROLE_ADMIN',
              'ROLE_MANAGER',
              'ROLE_WORKSHOP',
            ]) && (
              <InputDate
                inputName="Дата заявки"
                required
                error={formErrors.date}
                name="date"
                selected={Date.parse(formInputs.date)}
                handleDateChange={(value) => handleInputChange('date', value)}
                errorsArr={formErrors}
                setErrorsArr={setFormErrors}
                readOnly={userContext.userHasAccess(['ROLE_WORKSHOP'])}
              />
            )}
            <InputDate
              inputName="Дата отгрузки"
              name="shippingDate"
              selected={Date.parse(formInputs.shippingDate)}
              handleDateChange={(value) =>
                handleInputChange('shippingDate', value)
              }
              errorsArr={formErrors}
              setErrorsArr={setFormErrors}
            />
          </div>
          {userContext.userHasAccess([
            'ROLE_ADMIN',
            'ROLE_MANAGER',
            'ROLE_WORKSHOP',
          ]) && (
            <InputProducts
              inputName="Продукция"
              userHasAccess={userContext.userHasAccess}
              required
              options
              onChange={(products) =>
                handleInputChange('requestProducts', products)
              }
              searchPlaceholder="Введите название продукта для поиска..."
              defaultValue={formInputs.requestProducts}
              error={formErrors.requestProducts}
              errorsArr={formErrors}
              setErrorsArr={setFormErrors}
              workshop={userContext.userHasAccess(['ROLE_WORKSHOP'])}
            />
          )}
          {userContext.userHasAccess([
            'ROLE_ADMIN',
            'ROLE_MANAGER',
            'ROLE_WORKSHOP',
          ]) && (
            <InputUser
              inputName="Ответственный"
              userData={userContext.userData}
              required
              error={formErrors.responsible}
              defaultValue={formInputs.responsible}
              name="responsible"
              handleUserChange={(user) =>
                handleInputChange('responsible', user)
              }
              searchPlaceholder="Введите имя пользователя для поиска..."
              errorsArr={formErrors}
              setErrorsArr={setFormErrors}
              readOnly={userContext.userHasAccess(['ROLE_WORKSHOP'])}
            />
          )}
          <div className="main-form__item">
            <div className="main-form__input_name">Статус*</div>
            <div className="main-form__input_field">
              <select
                name="status"
                onChange={({ target }) =>
                  handleInputChange('status', target.value)
                }
                value={formInputs.status}
              >
                {requestStatuses.map((status) => {
                  if (userContext.userHasAccess(status.access)) {
                    return (
                      <option
                        value={
                          status.oldName === formInputs.status
                            ? status.oldName
                            : status.name
                        }
                      >
                        {status.name}
                      </option>
                    );
                  } else {
                    return (
                      <option style={{ display: `none` }}>{status.name}</option>
                    );
                  }
                })}
              </select>
            </div>
          </div>
          <InputText
            inputName="Комментарий"
            name="comment"
            defaultValue={formInputs.comment}
            handleInputChange={({ target }) =>
              handleInputChange('comment', target.value)
            }
          />
          {userContext.userHasAccess(['ROLE_ADMIN', 'ROLE_MANAGER']) ? (
            <InputText
              inputName="Сумма"
              name="sum"
              type="number"
              defaultValue={formInputs.sum}
              handleInputChange={({ target }) =>
                handleInputChange('sum', target.value)
              }
              errorsArr={formErrors}
              setErrorsArr={setFormErrors}
            />
          ) : null}
          <SelectClient
            inputName="Клиент"
            userHasAccess={userContext.userHasAccess}
            defaultValue={
              formInputs.clientId === 0 ? false : formInputs.client?.name
            }
            required
            readOnly={userContext.userHasAccess(['ROLE_WORKSHOP'])}
            onChange={(value) => handleInputChange('clientId', value)}
            error={formErrors.clientId}
            errorsArr={formErrors}
            setErrorsArr={setFormErrors}
          />
          <div className="main-form__input_hint">
            * - поля, обязательные для заполнения
          </div>
          <div className="main-form__buttons main-form__buttons--full">
            <Button
              text="Вернуться назад"
              className="main-form__submit main-form__submit--inverted"
              inverted
              onClick={() =>
                props.history.push(
                  getRequestRedirectUrl(
                    props.history,
                    'edit/',
                    props.type,
                    formInputs,
                  ),
                )
              }
            />
            <Button
              text="Обновить данные"
              isLoading={isLoading}
              className="main-form__submit"
              onClick={handleSubmit}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditRequest;
