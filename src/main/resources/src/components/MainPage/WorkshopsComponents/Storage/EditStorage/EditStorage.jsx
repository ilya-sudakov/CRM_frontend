import React, { useEffect, useState } from "react";
import "./EditStorage.scss";
import "../../../../../utils/Form/Form.scss";
import InputText from "../../../../../utils/Form/InputText/InputText.jsx";
import ErrorMessage from "../../../../../utils/Form/ErrorMessage/ErrorMessage.jsx";
import {
  updateStorage,
  getStorageById,
} from "../../../../../utils/RequestsAPI/Workshop/storage.js";
import Button from "../../../../../utils/Form/Button/Button.jsx";
import { workshops } from "../../workshopVariables.js";

const EditPart = (props) => {
  const [storageInputs, setStorageInputs] = useState({
    number: "",
    name: "",
    quantity: "",
    comment: "",
  });
  const [storageId, setStorageId] = useState(1);

  const [storageErrors, setStorageErrors] = useState({
    number: false,
    name: false,
    quantity: false,
    comment: false,
  });
  const [validInputs, setValidInputs] = useState({
    number: true,
    name: true,
    quantity: true,
    comment: true,
  });
  const [showError, setShowError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const validateField = (fieldName, value) => {
    switch (fieldName) {
      default:
        if (validInputs[fieldName] !== undefined) {
          setValidInputs({
            ...validInputs,
            [fieldName]: value !== "",
          });
        }
        break;
    }
  };

  const formIsValid = () => {
    let check = true;
    let newErrors = Object.assign({
      number: false,
      name: false,
      quantity: false,
      comment: false,
    });
    for (let item in validInputs) {
      // console.log(item, validInputs[item]);
      if (validInputs[item] === false) {
        check = false;
        newErrors = Object.assign({
          ...newErrors,
          [item]: true,
        });
      }
    }
    setStorageErrors(newErrors);
    if (check === true) {
      return true;
    } else {
      // alert("Форма не заполнена");
      setIsLoading(false);
      setShowError(true);
      return false;
    }
  };

  const handleSubmit = () => {
    setIsLoading(true);
    formIsValid() &&
      updateStorage(props.type, storageInputs, storageId)
        .then(() =>
          props.history.push(workshops[props.type].storageRedirectURL)
        )
        .catch((error) => {
          setIsLoading(false);
          alert("Ошибка при добавлении записи");
          console.log(error);
        });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    validateField(name, value);
    setStorageInputs({
      ...storageInputs,
      [name]: value,
    });
    setStorageErrors({
      ...storageErrors,
      [name]: false,
    });
  };

  useEffect(() => {
    document.title = "Редактирование детали";
    const id = props.history.location.pathname.split(
      `${workshops[props.type].storageRedirectURL}/edit/`
    )[1];
    if (isNaN(Number.parseInt(id))) {
      alert("Неправильный индекс детали!");
      props.history.push(workshops[props.type].storageRedirectURL);
    } else {
      setStorageId(id);
      getStorageById(props.type, id)
        .then(({ data }) => {
          setStorageInputs({
            name: data.name,
            number: data.number,
            quantity: data.quantity,
            comment: data.comment,
          });
        })
        .catch((error) => {
          console.log(error);
          alert("Неправильный индекс детали!");
          props.history.push(workshops[props.type].storageRedirectURL);
        });
    }
  }, []);
  return (
    <div className="main-form">
      <form className="main-form__form">
        <div className="main-form__header main-form__header--full">
          <div className="main-form__title">Редактирование детали</div>
        </div>
        <ErrorMessage
          message="Не заполнены все обязательные поля!"
          showError={showError}
          setShowError={setShowError}
        />
        <InputText
          inputName="Название"
          required
          error={storageErrors.name}
          name="name"
          defaultValue={storageInputs.name}
          handleInputChange={handleInputChange}
          errorsArr={storageErrors}
          setErrorsArr={setStorageErrors}
        />
        <InputText
          inputName="Номер"
          required
          error={storageErrors.number}
          name="number"
          type="number"
          defaultValue={storageInputs.number}
          handleInputChange={handleInputChange}
          errorsArr={storageErrors}
          setErrorsArr={setStorageErrors}
        />
        <InputText
          inputName="Кол-во"
          required
          error={storageErrors.quantity}
          name="quantity"
          defaultValue={storageInputs.quantity}
          handleInputChange={handleInputChange}
          errorsArr={storageErrors}
          setErrorsArr={setStorageErrors}
        />
        <InputText
          inputName="Комментарий"
          required
          error={storageErrors.comment}
          name="comment"
          defaultValue={storageInputs.comment}
          handleInputChange={handleInputChange}
          errorsArr={storageErrors}
          setErrorsArr={setStorageErrors}
        />
        <div className="main-form__input_hint">
          * - поля, обязательные для заполнения
        </div>
        <div className="main-form__buttons main-form__buttons--full">
          <input
            className="main-form__submit main-form__submit--inverted"
            type="submit"
            onClick={() =>
              props.history.push(workshops[props.type].storageRedirectURL)
            }
            value="Вернуться назад"
          />
          <Button
            text="Редактировать запись"
            isLoading={isLoading}
            className="main-form__submit"
            onClick={handleSubmit}
          />
        </div>
      </form>
    </div>
  );
};

export default EditPart;
