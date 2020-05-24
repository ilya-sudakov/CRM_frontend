import React, { useState } from 'react'
import chevronDownIcon from '../../../../../../../../../assets/tableview/chevron-down.svg'
import './ColorPicker.scss'
import {
  editStampColor,
  editStampPartColor,
} from '../../../../../utils/RequestsAPI/Rigging/Stamp.jsx'
import {
  editPressFormColor,
  editPressFormPartColor,
} from '../../../../../utils/RequestsAPI/Rigging/PressForm.jsx'
import {
  editMachineColor,
  editMachinePartColor,
} from '../../../../../utils/RequestsAPI/Rigging/Machine.jsx'
import {
  editPartColor,
  editPartPartColor,
} from '../../../../../utils/RequestsAPI/Rigging/Parts.jsx'

const ColorPicker = (props) => {
  const [showColorPicker, setShowColorPicker] = useState(false)

  const clickOnColorOption = (event) => {
    // const id = Number.parseInt(event.target.getAttribute("index"));
    const id = props.id
    const color = event.target.classList[1].split(
      'tableview__color_option--',
    )[1]
    const name = props.type.split('/')[0]
    const type = props.type.split('/')[1]
    const req = Object.assign({
      color: color,
    })
    switch (name) {
      case 'stamp':
        if (type === 'rigging') {
          editStampColor(req, id).then(() => props.loadData())
        } else {
          editStampPartColor(req, id).then(() => props.loadData())
        }
        break
      case 'press-form':
        type === 'rigging'
          ? editPressFormColor(req, id).then(() => props.loadData())
          : editPressFormPartColor(req, id).then(() => props.loadData())
        break
      case 'machine':
        type === 'rigging'
          ? editMachineColor(req, id).then(() => props.loadData())
          : editMachinePartColor(req, id).then(() => props.loadData())
        break
      case 'parts':
        type === 'rigging'
          ? editPartColor(req, id).then(() => props.loadData())
          : editPartPartColor(req, id).then(() => props.loadData())
        break
    }
    // console.log(req, id, type === 'part');
    // clickOnColorPickerOverlay(event); //Hide options
  }

  return (
    <div className="tableview__color">
      <div
        className={
          showColorPicker
            ? 'tableview__color_overlay'
            : 'tableview__color_overlay tableview__color_overlay--hidden'
        }
        onClick={() => setShowColorPicker(false)}
      ></div>
      <div
        className="tableview__color_name"
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
            ? 'tableview__color_picker'
            : 'tableview__color_picker tableview__color_picker--hidden'
        }
      >
        <div
          onClick={clickOnColorOption}
          className="tableview__color_option tableview__color_option--completed"
        >
          Завершено
        </div>
        <div
          onClick={clickOnColorOption}
          className="tableview__color_option tableview__color_option--defect"
        >
          Приоритет
        </div>
        <div
          onClick={clickOnColorOption}
          className="tableview__color_option tableview__color_option--production"
        >
          В работе
        </div>
      </div>
    </div>
  )
}

export default ColorPicker
