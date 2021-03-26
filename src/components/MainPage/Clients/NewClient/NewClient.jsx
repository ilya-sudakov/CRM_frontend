import { useState, useEffect, useContext } from 'react';
import './NewClient.scss';
import 'Utils/Form/Form.scss';
import { addClient } from 'Utils/RequestsAPI/Clients.jsx';
import { addClientLegalEntity } from 'Utils/RequestsAPI/Clients/LegalEntity.jsx';
import { addClientContact } from 'Utils/RequestsAPI/Clients/Contacts.jsx';
import { addClientWorkHistory } from 'Utils/RequestsAPI/Clients/WorkHistory.jsx';
import SelectLegalEntity from '../SelectLegalEntity/SelectLegalEntity.jsx';
import InputText from 'Utils/Form/InputText/InputText.jsx';
import InputDate from 'Utils/Form/InputDate/InputDate.jsx';
import SelectContacts from '../SelectContacts/SelectContacts.jsx';
import SelectClientCategory from '../ClientCategories/SelectClientCategory/SelectClientCategory.jsx';
import SelectWorkHistory from '../SelectWorkHistory/SelectWorkHistory.jsx';
import InputUser from 'Utils/Form/InputUser/InputUser.jsx';
import { getUsers } from 'Utils/RequestsAPI/Users.jsx';
import Button from 'Utils/Form/Button/Button.jsx';
import UserContext from '../../../../App.js';
import CheckBox from 'Utils/Form/CheckBox/CheckBox.jsx';
import useForm from 'Utils/hooks/useForm.js';
import { clientsDefaultInputs } from '../objects';
import { clientsFormHeaderMenu } from '../functions';
import useTitleHeader from 'Utils/hooks/uiComponents/useTitleHeader.js';

