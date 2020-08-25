import React from 'react'
import './PageLoading.scss'

import logo from '../../../../../../../assets/header/header__mobile_logo.png'

const PageLoading = () => {
  return (
    <div className="page-loading">
      <div className="page-loading__wrapper">
        <img className="page-loading__img" src={logo} alt="" />
        <div className="page-loading__circle"></div>
      </div>
    </div>
  )
}

export default PageLoading
