import React, { useState, useEffect } from 'react'
import './NewClient.scss'
import '../../../../utils/Form/Form.scss'
import { addClient } from '../../../../utils/RequestsAPI/Clients.jsx'
import { addClientLegalEntity } from '../../../../utils/RequestsAPI/Clients/LegalEntity.jsx'
import { addClientContact } from '../../../../utils/RequestsAPI/Clients/Contacts.jsx'
import { addClientWorkHistory } from '../../../../utils/RequestsAPI/Clients/WorkHistory.jsx'
import SelectLegalEntity from '../SelectLegalEntity/SelectLegalEntity.jsx'
import InputText from '../../../../utils/Form/InputText/InputText.jsx'
import InputDate from '../../../../utils/Form/InputDate/InputDate.jsx'
import ErrorMessage from '../../../../utils/Form/ErrorMessage/ErrorMessage.jsx'
import SelectContacts from '../SelectContacts/SelectContacts.jsx'
import SelectClientCategory from '../ClientCategories/SelectClientCategory/SelectClientCategory.jsx'
import SelectWorkHistory from '../SelectWorkHistory/SelectWorkHistory.jsx'
import InputUser from '../../../../utils/Form/InputUser/InputUser.jsx'
import { getUsers } from '../../../../utils/RequestsAPI/Users.jsx'
import Button from '../../../../utils/Form/Button/Button.jsx'

