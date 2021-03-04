import React, { useEffect, useCallback } from 'react';
import Button from '../Button/Button.jsx';
import PropTypes from 'prop-types';
import './MessageForUser.scss';

const MessageForUser = ({
  showMessage = false,
  setShowMessage,
  message = '',
  onClick,
  title = 'Сообщение',
  buttonText = 'ОК',
}) => {
  const clickOnMessageWindow = (event) => {
    event.preventDefault();
    const classList = event.target.classList;
    if (
      !(classList[0] === 'window-message') &&
      !classList.contains('window-message__exit') &&
      !classList.contains('window-message__bar') &&
      !classList.contains('main-window__button')
    ) {
      return setShowMessage(true);
    }

    return setShowMessage(false);
  };

  const handleCloseWindow = useCallback((event) => {
    if (event.key === 'Enter' || event.key === 'Escape') {
      event.preventDefault();
      setShowMessage(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', handleCloseWindow, false);
    return () => {
      document.removeEventListener('keydown', handleCloseWindow, false);
    };
  }, []);

  return (
    <div
      className={
        showMessage ? 'window-message' : 'window-message window-message--hidden'
      }
      onClick={clickOnMessageWindow}
    >
      <div
        className={
          showMessage
            ? 'window-message__content'
            : 'window-message__content window-message__content--hidden'
        }
      >
        <div className="window-message__header">
          <div className="window-message__title">{title}</div>
          <div className="window-message__exit" onClick={clickOnMessageWindow}>
            <div
              className="window-message__bar"
              onClick={clickOnMessageWindow}
            ></div>
            <div
              className="window-message__bar"
              onClick={clickOnMessageWindow}
            ></div>
          </div>
        </div>
        <div className="window-message__message">{message}</div>
        <div
          className="main-window__button"
          onClick={(event) => {
            onClick && onClick();
            clickOnMessageWindow(event);
          }}
        >
          {buttonText}
        </div>
      </div>
    </div>
  );
};

export default MessageForUser;

MessageForUser.propTypes = {
  message: PropTypes.string,
  showMessage: PropTypes.bool,
  setShowMessage: PropTypes.func,
  onClick: PropTypes.func,
  title: PropTypes.string,
  buttonText: PropTypes.string,
};
