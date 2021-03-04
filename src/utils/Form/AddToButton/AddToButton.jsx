import React from 'react';
import PropTypes from 'prop-types';
import PlusSVG from '../../../../assets/sidemenu/plus.inline.svg';
import './AddToButton.scss';

const AddToButton = ({ text = 'Добавить', onClick }) => {
  return (
    <div className="add-to-button">
      <div
        className="add-to-button__link"
        onClick={(event) => {
          event.preventDefault();
          onClick();
        }}
      >
        {text}
        <PlusSVG className="add-to-button__img add-to-button__img--plus" />
      </div>
    </div>
  );
};

export default AddToButton;

AddToButton.propTypes = {
  onClick: PropTypes.func,
};
