import React, { useEffect, useState } from "react";
import DeleteSVG from "../../../../../../../../assets/tableview/delete.inline.svg";
import "./NestedFormItem.scss";
import ChevronSVG from "../../../../../../../../assets/tableview/chevron-down.inline.svg";
import { useRef } from "react";
import PropTypes from "prop-types";

const NestedFormItem = ({
  readOnly,
  index,
  headerItems,
  formInputs = [],
  bottomButton,
  itemsLength = 0,
  isMinimizedDefault = false,
  handleDeleteItem,
  id = 0,
}) => {
  const [isMinimized, setIsMinimized] = useState(isMinimizedDefault);
  const formRef = useRef(null);
  const [formHeight, setFormHeight] = useState(formRef?.current?.clientHeight);

  useEffect(() => {
    setFormHeight(`${formRef.current.clientHeight}px`);
  }, [formRef.current]);

  useEffect(() => {
    if (!isMinimized && formHeight === "0px")
      setFormHeight(`${formRef.current.clientHeight}px`);
  }, [isMinimized]);

  return (
    <div
      className={
        !readOnly && itemsLength > 1
          ? "form-item form-item--minimized"
          : "form-item"
      }
    >
      {headerItems ? (
        <div
          className="form-item__header"
          index={index}
          onClick={() => setIsMinimized(!isMinimized)}
          id={id}
        >
          {headerItems.map((headerItem) => (
            <div className="form-item__name" style={{ ...headerItem.style }}>
              <span>{headerItem.text}</span>
              {headerItem.value !== "" ? (
                <span>{headerItem.value}</span>
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
      ) : null}
      <div
        className={
          isMinimized
            ? "form-item__form form-item__form--hidden"
            : "form-item__form"
        }
        style={{
          height: isMinimized ? "0px" : "auto",
          transition: "0s ease-in",
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
          onClick={() => handleDeleteItem(index)}
          className="form-item__img"
        />
      )}
    </div>
  );
};

export default NestedFormItem;

NestedFormItem.propTypes = {
  readOnly: PropTypes.bool,
  index: PropTypes.number,
  headerItems: PropTypes.array,
  formInputs: PropTypes.array,
  bottomButton: PropTypes,
  itemsLength: PropTypes.number,
  id: PropTypes.number,
  isMinimizedDefault: PropTypes.bool,
  handleDeleteItem: PropTypes.element,
};
