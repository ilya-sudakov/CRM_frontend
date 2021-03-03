import React, { useEffect, useState } from "react";
import "./NewStorage.scss";
import "../../../../../utils/Form/Form.scss";
import InputText from "../../../../../utils/Form/InputText/InputText.jsx";
import { createStorage } from "../../../../../utils/RequestsAPI/Workshop/storage.js";
import Button from "../../../../../utils/Form/Button/Button.jsx";
import { workshops } from "../../workshopVariables.js";
import useForm from "../../../../../utils/hooks/useForm";
import { workshopStorageDefaultInputs } from "../../objects";

const NewPart = (props) => {
  const {
    handleInputChange,
    formInputs,
    formErrors,
    setFormErrors,
    formIsValid,
    errorWindow,
  } = useForm(workshopStorageDefaultInputs);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = () => {
    if (!formIsValid()) return;
    setIsLoading(true);
    createStorage(props.type, formInputs)
      .then(() => props.history.push(workshops[props.type].storageRedirectURL))
      .catch((error) => {
        setIsLoading(false);
        alert("Ошибка при добавлении записи");
        console.log(error);
      });
  };

  useEffect(() => {
    document.title = "Добавление детали на склад";
  }, []);

  return (
    <div className="main-form">
      <form className="main-form__form">
        <div className="main-form__header main-form__header--full">
          <div className="main-form__title">Новая деталь</div>
        </div>
        {errorWindow}
        <InputText
          inputName="Название"
          required
          error={formErrors.name}
          name="name"
          handleInputChange={({ target }) =>
            handleInputChange("name", target.value)
          }
          errorsArr={formErrors}
          setErrorsArr={setFormErrors}
        />
        <InputText
          inputName="Номер"
          required
          error={formErrors.number}
          name="number"
          type="number"
          handleInputChange={({ target }) =>
            handleInputChange("number", target.value)
          }
          errorsArr={formErrors}
          setErrorsArr={setFormErrors}
        />
        <InputText
          inputName="Количество"
          required
          error={formErrors.quantity}
          name="quantity"
          handleInputChange={({ target }) =>
            handleInputChange("quantity", target.value)
          }
          errorsArr={formErrors}
          setErrorsArr={setFormErrors}
        />
        <InputText
          inputName="Комментарий"
          required
          error={formErrors.comment}
          name="comment"
          handleInputChange={({ target }) =>
            handleInputChange("comment", target.value)
          }
          errorsArr={formErrors}
          setErrorsArr={setFormErrors}
        />
        <div className="main-form__input_hint">
          * - поля, обязательные для заполнения
        </div>
        <div className="main-form__buttons main-form__buttons--full">
          <Button
            className="main-form__submit main-form__submit--inverted"
            inverted
            onClick={() =>
              props.history.push(workshops[props.type].storageRedirectURL)
            }
            text="Вернуться назад"
          />
          <Button
            text="Добавить запись"
            isLoading={isLoading}
            className="main-form__submit"
            onClick={handleSubmit}
          />
        </div>
      </form>
    </div>
  );
};

export default NewPart;
