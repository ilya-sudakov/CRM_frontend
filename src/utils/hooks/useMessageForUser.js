import React, { useEffect, useState } from 'react';
import MessageForUser from '../Form/MessageForUser/MessageForUser.jsx';

const useMessageForUser = (
  content = {
    title: 'Сообщение',
    message: '',
    onClick: () => {},
    buttonText: 'ОК',
  },
  updates = [],
) => {
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {}, [...updates, showMessage]);

  const messageForUser = (
    <MessageForUser
      message={content.message}
      onClick={content.onClick}
      title={content.title}
      buttonText={content.buttonText}
      showMessage={showMessage}
      setShowMessage={setShowMessage}
    />
  );

  return { messageForUser, showMessage, setShowMessage };
};

export default useMessageForUser;
