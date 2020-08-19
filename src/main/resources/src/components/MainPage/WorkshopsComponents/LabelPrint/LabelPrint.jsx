// import jsPDF from 'jspdf'
import React, { useEffect } from 'react'
import html2canvas from 'html2canvas'
import './LabelPrint.scss'
import { formatDateString } from '../../../../utils/functions.jsx'
import QRCode from 'react-qr-code'

const LabelPrint = (props) => {
  useEffect(() => {
    console.log(props.name)
  }, [props])

  return (
    <div
      id="label"
      className={`label-print ${props.isHidden ? 'label-print--hidden' : ''}`}
    >
      <div className="label-print__header">
        <div className="header__name">
          {props.name || 'ДПК Стандарт 6,5/3 (AISI430, 1мм)'}
        </div>
        <div className="header__box"></div>
      </div>
      <div className="label-print__content">
        <div className="content__description">{`Дата изготовления ${formatDateString(
          new Date(),
        )}`}</div>
        <div className="content__description content__description--address">
          Расфасовано в ООО "Osfix" 191040, г. Санкт-Петербург, Лиговский пр.,
          д. 52
        </div>
        <div className="content__bar-code">
          <QRCode
            value={props.link || 'https://osfix.ru/katalog-produkczii'}
            size={150}
          />
        </div>
      </div>
    </div>
  )
}

export default LabelPrint
