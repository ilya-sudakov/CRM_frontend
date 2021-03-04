import React from 'react';
import deleteSVG from '../../../../assets/select/delete.svg';
import ColorPicker from './ColorPicker/ColorPicker.jsx';

const defaultPropsForLayoutFunctions = {
  numberInput: 'text',
  readOnly: false,
  workshop: false,
  handleParamChange: () => {},
  clickOnSelected: () => {},
  handleStatusChange: () => {},
};

export const renderQuantity = (
  index,
  item,
  props = defaultPropsForLayoutFunctions,
  options = {
    customName: `Кол-во (шт.)${!props.readOnly ? '*' : ''}`,
    readOnly: false,
  },
) => {
  return (
    <div className="select__selected_quantity">
      <span>{options.customName}</span>
      <input
        quantity_id={index}
        type="number"
        name="quantity"
        autoComplete="off"
        defaultValue={item.quantity != 0 ? item.quantity : 0}
        value={item.quantity}
        onChange={props.handleParamChange}
        disabled={props.readOnly || props.workshop || options.readOnly}
      />
    </div>
  );
};

export const renderNewQuantity = (
  index,
  item,
  props = defaultPropsForLayoutFunctions,
  options = {
    customName: `Отгружено (шт.)${!props.readOnly ? '*' : ''}`,
    readOnly: false,
  },
) => {
  return (
    <div className="select__selected_quantity">
      <span>{options.customName}</span>
      <input
        quantityNew_id={index}
        type="number"
        name="quantityNew"
        autoComplete="off"
        defaultValue={0}
        value={item.quantityNew}
        onChange={props.handleParamChange}
        disabled={options.readOnly}
      />
    </div>
  );
};

export const renderPackaging = (
  index,
  item,
  props = defaultPropsForLayoutFunctions,
  options = {
    customName: `Фасовка${!props.readOnly ? '*' : ''}`,
    readOnly: false,
    marginRight: '0px',
  },
) => {
  return (
    <div
      className="select__selected_packaging"
      style={{ marginRight: options.marginRight }}
    >
      <span>{options.customName}</span>
      <input
        packaging_id={index}
        type="text"
        name="packaging"
        autoComplete="off"
        defaultValue={item.packaging}
        value={item.packaging}
        onChange={props.handleParamChange}
        disabled={options.readOnly || props.workshop}
      />
    </div>
  );
};

export const renderSelectPackaging = (
  index,
  item,
  props = defaultPropsForLayoutFunctions,
  products,
) => {
  return (
    <select
      onChange={props.handleParamChange}
      packaging_id={index}
      name="packaging"
      defaultValue={item.packaging}
      value={item.packaging}
      disabled={props.readOnly || props.workshop}
    >
      {products
        .find((product) => product.id === Number.parseInt(item.productId))
        ?.packings?.map((packagingItem) => (
          <option value={packagingItem.id}>{packagingItem.name}</option>
        ))}
    </select>
  );
};

export const renderSelectedItemName = (
  index,
  item,
  props = defaultPropsForLayoutFunctions,
  options = {
    readOnly: false,
    showColorPicker: true,
    showDelete: true,
  },
) => {
  return (
    <div
      className={
        'select__selected_item select__selected_item--' +
        (item.status ? item.status : 'production')
      }
    >
      {!props.readOnly && options.showColorPicker ? (
        <ColorPicker
          defaultName={item.name}
          id={item.id}
          handleStatusChange={props.handleStatusChange}
        />
      ) : (
        <div className="select__selected_name">{item.name}</div>
      )}
      <img
        id={index}
        className="select__img"
        src={deleteSVG}
        alt=""
        onClick={props.clickOnSelected}
      />
    </div>
  );
};
