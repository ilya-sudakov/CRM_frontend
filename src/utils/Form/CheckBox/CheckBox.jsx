import PropTypes from 'prop-types';
import { useEffect } from 'react';
import './CheckBox.scss';

const CheckBox = ({
  name = '',
  text = '',
  id,
  value,
  disabled = false,
  onChange,
  checked = false,
}) => {
  const handleChange = ({ target }) => {
    const name = target.name;
    const value = target.checked;
    const id = target.id;
    onChange(value, name, id);
  };

  return (
    <div className="checkbox">
      <label className="checkbox__container">
        <input
          type="checkbox"
          name={name}
          id={id}
          value={value}
          disabled={disabled}
          onChange={handleChange}
          checked={checked}
        />
        <div className="checkbox__checkmark"></div>
        <span className="checkbox__text">{text}</span>
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
