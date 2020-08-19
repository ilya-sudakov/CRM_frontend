// import jsPDF from 'jspdf'
import React, { useEffect } from 'react'
import html2canvas from 'html2canvas'
import './LabelPrint.scss'
import { formatDateString } from '../../../../utils/functions.jsx'
import QRCode from 'react-qr-code'

const LabelPrint = (props) => {
  const saveCanvas = (canvasSave) => {
    const d = canvasSave.toDataURL('image/png')
    const w = window.open('about:blank', 'image from canvas')
    w.document.write("<img src='" + d + "' alt='from canvas'/>")
    console.log('Saved!')
  }

  const saveCanvasAsImage = (canvas) => {
    canvas.toBlob(
      function (blob) {
        // получаем содержимое как JPEG Blob
        let link = document.createElement('a')
        link.download = 'test.jpeg'
        link.href = URL.createObjectURL(blob)
        link.click()
        // удаляем ссылку на Blo
        URL.revokeObjectURL(link.href)
      },
      'image/jpeg',
      1,
    )
  }

  useEffect(() => {
    // html2canvas(document.getElementById('label')).then((canvas) => {
    //   //   saveCanvas(canvas)
    //   //   saveCanvasAsImage(canvas)
    // })
    console.log(props.name);
  }, [props.name])

  return (
    <div id="label" className="label-print">
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
          Расфасовано в ООО "Osfix" 190013, г. Санкт-Петербург, улица Рузовская,
          дом 5, литера А, помещение 3-Н, офис 25
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
