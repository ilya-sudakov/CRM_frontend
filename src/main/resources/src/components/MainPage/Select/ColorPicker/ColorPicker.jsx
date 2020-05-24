import React, { useState } from 'react'
import chevronDownIcon from '../../../../../../../../assets/tableview/chevron-down.svg'
import './ColorPicker.scss'

const ColorPicker = (props) => {
  const [showColorPicker, setShowColorPicker] = useState(false)

  const clickOnColorOption = (event) => {
    // const id = Number.parseInt(event.target.getAttribute("index"));
    const id = props.id
    const color = event.target.classList[1].split(
      'select-product__color_option--',
    )[1]
    const req = Object.assign({
      color: color,
    })
    // console.log(color, id);
    props.handleStatusChange(color, id)
    setShowColorPicker(false)
  }

  return (
    <div className="select-product__color">
      <div
        className={
          showColorPicker
            ? 'select-product__color_overlay'
            : 'select-product__color_overlay select-product__color_overlay--hidden'
        }
        onClick={() => setShowColorPicker(!showColorPicker)}
      ></div>
      <div
        className="select-product__color_name"
        onClick={() => setShowColorPicker(!showColorPicker)}
      >
        {props.defaultName}
        <img className="tableview__img" src={chevronDownIcon} />
      </div>
      <div
        className={
          showColorPicker
            ? 'select-product__color_picker'
            : 'select-product__color_picker select-product__color_picker--hidden'
        }
      >
        <div
          onClick={clickOnColorOption}
          className="select-product__color_option select-product__color_option--completed"
        >
          Завершено
        </div>
        <div
          onClick={clickOnColorOption}
          className="select-product__color_option select-product__color_option--defect"
        >
          Брак
        </div>
        <div
          onClick={clickOnColorOption}
          className="select-product__color_option select-product__color_option--production"
        >
          В работе
        </div>
      </div>
    </div>
  )
}

export default ColorPicker
