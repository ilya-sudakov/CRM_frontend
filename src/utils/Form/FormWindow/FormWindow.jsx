import { useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './FormWindow.scss';
import PropTypes from 'prop-types';

const FormWindow = ({
  showWindow = false,
  setShowWindow,
  title = '',
  headerButton,
  content = '',
}) => {
  const pressEscKey = useCallback(
    (event) => {
      if (event.keyCode === 27 && showWindow) return setShowWindow(false);
    },
    [showWindow],
  );

  useEffect(() => {
    document.addEventListener('keydown', pressEscKey, false);
    return () => {
      document.removeEventListener('keydown', pressEscKey, false);
    };
  }, [showWindow, setShowWindow, content]);

  const clickOnSelectWindow = (e) => {
    console.log(
      e.target,
      e.target.classList.contains('form-window') ||
        e.target.classList.contains('form-window__exit') ||
        e.target.classList.contains('form-window__bar'),
      !(e.target.classList[0] === 'form-window') &&
        !e.target.classList.contains('form-window__exit') &&
        !e.target.classList.contains('form-window__bar'),
    );
    if (
      e.target.classList.contains('form-window') ||
      e.target.classList.contains('form-window__exit') ||
      e.target.classList.contains('form-window__bar')
    ) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (
      !(e.target.classList[0] === 'form-window') &&
      !e.target.classList.contains('form-window__exit') &&
      !e.target.classList.contains('form-window__bar')
    ) {
      // setShowWindow(true);
    } else {
      setShowWindow(false);
    }
  };

  return (
    <div
      className={showWindow ? 'form-window' : 'form-window form-window--hidden'}
      onClick={clickOnSelectWindow}
    >
      <div
        className={
          showWindow
            ? 'form-window__content'
            : 'form-window__content form-window__content--hidden'
        }
      >
        <div className="form-window__title">
          <span>{title}</span>
          {headerButton && (
            <Link to={headerButton.path} className="form-window__button">
              {headerButton.name}
            </Link>
          )}
          <div className="form-window__exit" onClick={clickOnSelectWindow}>
            <div
              className="form-window__bar"
              onClick={clickOnSelectWindow}
            ></div>
            <div
              className="form-window__bar"
              onClick={clickOnSelectWindow}
            ></div>
          </div>
        </div>
        <div className="form-window__body">
          <div className="main-window">{content}</div>
        </div>
      </div>
    </div>
  );
};

export default FormWindow;

FormWindow.propTypes = {
  showWindow: PropTypes.bool,
  setShowWindow: PropTypes.func,
  title: PropTypes.string,
  headerButton: PropTypes.object,
  content: PropTypes.any,
};
