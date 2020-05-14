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
import CheckBox from '../../../../utils/Form/CheckBox/CheckBox.jsx'
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
  const [formErrors, setFormErrors] = useState({
    name: false,
    contacts: false,
    categoryId: false,
    site: false,
  })
  const [validInputs, setValidInputs] = useState({
    name: false,
    contacts: false,
    categoryId: false,
    site: false,
  })

  const [showError, setShowError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [users, setUsers] = useState([])
  const [curTab, setCurTab] = useState('clientData')

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

  const handleSubmit = (event) => {
    // event.preventDefault();
    setIsLoading(true)
    console.log(clientInputs)
    let clientId = 0
    formIsValid() &&
      addClient({
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
              return addClientLegalEntity({
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
              return addClientContact({
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
          return addClientWorkHistory({
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
              return addClientWorkHistory({
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
            '/clients/category/' + clientInputs.categoryName + '/active',
          )
        })
        .catch((error) => {
          setIsLoading(false)
          alert('Ошибка при добавлении записи')
          console.log(error)
        })
  }

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
    document.title = 'Добавление клиента'
    users.length === 0 &&
      getUsers()
        .then((res) => res.json())
        .then((res) => {
          const filteredRoles = ['ROLE_ADMIN', 'ROLE_MANAGER']
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
        <div className="main-form__title">Новый клиент</div>
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
            Данные клиента
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
              {/* Видимость для менеджеров */}
              {/* <div className="main-form__item">
                                    <div className="main-form__input_name">Видимость</div>
                                    <div className="main-form__input_field main-form__input_field--vertical">
                                        <CheckBox
                                            text="Видно всем"
                                            uniqueId='visible-all'
                                            defaultChecked={true}
                                            disabled={!props.userHasAccess(["ROLE_ADMIN"])}
                                            onChange={(value) => {
                                                setUsers([...users.map(user => {
                                                    return {
                                                        ...user,
                                                        active: value
                                                    };
                                                })]);
                                            }}
                                        />
                                        {users.map((user, userIndex) => {
                                            return <CheckBox
                                                text={user.username}
                                                uniqueId={userIndex}
                                                defaultChecked={true}
                                                checked={user.active}
                                                onChange={(value) => {
                                                    let temp = users;
                                                    temp.splice(userIndex, 1, {
                                                        ...user,
                                                        active: value
                                                    })
                                                    setUsers([...temp]);
                                                }}
                                            />
                                        })}
                                    </div>
                                </div> */}
              {/* <div className="main-form__item">
                                    <div className="main-form__input_name">Скидки</div>
                                    <div className="main-form__input_field main-form__input_field--vertical">
                                        <CheckBox
                                            text="Скидка №1"
                                            uniqueId={0}
                                            defaultChecked={true}
                                            onChange={(value) => {

                                            }}
                                        />
                                        <CheckBox
                                            text="Скидка №2"
                                            uniqueId={1}
                                            defaultChecked={true}
                                            onChange={(value) => {

                                            }}
                                        />
                                    </div>
                                </div> */}
              <InputText
                inputName="Акт сверки"
                name="check"
                handleInputChange={handleInputChange}
                defaultValue={clientInputs.check}
              />
              <div className="main-form__fieldset">
                <div className="main-form__group-name">Категория клиента</div>
                <div className="main-form__item">
                  <div className="main-form__input_name">Тип клиента*</div>
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
                  inputName="Выбор категории клиента"
                  required
                  error={formErrors.category}
                  userHasAccess={props.userHasAccess}
                  windowName="select-category"
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
              onClick={() => props.history.push('/clients/categories')}
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
