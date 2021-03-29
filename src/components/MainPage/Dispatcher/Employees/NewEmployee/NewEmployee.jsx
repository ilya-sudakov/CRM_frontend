import { useEffect, useState } from 'react';
import './NewEmployee.scss';
import 'Utils/Form/Form.scss';
import { addEmployee } from 'Utils/RequestsAPI/Employees.jsx';
import InputText from 'Utils/Form/InputText/InputText.jsx';
import InputDate from 'Utils/Form/InputDate/InputDate.jsx';
import FileUploader from 'Utils/Form/FileUploader/FileUploader.jsx';
import Button from 'Utils/Form/Button/Button.jsx';
import { useForm } from 'Utils/hooks';
import { employeesDefaultInputs } from '../objects.js';
import { createFormDataFromObject } from 'Utils/functions.jsx';
import { format } from 'date-fns';

const NewEmployee = (props) => {
  const {
    handleInputChange,
    formInputs,
    formErrors,
    setFormErrors,
    formIsValid,
    errorWindow,
  } = useForm(employeesDefaultInputs);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = () => {
    if (!formIsValid()) return;
    setIsLoading(true);
    const employeeData = {
      ...formInputs,
      files: Array.from(formInputs.employeePhotos),
      employeePhotos: undefined,
      dateOfBirth: format(formInputs.dateOfBirth, 'yyyy-MM-dd'),
      patentExpirationDate:
        formInputs.patentExpirationDate === null
          ? undefined
          : format(formInputs.patentExpirationDate, 'yyyy-MM-dd'),
      registrationExpirationDate:
        formInputs.registrationExpirationDate === null
          ? undefined
          : format(formInputs.registrationExpirationDate, 'yyyy-MM-dd'),
    };
    addEmployee(createFormDataFromObject(employeeData))
      .then(() => props.history.push('/dispatcher/employees'))
      .catch((error) => {
        setIsLoading(false);
        alert('Ошибка при добавлении записи');
        console.log(error);
      });
  };

  useEffect(() => {
    document.title = 'Добавление сотрудника';
  }, []);

  return (
    <div className="main-form">
      <form className="main-form__form">
        <div className="main-form__header main-form__header--full">
          <div className="main-form__title">Новый сотрудник</div>
        </div>
        {errorWindow}
        <div className="main-form__fieldset">
          <div className="main-form__group-name">Имя сотрудника</div>
          <div className="main-form__row">
            <InputText
              inputName="Имя"
              required
              name="name"
              handleInputChange={({ target }) =>
                handleInputChange('name', target.value)
              }
              error={formErrors.name}
              errorsArr={formErrors}
              setErrorsArr={setFormErrors}
            />
            <InputText
              inputName="Фамилия"
              required
              error={formErrors.lastName}
              name="lastName"
              handleInputChange={({ target }) =>
                handleInputChange('lastName', target.value)
              }
              errorsArr={formErrors}
              setErrorsArr={setFormErrors}
            />
          </div>
          <InputText
            inputName="Отчество"
            required
            error={formErrors.middleName}
            name="middleName"
            handleInputChange={({ target }) =>
              handleInputChange('middleName', target.value)
            }
            errorsArr={formErrors}
            setErrorsArr={setFormErrors}
          />
        </div>
        <div className="main-form__row">
          <InputDate
            inputName="Дата рождения"
            required
            error={formErrors.dateOfBirth}
            name="dateOfBirth"
            selected={formInputs.dateOfBirth}
            handleDateChange={(date) => handleInputChange('dateOfBirth', date)}
            errorsArr={formErrors}
            setErrorsArr={setFormErrors}
          />
          <InputText
            inputName="Гражданство"
            required
            error={formErrors.citizenship}
            name="citizenship"
            handleInputChange={({ target }) =>
              handleInputChange('citizenship', target.value)
            }
            errorsArr={formErrors}
            setErrorsArr={setFormErrors}
          />
        </div>
        <div className="main-form__fieldset">
          <div className="main-form__group-name">Подразделение</div>
          <div className="main-form__row">
            <div className="main-form__item">
              <div className="main-form__input_name">Цех*</div>
              <div className="main-form__input_field">
                <select
                  name="workshop"
                  onChange={({ target }) =>
                    handleInputChange('workshop', target.value)
                  }
                  defaultValue={formInputs.workshop}
                >
                  <option value="ЦехЛЭМЗ">ЦехЛЭМЗ</option>
                  <option value="ЦехЛепсари">ЦехЛепсари</option>
                  <option value="ЦехЛиговский">ЦехЛиговский</option>
                  <option value="Офис">Офис</option>
                </select>
              </div>
            </div>
            <InputText
              inputName="Должность"
              required
              error={formErrors.position}
              name="position"
              handleInputChange={({ target }) =>
                handleInputChange('position', target.value)
              }
              errorsArr={formErrors}
              setErrorsArr={setFormErrors}
            />
          </div>
        </div>
        <div className="main-form__item">
          <div className="main-form__input_name">Документы</div>
          <FileUploader
            onChange={(files) => handleInputChange('employeePhotos', files)}
            multipleFiles
          />
        </div>
        <InputText
          inputName="Комментарий"
          name="comment"
          handleInputChange={({ target }) =>
            handleInputChange('comment', target.value)
          }
          errorsArr={formErrors}
          setErrorsArr={setFormErrors}
        />
        <InputDate
          inputName="Срок патента (при необходимости)"
          name="patentExpirationDate"
          selected={formInputs.patentExpirationDate}
          handleDateChange={(date) =>
            handleInputChange('patentExpirationDate', date)
          }
        />
        <InputDate
          inputName="Срок регистрации (при наличии)"
          name="registrationExpirationDate"
          selected={formInputs.registrationExpirationDate}
          handleDateChange={(date) =>
            handleInputChange('registrationExpirationDate', date)
          }
        />
        <div className="main-form__item">
          <div className="main-form__input_name">Актуальность*</div>
          <div className="main-form__input_field">
            <select
              name="relevance"
              onChange={({ target }) =>
                handleInputChange('relevance', target.value)
              }
              defaultValue={formInputs.relevance}
            >
              <option value="Работает">Работает</option>
              <option value="Уволен">Уволен</option>
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
            onClick={() => props.history.push('/dispatcher/employees')}
            text="Вернуться назад"
          />
          <Button
            text="Добавить сотрудника"
            isLoading={isLoading}
            className="main-form__submit"
            onClick={handleSubmit}
          />
        </div>
      </form>
    </div>
  );
};

export default NewEmployee;