const newClient = (props) => {
  const [clientInputs, setClientInputs] = useState({
    name: '',
    legalEntity: [],
    contacts: [],
    managerName: props.userData.username,
    managerId: props.userData.id,
    workHistory: [],
    site: '',
    comment: '',
    storageAddress: '',
    workCondition: '',
    price: '',
    discount: '',
    check: '',
    clientType: 'Активные',
    categoryId: 0,
    categoryName: '',
    nextContactDate: new Date(new Date().setDate(new Date().getDate() + 7)), //Прибавляем 7 дней к сегодняшнему числу
  })
  //Ошибки для обязательных полей
  const [formErrors, setFormErrors] = useState({
    name: false,
    contacts: false,
    categoryId: false,
    site: false,
  })
  //Корректность заполнения обязательных полей
  const [validInputs, setValidInputs] = useState({
    name: false,
    contacts: false,
    categoryId: false,
    site: false,
  })

  const clientTypes = {
    clients: {
      name: 'клиент',
      filteredRoles: ['ROLE_ADMIN', 'ROLE_MANAGER'],
      addItemFunction: (newClient) => addClient(newClient),
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
      addItemFunction: (newClient) => addClient(newClient),
      addLegalEntityFunction: (newLegalEntity) =>
        addClientLegalEntity(newLegalEntity),
      addContactsFunction: (newContact) => addClientContact(newContact),
      addWorkHistoryFunction: (newWorkHistory) =>
        addClientWorkHistory(newWorkHistory),
    },
  }

  const [showError, setShowError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [users, setUsers] = useState([])
  const [curTab, setCurTab] = useState('clientData')

  //Проверка поля на корректность
  const validateField = (fieldName, value) => {
    switch (fieldName) {
      default:
        if (validInputs[fieldName] !== undefined) {
          setValidInputs({
            ...validInputs,
            [fieldName]: value !== '',
          })
        }
        break
    }
  }

  //Проверка всех полей формы на корректность
  const formIsValid = () => {
    let check = true
    let newErrors = Object.assign({
      name: false,
      contacts: false,
      site: false,
    })
    for (let item in validInputs) {
      // console.log(item, validInputs[item]);
      if (validInputs[item] === false) {
        check = false
        newErrors = Object.assign({
          ...newErrors,
          [item]: true,
        })
      }
    }
    setFormErrors(newErrors)
    if (check === true) {
      return true
    } else {
      // alert("Форма не заполнена");
      setIsLoading(false)
      setShowError(true)
      return false
    }
  }

  //Добавление клиента и остальных обязательных данных
  //при корректном заполнении всей формы
  const handleSubmit = () => {
    setIsLoading(true)
    console.log(clientInputs)
    let clientId = 0
    formIsValid() &&
      clientTypes[props.type]
        .addItemFunction({
          clientType: clientInputs.clientType,
          comment: clientInputs.comment,
          manager: clientInputs.managerName,
          name: clientInputs.name,
          price: clientInputs.price,
          site: clientInputs.site,
          storageAddress: clientInputs.storageAddress,
          workCondition: clientInputs.workCondition,
          check: clientInputs.check,
          nextDateContact: clientInputs.nextContactDate.getTime() / 1000,
          categoryId: clientInputs.categoryId,
        })
        .then((res) => res.json())
        .then((res) => {
          clientId = res.id
          return Promise.all(
            clientInputs.legalEntity.map((item) => {
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
              })
            }),
          )
        })
        .then(() => {
          return Promise.all(
            clientInputs.contacts.map((item) => {
              return clientTypes[props.type].addContactsFunction({
                name: item.name,
                lastName: item.lastName,
                email: item.email,
                position: item.position,
                phoneNumber: item.phoneNumber,
                clientId: clientId,
              })
            }),
          )
        })
        .then(() => {
          return clientTypes[props.type].addWorkHistoryFunction({
            date: new Date(),
            action: 'Создание записи',
            result: 'Запись успешно создана',
            comment: '<Cообщение сгенерировано автоматически>',
            clientId: clientId,
          })
        })
        .then(() => {
          return Promise.all(
            clientInputs.workHistory.map((item) => {
              return clientTypes[props.type].addWorkHistoryFunction({
                date: item.date,
                action: item.action,
                result: item.result,
                comment: item.comment,
                clientId: clientId,
              })
            }),
          )
        })
        .then(() => {
          return props.history.push(
            '/' +
              props.type +
              '/category/' +
              clientInputs.categoryName +
              '/active',
          )
        })
        .catch((error) => {
          setIsLoading(false)
          alert('Ошибка при добавлении записи')
          console.log(error)
        })
  }

  //При изменении данных в поле - обновляем состояние
  const handleInputChange = (e) => {
    const { name, value } = e.target
    validateField(name, value)
    setClientInputs({
      ...clientInputs,
      [name]: value,
    })
    setFormErrors({
      ...formErrors,
      [name]: false,
    })
  }

  useEffect(() => {
    document.title = `Добавление ${clientTypes[props.type].name}`
    //Загружаем список пользователей
    users.length === 0 &&
      getUsers()
        .then((res) => res.json())
        .then((res) => {
          const filteredRoles = clientTypes[props.type].filteredRoles
          let newUsers = res
          setUsers([
            ...newUsers
              .filter((item) => {
                const temp = filteredRoles
                  ? item.roles.reduce((prevRole, curRole) => {
                      let check = false
                      filteredRoles.map((filteredRole) => {
                        if (filteredRole === curRole.name) {
                          check = true
                          return
                        }
                      })
                      return check
                    }, false)
                  : true
                return temp
              })
              .map((item) => {
                return {
                  ...item,
                  active: true,
                }
              }),
          ])
        })
  }, [users])

  return (
    <div className="new_client">
      <div className="main-form">
        <div className="main-form__title">{`Новый ${
          clientTypes[props.type].name
        }`}</div>
        {/* //Меню для перехода на разные страницы формы */}
        <div className="main-form__header">
          <div
            className={
              curTab === 'workHistory'
                ? 'main-form__menu-item main-form__menu-item--active'
                : 'main-form__menu-item'
            }
            onClick={() => {
              setCurTab('workHistory')
            }}
          >
            История работы
          </div>
          <div
            className={
              curTab === 'clientData'
                ? 'main-form__menu-item main-form__menu-item--active'
                : 'main-form__menu-item'
            }
            onClick={() => {
              setCurTab('clientData')
            }}
          >
            {`Данные ${clientTypes[props.type].name}а`}
          </div>
        </div>
        <form className="main-form__form">
          <ErrorMessage
            message="Не заполнены все обязательные поля!"
            showError={showError}
            setShowError={setShowError}
          />
          {curTab === 'workHistory' ? (
            <React.Fragment>
              {/* Добавление истории работ */}
              <div className="main-form__item">
                <div className="main-form__input_name">История работ*</div>
                <div className="main-form__input_field">
                  <SelectWorkHistory
                    handleWorkHistoryChange={(value) => {
                      validateField('workHistory', value)
                      setClientInputs({
                        ...clientInputs,
                        workHistory: value,
                      })
                    }}
                    defaultValue={clientInputs.workHistory}
                    userHasAccess={props.userHasAccess}
                  />
                </div>
              </div>
            </React.Fragment>
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
              <div className="main-form__item">
                <div className="main-form__input_name">Юридическое лицо</div>
                <div className="main-form__input_field">
                  <SelectLegalEntity
                    handleLegalEntityChange={(value) => {
                      // validateField("legalEntity", value);
                      setClientInputs({
                        ...clientInputs,
                        legalEntity: value,
                      })
                    }}
                    defaultValue={clientInputs.legalEntity}
                    userHasAccess={props.userHasAccess}
                  />
                </div>
              </div>
              <div className="main-form__fieldset">
                <div className="main-form__group-name">Контактные данные</div>
                {/* Добавление контактных лиц */}
                <div className="main-form__item">
                  <div className="main-form__input_name">Контактное лицо*</div>
                  <div className="main-form__input_field">
                    <SelectContacts
                      handleContactsChange={(value) => {
                        validateField('contacts', value)
                        setClientInputs({
                          ...clientInputs,
                          contacts: value,
                        })
                      }}
                      defaultValue={clientInputs.contacts}
                      userHasAccess={props.userHasAccess}
                    />
                  </div>
                </div>
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
                  })
                }}
              />
              <InputText
                inputName="Условия работы"
                name="workCondition"
                defaultValue={clientInputs.workCondition}
                handleInputChange={handleInputChange}
              />
              <InputText
                inputName="Прайс"
                name="price"
                defaultValue={clientInputs.price}
                handleInputChange={handleInputChange}
              />
              <InputUser
                inputName="Ответственный менеджер"
                userData={props.userData}
                filteredRoles={['ROLE_ADMIN', 'ROLE_MANAGER']}
                required
                name="manager"
                handleUserChange={(value, id) => {
                  setClientInputs({
                    ...clientInputs,
                    managerId: Number.parseInt(id),
                    managerName: value,
                  })
                }}
                defaultValue={clientInputs.managerName}
                searchPlaceholder="Введите имя менеджера для поиска..."
              />
              <InputText
                inputName="Акт сверки"
                name="check"
                handleInputChange={handleInputChange}
                defaultValue={clientInputs.check}
              />
              <div className="main-form__fieldset">
                <div className="main-form__group-name">Категория</div>
                <div className="main-form__item">
                  <div className="main-form__input_name">
                    {`Тип ${clientTypes[props.type].name}а`}*
                  </div>
                  <div className="main-form__input_field">
                    <select
                      name="clientType"
                      onChange={handleInputChange}
                      defaultValue={clientInputs.clientType}
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
                  error={formErrors.category}
                  type={props.type}
                  userHasAccess={props.userHasAccess}
                  name="categoryId"
                  handleCategoryChange={(value, name) => {
                    validateField('categoryId', value)
                    setClientInputs({
                      ...clientInputs,
                      categoryId: value,
                      categoryName: name,
                    })
                    setFormErrors({
                      ...formErrors,
                      categoryId: false,
                    })
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
          <div className="main-form__buttons">
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
  )
}

export default newClient
