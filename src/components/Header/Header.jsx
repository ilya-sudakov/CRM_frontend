import React, { useState, useEffect, useContext } from 'react';
import exitSVG from '../../../assets/header/exit.svg';
import HistorySVG from '../../../assets/statistics/history-outlined.inline.svg';
import employeeSVG from '../../../assets/header/employee.svg';
import logoMobile from '../../../assets/header/header_small-logo.png';
import ChevronSVG from '../../../assets/tableview/chevron-down.inline.svg';
import notificationBellSVG from '../../../assets/notifications/notification_bell.svg';
import { Link, withRouter } from 'react-router-dom';
import './Header.scss';
import UserContext from '../../App.js';
import PropTypes from 'prop-types';

const Header = (props) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const userContext = useContext(UserContext);

  const sideMenuClickDesktop = () =>
    props.setSidemenuHidden(!props.sidemenuHidden);

  return (
    <div className="header">
      <div className="header__company">
        <div
          className={
            !props.sidemenuHidden
              ? 'header__sidemenu header__sidemenu--hidden'
              : 'header__sidemenu'
          }
          onClick={sideMenuClickDesktop}
        >
          <div className="linesWrapper">
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
          </div>
        </div>
        <Link className="header__link" to="/">
          <img className="header__logo" src={logoMobile} alt="" />
        </Link>
      </div>
      <div className="header__menu">
        <Link
          className={
            userContext.newNotifications > 0
              ? 'header__item header__item--notification'
              : 'header__item header__item--notification header__item--notification-empty'
          }
          data-notifications={userContext.newNotifications}
          // to="/notifications"
          to="/"
          onClick={() =>
            userContext.setLastNotification({
              ...userContext.lastNotification,
              visible: false,
            })
          }
        >
          <img className="header__img" src={notificationBellSVG} alt="" />
          <div
            className={
              userContext.lastNotification.visible
                ? 'header__notification-message'
                : 'header__notification-message header__notification-message--hidden'
            }
          >
            <span>{userContext.lastNotification.title}</span>
            <span>{userContext.lastNotification.body}</span>
            <span></span>
            <span></span>
          </div>
        </Link>
        <div
          className="header__item header__item--user"
          onClick={() => setShowProfileMenu(!showProfileMenu)}
        >
          <div
            className={
              showProfileMenu
                ? 'header__profile_overlay'
                : 'header__profile_overlay header__profile_overlay--hidden'
            }
            onClick={() => setShowProfileMenu(!showProfileMenu)}
          ></div>
          <div className="header__profile_data">
            <div className="header__username">
              {userContext.userData.username}
            </div>
            <ChevronSVG
              className={`header__userimg ${
                showProfileMenu ? 'main-window__img--rotated' : ''
              }`}
              alt=""
            />
          </div>
          <HeaderMenu
            userHasAccess={userContext.userHasAccess}
            location={props.location}
            showProfileMenu={showProfileMenu}
            setShowProfileMenu={setShowProfileMenu}
          />
        </div>
      </div>
    </div>
  );
};

export default withRouter(Header);

Header.propTypes = {
  sidemenuHidden: PropTypes.bool,
  setSidemenuHidden: PropTypes.func,
  location: PropTypes.object,
};

const HeaderMenu = ({
  showProfileMenu,
  setShowProfileMenu,
  userHasAccess,
  location,
}) => {
  return (
    <div
      className={
        showProfileMenu
          ? 'header__profile_menu'
          : 'header__profile_menu header__profile_menu--hidden'
      }
    >
      {userHasAccess(['ROLE_ADMIN']) ? (
        <HeaderMenuItem
          showProfileMenu={showProfileMenu}
          setShowProfileMenu={setShowProfileMenu}
          link="/profile/users"
          text="Управление пользователями"
          location={location}
          icon={<img className="header__img" src={employeeSVG} alt="" />}
        />
      ) : null}
      {userHasAccess(['ROLE_ADMIN']) ? (
        <HeaderMenuItem
          showProfileMenu={showProfileMenu}
          setShowProfileMenu={setShowProfileMenu}
          link="/profile/log-list"
          text="Логи"
          location={location}
          icon={
            <HistorySVG className="header__img header__img--history" alt="" />
          }
        />
      ) : null}
      <HeaderMenuItem
        showProfileMenu={showProfileMenu}
        setShowProfileMenu={setShowProfileMenu}
        link="/login"
        text="Выйти из профиля"
        location={location}
        icon={<img className="header__img" src={exitSVG} alt="" />}
      />
    </div>
  );
};

const HeaderMenuItem = ({
  link,
  setShowProfileMenu,
  showProfileMenu,
  text,
  icon,
  location,
}) => {
  return (
    <Link
      to={link}
      className={`header__profile_item ${
        location.pathname.includes(link) ? 'header__profile_item--active' : ''
      }`}
      onClick={() => setShowProfileMenu(!showProfileMenu)}
    >
      {icon}
      <span>{text}</span>
    </Link>
  );
};
