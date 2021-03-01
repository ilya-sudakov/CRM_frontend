import React, { useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import "./ErrorMessage.scss";

const ErrorMessage = ({ showError = false, setShowError, message = "" }) => {
  const clickOnErrorWindow = (event) => {
    event.preventDefault();
    const classList = event.target.classList;
    if (
      !(classList[0] === "window_error") &&
      !classList.contains("window_error__exit") &&
      !classList.contains("window_error__bar") &&
      !classList.contains("main-window__button")
    ) {
      return setShowError(true);
    }

    return setShowError(false);
  };

  const handleCloseWindow = useCallback((event) => {
    if (event.key === "Enter" || event.key === "Escape") {
      event.preventDefault();
      setShowError(false);
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
        showError ? "window_error" : "window_error window_error--hidden"
      }
      onClick={clickOnErrorWindow}
    >
      <div
        className={
          showError
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
        <div className="window_error__message">{message}</div>
        <div className="main-window__button" onClick={clickOnErrorWindow}>
          ОК
        </div>
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
