import React, { useEffect, useState } from "react";
import "./EditEmployee.scss";
import "../../../../../utils/Form/Form.scss";
import {
  getEmployeeById,
  editEmployee,
  deleteEmployee,
} from "../../../../../utils/RequestsAPI/Employees.jsx";
import InputText from "../../../../../utils/Form/InputText/InputText.jsx";
import InputDate from "../../../../../utils/Form/InputDate/InputDate.jsx";
import ErrorMessage from "../../../../../utils/Form/ErrorMessage/ErrorMessage.jsx";
import FileUploader from "../../../../../utils/Form/FileUploader/FileUploader.jsx";
import Button from "../../../../../utils/Form/Button/Button.jsx";

const EditEmployee = (props) => {
  const [employeeInputs, setEmployeeInputs] = useState({
    name: "",
    lastName: "",
    middleName: "",
    dateOfBirth: new Date(),
    patentExpirationDate: null,
    registrationExpirationDate: null,
    citizenship: "",
    position: "",
    workshop: "ЦехЛЭМЗ",
    passportScan1: "",
    comment: "",
    relevance: "Работает",
  });
  const [employeeId, setEmployeeId] = useState(1);

  const [employeeErrors, setEmployeeErrors] = useState({
    name: false,
    lastName: false,
    middleName: false,
    dateOfBirth: false,
    citizenship: false,
    position: false,
    workshop: false,
    // passportScan1: false,
    // comment: false,
    relevance: false,
  });
  const [validInputs, setValidInputs] = useState({
    name: true,
    lastName: true,
    middleName: true,
    dateOfBirth: true,
    citizenship: true,
    position: true,
    workshop: true,
    // passportScan1: false,
    // comment: false,
    relevance: true,
  });
  const [showError, setShowError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validateField = (fieldName, value) => {
    switch (fieldName) {
      case "dateOfBirth":
        setValidInputs({
          ...validInputs,
          dateOfBirth: value !== null,
        });
        break;
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
      name: false,
      lastName: false,
      middleName: false,
      dateOfBirth: false,
      citizenship: false,
      position: false,
      workshop: false,
      // passportScan1: false,
      // comment: false,
      relevance: false,
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
    setEmployeeErrors(newErrors);
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
    if (formIsValid())
      return editEmployee(
        {
          ...employeeInputs,
          dateOfBirth: Number.parseInt(
            new Date(employeeInputs.dateOfBirth).getTime() / 1000
          ),
          patentExpirationDate:
            employeeInputs.patentExpirationDate === null
              ? null
              : Number.parseInt(
                  new Date(employeeInputs.patentExpirationDate).getTime() / 1000
                ),
          registrationExpirationDate:
            employeeInputs.registrationExpirationDate === null
              ? null
              : Number.parseInt(
                  new Date(
                    employeeInputs.registrationExpirationDate
                  ).getTime() / 1000
                ),
        },
        employeeId
      )
        .then(() => props.history.push("/dispatcher/employees"))
        .catch((error) => {
          setIsLoading(false);
          alert("Ошибка при добавлении записи");
          console.log(error);
        });

    setIsLoading(false);
    alert("Ошибка при добавлении записи");
    console.log(error);
  };

  const handleDeleteItem = () => {
    deleteEmployee(employeeId)
      .then(() => props.history.push("/dispatcher/employees"))
      .catch((error) => {
        setIsLoading(false);
        alert("Ошибка при добавлении записи");
        console.log(error);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    validateField(name, value);
    setEmployeeInputs({
      ...employeeInputs,
      [name]: value,
    });
    setEmployeeErrors({
      ...employeeErrors,
      [name]: false,
    });
  };

  useEffect(() => {
    document.title = "Редактирование сотрудника";
    const id = props.history.location.pathname.split(
      "/dispatcher/employees/edit/"
    )[1];
    if (isNaN(Number.parseInt(id))) {
      alert("Неправильный индекс сотрудника!");
      props.history.push("/dispatcher/employees");
    } else {
      setEmployeeId(id);
      getEmployeeById(id)
        .then((res) => res.json())
        .then((oldRequest) => {
          setEmployeeInputs({
            name: oldRequest.name,
            lastName: oldRequest.lastName,
            middleName: oldRequest.middleName,
            dateOfBirth: oldRequest.dateOfBirth ?? new Date(),
            patentExpirationDate: oldRequest.patentExpirationDate,
            registrationExpirationDate: oldRequest.registrationExpirationDate,
            citizenship: oldRequest.citizenship,
            position: oldRequest.position,
            workshop: oldRequest.workshop,
            passportScan1: oldRequest.passportScan1,
            comment: oldRequest.comment,
            relevance: oldRequest.relevance,
          });
        })
        .catch((error) => {
          console.log(error);
          alert("Неправильный индекс сотрудника!");
          props.history.push("/dispatcher/employees");
        });
    }
  }, []);

  const handleDateChange = (date) => {
    const regex = "(0[1-9]|[12]d|3[01]).(0[1-9]|1[0-2]).[12]d{3})";
    validateField("dateOfBirth", date);
    setEmployeeInputs({
      ...employeeInputs,
      dateOfBirth: date,
    });
    setEmployeeErrors({
      ...employeeErrors,
      dateOfBirth: false,
    });
  };

  return (
    <div className="main-form">
      <form className="main-form__form">
        <div className="main-form__header main-form__header--full">
          <div className="main-form__title">Редактирование сотрудника</div>
        </div>
        <ErrorMessage
          message="Не заполнены все обязательные поля!"
          showError={showError}
          setShowError={setShowError}
        />
        <div className="main-form__fieldset">
          <div className="main-form__group-name">Имя сотрудника</div>
          <div className="main-form__row">
            <InputText
              inputName="Имя"
              required
              error={employeeErrors.name}
              defaultValue={employeeInputs.name}
              name="name"
              errorsArr={employeeErrors}
              setErrorsArr={setEmployeeErrors}
              handleInputChange={handleInputChange}
            />
            <InputText
              inputName="Фамилия"
              required
              error={employeeErrors.lastName}
              defaultValue={employeeInputs.lastName}
              errorsArr={employeeErrors}
              setErrorsArr={setEmployeeErrors}
              name="lastName"
              handleInputChange={handleInputChange}
            />
          </div>
          <InputText
            inputName="Отчество"
            required
            error={employeeErrors.middleName}
            name="middleName"
            errorsArr={employeeErrors}
            setErrorsArr={setEmployeeErrors}
            defaultValue={employeeInputs.middleName}
            handleInputChange={handleInputChange}
          />
        </div>
        <div className="main-form__row">
          <InputDate
            inputName="Дата рождения"
            required
            error={employeeErrors.dateOfBirth}
            name="dateOfBirth"
            selected={Date.parse(employeeInputs.dateOfBirth)}
            handleDateChange={handleDateChange}
            errorsArr={employeeErrors}
            setErrorsArr={setEmployeeErrors}
          />
          <InputText
            inputName="Гражданство"
            required
            error={employeeErrors.citizenship}
            name="citizenship"
            errorsArr={employeeErrors}
            setErrorsArr={setEmployeeErrors}
            defaultValue={employeeInputs.citizenship}
            handleInputChange={handleInputChange}
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
                  onChange={handleInputChange}
                  value={employeeInputs.workshop}
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
              error={employeeErrors.position}
              name="position"
              defaultValue={employeeInputs.position}
              errorsArr={employeeErrors}
              setErrorsArr={setEmployeeErrors}
              handleInputChange={handleInputChange}
            />
          </div>
        </div>
        <div className="main-form__item">
          <div className="main-form__input_name">Паспорт*</div>
          <FileUploader
            onChange={(result) => {
              setEmployeeInputs({
                ...employeeInputs,
                passportScan1: result,
              });
            }}
            previewImage={
              employeeInputs.passportScan1 !== ""
                ? employeeInputs.passportScan1
                : null
            }
          />
        </div>
        <InputDate
          inputName="Срок патента (при наличии)"
          name="patentExpirationDate"
          selected={Date.parse(employeeInputs.patentExpirationDate)}
          handleDateChange={(date) =>
            setEmployeeInputs({
              ...employeeInputs,
              patentExpirationDate: date,
            })
          }
        />
        <InputDate
          inputName="Срок регистрации (при наличии)"
          name="registrationExpirationDate"
          selected={Date.parse(employeeInputs.registrationExpirationDate)}
          handleDateChange={(date) =>
            setEmployeeInputs({
              ...employeeInputs,
              registrationExpirationDate: date,
            })
          }
        />
        <InputText
          inputName="Комментарий"
          // required
          // error={employeeErrors.comment}
          name="comment"
          defaultValue={employeeInputs.comment}
          handleInputChange={handleInputChange}
          errorsArr={employeeErrors}
          setErrorsArr={setEmployeeErrors}
        />
        <div className="main-form__item">
          <div className="main-form__input_name">Актуальность*</div>
          <div className="main-form__input_field">
            <select
              name="relevance"
              onChange={handleInputChange}
              value={employeeInputs.relevance}
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
          <input
            className="main-form__submit main-form__submit--inverted"
            type="submit"
            onClick={() => props.history.push("/dispatcher/employees")}
            value="Вернуться назад"
          />
          <Button
            text="Удалить запись"
            isLoading={isLoading}
            className="main-form__submit"
            onClick={handleDeleteItem}
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

export default EditEmployee;
