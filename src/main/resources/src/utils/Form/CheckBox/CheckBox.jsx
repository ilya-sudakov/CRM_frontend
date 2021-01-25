import React from "react";
import PropTypes from "prop-types";
import "./CheckBox.scss";

const CheckBox = ({
  name = "",
  text = "",
  id,
  value,
  disabled = false,
  onChange,
  checked = false,
}) => {
  return (
    <div className="checkbox">
      <label className="checkbox__container">
        <span className="checkbox__text">{text}</span>
        <input
          type="checkbox"
          name={name}
          id={id}
          value={value}
          disabled={disabled}
          onChange={({ target }) => {
            const name = target.name;
            const value = target.checked;
            const id = target.id;
            onChange(value, name, id);
          }}
          checked={checked}
        />
        <div className="checkbox__checkmark"></div>
      </label>
    </div>
  );
};

export default CheckBox;

CheckBox.propTypes = {
  name: PropTypes.string,
  text: PropTypes.string,
  id: PropTypes.number,
  value: PropTypes.bool,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  checked: PropTypes.bool,
};
