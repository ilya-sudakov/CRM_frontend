import React, { useEffect, useState } from "react";
import "./NewProduct.scss";
import "../../../../utils/Form/Form.scss";
import { addProduct } from "../../../../utils/RequestsAPI/Products.js";
import InputText from "../../../../utils/Form/InputText/InputText.jsx";
import ErrorMessage from "../../../../utils/Form/ErrorMessage/ErrorMessage.jsx";
import SelectCategory from "../SelectCategory/SelectCategory.jsx";
import FileUploader from "../../../../utils/Form/FileUploader/FileUploader.jsx";
import { getDataUri } from "../../../../utils/functions.jsx";
import Button from "../../../../utils/Form/Button/Button.jsx";
import SelectPackaging from "../../PackagingPage/SelectPackaging/SelectPackaging.jsx";
import { addPackagingToProduct } from "../../../../utils/RequestsAPI/Products/packaging.js";

const NewProduct = (props) => {
  const [productInputs, setProductInputs] = useState({
    name: null,
    category: null,
    comment: null,
    vendor: null,
    description: null,
    barcode: null,
    packages: [],
    photo: "",
    unit: 0,
    productionLocation: "ЦехЛЭМЗ",
    weight: null,
  });
  const [productErrors, setProductErrors] = useState({
    name: false,
    category: false,
    // comment: false,
    packages: false,
    photo: false,
    unit: false,
    weight: false,
  });
  const [validInputs, setValidInputs] = useState({
    name: false,
    category: false,
    // comment: false,
    packages: false,
    photo: true,
    unit: true,
    weight: false,
  });
  const [showError, setShowError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validateField = (fieldName, value) => {
    switch (fieldName) {
      case "category":
        setValidInputs({
          ...validInputs,
          category: value !== "",
        });
        break;
      case "packages":
        setValidInputs({
          ...validInputs,
          packages: value.length > 0,
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
      category: false,
      // comment: false,
      packages: false,
      photo: false,
      unit: false,
      weight: false,
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
    setProductErrors(newErrors);
    if (check === true) {
      return true;
    } else {
      // alert("Форма не заполнена");
      setIsLoading(false);
      setShowError(true);
      return false;
    }
  };

  const handleSubmit = (event) => {
    // event.preventDefault();
    setIsLoading(true);
    // console.log(productInputs)
    formIsValid() &&
      addProduct(productInputs)
        .then((res) => res.json())
        .then((res) => {
          // let temp =
          return addPackagingToProduct(
            {
              packings: [
                ...productInputs.packages.map((item) => {
                  return item.id;
                }),
              ],
            },
            res.id
          );
        })
        .then(() => props.history.push("/products"))
        .catch((error) => {
          setIsLoading(false);
          alert("Ошибка при добавлении записи");
        });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    validateField(name, value);
    setProductInputs({
      ...productInputs,
      [name]: value,
    });
    setProductErrors({
      ...productErrors,
      [name]: false,
    });
  };

  const handleCategoryChange = (value) => {
    validateField("category", value);
    setProductInputs({
      ...productInputs,
      category: value,
    });
    setProductErrors({
      ...productErrors,
      category: false,
    });
  };

  useEffect(() => {
    document.title = "Создание продукции";
  }, []);

  return (
    <div className="main-form">
      <form className="main-form__form">
        <div className="main-form__header main-form__header--full">
          <div className="main-form__title">Новая продукция</div>
        </div>
        <ErrorMessage
          message="Не заполнены все обязательные поля!"
          showError={showError}
          setShowError={setShowError}
        />
        <InputText
          inputName="Наименование"
          required
          error={productErrors.name}
          name="name"
          handleInputChange={handleInputChange}
          errorsArr={productErrors}
          setErrorsArr={setProductErrors}
        />
        <SelectCategory
          inputName="Категория"
          required
          error={productErrors.category}
          name="category"
          handleCategoryChange={handleCategoryChange}
          errorsArr={productErrors}
          setErrorsArr={setProductErrors}
        />
        <div className="main-form__fieldset">
          <div className="main-form__group-name">Характеристика продукции</div>
          <InputText
            inputName="Артикул"
            defaultValue={productInputs.vendor}
            name="vendor"
            type="text"
            handleInputChange={handleInputChange}
          />
          <InputText
            inputName="Вес изделия"
            required
            error={productErrors.weight}
            type="number"
            name="weight"
            handleInputChange={handleInputChange}
            errorsArr={productErrors}
            setErrorsArr={setProductErrors}
          />

          <InputText
            inputName="Описание"
            type="text"
            name="description"
            handleInputChange={handleInputChange}
          />
          <InputText
            inputName="Штрихкод"
            type="text"
            name="barcode"
            handleInputChange={handleInputChange}
          />

          {/* <div className="main-form__item">
          <div className="main-form__input_name">Единица измерения*</div>
          <div className="main-form__input_field">
            <select name="unit" onChange={handleInputChange}>
              <option value="шт.">Штук</option>
              <option value="тыс. шт.">Тысяч Штук</option>
              <option value="упак.">Упаковок</option>
            </select>
          </div>
        </div> */}
          {/* <InputText
                    inputName="Упаковка"
                    required
                    error={productErrors.packages}
                    name="packages"
                    handleInputChange={handleInputChange}
                    errorsArr={productErrors}
                    setErrorsArr={setProductErrors}
                /> */}
          <SelectPackaging
            required
            onChange={(packages) => {
              validateField("packages", packages);
              setProductInputs({
                ...productInputs,
                packages: packages,
              });
            }}
            errorName="packages"
            errorsArr={productErrors}
            setErrorsArr={setProductErrors}
            error={productErrors.packages}
          />
        </div>
        <InputText
          inputName="Комментарий"
          name="comment"
          handleInputChange={handleInputChange}
        />
        <div className="main-form__item">
          <div className="main-form__input_name">Место производства*</div>
          <div className="main-form__input_field">
            <select name="productionLocation" onChange={handleInputChange}>
              <option>ЦехЛЭМЗ</option>
              <option>ЦехЛиговский</option>
              <option>ЦехЛепсари</option>
            </select>
          </div>
        </div>
        <div className="main-form__item">
          <div className="main-form__input_name">Фотография</div>
          <FileUploader
            onChange={async (result) => {
              const downgraded =
                result !== "" ? await getDataUri(result, "jpeg", 0.3) : "";
              setProductInputs({
                ...productInputs,
                photo: downgraded,
              });
            }}
            previewImage={productInputs.photo}
          />
        </div>
        <div className="main-form__input_hint">
          * - поля, обязательные для заполнения
        </div>
        <div className="main-form__buttons main-form__buttons--full">
          <input
            className="main-form__submit main-form__submit--inverted"
            type="submit"
            onClick={() => props.history.push("/products")}
            value="Вернуться назад"
          />
          {/* <input className="main-form__submit" type="submit" onClick={handleSubmit} value="Добавить продукцию" />
                    {isLoading && <ImgLoader />} */}
          <Button
            text="Добавить продукцию"
            isLoading={isLoading}
            className="main-form__submit"
            onClick={handleSubmit}
          />
        </div>
      </form>
    </div>
  );
};

export default NewProduct;
