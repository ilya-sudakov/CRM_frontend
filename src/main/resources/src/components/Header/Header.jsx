import React, { useState, useEffect, useContext } from 'react'
import profileSVG from '../../../../../../assets/header/profile1.svg'
import exitSVG from '../../../../../../assets/header/exit.svg'
import employeeSVG from '../../../../../../assets/header/employee.svg'
import newLogoSVG from '../../../../../../assets/header/header__new_logo.png'
import mobileLogoSVG from '../../../../../../assets/header/header__mobile_logo.png'
import notificationBellSVG from '../../../../../../assets/notifications/notification_bell.svg'
import { Link, withRouter } from 'react-router-dom'
import './Header.scss'
import UserContext from '../../App.js'
import PropTypes from 'prop-types'

const Header = (props) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const userContext = useContext(UserContext)

  const sideMenuClickDesktop = () =>
    props.setSidemenuHidden(!props.sidemenuHidden)

  useEffect(() => {}, [])

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
              ? 'header__item header__item--notification'
              : 'header__item header__item--notification header__item--notification-empty'
          }
          data-notifications={userContext.newNotifications}
          // to="/notifications"
          to="/"
          onClick={() => {
            userContext.setLastNotification({
              ...userContext.lastNotification,
              visible: false,
            })
          }}
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
          onClick={
            userContext.userHasAccess(['ROLE_ADMIN'])
              ? () => setShowProfileMenu(!showProfileMenu)
              : null
          }
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
            <img className="header__userimg" src={profileSVG} alt="" />
          </div>
          {userContext.userHasAccess(['ROLE_ADMIN']) && (
            <div
              className={
                showProfileMenu
                  ? 'header__profile_menu'
                  : 'header__profile_menu header__profile_menu--hidden'
              }
            >
              <Link
                to="/profile/users"
                className={`header__profile_item ${
                  props.location.pathname.includes('/profile/users')
                    ? 'header__profile_item--active'
                    : ''
                }`}
                onClick={() => setShowProfileMenu(!showProfileMenu)}
              >
                <img className="header__img" src={employeeSVG} alt="" />
                <span>Управление пользователями</span>
              </Link>
              <Link
                to="/profile/login-history"
                className={`header__profile_item ${
                  props.location.pathname.includes('/profile/login-history')
                    ? 'header__profile_item--active'
                    : ''
                }`}
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

export default withRouter(Header)

Header.propTypes = {
  sidemenuHidden: PropTypes.bool,
  setSidemenuHidden: PropTypes.func,
  location: PropTypes.object,
}