const newClient = (props) => {
  const userContext = useContext(UserContext);
  const {
    handleInputChange,
    formInputs,
    formErrors,
    setFormErrors,
    formIsValid,
    hideError,
    errorWindow,
  } = useForm([
    ...clientsDefaultInputs,
    {
      name: 'manager',
      defaultValue: userContext.userHasAccess(['ROLE_ADMIN'])
        ? ''
        : userContext.userData.username,
      isRequired: true,
      isValid: !userContext.userHasAccess(['ROLE_ADMIN']),
    },
  ]);
  const clientTypes = {
    clients: {
      name: 'клиент',
      filteredRoles: ['ROLE_ADMIN', 'ROLE_MANAGER'],
      addItemFunction: (newClient) => addClient({ ...newClient, type: null }),
      addLegalEntityFunction: (newLegalEntity) =>
        addClientLegalEntity(newLegalEntity),
      addContactsFunction: (newContact) => addClientContact(newContact),
      addWorkHistoryFunction: (newWorkHistory) =>
        addClientWorkHistory(newWorkHistory),
    },
    suppliers: {
      name: 'поставщик',
      filteredRoles: [
        'ROLE_ADMIN',
        'ROLE_ENGINEER',
        'ROLE_DISPATCHER',
        'ROLE_MANAGER',
        'ROLE_WORKSHOP',
      ],
      addItemFunction: (newClient) =>
        addClient({ ...newClient, type: 'supplier' }),
      addLegalEntityFunction: (newLegalEntity) =>
        addClientLegalEntity(newLegalEntity),
      addContactsFunction: (newContact) => addClientContact(newContact),
      addWorkHistoryFunction: (newWorkHistory) =>
        addClientWorkHistory(newWorkHistory),
    },
  };
  const { titleHeader, curPage } = useTitleHeader(
    `Новый ${clientTypes[props.type].name}`,
    clientsFormHeaderMenu(clientTypes[props.type].name),
    'clientData',
    'main-form',
  );

  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);

  //Добавление клиента и остальных обязательных данных
  //при корректном заполнении всей формы
  const handleSubmit = () => {
    console.log(formInputs);
    if (!formIsValid()) return;
    setIsLoading(true);
    let clientId = 0;
    clientTypes[props.type]
      .addItemFunction({
        clientType: formInputs.clientType,
        comment: formInputs.comment,
        manager: formInputs.manager,
        name: formInputs.name,
        price: formInputs.price,
        site: formInputs.site,
        city: formInputs.city,
        isClosed: !formInputs.visibility,
        storageAddress: formInputs.storageAddress,
        workCondition: formInputs.workCondition,
        check: formInputs.check,
        nextDateContact: formInputs.nextContactDate.getTime() / 1000,
        categoryId: formInputs.categoryId,
      })
      .then((res) => res.json())
      .then((res) => {
        clientId = res.id;
        return Promise.all(
          formInputs.legalEntity.map((item) => {
            return clientTypes[props.type].addLegalEntityFunction({
              name: item.name,
              inn: item.inn,
              kpp: item.kpp,
              ogrn: item.ogrn,
              bik: item.bik,
              checkingAccount: item.checkingAccount,
              legalAddress: item.legalAddress,
              factualAddress: item.factualAddress,
              legalEntity: item.legalEntity,
              clientId: res.id,
            });
          }),
        );
      })
      .then(() => {
        return Promise.all(
          formInputs.contacts.map((item) => {
            return clientTypes[props.type].addContactsFunction({
              name: item.name,
              lastName: item.lastName,
              email: item.email,
              position: item.position,
              phoneNumber: item.phoneNumber,
              clientId: clientId,
            });
          }),
        );
      })
      .then(() => {
        return clientTypes[props.type].addWorkHistoryFunction({
          date: new Date(),
          action: 'Создание записи',
          result: 'Запись успешно создана',
          comment: '<Cообщение сгенерировано автоматически>',
          clientId: clientId,
        });
      })
      .then(() => {
        return Promise.all(
          formInputs.workHistory.map((item) => {
            return clientTypes[props.type].addWorkHistoryFunction({
              date: item.date,
              action: item.action,
              result: item.result,
              comment: item.comment,
              clientId: clientId,
            });
          }),
        );
      })
      .then(() =>
        props.history.push(
          `/${props.type}/category/${formInputs.categoryName}/active`,
        ),
      )
      .catch((error) => {
        setIsLoading(false);
        alert('Ошибка при добавлении записи');
        console.log(error);
      });
  };

  useEffect(() => {
    document.title = `Добавление ${clientTypes[props.type].name}`;
    //Загружаем список пользователей
    users.length === 0 &&
      getUsers()
        .then((res) => res.json())
        .then((res) => {
          const filteredRoles = clientTypes[props.type].filteredRoles;
          let newUsers = res;
          setUsers([
            ...newUsers
              .filter((item) => {
                const temp = filteredRoles
                  ? item.roles.reduce((prevRole, curRole) => {
                      let check = false;
                      filteredRoles.map((filteredRole) => {
                        if (filteredRole === curRole.name) {
                          check = true;
                          return;
                        }
                      });
                      return check;
                    }, false)
                  : true;
                return temp;
              })
              .map((item) => {
                return {
                  ...item,
                  active: true,
                };
              }),
          ]);
        });
  }, [users]);

  return (
    <div className="new_client">
      <div className="main-form">
        <form className="main-form__form">
          {titleHeader}
          {errorWindow}
          {/* Добавление истории работ */}
          {curPage === 'workHistory' ? (
            <>
              <SelectWorkHistory
                handleWorkHistoryChange={(value) => {
                  handleInputChange('workHistory', value);
                }}
                defaultValue={formInputs.workHistory}
                userHasAccess={userContext.userHasAccess}
              />
            </>
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
                  handleInputChange('legalEntity', value)
                }
                defaultValue={formInputs.legalEntity}
                userHasAccess={userContext.userHasAccess}
              />
              <div className="main-form__fieldset">
                <div className="main-form__group-name">Контактные данные</div>
                {/* Добавление контактных лиц */}
                <SelectContacts
                  handleContactsChange={(value) =>
                    handleInputChange('contacts', value)
                  }
                  error={formErrors.contacts}
                  hideError={() => hideError('contacts')}
                  defaultValue={formInputs.contacts}
                  userHasAccess={userContext.userHasAccess}
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
                handleDateChange={(value) =>
                  handleInputChange('nextContactDate', value)
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
                required
                defaultValue={formInputs.city}
                handleInputChange={({ target }) =>
                  handleInputChange('city', target.value)
                }
                error={formErrors.city}
                errorsArr={formErrors}
                setErrorsArr={setFormErrors}
              />
              <InputText
                inputName="Прайс"
                name="price"
                defaultValue={formInputs.price}
                handleInputChange={({ target }) =>
                  handleInputChange('price', target.value)
                }
              />
              <InputUser
                inputName="Ответственный менеджер"
                userData={userContext.userData}
                filteredRoles={['ROLE_ADMIN', 'ROLE_MANAGER']}
                required
                name="manager"
                handleUserChange={(value) =>
                  handleInputChange('manager', value)
                }
                error={formErrors.manager}
                defaultValue={formInputs.manager}
                searchPlaceholder="Введите имя менеджера для поиска..."
              />
              <div className="main-form__fieldset">
                <div className="main-form__group-name">Юридические данные</div>
                <InputText
                  inputName="Акт сверки"
                  name="check"
                  handleInputChange={({ target }) =>
                    handleInputChange('check', target.value)
                  }
                  defaultValue={formInputs.check}
                />
                <div className="main-form__item">
                  <div className="main-form__input_name">Налогообложение</div>
                  <div className="main-form__input_field">
                    <CheckBox
                      text="Подлежит налогообложению"
                      id="taxes"
                      checked={formInputs.taxes}
                      disabled={!userContext.userHasAccess(['ROLE_ADMIN'])}
                      onChange={(value) => handleInputChange('taxes', value)}
                    />
                  </div>
                </div>
              </div>
              {/* Выбор конкретных пользователей */}
              {/* {userContext.userHasAccess(['ROLE_ADMIN']) && (
                <UsersVisibility
                  name="users"
                  handleInputChange={handleInputChange}
                  defaultValue={formInputs.users}
                  userContext={userContext}
                  handleInputChange={(value) =>
                    handleInputValueChange(value, 'users')
                  }
                />
              )} */}

              {/* Временно - бинарный выбор, виден ли клиент всем пользователям */}
              <div className="main-form__item">
                <div className="main-form__input_name">Видимость*</div>
                <div className="main-form__input_field">
                  <CheckBox
                    text="Запись видна всем пользователям"
                    id="visibility"
                    checked={formInputs.visibility}
                    disabled={!userContext.userHasAccess(['ROLE_ADMIN'])}
                    onChange={(value) => handleInputChange('visibility', value)}
                  />
                </div>
              </div>
              <div className="main-form__fieldset">
                <div className="main-form__group-name">Категория</div>
                <div className="main-form__item">
                  <div className="main-form__input_name">
                    {`Тип ${clientTypes[props.type].name}а`}*
                  </div>
                  <div className="main-form__input_field">
                    <select
                      name="clientType"
                      onChange={({ target }) =>
                        handleInputChange('clientType', target.value)
                      }
                      defaultValue={formInputs.clientType}
                    >
                      <option value="Активные">Активные</option>
                      <option value="Потенциальные">Потенциальные</option>
                      <option value="В разработке">В разработке</option>
                    </select>
                  </div>
                </div>
                <SelectClientCategory
                  inputName="Выбор категории"
                  required
                  error={formErrors.categoryId}
                  type={props.type}
                  userHasAccess={userContext.userHasAccess}
                  name="categoryId"
                  handleCategoryChange={(value, name) => {
                    console.log(value, name);
                    handleInputChange('categoryName', name);
                    handleInputChange('categoryId', value);
                  }}
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
                props.history.push('/' + props.type + '/categories')
              }
              value="Вернуться назад"
            />
            <Button
              text="Добавить клиента"
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

export default newClient;
