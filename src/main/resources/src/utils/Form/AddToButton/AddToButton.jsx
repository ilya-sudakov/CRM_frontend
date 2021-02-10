import React from "react";
import PropTypes from "prop-types";
import PlusSVG from "../../../../../../../assets/sidemenu/plus.inline.svg";

const AddToButton = ({ text = "Добавить", onClick }) => {
  return (
    <div
      className="main-form__link"
      onClick={(event) => {
        event.preventDefault();
        onClick();
      }}
    >
      {text}
      <PlusSVG className="main-form__img main-form__img--plus" />
    </div>
  );
};

export default AddToButton;

AddToButton.propTypes = {
  onClick: PropTypes.func,
};
