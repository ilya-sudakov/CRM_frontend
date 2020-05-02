import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './FormWindow.scss'

const FormWindow = (props) => {
  useEffect(() => {
    // console.log(props.showWindow);
  }, [props.showWindow, props.setShowWindow])

  const clickOnSelectWindow = (e) => {
    e.preventDefault()
    // let productsWindow = document.getElementsByClassName(
    //   props.windowName ? 'form-window-' + props.windowName : 'form-window',
    // )[props.id ? props.id : 0]
    // if (
    //   !(e.target.classList[0] === 'form-window') &&
    //   !e.target.classList.contains('form-window__exit') &&
    //   !e.target.classList.contains('form-window__bar')
    // ) {
    //   productsWindow.classList.remove('form-window--hidden')
    //   props.setShowWindow(true)
    // } else {
    //   productsWindow.classList.add('form-window--hidden')
    //   props.setShowWindow(false)
    // }
    if (
      !(e.target.classList[0] === 'form-window') &&
      !e.target.classList.contains('form-window__exit') &&
      !e.target.classList.contains('form-window__bar')
    ) {
      props.setShowWindow(true)
    } else {
      props.setShowWindow(false)
    }
  }

  return (
    <div
      // className={
      //   props.showWindow
      //     ? props.windowName
      //       ? 'form-window form-window-' + props.windowName
      //       : 'form-window'
      //     : props.windowName
      //     ? 'form-window-' +
      //       props.windowName +
      //       ' form-window form-window--hidden'
      //     : 'form-window form-window--hidden'
      // }
      className={
        props.showWindow ? 'form-window' : 'form-window form-window--hidden'
      }
      onClick={clickOnSelectWindow}
    >
      <div className="form-window__content">
        <div className="form-window__title">
          {props.title}
          {props.headerButton && (
            <Link to={props.headerButton.path} className="form-window__button">
              {props.headerButton.name}
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
        {props.content}
      </div>
    </div>
  )
}

export default FormWindow
