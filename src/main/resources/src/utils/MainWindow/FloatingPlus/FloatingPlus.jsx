import React, { useContext } from 'react'
import './FloatingPlus.scss'
import plusIcon from '../../../../../../../assets/sidemenu/plus.svg'
import { Link } from 'react-router-dom'
import { UserContext } from '../../../App.js'

const FloatingPlus = (props) => {
  const userContext = useContext(UserContext)
  if (userContext.userHasAccess(props.visibility)) {
    return (
      <Link
        className="floating-plus"
        to={props.linkTo ? props.linkTo : '/'}
        title={props.title ? props.title : 'Создать'}
      >
        <img className="floating-plus__img" src={plusIcon} />
      </Link>
    )
  } else {
    return ''
  }
}

export default FloatingPlus
