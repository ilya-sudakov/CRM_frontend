import { useContext, useState } from 'react';
import './FloatingButton.scss';
import plusIcon from 'Assets/sidemenu/plus.svg';
import { Link } from 'react-router-dom';
import UserContext from '../../../App.js';
import PropTypes from 'prop-types';

const FloatingButton = ({
  visibility,
  linkTo = '/',
  title = 'Создать',
  onClick,
  iconStyles,
  iconSrc,
}) => {
  const userContext = useContext(UserContext);
  const [showButton, setShowButton] = useState(true);

  if ((!visibility || userContext.userHasAccess(visibility)) && showButton) {
    return (
      <Link
        className="floating-plus"
        to={linkTo}
        title={title}
        onClick={
          onClick
            ? (event) => {
                event.preventDefault();
                onClick();
              }
            : null
        }
      >
        <img
          className="floating-plus__img"
          style={iconStyles}
          src={iconSrc ?? plusIcon}
        />
        <div
          className="floating-plus__hide-btn"
          onClick={(event) => {
            event.preventDefault();
            setShowButton(!showButton);
          }}
          title="Убрать кнопку"
        >
          <div className="floating-plus__line"></div>
          <div className="floating-plus__line"></div>
        </div>
      </Link>
    );
  } else {
    return null;
  }
};

export default FloatingButton;

FloatingButton.propTypes = {
  visibility: PropTypes.array,
  linkTo: PropTypes.string,
  title: PropTypes.string,
  onClick: PropTypes.func,
  iconStyles: PropTypes.object,
  iconSrc: PropTypes.string,
};
