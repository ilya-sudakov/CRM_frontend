import { useState } from 'react';
import chevronDownIcon from 'Assets/tableview/chevron-down.svg';
import './ColorPicker.scss';

const ColorPicker = (props) => {
  const [showColorPicker, setShowColorPicker] = useState(false);

  const clickOnColorOption = (color) => {
    props.handleStatusChange(color, props.id);
    setShowColorPicker(false);
  };

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
          onClick={() => clickOnColorOption('completed')}
          className="select-product__color_option select-product__color_option--completed"
        >
          Завершено
        </div>
        <div
          onClick={() => clickOnColorOption('defect')}
          className="select-product__color_option select-product__color_option--defect"
        >
          Приоритет
        </div>
        <div
          onClick={() => clickOnColorOption('production')}
          className="select-product__color_option select-product__color_option--production"
        >
          В работе
        </div>
      </div>
    </div>
  );
};

export default ColorPicker;
