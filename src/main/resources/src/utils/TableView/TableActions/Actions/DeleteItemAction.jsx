import React, { useState } from "react";
import PropTypes from "prop-types";
import deleteSVG from "../../../../../../../../assets/tableview/delete.svg";
import MessageForUser from "../../../../utils/Form/MessageForUser/MessageForUser.jsx";

const DeleteItemAction = ({ onClick, title = "Удаление элемента", icon }) => {
  const [showMessage, setShowMessage] = useState(false);
  return (
    <>
      <MessageForUser
        showMessage={showMessage}
        setShowMessage={setShowMessage}
        message="Вы уверены что хотите удалить этот элемент?"
        onClick={() => {
          onClick();
          setShowMessage(false);
        }}
      />
      <div
        className="main-window__action"
        title={title}
        onClick={() => {
          setShowMessage(true);
        }}
      >
        <img className="main-window__img" src={icon ?? deleteSVG} />
      </div>
    </>
  );
};

export default DeleteItemAction;

DeleteItemAction.propTypes = {
  onClick: PropTypes.func.isRequired,
  title: PropTypes.string,
  icon: PropTypes.any,
};
