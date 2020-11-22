import React from 'react'
import PropTypes from 'prop-types'
import './Widget.scss'

const Widget = ({ title }) => {
  return <div className="widget">Виджет {title}</div>
}

export default Widget

Widget.proptypes = {
  title: PropTypes.string,
}
