import React, { useState } from "react";
import "./NewFeedback.scss";
import "../../../../utils/Form/Form.scss";
import InputText from "../../../../utils/Form/InputText/InputText.jsx";
import { addFeedback } from "../../../../utils/RequestsAPI/Feedback/feedback";
import Button from "../../../../utils/Form/Button/Button.jsx";
import useForm from "../../../../utils/hooks/useForm.js";

const NewFeedback = (props) => {
  const feedbackDefaultInputs = [
    {
      name: "date",
      defaultValue: new Date().getTime() / 1000,
    },
    {
      name: "subject",
      defaultValue: "",
      isRequired: true,
    },
    {
      name: "text",
      defaultValue: "",
      isRequired: true,
    },
    {
      name: "author",
      defaultValue: props.userData.username,
    },
    {
      name: "status",
      defaultValue: "in-progress",
    },
  ];
  const {
    handleInputChange,
    formInputs,
    formErrors,
    setFormErrors,
    formIsValid,
    errorWindow,
  } = useForm(feedbackDefaultInputs);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = () => {
    if (!formIsValid()) return;
    setIsLoading(true);
    console.log(formInputs);
    formIsValid() &&
      addFeedback(formInputs)
        .then(() => {
          props.history.push("/feedback");
          setIsLoading(false);
        })
        .catch((error) => {
          alert("Ошибка при создании записи!");
          console.log(error);
          setIsLoading(false);
        });
  };

  return (
    <div className="new-feedback">
      <div className="main-form">
        <form className="main-form__form">
          <div className="main-form__header main-form__header--full">
            <div className="main-form__title">Создание обсуждения</div>
          </div>
          {errorWindow}
          <InputText
            inputName="Тема"
            required
            name="subject"
            error={formErrors.subject}
            defaultValue={formInputs.subject}
            errorsArr={formErrors}
            setErrorsArr={setFormErrors}
            handleInputChange={({ target }) =>
              handleInputChange("subject", target.value)
            }
          />
          <InputText
            inputName="Сообщение"
            required
            name="text"
            type="textarea"
            error={formErrors.text}
            defaultValue={formInputs.text}
            errorsArr={formErrors}
            setErrorsArr={setFormErrors}
            handleInputChange={({ target }) =>
              handleInputChange("text", target.value)
            }
          />
          <div className="main-form__input_hint">
            * - поля, обязательные для заполнения
          </div>
          <div className="main-form__buttons main-form__buttons--full">
            <input
              className="main-form__submit main-form__submit--inverted"
              type="submit"
              onClick={() => props.history.push("/feedback")}
              value="Вернуться назад"
            />
            <Button
              text="Добавить обсуждение"
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

export default NewFeedback;
