import React, { useState, useEffect } from 'react'
import './ViewClient.scss'
import '../../../../utils/Form/Form.scss'
import { getClientById } from '../../../../utils/RequestsAPI/Clients.jsx'
import SelectLegalEntity from '../SelectLegalEntity/SelectLegalEntity.jsx'
import InputText from '../../../../utils/Form/InputText/InputText.jsx'
import InputDate from '../../../../utils/Form/InputDate/InputDate.jsx'
import SelectContacts from '../SelectContacts/SelectContacts.jsx'
import SelectClientCategory from '../ClientCategories/SelectClientCategory/SelectClientCategory.jsx'
import SelectWorkHistory from '../SelectWorkHistory/SelectWorkHistory.jsx'

const ViewClient = (props) => {
  const [clientInputs, setClientInputs] = useState({
    name: '',
    legalEntity: [],
    contacts: [],
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

  const [isLoading, setIsLoading] = useState(false)
  const [curTab, setCurTab] = useState('clientData')

  useEffect(() => {
    document.title = 'Просмотр клиента'
    const id = props.history.location.pathname.split('/clients/view/')[1]
    if (isNaN(Number.parseInt(id))) {
      alert('Неправильный индекс клиента!')
      props.history.push('/clients/categories')
    } else {
      getClientById(id)
        .then((res) => res.json())
        .then((res) => {
          console.log(res)
          setClientInputs({
            name: res.name,
            site: res.site,
            comment: res.comment,
            storageAddress: res.storageAddress,
            workCondition: res.workCondition,
            price: res.price,
            check: res.check,
            clientType: res.clientType,
            manager: res.manager,
            nextContactDate: res.nextDateContact,
            legalEntity: res.legalEntities,
            contacts: res.contacts,
            workHistory: res.histories,
            category: res.category,
            categoryName: res.category.name,
          })
        })
    }
  }, [])

  return (
    <div className="view_client">
      <div className="main-form">
        <div className="main-form__title">Просмотр клиента</div>
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
          {curTab === 'workHistory' ? (
            <React.Fragment>
              {/* Добавление истории работ */}
              <div className="main-form__item">
                <div className="main-form__input_name">История работ</div>
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
                    readOnly
                  />
                </div>
              </div>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <InputText
                inputName="Название"
                name="name"
                defaultValue={clientInputs.name}
                readOnly
              />
              {/* Добавление юридических лиц */}
              <div className="main-form__item">
                <div className="main-form__input_name">Юридическое лицо</div>
                <div className="main-form__input_field">
                  <SelectLegalEntity
                    defaultValue={clientInputs.legalEntity}
                    userHasAccess={props.userHasAccess}
                    readOnly
                  />
                </div>
              </div>
              <div className="main-form__fieldset">
                <div className="main-form__group-name">Контактные данные</div>
                {/* Добавление контактных лиц */}
                <div className="main-form__item">
                  <div className="main-form__input_name">Контактное лицо</div>
                  <div className="main-form__input_field">
                    <SelectContacts
                      defaultValue={clientInputs.contacts}
                      userHasAccess={props.userHasAccess}
                      readOnly
                    />
                  </div>
                </div>
                <InputText
                  inputName="Сайт"
                  name="site"
                  readOnly
                  defaultValue={clientInputs.site}
                />
              </div>
              <InputText
                inputName="Комментарий"
                name="comment"
                defaultValue={clientInputs.comment}
                readOnly
                type="textarea"
              />
              <InputText
                inputName="Адрес склада"
                name="storageAddress"
                readOnly
                defaultValue={clientInputs.storageAddress}
              />
              <InputDate
                inputName="Дата след. контакта"
                name="nextContactDate"
                selected={Date.parse(clientInputs.nextContactDate)}
                readOnly
              />
              <InputText
                inputName="Условия работы"
                name="workCondition"
                defaultValue={clientInputs.workCondition}
                readOnly
              />
              <InputText
                inputName="Прайс"
                name="price"
                defaultValue={clientInputs.price}
                readOnly
              />
              <InputText
                inputName="Акт сверки"
                name="check"
                defaultValue={clientInputs.check}
                readOnly
              />
              <InputText
                inputName="Отвественный менеджер"
                name="manager"
                defaultValue={clientInputs.manager}
                readOnly
              />
              <div className="main-form__fieldset">
                <div className="main-form__group-name">Категория клиента</div>
                <InputText
                  inputName="Тип клиента"
                  name="clientType"
                  defaultValue={clientInputs.clientType}
                  readOnly
                />
                <InputText
                  inputName="Категория"
                  name="category"
                  defaultValue={clientInputs.categoryName}
                  readOnly
                />
              </div>
            </React.Fragment>
          )}
          <div className="main-form__buttons">
            <input
              className="main-form__submit main-form__submit--inverted"
              type="submit"
              onClick={() =>
                props.history.push(
                  '/clients/category/' +
                    clientInputs.categoryName +
                    '/' +
                    (clientInputs.clientType === 'Активные'
                      ? 'active'
                      : clientInputs.clientType === 'Потенциальные'
                      ? 'potential'
                      : 'in-progress'),
                )
              }
              value="Вернуться назад"
            />
          </div>
        </form>
      </div>
    </div>
  )
}

export default ViewClient
