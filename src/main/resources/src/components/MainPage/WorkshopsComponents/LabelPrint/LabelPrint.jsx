import React, { useEffect } from "react";
import "./LabelPrint.scss";
import Barcode from "react-barcode";
import { formatDateString } from "../../../../utils/functions.jsx";
import QRCode from "react-qr-code";
import PropTypes from "prop-types";

const LabelPrint = ({ product, isHidden }) => {
  const workshopNames = {
    null: "Цех не указан",
    ligovskiy: "Ли",
    lemz: "ЛЭ",
    lepsari: "Ле",
  };

  return (
    <div
      id="label"
      className={`label-print ${isHidden ? "label-print--hidden" : ""}`}
    >
      <div className="label-print__header">
        <div className="header__name">{product.name || "Нет наименования"}</div>
        <div className="header__box"></div>
      </div>
      <div className="label-print__content">
        <div className="content__description content__description--small">
          {product.description ?? ""}
        </div>
        <div className="content__description  content__description--production-info">
          <div>{`Изготовлено ${formatDateString(new Date())}${
            workshopNames[product.workshop]
              ? `/${workshopNames[product.workshop]}`
              : ""
          }`}</div>
          <div className="content__bar-code content__bar-code--qr">
            <QRCode
              value={product.link || "https://osfix.ru/katalog-produkczii"}
              size={70}
            />
          </div>
        </div>
        <div className="content__bar-code content__bar-code--bar">
          <Barcode
            value={product?.barcode ?? "123456789012"}
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

LabelPrint.propTypes = {
  product: PropTypes.object,
  isHidden: PropTypes.bool,
};
