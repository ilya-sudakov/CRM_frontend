import React, { useState, useEffect, useContext } from "react";
import exitSVG from "../../../../../../assets/header/exit.svg";
import HistorySVG from "../../../../../../assets/statistics/history-outlined.inline.svg";
import employeeSVG from "../../../../../../assets/header/employee.svg";
import newLogoSVG from "../../../../../../assets/header/header__new_year.png";
import mobileLogoSVG from "../../../../../../assets/header/header__mobile_new_year.png";
import ChevronSVG from "../../../../../../assets/tableview/chevron-down.inline.svg";
import notificationBellSVG from "../../../../../../assets/notifications/notification_bell.svg";
import { Link, withRouter } from "react-router-dom";
import "./Header.scss";
import UserContext from "../../App.js";
import PropTypes from "prop-types";

const Header = (props) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const userContext = useContext(UserContext);

  const sideMenuClickDesktop = () =>
    props.setSidemenuHidden(!props.sidemenuHidden);

  useEffect(() => {}, []);

  return (
    <div className="header">
      <div className="header__company">
        <div
          className={
            !props.sidemenuHidden
              ? "header__sidemenu header__sidemenu--hidden"
              : "header__sidemenu"
          }
          onClick={sideMenuClickDesktop}
        >
          <div className="linesWrapper">
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
          </div>
        </div>
        {/* {console.log(userContext)} */}
        <Link className="header__link" to="/">
          <img className="header__logo" src={newLogoSVG} alt="" />
          <img
            className="header__logo header__logo--mobile"
            src={mobileLogoSVG}
            alt=""
          />
        </Link>
      </div>
      <div className="header__menu">
        <Link
          className={
            userContext.newNotifications > 0
              ? "header__item header__item--notification"
              : "header__item header__item--notification header__item--notification-empty"
          }
          data-notifications={userContext.newNotifications}
          // to="/notifications"
          to="/"
          onClick={() => {
            userContext.setLastNotification({
              ...userContext.lastNotification,
              visible: false,
            });
          }}
        >
          <img className="header__img" src={notificationBellSVG} alt="" />
          <div
            className={
              userContext.lastNotification.visible
                ? "header__notification-message"
                : "header__notification-message header__notification-message--hidden"
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
                ? "header__profile_overlay"
                : "header__profile_overlay header__profile_overlay--hidden"
            }
            onClick={() => setShowProfileMenu(!showProfileMenu)}
          ></div>
          <div className="header__profile_data">
            <div className="header__username">
              {userContext.userData.username}
            </div>
            <ChevronSVG
              className={`header__userimg ${
                showProfileMenu ? "main-window__img--rotated" : ""
              }`}
              alt=""
            />
          </div>
          <div
            className={
              showProfileMenu
                ? "header__profile_menu"
                : "header__profile_menu header__profile_menu--hidden"
            }
          >
            {userContext.userHasAccess(["ROLE_ADMIN"]) ? (
              <Link
                to="/profile/users"
                className={`header__profile_item ${
                  props.location.pathname.includes("/profile/users")
                    ? "header__profile_item--active"
                    : ""
                }`}
                onClick={() => setShowProfileMenu(!showProfileMenu)}
              >
                <img className="header__img" src={employeeSVG} alt="" />
                <span>Управление пользователями</span>
              </Link>
            ) : null}
            {userContext.userHasAccess(["ROLE_ADMIN"]) ? (
              <Link
                to="/profile/login-history"
                className={`header__profile_item ${
                  props.location.pathname.includes("/profile/login-history")
                    ? "header__profile_item--active"
                    : ""
                }`}
                onClick={() => setShowProfileMenu(!showProfileMenu)}
              >
                <HistorySVG
                  className="header__img header__img--history"
                  alt=""
                />
                <span>История входов</span>
              </Link>
            ) : null}
            <Link
              to="/login"
              className="header__profile_item"
              onClick={() => setShowProfileMenu(!showProfileMenu)}
            >
              <img className="header__img" src={exitSVG} alt="" />
              <span>Выйти из профиля</span>
            </Link>
          </div>
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
