import { useEffect, useState } from 'react';
import FormWindow from '../Form/FormWindow/FormWindow.jsx';

const useFormWindow = (
  windowTitle = '',
  content,
  updates = [],
  headerButton,
) => {
  const [showWindow, setShowWindow] = useState(false);

  useEffect(() => {}, [...updates, showWindow]);

  const toggleFormWindow = () => setShowWindow(!showWindow);

  const formWindow = (
    <FormWindow
      title={windowTitle}
      content={content}
      showWindow={showWindow}
      headerButton={headerButton}
      setShowWindow={setShowWindow}
    />
  );

  return { toggleFormWindow, formWindow, showWindow, setShowWindow };
};

export default useFormWindow;
