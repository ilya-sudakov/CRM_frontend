import React, { useState } from 'react'
import chevronDownIcon from '../../../../../../../assets/tableview/chevron-down.svg'
import './ColorPicker.scss'
import {
  editStampColor,
  editStampPartColor,
} from '../../../../../../utils/RequestsAPI/Rigging/Stamp.jsx'

import { rigStatuses } from '../rigsVariables.js'

const ColorPicker = (props) => {
  const [showColorPicker, setShowColorPicker] = useState(false)

  const clickOnColorOption = (event) => {
    const id = props.id
    const color = event.target.classList[1].split('color-picker_option--')[1]
    const name = props.type.split('/')[0]
    const type = props.type.split('/')[1]
    const req = Object.assign({
      color: color,
    })
    if (type === 'rigging') {
      editStampColor(req, id).then(() => props.loadData())
    } else {
      editStampPartColor(req, id).then(() => props.loadData())
    }
    setShowColorPicker(false)
    // console.log(req, id, type === 'part');
    // clickOnColorPickerOverlay(event); //Hide options
  }

  return (
    <div className="color-picker">
      <div
        className={
          showColorPicker
            ? 'color-picker_overlay'
            : 'color-picker_overlay color-picker_overlay--hidden'
        }
        onClick={() => setShowColorPicker(false)}
      ></div>
      <div
        className="color-picker_name"
        onClick={(event) => {
          //   clickOnColorPicker(event)
          setShowColorPicker(!showColorPicker)
        }}
      >
        {props.defaultName}
        <img className="tableview__img" src={chevronDownIcon} />
      </div>
      <div
        className={
          showColorPicker
            ? 'color-picker_picker'
            : 'color-picker_picker color-picker_picker--hidden'
        }
      >
        {Object.values(rigStatuses).map((status) => (
          <div
            onClick={clickOnColorOption}
            className={`color-picker_option color-picker_option--${status.className}`}
          >
            {status.name}
          </div>
        ))}
      </div>
    </div>
  )
}

export default ColorPicker
