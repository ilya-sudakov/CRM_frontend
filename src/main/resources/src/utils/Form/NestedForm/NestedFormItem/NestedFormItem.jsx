import React, { useEffect, useState } from "react";
import DeleteSVG from "../../../../../../../../assets/tableview/delete.inline.svg";
import "./NestedFormItem.scss";
import ChevronSVG from "../../../../../../../../assets/tableview/chevron-down.inline.svg";
import { useRef } from "react";
import PropTypes from "prop-types";
import { is } from "date-fns/locale";

const NestedFormItem = ({
  readOnly,
  index,
  headerItems = [],
  formInputs = [],
  bottomButton,
  itemsLength = 0,
  isMinimizedDefault = false,
  handleDeleteItem,
  id = 0,
}) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const formRef = useRef(null);
  const [formHeight, setFormHeight] = useState(formRef?.current?.clientHeight);

  useEffect(() => {
    if (isMinimizedDefault === true && formHeight !== "0px" && formHeight) {
      console.log(formHeight);
      setIsMinimized(isMinimizedDefault);
    }
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
      <div
        className={
          isMinimized
            ? "form-item__form form-item__form--hidden"
            : "form-item__form"
        }
        style={{
          height: isMinimized
            ? "0px"
            : formHeight === "0px"
            ? formRef.current?.clientHeight
            : formHeight,
          transition:
            isMinimizedDefault &&
            (formHeight === "0px" || formHeight === undefined)
              ? "0s ease-in"
              : "all 100ms ease-in-out",
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
