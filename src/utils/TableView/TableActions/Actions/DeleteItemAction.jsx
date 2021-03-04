import { useState } from 'react';
import PropTypes from 'prop-types';
import deleteSVG from 'Assets/tableview/delete.svg';
import MessageForUser from 'Utils/Form/MessageForUser/MessageForUser.jsx';

const DeleteItemAction = ({ onClick, title = 'Удаление элемента', icon }) => {
  const [showMessage, setShowMessage] = useState(false);
  return (
    <>
      <MessageForUser
        showMessage={showMessage}
        setShowMessage={setShowMessage}
        title="Подтверждение удаления"
        message="Вы уверены что хотите удалить этот элемент?"
        onClick={() => {
          onClick();
          setShowMessage(false);
        }}
      />
      <div
        className="main-window__action"
        title={title}
        onClick={(event) => {
          event.preventDefault();
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
