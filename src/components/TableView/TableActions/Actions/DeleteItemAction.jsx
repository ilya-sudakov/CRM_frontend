import { useState } from 'react';
import PropTypes from 'prop-types';
import DeleteSVG from 'Assets/tableview/delete.inline.svg';
import MessageForUser from 'Components/Form/MessageForUser/MessageForUser.jsx';

const DeleteItemAction = ({ onClick, title = 'Удаление элемента' }) => {
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
          event.stopPropagation();
          setShowMessage(true);
        }}
      >
        <DeleteSVG
          width={20}
          height={20}
          viewBox="0 0 24 24"
          className="main-window__img"
        />
      </div>
    </>
  );
};

export default DeleteItemAction;

DeleteItemAction.propTypes = {
  onClick: PropTypes.func.isRequired,
  title: PropTypes.string,
};
