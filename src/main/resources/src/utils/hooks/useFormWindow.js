import React, { useEffect, useState } from "react";
import FormWindow from "../Form/FormWindow/FormWindow.jsx";

const useFormWindow = (
  windowTitle = "",
  content,
  updates = [],
  headerButton
) => {
  const [showWindow, setShowWindow] = useState(false);

  useEffect(() => {}, [...updates]);

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
