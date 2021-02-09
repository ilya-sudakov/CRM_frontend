import React, { useEffect, useState } from "react";
import deleteSVG from "../../../../../../../../assets/select/delete.svg";
import "./NestedFormItem.scss";
import ChevronSVG from "../../../../../../../../assets/tableview/chevron-down.inline.svg";
import { useRef } from "react";

const NestedFormItem = ({
  item,
  readOnly,
  index,
  headerItems = [],
  formInputs = [],
  bottomButton,
  itemsLength = 0,
  isMinimizedDefault = false,
  handleDeleteItem,
}) => {
  const [isMinimized, setIsMinimized] = useState(isMinimizedDefault);
  const [formHeight, setFormHeight] = useState(0);
  const formRef = useRef(null);

  useEffect(() => {
    if (formHeight > 15) return;
    console.log(formRef.current.clientHeight);
    if (!isMinimized && formHeight === 0)
      setFormHeight(formRef.current.clientHeight);
  }, [isMinimized]);

  useEffect(() => {
    if (formHeight <= 15) return;
    setFormHeight(formRef.current.clientHeight);
  }, [formRef.current]);

  return (
    <div
      className={
        !readOnly && itemsLength > 1
          ? "form-item form-item--minimized"
          : "form-item"
      }
    >
      <div
        className="form-item__header"
        index={index}
        onClick={() => setIsMinimized(!isMinimized)}
      >
        {headerItems.map((headerItem) => (
          <div className="form-item__name" style={{ ...headerItem.style }}>
            <span>{headerItem.text}</span>
            {item[headerItem.name] !== "" ? (
              <span>{item[headerItem.name]}</span>
            ) : (
              <span className="form-item__name--placeholder">
                {headerItem.placeholder}
              </span>
            )}
          </div>
        ))}
        <ChevronSVG
          className={`main-form__img ${
            !isMinimized ? "main-form__img--rotated" : ""
          }`}
        />
      </div>
      <div
        className={
          isMinimized
            ? "form-item__form form-item__form--hidden"
            : "form-item__form"
        }
        style={{
          height: isMinimized
            ? "0px"
            : `${
                formHeight === 0 ? formRef.current?.clientHeight : formHeight
              }px`,
        }}
        ref={formRef}
      >
        {formInputs.map((input) => (
          <div className="form-item__item">
            <div className="form-item__input_field">
              <div className="form-item__input_name">{input.name}</div>
              {input.element}
            </div>
          </div>
        ))}
        {!readOnly && bottomButton && bottomButton}
      </div>
      {!readOnly && itemsLength > 1 && (
        <img
          index={index}
          onClick={handleDeleteItem}
          className="form-item__img"
          src={deleteSVG}
        />
      )}
    </div>
  );
};

export default NestedFormItem;
