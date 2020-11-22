import React from 'react'
import PropTypes from 'prop-types'
import openWidget from '../../../../../../../../assets/tableview/bx-window-open.svg'
import './Widget.scss'
import Button from '../../../../utils/Form/Button/Button.jsx'
import { withRouter } from 'react-router-dom'

const Widget = ({ title, className, content, history, linkTo, subTitle }) => {
  return (
    <div className={`widget ${className ?? ''}`}>
      <div className="widget__title">
        <div className="widget__sub-title">{subTitle}</div>
        <span>{title}</span>
        {linkTo ? (
          <Button
            className="main-window__button main-window__button--inverted"
            inverted
            imgSrc={openWidget}
            onClick={() => {
              history.push(linkTo.address)
            }}
          >
            {linkTo.text}
          </Button>
        ) : null}
      </div>
      <div className="widget__content">{content}</div>
    </div>
  )
}

export default withRouter(Widget)

Widget.proptypes = {
  title: PropTypes.string,
  className: PropTypes.string,
  linkTo: PropTypes.object,
  subTitle: PropTypes.string,
}
