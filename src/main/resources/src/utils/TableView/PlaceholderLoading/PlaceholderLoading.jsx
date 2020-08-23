import React, { useEffect, useState } from 'react'
import './PlaceholderLoading.scss'

const PlaceholderLoading = (props) => {
  const [elements, setElements] = useState([])
  useEffect(() => {
    let temp = []
    const count = props.items || 3
    for (let i = 1; i <= count; i++) {
      temp.push(
        <div
          className={`placeholder-loading__item ${props.itemClassName}`}
          style={{ minHeight: `${props.minHeight || '1.5rem'}` }}
        ></div>,
      )
    }
    setElements([...temp])
  }, [])
  return (
    <div className={`placeholder-loading ${props.wrapperClassName}`}>
      {elements.map((item) => item)}
    </div>
  )
}

export default PlaceholderLoading
