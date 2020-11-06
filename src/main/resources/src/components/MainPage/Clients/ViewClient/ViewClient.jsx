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
import ViewRequests from '../ViewRequests/ViewRequests.jsx'
import { getRequests } from '../../../../utils/RequestsAPI/Requests.jsx'

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
    requests: [],
    price: '',
    discount: '',
    check: '',
    clientType: 'Активные',
    categoryId: 0,
    categoryName: '',
    nextContactDate: new Date(new Date().setDate(new Date().getDate() + 7)), //Прибавляем 7 дней к сегодняшнему числу
  })

  const clientTypes = {
    clients: {
      name: 'клиент',
      getItemFunction: (id) => getClientById(id),
    },
    suppliers: {
      name: 'поставщик',
      getItemFunction: (id) => getClientById(id),
    },
  }

  const [isLoading, setIsLoading] = useState(false)
  const [curTab, setCurTab] = useState('clientData')

  useEffect(() => {
    document.title = `Просмотр ${clientTypes[props.type].name}а`
    const id = props.history.location.pathname.split('/view/')[1]
    if (isNaN(Number.parseInt(id))) {
      alert('Неправильный индекс!')
      props.history.push(`/${props.type}/categories`)
    } else {
      clientTypes[props.type]
        .getItemFunction(id)
        .then((res) => res.json())
        .then((res) => {
          console.log(res)
          setClientInputs({
            id: res.id,
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
            requests: res.requests || [],
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
        <form className="main-form__form">
          <div className="main-form__header main-form__header--full">
            <div className="main-form__title">{`Просмотр ${
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
                  setCurTab('workHistory')
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
                  setCurTab('requestsHistory')
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
                  setCurTab('clientData')
                }}
              >
                {`Данные ${clientTypes[props.type].name}а`}
              </div>
            </div>
          </div>
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
          ) : curTab === 'requestsHistory' ? (
            <RequestHistory
              requests={clientInputs.requests}
              id={clientInputs.id}
            />
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
                <div className="main-form__group-name">Категория</div>
                <InputText
                  inputName={`Тип ${clientTypes[props.type].name}а`}
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
          <div className="main-form__buttons main-form__buttons--full">
            <input
              className="main-form__submit main-form__submit--inverted"
              type="submit"
              onClick={() =>
                props.history.push(
                  '/' +
                    props.type +
                    '/category/' +
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

{
  /* История заявок */
}
const RequestHistory = ({ id }) => {
  const [requests, setRequests] = useState([])
  const [isLoading, setIsLoading] = useState([])

  useEffect(() => {
    setIsLoading(true)
    getRequests()
      .then((res) => res.json())
      .then((res) => {
        setIsLoading(false)
        const filteredData = res.filter((request) => request.client?.id === id)
        setRequests([...filteredData])
      })
  }, [])

  return (
    <div className="main-form__item">
      <div className="main-form__input_name">История заявок</div>
      <div className="main-form__input_field">
        <ViewRequests isLoading={isLoading} requests={requests} />
      </div>
    </div>
  )
}
