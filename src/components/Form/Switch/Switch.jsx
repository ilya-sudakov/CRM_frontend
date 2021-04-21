import PropTypes from 'prop-types';
import './Switch.scss';

const Switch = ({ checked, handleChange, text, styles = {} }) => {
  return (
    <div className="switch" style={{ ...styles }}>
      <label className="switch__container">
        <input
          type="checkbox"
          checked={checked}
          onChange={({ target }) => handleChange(target.checked)}
        />
        <span className="slider round"></span>
      </label>
      <span className="switch__text">{text}</span>
    </div>
  );
};

export default Switch;

Switch.propTypes = {
  checked: PropTypes.bool,
  handleChange: PropTypes.func,
  text: PropTypes.string,
  styles: PropTypes.object,
};
