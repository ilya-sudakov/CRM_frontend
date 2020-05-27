import React, { useState, useEffect } from 'react'
import profileSVG from '../../../../../../assets/header/profile1.svg'
import exitSVG from '../../../../../../assets/header/exit.svg'
import employeeSVG from '../../../../../../assets/header/employee.svg'
// import logoSVG from '../../../../../../assets/header/logo.png'
import newLogoSVG from '../../../../../../assets/header/header__new_logo.png'
import notificationBellSVG from '../../../../../../assets/notifications/notification_bell.svg'
import { Link } from 'react-router-dom'
import './Header.scss'

const Header = (props) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const [newNotifications, setNewNotifications] = useState(0)

  const sideMenuClickDesktop = () => {
    props.setSideMenu(!props.sideMenu)
  }

  return (
    <div className="header">
      <div
        className={
          showProfileMenu
            ? 'main_page__overlay'
            : 'main_page__overlay main_page__overlay--hidden'
        }
        onClick={() => setShowProfileMenu(!showProfileMenu)}
      ></div>
      <div className="header__company">
        <div className="header__sidemenu" onClick={sideMenuClickDesktop}>
          <div className="linesWrapper">
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
          </div>
        </div>
        <Link className="header__link" to="/">
          <img className="header__logo" src={newLogoSVG} alt="" />
        </Link>
        {/* <div className="header__name">
                    Ц.Р.М.
                </div> */}
      </div>
      <div className="header__menu">
        <Link
          className={
            newNotifications > 0
              ? 'header__item header__item--notification'
              : 'header__item header__item--notification header__item--notification-empty'
          }
          data-notifications={newNotifications}
          // to="/notifications"
          to="/"
        >
          <img className="header__img" src={notificationBellSVG} alt="" />
        </Link>
        <div
          className="header__item header__item--user"
          onClick={
            props.userHasAccess(['ROLE_ADMIN'])
              ? () => setShowProfileMenu(!showProfileMenu)
              : null
          }
        >
          <div className="header__profile_data">
            <div className="header__username">{props.userData.username}</div>
            <img className="header__userimg" src={profileSVG} alt="" />
          </div>
          {props.userHasAccess(['ROLE_ADMIN']) && (
            <div
              className={
                showProfileMenu
                  ? 'header__profile_menu'
                  : 'header__profile_menu header__profile_menu--hidden'
              }
            >
              <Link
                to="/profile/users"
                className="header__profile_item"
                onClick={() => setShowProfileMenu(!showProfileMenu)}
              >
                <img className="header__img" src={employeeSVG} alt="" />
                <span>Управление пользователями</span>
              </Link>
              <Link
                to="/profile/login-history"
                className="header__profile_item"
                onClick={() => setShowProfileMenu(!showProfileMenu)}
              >
                <img className="header__img" src={exitSVG} alt="" />
                <span>История входов</span>
              </Link>
            </div>
          )}
        </div>
        <Link className="header__item" to="/login">
          <img className="header__img" src={exitSVG} alt="" />
        </Link>
      </div>
    </div>
  )
}

export default Header
