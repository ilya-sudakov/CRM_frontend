import React, { useEffect, useCallback } from "react";
import Button from "../Button/Button.jsx";
import PropTypes from "prop-types";
import "./ErrorMessage.scss";

const ErrorMessage = (props) => {
  const clickOnErrorWindow = (e) => {
    e.preventDefault();
    if (
      !(e.target.classList[0] === "window_error") &&
      !e.target.classList.contains("window_error__exit") &&
      !e.target.classList.contains("window_error__bar") &&
      !e.target.classList.contains("window_error__button")
    ) {
      props.setShowError(true);
    } else {
      props.setShowError(false);
    }
  };

  const handleCloseWindow = useCallback((event) => {
    if (event.key === "Enter" || event.key === "Escape") {
      event.preventDefault();
      props.setShowError(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleCloseWindow, false);
    return () => {
      document.removeEventListener("keydown", handleCloseWindow, false);
    };
  }, []);

  return (
    <div
      className={
        props.showError ? "window_error" : "window_error window_error--hidden"
      }
      onClick={clickOnErrorWindow}
    >
      <div
        className={
          props.showError
            ? "window_error__content"
            : "window_error__content window_error__content--hidden"
        }
      >
        <div className="window_error__title">
          Ошибка!
          <div className="window_error__exit" onClick={clickOnErrorWindow}>
            <div
              className="window_error__bar"
              onClick={clickOnErrorWindow}
            ></div>
            <div
              className="window_error__bar"
              onClick={clickOnErrorWindow}
            ></div>
          </div>
        </div>
        <div className="window_error__message">{props.message}</div>
        <Button
          className="window_error__button window_error__button--submit"
          onClick={clickOnErrorWindow}
          text="ОК"
        />
      </div>
    </div>
  );
};

export default ErrorMessage;

ErrorMessage.propTypes = {
  showError: PropTypes.bool,
  setShowError: PropTypes.func,
  message: PropTypes.string,
};
