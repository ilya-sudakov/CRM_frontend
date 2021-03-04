import React, { useState, useEffect } from "react";
import "./NewPackaging.scss";
import "../../../../utils/Form/Form.scss";
import InputText from "../../../../utils/Form/InputText/InputText.jsx";
import Button from "../../../../utils/Form/Button/Button.jsx";
import { addPackaging } from "../../../../utils/RequestsAPI/Products/packaging.js";
import useForm from "../../../../utils/hooks/useForm";
import { packagingDefaultInputs } from "../objects";

const NewPackaging = (props) => {
  const {
    handleInputChange,
    formInputs,
    formErrors,
    setFormErrors,
    formIsValid,
    errorWindow,
  } = useForm(packagingDefaultInputs);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = () => {
    if (!formIsValid()) return;
    setIsLoading(true);
    console.log(formInputs);
    addPackaging(formInputs)
      .then(() => {})
      .then(() => props.history.push("/packaging"))
      .catch((error) => {
        setIsLoading(false);
        alert("Ошибка при добавлении записи");
      });
  };

  useEffect(() => {
    document.title = "Создание упаковки";
  }, []);

  return (
    <div className="new-packaging">
      <div className="main-form">
        <form className="main-form__form">
          <div className="main-form__header main-form__header--full">
            <div className="main-form__title">Создание упаковки</div>
          </div>
          {errorWindow}
          <InputText
            inputName="Наименование"
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
            inputName="Кол-во штук"
            required
            type="number"
            error={formErrors.quantity}
            name="quantity"
            handleInputChange={({ target }) =>
              handleInputChange("quantity", target.value)
            }
            errorsArr={formErrors}
            setErrorsArr={setFormErrors}
          />
          <InputText
            inputName="Размер"
            required
            error={formErrors.size}
            name="size"
            handleInputChange={({ target }) =>
              handleInputChange("size", target.value)
            }
            errorsArr={formErrors}
            setErrorsArr={setFormErrors}
          />
          <InputText
            inputName="Комментарий"
            name="comment"
            handleInputChange={({ target }) =>
              handleInputChange("comment", target.value)
            }
          />
          <div className="main-form__input_hint">
            * - поля, обязательные для заполнения
          </div>
          <div className="main-form__buttons main-form__buttons--full">
            <Button
              className="main-form__submit main-form__submit--inverted"
              inverted
              onClick={() => props.history.push("/packaging")}
              text="Вернуться назад"
            />
            <Button
              text="Добавить упаковку"
              isLoading={isLoading}
              className="main-form__submit"
              onClick={handleSubmit}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewPackaging;
