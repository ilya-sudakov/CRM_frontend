import React, { useEffect, useState } from "react";
import DeleteSVG from "../../../../../../../../assets/tableview/delete.inline.svg";
import "./NestedFormItem.scss";
import ChevronSVG from "../../../../../../../../assets/tableview/chevron-down.inline.svg";
import { useRef } from "react";
import PropTypes from "prop-types";

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
  const [isMinimized, setIsMinimized] = useState(false);
  const formRef = useRef(null);
  const [formHeight, setFormHeight] = useState(formRef?.current?.clientHeight);

  useEffect(() => {
    if (isMinimizedDefault === true && formHeight > 0)
      setIsMinimized(isMinimizedDefault);
  }, [formRef.current]);

  useEffect(() => {
    if (formHeight > 15) return;
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
        <DeleteSVG
          index={index}
          onClick={handleDeleteItem}
          className="form-item__img"
        />
      )}
    </div>
  );
};

export default NestedFormItem;

NestedFormItem.propTypes = {
  item: PropTypes.object,
  readOnly: PropTypes.bool,
  index: PropTypes.number,
  headerItems: PropTypes.array,
  formInputs: PropTypes.array,
  bottomButton: PropTypes,
  itemsLength: PropTypes.number,
  isMinimizedDefault: PropTypes.bool,
  handleDeleteItem: PropTypes.element,
};
