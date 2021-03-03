import React, { useState, useEffect, useContext } from "react";

import "./NewRequest.scss";
import "../../../../../utils/Form/Form.scss";
import InputDate from "../../../../../utils/Form/InputDate/InputDate.jsx";
import InputText from "../../../../../utils/Form/InputText/InputText.jsx";
import InputUser from "../../../../../utils/Form/InputUser/InputUser.jsx";
import InputProducts from "../../../../../utils/Form/InputProducts/InputProducts.jsx";
import Button from "../../../../../utils/Form/Button/Button.jsx";
import UserContext from "../../../../../App.js";
import {
  addRequest,
  addProductsToRequest,
  connectClientToRequest,
} from "../../../../../utils/RequestsAPI/Requests.jsx";
import { requestStatuses, workshops } from "../../workshopVariables.js";
import SelectClient from "../../../Clients/SelectClients/SelectClients.jsx";
import { getPageByRequest, getRequestsDefaultInputs } from "../../functions.js";
import useForm from "../../../../../utils/hooks/useForm";

const NewRequest = (props) => {
  const userContext = useContext(UserContext);
  const requestsDefaultInputs = getRequestsDefaultInputs(
    userContext.userData.username,
    props.type
  );
  const {
    handleInputChange,
    formInputs,
    formErrors,
    setFormErrors,
    formIsValid,
    errorWindow,
  } = useForm(requestsDefaultInputs);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = () => {
    console.log(formInputs);
    if (!formIsValid()) return;
    setIsLoading(true);
    let id = 0;
    addRequest(formInputs)
      .then((res) => res.json())
      .then((res) => (id = res.id))
      .then(() =>
        Promise.all(
          formInputs.requestProducts.map((item) =>
            addProductsToRequest({
              requestId: id,
              quantity: item.quantity,
              packaging: item.packaging,
              status: item.status,
              name: item.name,
            })
          )
        )
      )
      .then(() => connectClientToRequest(id, formInputs.clientId))
      .then(() =>
        props.history.push(
          `${workshops[props.type].redirectURL}/${getPageByRequest(
            formInputs
          )}#${id}`
        )
      )
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
      });
  };

  useEffect(() => {
    document.title = "Создание заявки";
  }, []);

  return (
    <div className="new-request">
      <div className="main-form">
        <form className="main-form__form">
          <div className="main-form__header main-form__header--full">
            <div className="main-form__title">{`Новая заявка ${
              workshops[props.type].title
            }`}</div>
          </div>
          {errorWindow}
          <div className="main-form__row">
            <InputDate
              inputName="Дата заявки"
              required
              error={formErrors.date}
              name="date"
              selected={Date.parse(formInputs.date)}
              handleDateChange={(value) => handleInputChange("date", value)}
              errorsArr={formErrors}
              setErrorsArr={setFormErrors}
            />
            <InputDate
              inputName="Дата отгрузки"
              name="shippingDate"
              selected={formInputs.shippingDate}
              handleDateChange={(value) =>
                handleInputChange("shippingDate", value)
              }
              errorsArr={formErrors}
              setErrorsArr={setFormErrors}
            />
          </div>
          <InputProducts
            inputName="Продукция"
            userHasAccess={userContext.userHasAccess}
            required
            options
            name="requestProducts"
            onChange={(products) =>
              handleInputChange("requestProducts", products)
            }
            defaultValue={formInputs.requestProducts}
            error={formErrors.requestProducts}
            searchPlaceholder="Введите название продукта для поиска..."
            errorsArr={formErrors}
            setErrorsArr={setFormErrors}
          />
          <InputUser
            inputName="Ответственный"
            userData={userContext.userData}
            required
            error={formErrors.responsible}
            defaultValue={formInputs.responsible}
            name="responsible"
            handleUserChange={(user) => handleInputChange("responsible", user)}
            searchPlaceholder="Введите имя пользователя для поиска..."
            errorsArr={formErrors}
            setErrorsArr={setFormErrors}
          />
          <div className="main-form__item">
            <div className="main-form__input_name">Статус*</div>
            <div className="main-form__input_field">
              <select
                name="status"
                onChange={({ target }) =>
                  handleInputChange("status", target.value)
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
              handleInputChange("comment", target.value)
            }
            errorsArr={formErrors}
            setErrorsArr={setFormErrors}
          />
          <InputText
            inputName="Сумма"
            name="sum"
            type="number"
            defaultValue={formInputs.sum}
            handleInputChange={({ target }) =>
              handleInputChange("sum", target.value)
            }
            errorsArr={formErrors}
            setErrorsArr={setFormErrors}
          />
          <SelectClient
            inputName="Клиент"
            userHasAccess={userContext.userHasAccess}
            required
            onChange={(value) => handleInputChange("clientId", value)}
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
                props.history.push(`${workshops[props.type].redirectURL}/open`)
              }
            />
            <Button
              text="Оформить заявку"
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

export default NewRequest;
