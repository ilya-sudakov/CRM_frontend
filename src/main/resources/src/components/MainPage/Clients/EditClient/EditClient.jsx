import React, { useState, useEffect } from "react";
import "./EditClient.scss";
import "../../../../utils/Form/Form.scss";
import {
  addClient,
  getClientById,
  editClient,
} from "../../../../utils/RequestsAPI/Clients.jsx";
import {
  addClientLegalEntity,
  editClientLegalEntity,
  deleteClientLegalEntity,
} from "../../../../utils/RequestsAPI/Clients/LegalEntity.jsx";
import {
  addClientContact,
  editClientContact,
  deleteClientContact,
} from "../../../../utils/RequestsAPI/Clients/Contacts.jsx";
import {
  addClientWorkHistory,
  editClientWorkHistory,
  deleteClientWorkHistory,
} from "../../../../utils/RequestsAPI/Clients/WorkHistory.jsx";
import SelectLegalEntity from "../SelectLegalEntity/SelectLegalEntity.jsx";
import InputText from "../../../../utils/Form/InputText/InputText.jsx";
import InputDate from "../../../../utils/Form/InputDate/InputDate.jsx";
import ErrorMessage from "../../../../utils/Form/ErrorMessage/ErrorMessage.jsx";
import SelectContacts from "../SelectContacts/SelectContacts.jsx";
import CheckBox from "../../../../utils/Form/CheckBox/CheckBox.jsx";
import SelectClientCategory from "../ClientCategories/SelectClientCategory/SelectClientCategory.jsx";
import SelectWorkHistory from "../SelectWorkHistory/SelectWorkHistory.jsx";
import InputUser from "../../../../utils/Form/InputUser/InputUser.jsx";
import Button from "../../../../utils/Form/Button/Button.jsx";
import ViewRequests from "../ViewRequests/ViewRequests.jsx";
import { getRequests } from "../../../../utils/RequestsAPI/Requests.jsx";

