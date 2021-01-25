import React, { Component } from "react";
import PropTypes from "prop-types";
import "../MainPage/ErrorPage/ErrorPage.scss";
import { Link } from "react-router-dom";

export default class ErrorBoundary extends Component {
  state = {
    error: "",
    errorInfo: "",
    hasError: false,
  };
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    // eslint-disable-next-line no-console
    console.log({ error, errorInfo });
    this.setState({ errorInfo });
  }
  render() {
    const { hasError, errorInfo } = this.state;

    if (hasError) {
      return (
        <div className="error-page">
          <div className="error-page__title">{`Ошибка в ${
            this.props.componentName || "одном из компонентов"
          }!`}</div>
          <div className="error-page__description">
            Что-то пошло не так и, скорее всего, вы нашли ошибку.
            <br />
            <br />
            Если ошибка повторяется - напишите об этом в {` `}
            <Link className="error-page__link" to="/feedback">
              обратной связи
            </Link>
          </div>
          <button
            className="main-window__button error-page__button"
            onClick={() => window.location.reload()}
          >
            Перезагрузить страницу
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  componentName: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
};
