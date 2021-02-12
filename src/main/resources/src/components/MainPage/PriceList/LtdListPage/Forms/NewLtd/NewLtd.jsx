import React, { useState, useEffect } from "react";
import "./NewLtd.scss";
import ErrorMessage from "../../../../../../utils/Form/ErrorMessage/ErrorMessage.jsx";
import InputText from "../../../../../../utils/Form/InputText/InputText.jsx";
import Button from "../../../../../../utils/Form/Button/Button.jsx";
import { addLTD } from "../../../../../../utils/RequestsAPI/PriceList/lts_list.js";
import FileUploader from "../../../../../../utils/Form/FileUploader/FileUploader.jsx";

const NewLtd = (props) => {
  const [formInputs, setFormInputs] = useState({
    name: "",
    shortName: "",
    legalAddress: "",
    mailingAddress: "",
    phone: "",
    site: "",
    inn: "",
    kpp: "",
    orgn: "",
    okpo: "",
    okved: "",
    checkingAccount: "",
    bank: "",
    correspondantAccount: "",
    bik: "",
    generalDirector: "",
    accountant: "",
    logo: "",
  });
  const [formErrors, setFormErrors] = useState({
    name: false,
    legalAddress: false,
  });
  const [validInputs, setValidInputs] = useState({
    name: false,
    legalAddress: false,
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
      name: false,
      legalAddress: false,
    });
    for (let item in validInputs) {
      if (validInputs[item] === false) {
        check = false;
        newErrors = Object.assign({
          ...newErrors,
          [item]: true,
        });
      }
    }
    setFormErrors(newErrors);
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
    console.log(formInputs);
    formIsValid() &&
      addLTD(formInputs)
        .then(() => {})
        .then(() => props.history.push("/ltd-list"))
        .catch((error) => {
          setIsLoading(false);
          alert("Ошибка при добавлении записи");
        });
  };

  const handleInputChange = (name, value) => {
    validateField(name, value);
    setFormInputs({
      ...formInputs,
      [name]: value,
    });
    setFormErrors({
      ...formErrors,
      [name]: false,
    });
  };

  useEffect(() => {
    document.title = "Добавление ООО";
  }, []);

  return (
    <div className="new-packaging">
      <div className="main-form">
        <form className="main-form__form">
          <div className="main-form__header main-form__header--full">
            <div className="main-form__title">Добавление ООО</div>
          </div>
          <ErrorMessage
            message="Не заполнены все обязательные поля!"
            showError={showError}
            setShowError={setShowError}
          />
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
            inputName="Краткое наименование"
            required
            error={formErrors.shortName}
            name="name"
            handleInputChange={({ target }) =>
              handleInputChange("shortName", target.value)
            }
            errorsArr={formErrors}
            setErrorsArr={setFormErrors}
          />
          <InputText
            inputName="Юридический адрес"
            required
            error={formErrors.legalAddress}
            name="name"
            handleInputChange={({ target }) =>
              handleInputChange("legalAddress", target.value)
            }
            errorsArr={formErrors}
            setErrorsArr={setFormErrors}
          />
          <div className="main-form__item">
            <div className="main-form__input_name">Фотография</div>
            <FileUploader
              previewImage={formInputs.logo}
              error={formErrors.logo}
              onChange={(value) => handleInputChange("logo", value)}
              hideError={() => setFormErrors({ ...formErrors, logo: false })}
            />
          </div>
          <div className="main-form__input_hint">
            * - поля, обязательные для заполнения
          </div>
          <div className="main-form__buttons main-form__buttons--full">
            <input
              className="main-form__submit main-form__submit--inverted"
              type="submit"
              onClick={() => props.history.push("/ltd-list")}
              value="Вернуться назад"
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
    </div>
  );
};

export default NewLtd;
