import React from "react";
import PropTypes from "prop-types";
import ChevronSVG from "../../../../../../../assets/tableview/chevron-down.inline.svg";

const SelectFromButton = ({ text = "Выбрать", onClick }) => {
  return (
    <div
      className="main-form__link"
      onClick={(event) => {
        event.preventDefault();
        onClick();
      }}
    >
      {text}
      <ChevronSVG className="main-form__img main-form__img--more" />
    </div>
  );
};

export default SelectFromButton;

SelectFromButton.propTypes = {
  onClick: PropTypes.func,
};
