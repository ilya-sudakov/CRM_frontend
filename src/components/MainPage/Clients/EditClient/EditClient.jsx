import { useState, useEffect } from 'react';
import './EditClient.scss';
import 'Utils/Form/Form.scss';
import { getClientById, editClient } from 'Utils/RequestsAPI/Clients.jsx';
import {
  addClientLegalEntity,
  editClientLegalEntity,
  deleteClientLegalEntity,
} from 'Utils/RequestsAPI/Clients/LegalEntity.jsx';
import {
  addClientContact,
  editClientContact,
  deleteClientContact,
} from 'Utils/RequestsAPI/Clients/Contacts.jsx';
import {
  addClientWorkHistory,
  editClientWorkHistory,
  deleteClientWorkHistory,
} from 'Utils/RequestsAPI/Clients/WorkHistory.jsx';
import SelectLegalEntity from '../SelectLegalEntity/SelectLegalEntity.jsx';
import InputText from 'Utils/Form/InputText/InputText.jsx';
import InputDate from 'Utils/Form/InputDate/InputDate.jsx';
import SelectContacts from '../SelectContacts/SelectContacts.jsx';
import SelectClientCategory from '../ClientCategories/SelectClientCategory/SelectClientCategory.jsx';
import SelectWorkHistory from '../SelectWorkHistory/SelectWorkHistory.jsx';
import InputUser from 'Utils/Form/InputUser/InputUser.jsx';
import Button from 'Utils/Form/Button/Button.jsx';
import ViewRequests from '../ViewRequests/ViewRequests.jsx';
import { getRequests } from 'Utils/RequestsAPI/Requests.jsx';
import { clientsDefaultInputs } from '../objects';
import useForm from 'Utils/hooks/useForm.js';

