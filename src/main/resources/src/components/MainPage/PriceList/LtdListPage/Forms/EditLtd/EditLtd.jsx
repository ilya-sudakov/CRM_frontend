import React, { useState, useEffect } from "react";
import "./EditLtd.scss";
import ErrorMessage from "../../../../../../utils/Form/ErrorMessage/ErrorMessage.jsx";
import InputText from "../../../../../../utils/Form/InputText/InputText.jsx";
import Button from "../../../../../../utils/Form/Button/Button.jsx";
import {
  addLTD,
  getLTDById,
} from "../../../../../../utils/RequestsAPI/PriceList/lts_list.js";
import FileUploader from "../../../../../../utils/Form/FileUploader/FileUploader.jsx";
import { fetchINNData } from "../functions";

const EditLtd = (props) => {
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
    correspondentAccount: "",
    bik: "",
    generalDirector: "",
    accountant: "",
    logo: "",
  });
  const [formErrors, setFormErrors] = useState({
    name: false,
    legalAddress: false,
    mailingAddress: false,
    phone: false,
    site: false,
    inn: false,
    kpp: false,
    ogrn: false,
    okpo: false,
    okved: false,
    checkingAccount: false,
    bank: false,
    correspondentAccount: false,
    bik: false,
    generalDirector: false,
    accountant: false,
    logo: false,
  });
  const [validInputs, setValidInputs] = useState({
    name: false,
    legalAddress: false,
    mailingAddress: false,
    phone: false,
    site: false,
    inn: false,
    kpp: false,
    ogrn: false,
    okpo: false,
    okved: false,
    checkingAccount: false,
    bank: false,
    correspondentAccount: false,
    bik: false,
    generalDirector: false,
    accountant: false,
    logo: false,
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
      mailingAddress: false,
      phone: false,
      site: false,
      inn: false,
      kpp: false,
      ogrn: false,
      okpo: false,
      okved: false,
      checkingAccount: false,
      bank: false,
      correspondentAccount: false,
      bik: false,
      generalDirector: false,
      accountant: false,
      logo: false,
    });
    for (let item in validInputs) {
      // if (validInputs[item] === false) {
      if (formInputs[item] === "") {
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
    setFormInputs((formInputs) => {
      return {
        ...formInputs,
        [name]: value,
      };
    });
    setFormErrors({
      ...formErrors,
      [name]: false,
    });
  };

  useEffect(() => {
    document.title = "Редактирование ООО";
    const id = props.history.location.pathname.split("/ltd-list/edit/")[1];
    if (isNaN(Number.parseInt(id))) {
      alert("Неправильный индекс!");
      props.history.push("/ltd-list");
    } else {
      getLTDById(id)
        .then((data) => {
          return setFormInputs({
            ...data.data,
          });
        })
        .catch((error) => {
          console.log(error);
          alert("Неправильный индекс!");
          props.history.push("/ltd-list");
        });
    }
  }, []);

  return (
    <div className="new-packaging">
      <div className="main-form">
        <form className="main-form__form">
          <div className="main-form__header main-form__header--full">
            <div className="main-form__title">Редактирование ООО</div>
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
            defaultValue={formInputs.name}
            handleInputChange={({ target }) =>
              handleInputChange("name", target.value)
            }
            errorsArr={formErrors}
            setErrorsArr={setFormErrors}
          />
          <InputText
            inputName="Краткое наименование"
            defaultValue={formInputs.shortName}
            handleInputChange={({ target }) =>
              handleInputChange("shortName", target.value)
            }
          />
          <div className="main-form__fieldset">
            <div className="main-form__group-name">Адреса</div>
            <InputText
              inputName="Юридический адрес"
              required
              error={formErrors.legalAddress}
              defaultValue={formInputs.legalAddress}
              handleInputChange={({ target }) =>
                handleInputChange("legalAddress", target.value)
              }
              errorsArr={formErrors}
              setErrorsArr={setFormErrors}
            />
            <InputText
              inputName="Почтовый адрес"
              required
              error={formErrors.mailingAddress}
              defaultValue={formInputs.mailingAddress}
              handleInputChange={({ target }) =>
                handleInputChange("mailingAddress", target.value)
              }
              errorsArr={formErrors}
              setErrorsArr={setFormErrors}
            />
          </div>
          <InputText
            inputName="Телефон"
            required
            error={formErrors.phone}
            defaultValue={formInputs.phone}
            handleInputChange={({ target }) =>
              handleInputChange("phone", target.value)
            }
            errorsArr={formErrors}
            setErrorsArr={setFormErrors}
          />
          <InputText
            inputName="Сайт"
            required
            error={formErrors.site}
            defaultValue={formInputs.site}
            handleInputChange={({ target }) =>
              handleInputChange("site", target.value)
            }
            errorsArr={formErrors}
            setErrorsArr={setFormErrors}
          />
          <InputText
            inputName="ИНН"
            required
            error={formErrors.inn}
            defaultValue={formInputs.inn}
            handleInputChange={({ target }) =>
              handleInputChange("inn", target.value)
            }
            errorsArr={formErrors}
            setErrorsArr={setFormErrors}
          />
          <Button
            text="Загрузить данные по ИНН"
            className="main-window__button main-window__button--inverted"
            inverted
            onClick={() =>
              fetchINNData(
                formInputs,
                setIsLoading,
                setFormInputs,
                validateField
              )
            }
            isLoading={isLoading}
            style={{ margin: "-15px auto 20px 10px" }}
          />
          <InputText
            inputName="КПП"
            required
            defaultValue={formInputs.kpp}
            error={formErrors.kpp}
            handleInputChange={({ target }) =>
              handleInputChange("kpp", target.value)
            }
            errorsArr={formErrors}
            setErrorsArr={setFormErrors}
          />
          <InputText
            inputName="ОГРН"
            required
            error={formErrors.ogrn}
            defaultValue={formInputs.ogrn}
            handleInputChange={({ target }) =>
              handleInputChange("ogrn", target.value)
            }
            errorsArr={formErrors}
            setErrorsArr={setFormErrors}
          />
          <InputText
            inputName="ОКПО"
            required
            error={formErrors.okpo}
            defaultValue={formInputs.okpo}
            handleInputChange={({ target }) =>
              handleInputChange("okpo", target.value)
            }
            errorsArr={formErrors}
            setErrorsArr={setFormErrors}
          />
          <InputText
            inputName="ОКВЭД"
            required
            error={formErrors.okved}
            defaultValue={formInputs.okved}
            handleInputChange={({ target }) =>
              handleInputChange("okved", target.value)
            }
            errorsArr={formErrors}
            setErrorsArr={setFormErrors}
          />
          <div className="main-form__fieldset">
            <div className="main-form__group-name">Банковская информация</div>
            <InputText
              inputName="Расчетный счет №"
              required
              error={formErrors.checkingAccount}
              defaultValue={formInputs.checkingAccount}
              handleInputChange={({ target }) =>
                handleInputChange("checkingAccount", target.value)
              }
              errorsArr={formErrors}
              setErrorsArr={setFormErrors}
            />
            <InputText
              inputName="Банк"
              required
              error={formErrors.bank}
              defaultValue={formInputs.bank}
              handleInputChange={({ target }) =>
                handleInputChange("bank", target.value)
              }
              errorsArr={formErrors}
              setErrorsArr={setFormErrors}
            />
            <InputText
              inputName="Корреспондентский счет"
              required
              defaultValue={formInputs.correspondentAccount}
              error={formErrors.correspondentAccount}
              handleInputChange={({ target }) =>
                handleInputChange("correspondentAccount", target.value)
              }
              errorsArr={formErrors}
              setErrorsArr={setFormErrors}
            />
            <InputText
              inputName="БИК"
              required
              error={formErrors.bik}
              defaultValue={formInputs.bik}
              handleInputChange={({ target }) =>
                handleInputChange("bik", target.value)
              }
              errorsArr={formErrors}
              setErrorsArr={setFormErrors}
            />
          </div>
          <InputText
            inputName="Генеральный директор"
            required
            defaultValue={formInputs.generalDirector}
            error={formErrors.generalDirector}
            handleInputChange={({ target }) =>
              handleInputChange("generalDirector", target.value)
            }
            errorsArr={formErrors}
            setErrorsArr={setFormErrors}
          />
          <InputText
            inputName="Главный бухгалтер"
            required
            error={formErrors.accountant}
            defaultValue={formInputs.accountant}
            handleInputChange={({ target }) =>
              handleInputChange("accountant", target.value)
            }
            errorsArr={formErrors}
            setErrorsArr={setFormErrors}
          />
          <div className="main-form__item">
            <div className="main-form__input_name">Лого*</div>
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
              text="Редактировать запись"
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

export default EditLtd;
