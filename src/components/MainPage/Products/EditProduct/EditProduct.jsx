import React, { useEffect, useState } from 'react';
import './EditProduct.scss';
import '../../../../utils/Form/Form.scss';
import {
  getProductById,
  editProduct,
} from '../../../../utils/RequestsAPI/Products.js';
import InputText from '../../../../utils/Form/InputText/InputText.jsx';
import SelectCategory from '../SelectCategory/SelectCategory.jsx';
import { imgToBlobDownload, getDataUri } from '../../../../utils/functions.jsx';
import ImgLoader from '../../../../utils/TableView/ImgLoader/ImgLoader.jsx';
import FileUploader from '../../../../utils/Form/FileUploader/FileUploader.jsx';
import Button from '../../../../utils/Form/Button/Button.jsx';
import SelectPackaging from '../../PackagingPage/SelectPackaging/SelectPackaging.jsx';
import {
  deletePackagingFromProduct,
  addPackagingToProduct,
} from '../../../../utils/RequestsAPI/Products/packaging.js';
import useForm from '../../../../utils/hooks/useForm';
import { productsDefaultInputs } from '../objects';

const EditProduct = (props) => {
  const {
    handleInputChange,
    formInputs,
    formErrors,
    setFormErrors,
    updateFormInputs,
    formIsValid,
    errorWindow,
  } = useForm(productsDefaultInputs);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = () => {
    console.log(formInputs);
    if (!formIsValid()) return;
    setIsLoading(true);
    const id = props.history.location.pathname.split('/products/edit/')[1];
    editProduct(formInputs, id)
      .then(() => deletePackagingFromProduct(id))
      .then(() =>
        addPackagingToProduct(
          {
            packings: [...formInputs.packages.map((item) => item.id)],
          },
          id,
        ),
      )
      .then(() => props.history.push('/products'))
      .catch((error) => {
        setIsLoading(false);
        alert('Ошибка при добавлении записи');
      });
  };

  useEffect(() => {
    document.title = 'Редактирование продукта';
    const id = props.history.location.pathname.split('/products/edit/')[1];
    if (isNaN(Number.parseInt(id))) {
      alert('Неправильный индекс заявки!');
      props.history.push('/products');
    } else {
      getProductById(id)
        .then((res) => res.json())
        .then((oldProduct) => {
          updateFormInputs({
            name: oldProduct.name,
            weight: oldProduct.weight,
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
          alert('Неправильный индекс заявки!');
          props.history.push('/products');
        });
    }
  }, []);

  return (
    <div className="main-form">
      <form className="main-form__form">
        <div className="main-form__header main-form__header--full">
          <div className="main-form__title">Редактирование продукции</div>
        </div>
        {errorWindow}
        <div className="main-form__item">
          <div className="main-form__input_name">Фотография</div>
          <div className="main-form__product_img">
            <ImgLoader imgClass="" imgSrc={formInputs.photo} noPhotoTemplate />
            {formInputs.photo !== '' && (
              <div
                className="main-form__submit"
                onClick={() =>
                  imgToBlobDownload(formInputs.photo, formInputs.name + '.jpeg')
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
          error={formErrors.name}
          name="name"
          defaultValue={formInputs.name}
          handleInputChange={({ target }) =>
            handleInputChange('name', target.value)
          }
          errorsArr={formErrors}
          setErrorsArr={setFormErrors}
        />
        <SelectCategory
          inputName="Категория"
          required
          error={formErrors.category}
          defaultValue={formInputs.category}
          name="category"
          handleCategoryChange={(category) =>
            handleInputChange('category', category)
          }
          errorsArr={formErrors}
          setErrorsArr={setFormErrors}
          readOnly
        />

        <div className="main-form__fieldset">
          <div className="main-form__group-name">Характеристика продукции</div>
          <InputText
            inputName="Вес изделия"
            required
            error={formErrors.weight}
            defaultValue={formInputs.weight}
            name="weight"
            type="number"
            handleInputChange={({ target }) =>
              handleInputChange('weight', target.value)
            }
            errorsArr={formErrors}
            setErrorsArr={setFormErrors}
          />
          <InputText
            inputName="Артикул"
            defaultValue={formInputs.vendor}
            name="vendor"
            type="text"
            handleInputChange={({ target }) =>
              handleInputChange('vendor', target.value)
            }
          />
          <InputText
            inputName="Описание"
            type="text"
            defaultValue={formInputs.description}
            name="description"
            handleInputChange={({ target }) =>
              handleInputChange('description', target.value)
            }
          />
          <InputText
            inputName="Штрихкод"
            type="text"
            defaultValue={formInputs.barcode}
            name="barcode"
            handleInputChange={({ target }) =>
              handleInputChange('barcode', target.value)
            }
          />
          <SelectPackaging
            required
            onChange={(packages) => handleInputChange('packages', packages)}
            defaultValue={formInputs.packages}
            errorName="packages"
            errorsArr={formErrors}
            setErrorsArr={setFormErrors}
            error={formErrors.packages}
          />
        </div>
        <InputText
          inputName="Комментарий"
          name="comment"
          defaultValue={formInputs.comment}
          handleInputChange={({ target }) =>
            handleInputChange('comment', target.value)
          }
        />
        <div className="main-form__item">
          <div className="main-form__input_name">Место производства*</div>
          <div className="main-form__input_field">
            <select
              name="productionLocation"
              onChange={({ target }) =>
                handleInputChange('productionLocation', target.value)
              }
              value={formInputs.productionLocation}
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
                result !== '' ? await getDataUri(result, 'jpeg', 0.3) : '';
              handleInputChange('photo', downgraded);
            }}
            previewImage={formInputs.photo}
            error={formErrors.photo}
            hideError={() => setFormErrors({ ...formErrors, photo: false })}
          />
        </div>
        <div className="main-form__input_hint">
          * - поля, обязательные для заполнения
        </div>
        <div className="main-form__buttons main-form__buttons--full">
          <Button
            className="main-form__submit main-form__submit--inverted"
            inverted
            onClick={() => props.history.push('/products')}
            text="Вернуться назад"
          />
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
