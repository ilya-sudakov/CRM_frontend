import React, { useEffect } from 'react'
import './InputProducts.scss'
import Select from '../../../components/MainPage/Select/Select.jsx'

const InputProducts = (props) => {
  useEffect(() => {}, [props.products])
  return (
    <div className="input_products">
      <div className="input_products__input">
        <div className="input_products__input_name">
          {props.inputName + (props.required ? '*' : '')}
        </div>
        <Select {...props} numberInput />
      </div>
    </div>
  )
}

export default InputProducts
