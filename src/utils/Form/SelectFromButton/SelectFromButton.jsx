import PropTypes from 'prop-types';
import ChevronSVG from 'Assets/tableview/chevron-down.inline.svg';
import './SelectFromButton.scss';

const SelectFromButton = ({ text = 'Выбрать', onClick }) => {
  return (
    <div className="select-from-button">
      <div
        className="select-from-button__link"
        onClick={(event) => {
          event.preventDefault();
          onClick();
        }}
      >
        {text}
        <ChevronSVG className="select-from-button__img select-from-button__img--more" />
      </div>
    </div>
  );
};

export default SelectFromButton;

SelectFromButton.propTypes = {
  onClick: PropTypes.func,
};
