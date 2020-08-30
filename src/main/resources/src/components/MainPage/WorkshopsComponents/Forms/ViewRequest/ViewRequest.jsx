import React, { useEffect, useState, useContext } from 'react'
import pdfMake from 'pdfmake'

import '../../../../../utils/Form/Form.scss'
import './ViewRequest.scss'

import PrintIcon from '../../../../../../../../../assets/print.png'
import DownloadIcon from '../../../../../../../../../assets/download.svg'
import InputProducts from '../../../../../utils/Form/InputProducts/InputProducts.jsx'
import { formatDateString } from '../../../../../utils/functions.jsx'
import { getRequestPdfText } from '../../../../../utils/pdfFunctions.jsx'
import { getRequestById } from '../../../../../utils/RequestsAPI/Requests.jsx'
import InputDate from '../../../../../utils/Form/InputDate/InputDate.jsx'
import { workshops } from '../../workshopVariables.js'
import { UserContext } from '../../../../../App.js'
import SelectClient from '../../../Clients/SelectClients/SelectClients.jsx'

const ViewRequest = (props) => {
  const userContext = useContext(UserContext)
  const [requestInputs, setRequestInputs] = useState({
    date: '',
    requestProducts: '',
    // quantity: "",
    codeWord: '',
    responsible: '',
    status: 'Не готово',
    shippingDate: '',
    comment: '',
    sum: 0,
    clientId: 0,
    client: null,
  })
  const [itemId, setItemId] = useState(0)

  const handleSubmit = (event) => {
    event.preventDefault()
    props.history.push(workshops[props.type].redirectURL)
  }

  useEffect(() => {
    document.title = 'Просмотр заявки'
    const id = props.history.location.pathname.split('view/')[1]
    if (isNaN(Number.parseInt(id))) {
      alert('Неправильный индекс заявки!')
      props.history.push(workshops[props.type].redirectURL)
    } else {
      setItemId(id)
      getRequestById(id)
        .then((res) => res.json())
        .then((oldRequest) => {
          setRequestInputs({
            date: oldRequest.date,
            requestProducts: oldRequest.requestProducts,
            codeWord: oldRequest.codeWord,
            responsible: oldRequest.responsible,
            status: oldRequest.status,
            shippingDate: oldRequest.shippingDate,
            comment: oldRequest.comment,
            sum: oldRequest.sum,
            client: oldRequest.client,
            clientId: oldRequest.client?.id,
          })
        })
        .catch((error) => {
          console.log(error)
          alert('Неправильный индекс заявки!')
          props.history.push(workshops[props.type].redirectURL)
        })
    }
  }, [])

  const PrintRequest = (event) => {
    event.preventDefault()
    let dd = getRequestPdfText(
      requestInputs.date,
      requestInputs.requestProducts,
      requestInputs.codeWord,
      workshops[props.type].name,
      itemId,
    )
    pdfMake.createPdf(dd).print()
  }

  const DownloadRequest = (event) => {
    event.preventDefault()
    let dd = getRequestPdfText(
      requestInputs.date,
      requestInputs.requestProducts,
      requestInputs.codeWord,
      workshops[props.type].name,
      itemId,
    )
    pdfMake
      .createPdf(dd)
      .download(
        'ПланПроизводства№' +
          itemId +
          '_' +
          formatDateString(requestInputs.date) +
          '.pdf',
      )
  }

  return (
    <div className="view-request">
      <div className="main-form">
        <form className="main-form__form">
          <div className="main-form__header main-form__header--full">
            <div className="main-form__title">{`Просмотр заявки ${
              workshops[props.type].title
            }`}</div>
          </div>
          <InputDate
            inputName="Дата заявки"
            selected={Date.parse(requestInputs.date)}
            readOnly
          />
          <InputProducts
            inputName="Продукция"
            userHasAccess={userContext.userHasAccess}
            defaultValue={requestInputs.requestProducts}
            readOnly
          />
          {requestInputs.client ? (
            <SelectClient
              inputName="Клиент"
              userHasAccess={userContext.userHasAccess}
              defaultValue={requestInputs.client?.name}
              readOnly
            />
          ) : (
            <div className="main-form__item">
              <div className="main-form__input_name">Кодовое слово</div>
              <div className="main-form__input_field">
                <input
                  type="text"
                  name="codeWord"
                  defaultValue={requestInputs.codeWord}
                  readOnly
                />
              </div>
            </div>
          )}
          <div className="main-form__item">
            <div className="main-form__input_name">Ответственный</div>
            <div className="main-form__input_field">
              <input
                type="text"
                name="responsible"
                defaultValue={requestInputs.responsible}
                readOnly
              />
            </div>
          </div>
          <div className="main-form__item">
            <div className="main-form__input_name">Статус</div>
            <div className="main-form__input_field">
              <input
                type="text"
                name="status"
                value={requestInputs.status}
                readOnly
              />
            </div>
          </div>
          <InputDate
            inputName="Дата отгрузки"
            selected={Date.parse(requestInputs.shippingDate)}
            readOnly
          />
          <div className="main-form__item">
            <div className="main-form__input_name">Комментарий</div>
            <div className="main-form__input_field">
              <input
                type="text"
                name="comment"
                defaultValue={requestInputs.comment}
                readOnly
              />
            </div>
          </div>
          <div className="main-form__item">
            <div className="main-form__input_name">Цена</div>
            <div className="main-form__input_field">
              <input
                type="number"
                name="sum"
                defaultValue={requestInputs.sum}
                readOnly
              />
            </div>
          </div>
          <div className="main-form__buttons">
            <input
              className="main-form__submit"
              type="submit"
              onClick={handleSubmit}
              value="Вернуться назад"
            />
            <button
              className="main-form__submit main-form__submit--inverted"
              onClick={PrintRequest}
            >
              <img className="main-form__img" src={PrintIcon} alt="" />
              <span>Печать</span>
            </button>
            <button
              className="main-form__submit main-form__submit--inverted"
              onClick={DownloadRequest}
            >
              <img className="main-form__img" src={DownloadIcon} alt="" />
              <span>Скачать</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ViewRequest
