import React, { useState } from "react";
import FormWindow from "../Form/FormWindow/FormWindow.jsx";

const useFormWindow = (windowTitle = "", content, headerButton) => {
  const [showWindow, setShowWindow] = useState(false);

  const formWindow = (
    <FormWindow
      title={windowTitle}
      content={content}
      showWindow={showWindow}
      headerButton={headerButton}
      setShowWindow={setShowWindow}
    />
  );

  return { formWindow, showWindow, setShowWindow };
};

export default useFormWindow;
