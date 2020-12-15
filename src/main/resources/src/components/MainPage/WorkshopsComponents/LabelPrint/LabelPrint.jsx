// import jsPDF from 'jspdf'
import React, { useEffect } from "react";
import html2canvas from "html2canvas";
import "./LabelPrint.scss";
import Barcode from "react-barcode";
import { formatDateString } from "../../../../utils/functions.jsx";
import QRCode from "react-qr-code";

const LabelPrint = (props) => {
  useEffect(() => {
    // console.log(props)
  }, [props]);

  const workshopNames = {
    null: "Цех не указан",
    ligovskiy: "Ли",
    lemz: "ЛЭ",
    lepsari: "Ле",
  };

  return (
    <div
      id="label"
      className={`label-print ${props.isHidden ? "label-print--hidden" : ""}`}
    >
      <div className="label-print__header">
        <div className="header__name">{props.name || "Нет наименования"}</div>
        <div className="header__box"></div>
      </div>
      <div className="label-print__content">
        <div className="content__description content__description--small">
          {props.description ?? ""}
        </div>
        <div className="content__description  content__description--production-info">
          <div>{`Изготовлено ${formatDateString(new Date())}${
            workshopNames[props.workshop]
              ? `/${workshopNames[props.workshop]}`
              : ""
          }`}</div>
          <div className="content__bar-code content__bar-code--qr">
            <QRCode
              value={props.link || "https://osfix.ru/katalog-produkczii"}
              size={70}
            />
          </div>
        </div>
        <div className="content__bar-code content__bar-code--bar">
          <Barcode
            value={props.product?.barcode ?? "123456789012"}
            fontSize={20}
            format="CODE39"
            width={1.4}
            height={80}
          />
        </div>
      </div>
    </div>
  );
};

export default LabelPrint;
