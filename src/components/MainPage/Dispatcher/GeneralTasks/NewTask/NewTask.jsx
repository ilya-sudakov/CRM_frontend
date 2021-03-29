import { useContext, useEffect, useState } from 'react';
import './NewTask.scss';
import 'Utils/Form/Form.scss';
import { addMainTask } from 'Utils/RequestsAPI/MainTasks.js';
import InputText from 'Utils/Form/InputText/InputText.jsx';
import InputDate from 'Utils/Form/InputDate/InputDate.jsx';
import InputUser from 'Utils/Form/InputUser/InputUser.jsx';
import Button from 'Utils/Form/Button/Button.jsx';
import UserContext from '../../../../../App.js';
import { useForm } from 'Utils/hooks';
import { getTasksDefaultInputs } from '../functions';

const NewTask = (props) => {
  const userContext = useContext(UserContext);
  const {
    handleInputChange,
    formInputs,
    formErrors,
    setFormErrors,
    formIsValid,
    errorWindow,
  } = useForm(getTasksDefaultInputs(userContext.userData.username));
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = () => {
    if (!formIsValid()) return;
    setIsLoading(true);
    addMainTask(formInputs)
      .then(() => props.history.push('/dispatcher/general-tasks'))
      .catch((error) => {
        setIsLoading(false);
        alert('Ошибка при добавлении записи');
        console.log(error);
      });
  };

  useEffect(() => {
    document.title = 'Создание основной задачи';
  }, []);

  return (
    <div className="main-form">
      <form className="main-form__form">
        <div className="main-form__header main-form__header--full">
          <div className="main-form__title">Новая задача</div>
        </div>
        {errorWindow}
        <InputDate
          inputName="Дата постановки"
          required
          error={formErrors.dateCreated}
          name="dateCreated"
          selected={formInputs.dateCreated}
          errorsArr={formErrors}
          setErrorsArr={setFormErrors}
          handleDateChange={(date) => handleInputChange('dateCreated', date)}
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
              handleInputChange('description', target.value)
            }
            errorsArr={formErrors}
            setErrorsArr={setFormErrors}
          />
          <InputUser
            inputName="Ответственный"
            userData={props.userData}
            required
            error={formErrors.responsible}
            defaultValue={formInputs.responsible}
            name="responsible"
            errorsArr={formErrors}
            setErrorsArr={setFormErrors}
            handleUserChange={(user) => handleInputChange('responsible', user)}
            searchPlaceholder="Введите имя пользователя для поиска..."
          />
        </div>
        <InputDate
          inputName="Дата контроля"
          required
          error={formErrors.dateControl}
          errorsArr={formErrors}
          setErrorsArr={setFormErrors}
          name="dateControl"
          selected={formInputs.dateControl}
          handleDateChange={(date) => handleInputChange('dateControl', date)}
        />
        <InputText
          inputName="Состояние"
          name="status"
          type="textarea"
          handleInputChange={({ target }) =>
            handleInputChange('status', target.value)
          }
        />
        <div className="main-form__input_hint">
          * - поля, обязательные для заполнения
        </div>
        <div className="main-form__buttons main-form__buttons--full">
          <Button
            text="Вернуться назад"
            className="main-form__submit main-form__submit--inverted"
            inverted
            onClick={() => props.history.push('/dispatcher/general-tasks')}
          />
          <Button
            text="Добавить задачу"
            isLoading={isLoading}
            className="main-form__submit"
            onClick={handleSubmit}
          />
        </div>
      </form>
    </div>
  );
};

export default NewTask;
