import React from 'react'
import './ViewRequests.scss'
import { formatDateString } from '../../../../utils/functions.jsx'

const ViewRequests = (props) => {
  return (
    <div className="view-requests">
      {props.requests.map((item, index) => (
        <div className="main-window__list-item" index={index}>
          {formatDateString(item.date)}
        </div>
      ))}
    </div>
  )
}

export default ViewRequests