const EditClient = (props) => {
  const [clientInputs, setClientInputs] = useState({
    name: "",
    legalEntity: [],
    contacts: [],
    workHistory: [],
    legalEntityNew: [],
    contactsNew: [],
    workHistoryNew: [],
    managerName: props.userData.username,
    managerId: props.userData.id,
    site: "",
    comment: "",
    storageAddress: "",
    city: "",
    visibility: null,
    workCondition: "",
    price: "",
    discount: "",
    check: "",
    clientType: "Активные",
    categoryId: 0,
    categoryName: "",
    favorite: false,
    nextContactDate: new Date(new Date().setDate(new Date().getDate() + 7)), //Прибавляем 7 дней к сегодняшнему числу
  });
  const [formErrors, setFormErrors] = useState({
    name: false,
    contacts: false,
    categoryId: false,
    site: false,
  });
  const [validInputs, setValidInputs] = useState({
    name: true,
    contacts: true,
    categoryId: true,
    site: true,
  });

  const clientTypes = {
    clients: {
      name: "клиент",
    },
    suppliers: {
      name: "поставщик",
    },
  };

  const [showError, setShowError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [clientId, setClientId] = useState(0);
  const [curTab, setCurTab] = useState("clientData");

  const validateField = (fieldName, value) => {
    switch (fieldName) {
      default:
        if (validInputs[fieldName] !== undefined) {
          setValidInputs({
            ...validInputs,
            [fieldName]: value !== "",
          });
        }
        break;
    }
  };

  const formIsValid = () => {
    let check = true;
    let newErrors = Object.assign({
      name: false,
      contacts: false,
      site: false,
    });
    for (let item in validInputs) {
      // console.log(item, validInputs[item]);
      if (validInputs[item] === false) {
        check = false;
        newErrors = Object.assign({
          ...newErrors,
          [item]: true,
        });
      }
    }
    setFormErrors(newErrors);
    if (check === true) {
      return true;
    } else {
      // alert("Форма не заполнена");
      setIsLoading(false);
      setShowError(true);
      return false;
    }
  };

  const handleSubmit = (event) => {
    // event.preventDefault();
    setIsLoading(true);
    console.log(clientInputs);
    formIsValid() &&
      editClient(
        {
          clientType: clientInputs.clientType,
          comment: clientInputs.comment,
          manager: clientInputs.managerName,
          name: clientInputs.name,
          price: clientInputs.price,
          site: clientInputs.site,
          city: clientInputs.city,
          storageAddress: clientInputs.storageAddress,
          workCondition: clientInputs.workCondition,
          check: clientInputs.check,
          nextDateContact:
            new Date(clientInputs.nextContactDate).getTime() / 1000,
          categoryId: clientInputs.categoryId,
          favorite: clientInputs.favorite,
          type: clientInputs.type,
        },
        clientId
      )
        .then((res) => {
          //PUT if edited, POST if item is new
          return Promise.all(
            clientInputs.workHistoryNew.map((selected) => {
              let edited = false;
              clientInputs.workHistory.map((item) => {
                if (item.id === selected.id) {
                  edited = true;
                  return;
                }
              });
              return edited === true
                ? editClientWorkHistory(
                    {
                      date: selected.date,
                      action: selected.action,
                      result: selected.result,
                      comment: selected.comment,
                      clientId: clientId,
                    },
                    selected.id
                  )
                : addClientWorkHistory({
                    date: selected.date,
                    action: selected.action,
                    result: selected.result,
                    comment: selected.comment,
                    clientId: clientId,
                  });
            })
          );
        })
        .then(() => {
          //DELETE items removed by user
          const itemsArr = clientInputs.workHistory.map((item) => {
            let deleted = true;
            clientInputs.workHistoryNew.map((selected) => {
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
          const itemsArr = clientInputs.legalEntityNew.map((selected) => {
            let edited = false;
            clientInputs.legalEntity.map((item) => {
              if (item.id === selected.id) {
                edited = true;
                return;
              }
            });
            return edited === true
              ? editClientLegalEntity(
                  {
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
                  },
                  selected.id
                )
              : addClientLegalEntity({
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
                });
          });
          return Promise.all(itemsArr);
        })
        .then(() => {
          //DELETE items removed by user
          const itemsArr = clientInputs.legalEntity.map((item) => {
            let deleted = true;
            clientInputs.legalEntityNew.map((selected) => {
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
          const itemsArr = clientInputs.contactsNew.map((selected) => {
            let edited = false;
            clientInputs.contacts.map((item) => {
              if (item.id === selected.id) {
                edited = true;
                return;
              }
            });
            return edited === true
              ? editClientContact(
                  {
                    name: selected.name,
                    lastName: selected.lastName,
                    email: selected.email,
                    position: selected.position,
                    phoneNumber: selected.phoneNumber,
                    clientId: clientId,
                  },
                  selected.id
                )
              : addClientContact({
                  name: selected.name,
                  lastName: selected.lastName,
                  email: selected.email,
                  position: selected.position,
                  phoneNumber: selected.phoneNumber,
                  clientId: clientId,
                });
          });
          return Promise.all(itemsArr);
        })
        .then(() => {
          //DELETE items removed by user
          return Promise.all(
            clientInputs.contacts.map((item) => {
              let deleted = true;
              clientInputs.contactsNew.map((selected) => {
                if (selected.id === item.id) {
                  deleted = false;
                  return;
                }
              });
              return deleted === true && deleteClientContact(item.id);
            })
          );
        })
        .then(() => {
          setIsLoading(false);
          props.history.push(
            `/${props.type}/category/${clientInputs.categoryName}/active`
          );
        })
        .catch((error) => {
          setIsLoading(false);
          alert("Ошибка при добавлении записи");
          console.log(error);
        });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    validateField(name, value);
    setClientInputs({
      ...clientInputs,
      [name]: value,
    });
    setFormErrors({
      ...formErrors,
      [name]: false,
    });
  };

  useEffect(() => {
    document.title = `Редактирование ${clientTypes[props.type].name}а`;
    const id = props.history.location.pathname.split("/edit/")[1];
    setClientId(id);
    if (isNaN(Number.parseInt(id))) {
      alert("Неправильный индекс!");
      props.history.push(`/${props.type}/categories`);
    } else {
      getClientById(id)
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          setClientInputs({
            ...clientInputs,
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
            managerName: res.manager,
            nextContactDate: res.nextDateContact,
            legalEntity: res.legalEntities,
            contacts: res.contacts,
            workHistory: res.histories,
            legalEntityNew: res.legalEntities,
            contactsNew: res.contacts,
            workHistoryNew: res.histories,
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
                  curTab === "workHistory"
                    ? "main-form__menu-item main-form__menu-item--active"
                    : "main-form__menu-item"
                }
                onClick={() => {
                  setCurTab("workHistory");
                }}
              >
                История работы
              </div>
              <div
                className={
                  curTab === "requestsHistory"
                    ? "main-form__menu-item main-form__menu-item--active"
                    : "main-form__menu-item"
                }
                onClick={() => {
                  setCurTab("requestsHistory");
                }}
              >
                Заказы
              </div>
              <div
                className={
                  curTab === "clientData"
                    ? "main-form__menu-item main-form__menu-item--active"
                    : "main-form__menu-item"
                }
                onClick={() => {
                  setCurTab("clientData");
                }}
              >
                {`Данные ${clientTypes[props.type].name}а`}
              </div>
            </div>
          </div>
          <ErrorMessage
            message="Не заполнены все обязательные поля!"
            showError={showError}
            setShowError={setShowError}
          />
          {curTab === "workHistory" ? (
            <React.Fragment>
              {/* Добавление истории работ */}
              <div className="main-form__item">
                <div className="main-form__input_name">История работ*</div>
                <div className="main-form__input_field">
                  <SelectWorkHistory
                    handleWorkHistoryChange={(value) => {
                      validateField("workHistory", value);
                      setClientInputs({
                        ...clientInputs,
                        workHistoryNew: value,
                      });
                    }}
                    defaultValue={clientInputs.workHistory}
                    userHasAccess={props.userHasAccess}
                  />
                </div>
              </div>
            </React.Fragment>
          ) : curTab === "requestsHistory" ? (
            <RequestHistory id={clientInputs.id} />
          ) : (
            <React.Fragment>
              <InputText
                inputName="Название"
                required
                name="name"
                error={formErrors.name}
                defaultValue={clientInputs.name}
                errorsArr={formErrors}
                setErrorsArr={setFormErrors}
                handleInputChange={handleInputChange}
              />
              {/* Добавление юридических лиц */}
              <SelectLegalEntity
                handleLegalEntityChange={(value) => {
                  // validateField("legalEntity", value);
                  setClientInputs({
                    ...clientInputs,
                    legalEntityNew: value,
                  });
                }}
                defaultValue={clientInputs.legalEntity}
                userHasAccess={props.userHasAccess}
                isMinimizedDefault={true}
              />
              <div className="main-form__fieldset">
                <div className="main-form__group-name">Контактные данные</div>
                {/* Добавление контактных лиц */}
                <SelectContacts
                  handleContactsChange={(value) => {
                    validateField("contacts", value);
                    setClientInputs({
                      ...clientInputs,
                      contactsNew: value,
                    });
                  }}
                  defaultValue={clientInputs.contacts}
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
                  defaultValue={clientInputs.site}
                  handleInputChange={handleInputChange}
                />
              </div>
              <InputText
                inputName="Комментарий"
                name="comment"
                defaultValue={clientInputs.comment}
                handleInputChange={handleInputChange}
                type="textarea"
              />
              <InputText
                inputName="Адрес склада"
                name="storageAddress"
                defaultValue={clientInputs.storageAddress}
                handleInputChange={handleInputChange}
              />
              <InputDate
                inputName="Дата след. контакта"
                name="nextContactDate"
                selected={Date.parse(clientInputs.nextContactDate)}
                handleDateChange={(value) => {
                  setClientInputs({
                    ...clientInputs,
                    nextContactDate: value,
                  });
                }}
              />
              <InputText
                inputName="Условия работы"
                name="workCondition"
                defaultValue={clientInputs.workCondition}
                handleInputChange={handleInputChange}
              />
              <InputText
                inputName="Город"
                name="city"
                defaultValue={clientInputs.city}
                handleInputChange={handleInputChange}
              />
              <InputText
                inputName="Прайс"
                name="price"
                defaultValue={clientInputs.price}
                handleInputChange={handleInputChange}
              />
              <InputText
                inputName="Акт сверки"
                name="check"
                handleInputChange={handleInputChange}
                defaultValue={clientInputs.check}
              />
              <InputUser
                inputName="Ответственный менеджер"
                userData={props.userData}
                filteredRoles={["ROLE_ADMIN", "ROLE_MANAGER"]}
                required
                name="manager"
                handleUserChange={(value, id) => {
                  setClientInputs({
                    ...clientInputs,
                    managerId: Number.parseInt(id),
                    managerName: value,
                  });
                }}
                defaultValue={clientInputs.managerName}
                searchPlaceholder="Введите имя менеджера для поиска..."
                // errorsArr={formErrors}
                // setErrorsArr={setFormErrors}
              />

              {/* Временно - бинарный выбор, виден ли клиент всем пользователям */}
              {/* <div className="main-form__item">
                <div className="main-form__input_name">Видимость*</div>
                <div className="main-form__input_field">
                  <CheckBox
                    text="Запись видна всем пользователям"
                    name="visibility"
                    checked={clientInputs.visibility}
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
                      onChange={handleInputChange}
                      value={clientInputs.clientType}
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
                    validateField("categoryId", value);
                    setClientInputs({
                      ...clientInputs,
                      categoryId: value,
                      categoryName: name,
                    });
                    setFormErrors({
                      ...formErrors,
                      categoryId: false,
                    });
                  }}
                  defaultValue={clientInputs.categoryName}
                  errorsArr={formErrors}
                  setErrorsArr={setFormErrors}
                />
              </div>
            </React.Fragment>
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
                  "/" +
                    props.type +
                    "/category/" +
                    clientInputs.categoryName +
                    "/" +
                    (clientInputs.clientType === "Активные"
                      ? "active"
                      : clientInputs.clientType === "Потенциальные"
                      ? "potential"
                      : "in-progress")
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
  const [isLoading, setIsLoading] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    getRequests()
      .then((res) => res.json())
      .then((res) => {
        setIsLoading(false);
        const filteredData = res.filter(
          (request) => request.client !== null && request.client?.id === id
        );
        console.log(res, filteredData, id);
        setRequests([...filteredData]);
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
