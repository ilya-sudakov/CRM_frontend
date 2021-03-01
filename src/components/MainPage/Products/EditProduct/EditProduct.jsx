import React, { useEffect, useState } from "react";
import "./EditProduct.scss";
import "../../../../utils/Form/Form.scss";
import {
  getProductById,
  editProduct,
} from "../../../../utils/RequestsAPI/Products.js";
import InputText from "../../../../utils/Form/InputText/InputText.jsx";
import ErrorMessage from "../../../../utils/Form/ErrorMessage/ErrorMessage.jsx";
import SelectCategory from "../SelectCategory/SelectCategory.jsx";
import { imgToBlobDownload, getDataUri } from "../../../../utils/functions.jsx";
import ImgLoader from "../../../../utils/TableView/ImgLoader/ImgLoader.jsx";
import FileUploader from "../../../../utils/Form/FileUploader/FileUploader.jsx";
import Button from "../../../../utils/Form/Button/Button.jsx";
import SelectPackaging from "../../PackagingPage/SelectPackaging/SelectPackaging.jsx";
import {
  deletePackagingFromProduct,
  addPackagingToProduct,
} from "../../../../utils/RequestsAPI/Products/packaging.js";

const EditProduct = (props) => {
  const [productInputs, setProductInputs] = useState({
    name: "",
    item: "",
    weight: "",
    description: "",
    barcode: "",
    productionLocation: "ЦехЛЭМЗ",
    group: "",
    unit: 0,
    vendor: "",
    photo: "",
    category: "",
    packages: [],
    comment: "",
  });
  const [productErrors, setProductErrors] = useState({
    name: false,
    category: false,
    comment: false,
    // productionLocation: false,
    packages: false,
    photo: false,
    unit: false,
    weight: false,
  });
  const [validInputs, setValidInputs] = useState({
    name: true,
    category: true,
    // comment: false,
    packages: true,
    productionLocation: true,
    // photo: false,
    unit: true,
    weight: true,
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
      category: false,
      packages: false,
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
    // console.log(productInputs);
    const id = props.history.location.pathname.split("/products/edit/")[1];
    formIsValid() &&
      editProduct(productInputs, id)
        .then(() => {
          return deletePackagingFromProduct(id);
        })
        .then(() => {
          return addPackagingToProduct(
            {
              packings: [
                ...productInputs.packages.map((item) => {
                  return item.id;
                }),
              ],
            },
            id
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
    document.title = "Редактирование продукта";
    const id = props.history.location.pathname.split("/products/edit/")[1];
    if (isNaN(Number.parseInt(id))) {
      alert("Неправильный индекс заявки!");
      props.history.push("/products");
    } else {
      getProductById(id)
        .then((res) => res.json())
        .then((oldProduct) => {
          // console.log(oldProduct)
          setProductInputs({
            name: oldProduct.name,
            weight: oldProduct.weight,
            unit: oldProduct.unit,
            packages: oldProduct.packings,
            description: oldProduct.description,
            barcode: oldProduct.barcode,
            vendor: oldProduct.vendor,
            productionLocation: oldProduct.productionLocation,
            category: oldProduct.category,
            comment: oldProduct.comment,
            photo: oldProduct.photo,
          });
        })
        .catch((error) => {
          console.log(error);
          alert("Неправильный индекс заявки!");
          props.history.push("/products");
        });
    }
  }, []);
  return (
    <div className="main-form">
      <form className="main-form__form">
        <div className="main-form__header main-form__header--full">
          <div className="main-form__title">Редактирование продукции</div>
        </div>
        <ErrorMessage
          message="Не заполнены все обязательные поля!"
          showError={showError}
          setShowError={setShowError}
        />
        <div className="main-form__item">
          <div className="main-form__input_name">Фотография</div>
          {/* <div className="main-form__product_img">
                        <img src={productInputs.photo} alt="" />
                        <div className="main-form__submit" onClick={() => imgToBlobDownload(productInputs.photo, (productInputs.name + '.jpeg'))}>Скачать картинку</div>
                    </div> */}

          <div className="main-form__product_img">
            <ImgLoader
              imgClass=""
              imgSrc={productInputs.photo}
              noPhotoTemplate
            />
            {productInputs.photo !== "" && (
              <div
                className="main-form__submit"
                onClick={() =>
                  imgToBlobDownload(
                    productInputs.photo,
                    productInputs.name + ".jpeg"
                  )
                }
              >
                Скачать картинку
              </div>
            )}
          </div>
        </div>
        <InputText
          inputName="Наименование"
          required
          error={productErrors.name}
          name="name"
          defaultValue={productInputs.name}
          handleInputChange={handleInputChange}
          errorsArr={productErrors}
          setErrorsArr={setProductErrors}
        />
        <SelectCategory
          inputName="Категория"
          required
          error={productErrors.category}
          defaultValue={productInputs.category}
          name="category"
          handleCategoryChange={handleCategoryChange}
          errorsArr={productErrors}
          setErrorsArr={setProductErrors}
          readOnly
        />

        <div className="main-form__fieldset">
          <div className="main-form__group-name">Характеристика продукции</div>
          <InputText
            inputName="Вес изделия"
            required
            error={productErrors.weight}
            defaultValue={productInputs.weight}
            name="weight"
            type="number"
            handleInputChange={handleInputChange}
            errorsArr={productErrors}
            setErrorsArr={setProductErrors}
          />
          <InputText
            inputName="Артикул"
            defaultValue={productInputs.vendor}
            name="vendor"
            type="text"
            handleInputChange={handleInputChange}
          />
          <InputText
            inputName="Описание"
            type="text"
            defaultValue={productInputs.description}
            name="description"
            handleInputChange={handleInputChange}
          />
          <InputText
            inputName="Штрихкод"
            type="text"
            defaultValue={productInputs.barcode}
            name="barcode"
            handleInputChange={handleInputChange}
          />

          {/* <div className="main-form__item">
          <div className="main-form__input_name">Единица измерения*</div>
          <div className="main-form__input_field">
            <select
              name="unit"
              onChange={handleInputChange}
              value={productInputs.unit}
            >
              <option value="шт.">Штук</option>
              <option value="тыс. шт.">Тысяч Штук</option>
              <option value="упак.">Упаковок</option>
            </select>
          </div>
        </div> */}
          {/* <InputText
          inputName="Упаковка"
          required
          defaultValue={productInputs.packages}
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
            defaultValue={productInputs.packages}
            errorName="packages"
            errorsArr={productErrors}
            setErrorsArr={setProductErrors}
            error={productErrors.packages}
          />
        </div>
        <InputText
          inputName="Комментарий"
          name="comment"
          defaultValue={productInputs.comment}
          handleInputChange={handleInputChange}
        />
        <div className="main-form__item">
          <div className="main-form__input_name">Место производства*</div>
          <div className="main-form__input_field">
            <select
              name="productionLocation"
              onChange={handleInputChange}
              value={productInputs.productionLocation}
            >
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
          {/* <input className="main-form__submit" type="submit" onClick={handleSubmit} value="Изменить данные" />
                    {isLoading && <ImgLoader />} */}
          <Button
            text="Изменить данные"
            isLoading={isLoading}
            className="main-form__submit"
            onClick={handleSubmit}
          />
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