const EditClient = (props) => {
  const {
    handleInputChange,
    formInputs,
    formErrors,
    setFormErrors,
    formIsValid,
    errorWindow,
    updateFormInputs,
  } = useForm([
    ...clientsDefaultInputs,
    { name: 'legalEntityNew', defaultValue: [] },
    { name: 'workHistoryNew', defaultValue: [] },
    { name: 'contactsNew', defaultValue: [], isRequired: true },
    { name: 'id', defaultValue: 0 },
  ]);
  const clientTypes = {
    clients: {
      name: 'клиент',
    },
    suppliers: {
      name: 'поставщик',
    },
  };

  const [isLoading, setIsLoading] = useState(false);
  const [clientId, setClientId] = useState(0);
  const [curTab, setCurTab] = useState('clientData');

  const handleSubmit = () => {
    if (!formIsValid()) return;
    setIsLoading(true);
    console.log(formInputs);
    editClient(
      {
        clientType: formInputs.clientType,
        comment: formInputs.comment,
        manager: formInputs.manager,
        name: formInputs.name,
        price: formInputs.price,
        site: formInputs.site,
        city: formInputs.city,
        storageAddress: formInputs.storageAddress,
        workCondition: formInputs.workCondition,
        check: formInputs.check,
        nextDateContact: new Date(formInputs.nextContactDate).getTime() / 1000,
        categoryId: formInputs.categoryId,
        favorite: formInputs.favorite,
        type: formInputs.type,
      },
      clientId,
    )
      .then(() => {
        //PUT if edited, POST if item is new
        return Promise.all(
          formInputs.workHistoryNew.map((selected) => {
            let edited = false;
            let oldItem = null;
            formInputs.workHistory.map((item) => {
              if (item.id === selected.id) {
                edited = true;
                oldItem = item;
                return;
              }
            });
            if (selected === oldItem) return;
            const newWorkHistory = {
              date: selected.date,
              action: selected.action,
              result: selected.result,
              comment: selected.comment,
              clientId: clientId,
            };
            return edited === true
              ? editClientWorkHistory(newWorkHistory, selected.id)
              : addClientWorkHistory(newWorkHistory);
          }),
        );
      })
      .then(() => {
        //DELETE items removed by user
        const itemsArr = formInputs.workHistory.map((item) => {
          let deleted = true;
          formInputs.workHistoryNew.map((selected) => {
            if (selected.id === item.id) {
              deleted = false;
              return;
            }
          });
          return deleted === true && deleteClientWorkHistory(item.id);
        });
        return Promise.all(itemsArr);
      })
      .then(() => {
        //PUT if edited, POST if item is new
        const itemsArr = formInputs.legalEntityNew.map((selected) => {
          let edited = false;
          let oldItem = null;
          formInputs.legalEntity.map((item) => {
            if (item.id === selected.id) {
              edited = true;
              oldItem = item;
              return;
            }
          });
          if (selected === oldItem) return;
          const newLegalEntity = {
            name: selected.name,
            inn: selected.inn,
            kpp: selected.kpp,
            ogrn: selected.ogrn,
            bik: selected.bik,
            checkingAccount: selected.checkingAccount,
            legalAddress: selected.legalAddress,
            factualAddress: selected.factualAddress,
            legalEntity: selected.legalEntity,
            clientId: clientId,
          };
          return edited === true
            ? editClientLegalEntity(newLegalEntity, selected.id)
            : addClientLegalEntity(newLegalEntity);
        });
        return Promise.all(itemsArr);
      })
      .then(() => {
        //DELETE items removed by user
        const itemsArr = formInputs.legalEntity.map((item) => {
          let deleted = true;
          formInputs.legalEntityNew.map((selected) => {
            if (selected.id === item.id) {
              deleted = false;
              return;
            }
          });
          return deleted === true && deleteClientLegalEntity(item.id);
        });
        return Promise.all(itemsArr);
      })
      .then(() => {
        //PUT if edited, POST if item is new
        const itemsArr = formInputs.contactsNew.map((selected) => {
          let edited = false;
          let oldItem = null;
          formInputs.contacts.map((item) => {
            if (item.id === selected.id) {
              edited = true;
              oldItem = item;
              return;
            }
          });
          if (selected === oldItem) return;
          const newContacts = {
            name: selected.name,
            lastName: selected.lastName,
            email: selected.email,
            position: selected.position,
            phoneNumber: selected.phoneNumber,
            clientId: clientId,
          };
          return edited === true
            ? editClientContact(newContacts, selected.id)
            : addClientContact(newContacts);
        });
        return Promise.all(itemsArr);
      })
      .then(() => {
        //DELETE items removed by user
        return Promise.all(
          formInputs.contacts.map((item) => {
            let deleted = true;
            formInputs.contactsNew.map((selected) => {
              if (selected.id === item.id) {
                deleted = false;
                return;
              }
            });
            return deleted === true && deleteClientContact(item.id);
          }),
        );
      })
      .then(() => {
        setIsLoading(false);
        props.history.push(
          `/${props.type}/category/${formInputs.categoryName}/active`,
        );
      })
      .catch((error) => {
        setIsLoading(false);
        alert('Ошибка при добавлении записи');
        console.log(error);
      });
  };

  useEffect(() => {
    document.title = `Редактирование ${clientTypes[props.type].name}а`;
    const id = props.history.location.pathname.split('/edit/')[1];
    setClientId(id);
    if (isNaN(Number.parseInt(id))) {
      alert('Неправильный индекс!');
      props.history.push(`/${props.type}/categories`);
    } else {
      getClientById(id)
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          updateFormInputs({
            ...formInputs,
            id: res.id,
            name: res.name,
            site: res.site,
            comment: res.comment,
            storageAddress: res.storageAddress,
            workCondition: res.workCondition,
            price: res.price,
            check: res.check,
            city: res.city,
            clientType: res.clientType,
            manager: res.manager,
            nextContactDate: res.nextDateContact,
            legalEntity: res.legalEntities,
            legalEntityNew: res.legalEntities,
            workHistory: res.histories,
            workHistoryNew: res.histories,
            contacts: res.contacts,
            contactsNew: res.contacts,
            categoryId: res.category.id,
            favorite: res.favorite,
            type: res.type,
            categoryName: res.category.name,
          });
        });
    }
  }, []);

  return (
    <div className="edit_client">
      <div className="main-form">
        <form className="main-form__form">
          <div className="main-form__header main-form__header--full">
            <div className="main-form__title">{`Редактирование ${
              clientTypes[props.type].name
            }а`}</div>
            <div className="main-form__menu">
              <div
                className={
                  curTab === 'workHistory'
                    ? 'main-form__menu-item main-form__menu-item--active'
                    : 'main-form__menu-item'
                }
                onClick={() => {
                  setCurTab('workHistory');
                }}
              >
                История работы
              </div>
              <div
                className={
                  curTab === 'requestsHistory'
                    ? 'main-form__menu-item main-form__menu-item--active'
                    : 'main-form__menu-item'
                }
                onClick={() => {
                  setCurTab('requestsHistory');
                }}
              >
                Заказы
              </div>
              <div
                className={
                  curTab === 'clientData'
                    ? 'main-form__menu-item main-form__menu-item--active'
                    : 'main-form__menu-item'
                }
                onClick={() => {
                  setCurTab('clientData');
                }}
              >
                {`Данные ${clientTypes[props.type].name}а`}
              </div>
            </div>
          </div>
          {errorWindow}
          {curTab === 'workHistory' ? (
            <>
              {/* Добавление истории работ */}
              <div className="main-form__item">
                <div className="main-form__input_name">История работ*</div>
                <div className="main-form__input_field">
                  <SelectWorkHistory
                    handleWorkHistoryChange={(value) => {
                      handleInputChange('workHistoryNew', value);
                    }}
                    defaultValue={formInputs.workHistoryNew}
                    userHasAccess={props.userHasAccess}
                  />
                </div>
              </div>
            </>
          ) : curTab === 'requestsHistory' ? (
            <RequestHistory id={formInputs.id} />
          ) : (
            <>
              <InputText
                inputName="Название"
                required
                name="name"
                error={formErrors.name}
                defaultValue={formInputs.name}
                errorsArr={formErrors}
                setErrorsArr={setFormErrors}
                handleInputChange={({ target }) =>
                  handleInputChange('name', target.value)
                }
              />
              {/* Добавление юридических лиц */}
              <SelectLegalEntity
                handleLegalEntityChange={(value) =>
                  handleInputChange('legalEntityNew', value)
                }
                defaultValue={formInputs.legalEntityNew}
                userHasAccess={props.userHasAccess}
                isMinimizedDefault={true}
              />
              <div className="main-form__fieldset">
                <div className="main-form__group-name">Контактные данные</div>
                {/* Добавление контактных лиц */}
                <SelectContacts
                  handleContactsChange={(value) =>
                    handleInputChange('contactsNew', value)
                  }
                  defaultValue={formInputs.contactsNew}
                  userHasAccess={props.userHasAccess}
                  isMinimizedDefault={true}
                />
                <InputText
                  inputName="Сайт"
                  required
                  name="site"
                  error={formErrors.site}
                  errorsArr={formErrors}
                  setErrorsArr={setFormErrors}
                  defaultValue={formInputs.site}
                  handleInputChange={({ target }) =>
                    handleInputChange('site', target.value)
                  }
                />
              </div>
              <InputText
                inputName="Комментарий"
                name="comment"
                defaultValue={formInputs.comment}
                handleInputChange={({ target }) =>
                  handleInputChange('comment', target.value)
                }
                type="textarea"
              />
              <InputText
                inputName="Адрес склада"
                name="storageAddress"
                defaultValue={formInputs.storageAddress}
                handleInputChange={({ target }) =>
                  handleInputChange('storageAddress', target.value)
                }
              />
              <InputDate
                inputName="Дата след. контакта"
                name="nextContactDate"
                selected={Date.parse(formInputs.nextContactDate)}
                handleDateChange={(date) =>
                  handleInputChange('nextContactDate', date)
                }
              />
              <InputText
                inputName="Условия работы"
                name="workCondition"
                defaultValue={formInputs.workCondition}
                handleInputChange={({ target }) =>
                  handleInputChange('workCondition', target.value)
                }
              />
              <InputText
                inputName="Город"
                name="city"
                defaultValue={formInputs.city}
                handleInputChange={({ target }) =>
                  handleInputChange('city', target.value)
                }
              />
              <InputText
                inputName="Прайс"
                name="price"
                defaultValue={formInputs.price}
                handleInputChange={({ target }) =>
                  handleInputChange('price', target.value)
                }
              />
              <InputText
                inputName="Акт сверки"
                name="check"
                handleInputChange={({ target }) =>
                  handleInputChange('check', target.value)
                }
                defaultValue={formInputs.check}
              />
              <InputUser
                inputName="Ответственный менеджер"
                userData={props.userData}
                filteredRoles={['ROLE_ADMIN', 'ROLE_MANAGER']}
                required
                name="manager"
                handleInputChange={(value) =>
                  handleInputChange('manager', value)
                }
                defaultValue={formInputs.manager}
                searchPlaceholder="Введите имя менеджера для поиска..."
                errorsArr={formErrors}
                setErrorsArr={setFormErrors}
              />

              {/* Временно - бинарный выбор, виден ли клиент всем пользователям */}
              {/* <div className="main-form__item">
                <div className="main-form__input_name">Видимость*</div>
                <div className="main-form__input_field">
                  <CheckBox
                    text="Запись видна всем пользователям"
                    name="visibility"
                    checked={formInputs.visibility}
                    disabled={!userContext.userHasAccess(['ROLE_ADMIN'])}
                    onChange={(value) =>
                      handleInputValueChange(value, 'visibility')
                    }
                  />
                </div>
              </div> */}
              <div className="main-form__fieldset">
                <div className="main-form__group-name">Категория </div>
                <div className="main-form__item">
                  <div className="main-form__input_name">{`Тип ${
                    clientTypes[props.type].name
                  }а*`}</div>
                  <div className="main-form__input_field">
                    <select
                      name="clientType"
                      onChange={({ target }) =>
                        handleInputChange('clientType', target.value)
                      }
                      value={formInputs.clientType}
                    >
                      <option value="Активные">Активные</option>
                      <option value="Потенциальные">Потенциальные</option>
                      <option value="В разработке">В разработке</option>
                    </select>
                  </div>
                </div>
                <SelectClientCategory
                  inputName={`Выбор категории ${clientTypes[props.type].name}а`}
                  required
                  type={props.type}
                  error={formErrors.category}
                  userHasAccess={props.userHasAccess}
                  windowName="select-category"
                  name="categoryId"
                  handleCategoryChange={(value, name) => {
                    handleInputChange('categoryId', value);
                    handleInputChange('categoryName', name);
                  }}
                  defaultValue={formInputs.categoryName}
                  errorsArr={formErrors}
                  setErrorsArr={setFormErrors}
                />
              </div>
            </>
          )}
          <div className="main-form__input_hint">
            * - поля, обязательные для заполнения
          </div>
          <div className="main-form__buttons main-form__buttons--full">
            <input
              className="main-form__submit main-form__submit--inverted"
              type="submit"
              onClick={() =>
                props.history.push(
                  '/' +
                    props.type +
                    '/category/' +
                    formInputs.categoryName +
                    '/' +
                    (formInputs.clientType === 'Активные'
                      ? 'active'
                      : formInputs.clientType === 'Потенциальные'
                      ? 'potential'
                      : 'in-progress'),
                )
              }
              value="Вернуться назад"
            />
            <Button
              text="Редактировать запись"
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

export default EditClient;

{
  /* История заявок */
}
const RequestHistory = ({ id }) => {
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getRequests()
      .then((res) => res.json())
      .then((res) => {
        setIsLoading(false);
        const filteredData = res.filter(
          (request) => request.client !== null && request.client?.id === id,
        );
        setRequests([...filteredData]);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="main-form__item">
      <div className="main-form__input_name">История заказов</div>
      <div className="main-form__input_field">
        <ViewRequests isLoading={isLoading} requests={requests} />
      </div>
    </div>
  );
};
