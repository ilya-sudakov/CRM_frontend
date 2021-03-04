import { useContext, useState } from 'react';
import './FloatingPlus.scss';
import plusIcon from '../../../../assets/sidemenu/plus.svg';
import { Link } from 'react-router-dom';
import UserContext from '../../../App.js';

const FloatingPlus = (props) => {
  const userContext = useContext(UserContext);
  const [showButton, setShowButton] = useState(true);

  if (userContext.userHasAccess(props.visibility) && showButton) {
    return (
      <Link
        className="floating-plus"
        to={props.linkTo ? props.linkTo : '/'}
        title={props.title ? props.title : 'Создать'}
        onClick={
          props.onClick
            ? (event) => {
                event.preventDefault();
                props.onClick();
              }
            : null
        }
      >
        <img
          className="floating-plus__img"
          style={props.iconStyles}
          src={props.iconSrc ? props.iconSrc : plusIcon}
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
    return '';
  }
};

export default FloatingPlus;
