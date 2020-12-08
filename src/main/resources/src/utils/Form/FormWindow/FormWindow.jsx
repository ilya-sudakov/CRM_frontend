import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./FormWindow.scss";

const FormWindow = (props) => {
  useEffect(() => {
    // console.log(props.showWindow);
  }, [props.showWindow, props.setShowWindow]);

  const clickOnSelectWindow = (e) => {
    e.preventDefault();
    if (
      !(e.target.classList[0] === "form-window") &&
      !e.target.classList.contains("form-window__exit") &&
      !e.target.classList.contains("form-window__bar")
    ) {
      props.setShowWindow(true);
    } else {
      props.setShowWindow(false);
    }
  };

  return (
    <div
      className={
        props.showWindow ? "form-window" : "form-window form-window--hidden"
      }
      onClick={clickOnSelectWindow}
    >
      <div
        className={
          props.showWindow
            ? "form-window__content"
            : "form-window__content form-window__content--hidden"
        }
      >
        <div className="form-window__title">
          <span>{props.title}</span>
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
        <div className="form-window__body">
          <div className="main-window">{props.content}</div>
        </div>
      </div>
    </div>
  );
};

export default FormWindow;
