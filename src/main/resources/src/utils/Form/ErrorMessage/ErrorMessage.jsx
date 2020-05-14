import React, { useEffect, useCallback } from 'react'
// import { Link } from 'react-router-dom';
import './ErrorMessage.scss'

const ErrorMessage = (props) => {
  const clickOnErrorWindow = (e) => {
    e.preventDefault()
    if (
      !(e.target.classList[0] === 'window_error') &&
      !e.target.classList.contains('window_error__exit') &&
      !e.target.classList.contains('window_error__bar') &&
      !e.target.classList.contains('window_error__button')
    ) {
      props.setShowError(true)
    } else {
      props.setShowError(false)
    }
  }

  const handleCloseWindow = useCallback((event) => {
    if (event.key === 'Enter' || event.key === 'Escape') {
      event.preventDefault()
      props.setShowError(false)
    }
  }, [])

  useEffect(() => {
    document.addEventListener('keydown', handleCloseWindow, false)
    return () => {
      document.removeEventListener('keydown', handleCloseWindow, false)
    }
  }, [])

  return (
    //Окно для добавления продукции по категориям
    <div
      className={
        props.showError ? 'window_error' : 'window_error window_error--hidden'
      }
      onClick={clickOnErrorWindow}
    >
      <div
        className={
          props.showError
            ? 'window_error__content'
            : 'window_error__content window_error__content--hidden'
        }
      >
        <div className="window_error__title">
          Ошибка!
          {/* <Link to="/products/new" className="window_error__button">Создать продукцию</Link> */}
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
        <div
          className="window_error__button window_error__button--submit"
          onClick={clickOnErrorWindow}
        >
          ОК
        </div>
      </div>
    </div>
  )
}

export default ErrorMessage
