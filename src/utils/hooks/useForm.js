import React, { useEffect, useState } from "react";
import ErrorMessage from "../Form/ErrorMessage/ErrorMessage.jsx";

const useForm = (defaultInputs = []) => {
  const [formInputs, setFormInputs] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const [validInputs, setValidInputs] = useState({});
  const [showError, setShowError] = useState(false);

  const validateField = (fieldName, value) => {
    const type = typeof value;
    let isValid = true;
    switch (type) {
      case "date":
        value === null && (isValid = false);
        break;
      case "number":
        value === 0 && (isValid = false);
        break;
      case "string":
        value === "" && (isValid = false);
        break;
      case "array":
        value.length === 0 && (isValid = false);
        break;
      case "object":
        value.length === null && (isValid = false);
        break;
      default:
        !value && (isValid = false);
        break;
    }
    setValidInputs({ ...validInputs, [fieldName]: isValid });
  };

  const handleInputChange = (name, value) => {
    validateField(name, value);
    setFormInputs((formInputs) => ({
      ...formInputs,
      [name]: value,
    }));
    setFormErrors({
      ...formErrors,
      [name]: false,
    });
  };

  const formIsValid = () => { 
    let check = true;
    let newErrors = {};
    for (let item in formErrors) {
      newErrors = {
        ...newErrors,
        [item]: false,
      };
    }
    for (let item in validInputs) {
      if (validInputs[item] === false) {
        check = false;
        newErrors[item] = true;
      }
    }
    console.log(formErrors, validInputs, check);
    !check && setShowError(true);
    setFormErrors({ ...newErrors });
    return check;
  };

  useEffect(() => {}, [formErrors, formInputs, validInputs]);

  useEffect(() => {
    let newInputs = {};
    let newErrrors = {};
    let newValidInputs = {};
    defaultInputs.map((input) => {
      newInputs = { ...newInputs, [input.name]: input.defaultValue };
      if (input.isRequired) {
        newErrrors = { ...newErrrors, [input.name]: false };
        newValidInputs = {
          ...newValidInputs,
          [input.name]: input.isValid ?? false,
        };
      }
    });
    setFormInputs({ ...newInputs });
    setFormErrors({ ...newErrrors });
    setValidInputs({ ...newValidInputs });
  }, []);

  const errorWindow = (
    <ErrorMessage
      message="Не заполнены все обязательные поля!"
      showError={showError}
      setShowError={setShowError}
    />
  );

  const updateFormInputs = (inputs) => {
    let newInputs = {};
    let newErrrors = {};
    let newValidInputs = {};
    defaultInputs.map((input) => {
      newInputs = {
        ...newInputs,
        [input.name]: inputs[input.name],
      };
      if (input.isRequired) {
        newErrrors = { ...newErrrors, [input.name]: false };
        newValidInputs = {
          ...newValidInputs,
          [input.name]:
            inputs[input.name] !== undefined &&
            inputs[input.name] !== null &&
            inputs[input.name] !== "",
        };
      }
    });
    setFormInputs({ ...newInputs });
    setFormErrors({ ...newErrrors });
    setValidInputs({ ...newValidInputs });
  };

  return {
    formIsValid,
    formInputs,
    formErrors,
    setFormErrors,
    handleInputChange,
    errorWindow,
    updateFormInputs,
  };
};

export default useForm;
