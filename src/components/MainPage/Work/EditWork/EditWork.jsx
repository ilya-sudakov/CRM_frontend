import React, { useEffect, useState } from "react";
import "./EditWork.scss";
import "../../../../utils/Form/Form.scss";
import InputText from "../../../../utils/Form/InputText/InputText.jsx";
import {
  getWorkById,
  editWork,
} from "../../../../utils/RequestsAPI/WorkManaging/WorkList.jsx";
import Button from "../../../../utils/Form/Button/Button.jsx";
import useForm from "../../../../utils/hooks/useForm";
import { workItemDefaultInputs } from "../objects";

const EditWork = (props) => {
  const {
    handleInputChange,
    formInputs,
    formErrors,
    setFormErrors,
    updateFormInputs,
    formIsValid,
    errorWindow,
  } = useForm(workItemDefaultInputs);
  const [isLoading, setIsLoading] = useState(false);
  const [workId, setWorkId] = useState(0);

  const handleSubmit = () => {
    console.log(formInputs);
    if (!formIsValid()) return;
    setIsLoading(true);
    console.log(formInputs);
    editWork(formInputs, workId)
      .then(() => props.history.push("/work-list"))
      .catch((error) => {
        setIsLoading(false);
        alert("Ошибка при добавлении записи");
        console.log(error);
      });
  };

  useEffect(() => {
    document.title = "Редактирование работы";
    const id = props.history.location.pathname.split("/work-list/edit/")[1];
    if (isNaN(Number.parseInt(id))) {
      alert("Неправильный индекс работы!");
      props.history.push("/work-list");
    } else {
      setWorkId(id);
      getWorkById(id)
        .then((res) => res.json())
        .then((oldWork) =>
          updateFormInputs({
            work: oldWork.work,
            typeOfWork: oldWork.typeOfWork ?? "Продукция",
          })
        )
        .catch((error) => {
          console.log(error);
          alert("Неправильный индекс работы!");
          props.history.push("/work-list");
        });
    }
  }, []);

  return (
    <div className="main-form">
      <form className="main-form__form">
        <div className="main-form__header main-form__header--full">
          <div className="main-form__title">Редактирование работы</div>
        </div>
        {errorWindow}
        <InputText
          inputName="Название работы"
          required
          error={formErrors.work}
          defaultValue={formInputs.work}
          name="work"
          handleInputChange={({ target }) =>
            handleInputChange("work", target.value)
          }
          errorsArr={formErrors}
          setErrorsArr={setFormErrors}
        />
        <div className="main-form__item">
          <div className="main-form__input_name">Тип работы</div>
          <div className="main-form__input_field">
            <select
              name="typeOfWork"
              value={formInputs.typeOfWork}
              onChange={({ target }) =>
                handleInputChange("typeOfWork", target.value)
              }
            >
              <option>Продукция</option>
              <option>Чертеж</option>
              <option>Без продукции/чертежа</option>
            </select>
          </div>
        </div>
        <div className="main-form__input_hint">
          * - поля, обязательные для заполнения
        </div>
        <div className="main-form__buttons main-form__buttons--full">
          <Button
            className="main-form__submit main-form__submit--inverted"
            inverted
            onClick={() => props.history.push("/work-list")}
            text="Вернуться назад"
          />
          <Button
            text="Изменить работу"
            isLoading={isLoading}
            className="main-form__submit"
            onClick={handleSubmit}
          />
        </div>
      </form>
    </div>
  );
};

export default EditWork;
