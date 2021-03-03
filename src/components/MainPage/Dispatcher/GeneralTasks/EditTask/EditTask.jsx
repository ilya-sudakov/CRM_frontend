import React, { useEffect, useState } from "react";
import "./EditTask.scss";
import "../../../../../utils/Form/Form.scss";
import {
  getMainTaskById,
  editMainTask,
} from "../../../../../utils/RequestsAPI/MainTasks.js";
import InputText from "../../../../../utils/Form/InputText/InputText.jsx";
import InputDate from "../../../../../utils/Form/InputDate/InputDate.jsx";
import InputUser from "../../../../../utils/Form/InputUser/InputUser.jsx";
import Button from "../../../../../utils/Form/Button/Button.jsx";
import { getTasksDefaultInputs } from "../functions";
import useForm from "../../../../../utils/hooks/useForm";

const EditTask = (props) => {
  const [taskId, setTaskId] = useState(1);
  const {
    handleInputChange,
    formInputs,
    formErrors,
    updateFormInputs,
    setFormErrors,
    formIsValid,
    errorWindow,
  } = useForm(getTasksDefaultInputs());
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = () => {
    if (!formIsValid()) return;
    setIsLoading(true);
    editMainTask(formInputs, taskId)
      .then(() => props.history.push(`/dispatcher/general-tasks#${taskId}`))
      .catch((error) => {
        setIsLoading(false);
        alert("Ошибка при добавлении записи");
        console.log(error);
      });
  };

  useEffect(() => {
    document.title = "Редактирование основной задачи";
    const id = props.history.location.pathname.split(
      "/dispatcher/general-tasks/edit/"
    )[1];
    if (isNaN(Number.parseInt(id))) {
      alert("Неправильный индекс задачи!");
      props.history.push("/dispatcher/general-tasks");
    } else {
      setTaskId(id);
      getMainTaskById(id)
        .then((res) => res.json())
        .then((oldRequest) => {
          updateFormInputs({
            dateCreated: oldRequest.dateCreated,
            description: oldRequest.description,
            responsible: oldRequest.responsible,
            dateControl: oldRequest.dateControl,
            condition: oldRequest.condition,
            status: oldRequest.status,
          });
        })
        .catch((error) => {
          console.log(error);
          alert("Неправильный индекс задачи!");
          props.history.push("/dispatcher/general-tasks");
        });
    }
  }, []);

  return (
    <div className="main-form">
      <form className="main-form__form">
        <div className="main-form__header main-form__header--full">
          <div className="main-form__title">Редактирование задачи</div>
        </div>
        {errorWindow}
        <InputDate
          inputName="Дата постановки"
          required
          error={formErrors.dateCreated}
          name="dateCreated"
          selected={Date.parse(formInputs.dateCreated)}
          errorsArr={formErrors}
          readOnly={!props.userHasAccess(["ROLE_ADMIN"])}
          setErrorsArr={setFormErrors}
          handleDateChange={(date) => handleInputChange("dateCreated", date)}
        />
        <div className="main-form__fieldset">
          <div className="main-form__group-name">Сведения</div>
          <InputText
            inputName="Описание"
            required
            type="textarea"
            error={formErrors.description}
            name="description"
            handleInputChange={({ target }) =>
              handleInputChange("description", target.value)
            }
            readOnly={!props.userHasAccess(["ROLE_ADMIN"])}
            errorsArr={formErrors}
            setErrorsArr={setFormErrors}
            defaultValue={formInputs.description}
          />
          <InputUser
            inputName="Ответственный"
            userData={props.userData}
            required
            error={formErrors.responsible}
            defaultValue={formInputs.responsible}
            readOnly={!props.userHasAccess(["ROLE_ADMIN"])}
            name="responsible"
            handleUserChange={(user) => handleInputChange("responsible", user)}
            errorsArr={formErrors}
            setErrorsArr={setFormErrors}
            searchPlaceholder="Введите имя пользователя для поиска..."
          />
        </div>
        <InputDate
          inputName="Дата контроля"
          required
          error={formErrors.dateControl}
          name="dateControl"
          selected={Date.parse(formInputs.dateControl)}
          readOnly={!props.userHasAccess(["ROLE_ADMIN"])}
          errorsArr={formErrors}
          setErrorsArr={setFormErrors}
          handleDateChange={(date) => handleInputChange("dateControl", date)}
        />
        <InputText
          inputName="Состояние"
          name="status"
          type="textarea"
          handleInputChange={({ target }) =>
            handleInputChange("status", target.value)
          }
          defaultValue={formInputs.status}
        />
        <div className="main-form__item">
          <div className="main-form__input_name">Статус*</div>
          <div className="main-form__input_field">
            <select
              name="condition"
              onChange={({ target }) =>
                handleInputChange("condition", target.value)
              }
              value={formInputs.condition}
            >
              <option>Выполнено</option>
              <option>Отложено</option>
              <option>Материалы</option>
              <option>В процессе</option>
              <option>Проблема</option>
            </select>
          </div>
        </div>
        <div className="main-form__input_hint">
          * - поля, обязательные для заполнения
        </div>
        <div className="main-form__buttons main-form__buttons--full">
          <Button
            text="Вернуться назад"
            className="main-form__submit main-form__submit--inverted"
            inverted
            onClick={() =>
              props.history.push(`/dispatcher/general-tasks#${taskId}`)
            }
          />
          <Button
            text="Редактировать задачу"
            isLoading={isLoading}
            className="main-form__submit"
            onClick={handleSubmit}
          />
        </div>
      </form>
    </div>
  );
};

export default EditTask;
