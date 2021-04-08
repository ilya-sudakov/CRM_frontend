import { useEffect } from 'react';
import './ViewProduct.scss';
import 'Utils/Form/Form.scss';
import { getProductById } from 'API/Products/products';
import { imgToBlobDownload } from 'Utils/functions.jsx';
import SelectPackaging from '../../PackagingPage/SelectPackaging/SelectPackaging.jsx';
import ImgLoader from 'Utils/TableView/ImgLoader/ImgLoader.jsx';
import { productsDefaultInputs } from '../objects';
import { useForm } from 'Utils/hooks';
import Button from 'Utils/Form/Button/Button.jsx';

const ViewProduct = (props) => {
  const { formInputs, updateFormInputs } = useForm(productsDefaultInputs);

  useEffect(() => {
    document.title = 'Просмотр продукта';
    const id = props.history.location.pathname.split('/products/view/')[1];
    if (isNaN(Number.parseInt(id))) {
      alert('Неправильный индекс заявки!');
      props.history.push('/products');
    } else {
      getProductById(id)
        .then((res) => res.json())
        .then((oldProduct) => {
          console.log(oldProduct);
          updateFormInputs({
            name: oldProduct.name,
            photo: oldProduct.photo,
            item: oldProduct.item,
            weight: oldProduct.weight,
            category: oldProduct.category,
            description: oldProduct.description,
            barcode: oldProduct.barcode,
            vendor: oldProduct.vendor,
            productionLocation: oldProduct.productionLocation,
            unit: oldProduct.unit,
            packages: oldProduct.packings,
            comment: oldProduct.comment,
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
    <div className="view-product">
      <div className="main-form">
        <form className="main-form__form">
          <div className="main-form__header main-form__header--full">
            <div className="main-form__title">Просмотр продукции</div>
          </div>
          <div className="main-form__item">
            <div className="main-form__input_name">Фотография</div>
            <div className="main-form__product_img">
              <ImgLoader
                imgClass=""
                imgSrc={formInputs.photo}
                noPhotoTemplate
              />
              {formInputs.photo !== '' && (
                <div
                  className="main-form__submit"
                  onClick={() =>
                    imgToBlobDownload(
                      formInputs.photo,
                      formInputs.name + '.jpeg',
                    )
                  }
                >
                  Скачать картинку
                </div>
              )}
            </div>
          </div>
          <div className="main-form__item">
            <div className="main-form__input_name">Наименование</div>
            <div className="main-form__input_field">
              <input
                type="text"
                name="name"
                defaultValue={formInputs.name}
                readOnly
              />
            </div>
          </div>
          <div className="main-form__item">
            <div className="main-form__input_name">Категория</div>
            <div className="main-form__input_field">
              <input
                type="text"
                name="weight"
                defaultValue={formInputs.category}
                readOnly
              />
            </div>
          </div>
          <div className="main-form__fieldset">
            <div className="main-form__group-name">
              Характеристика продукции
            </div>
            <div className="main-form__item">
              <div className="main-form__input_name">Вес изделия</div>
              <div className="main-form__input_field">
                <input
                  type="text"
                  name="weight"
                  defaultValue={formInputs.weight}
                  readOnly
                />
              </div>
            </div>
            <div className="main-form__item">
              <div className="main-form__input_name">Артикул</div>
              <div className="main-form__input_field">
                <input
                  type="text"
                  name="vendor"
                  defaultValue={formInputs.vendor}
                  readOnly
                />
              </div>
            </div>
            {formInputs.description ? (
              <div className="main-form__item">
                <div className="main-form__input_name">Описание</div>
                <div className="main-form__input_field">
                  <textarea
                    type="text"
                    name="description"
                    defaultValue={formInputs.description}
                    readOnly
                  />
                </div>
              </div>
            ) : null}
            {formInputs.barcode ? (
              <div className="main-form__item">
                <div className="main-form__input_name">Штрих-код</div>
                <div className="main-form__input_field">
                  <input
                    type="text"
                    name="barcode"
                    defaultValue={formInputs.barcode}
                    readOnly
                  />
                </div>
              </div>
            ) : null}
            <SelectPackaging defaultValue={formInputs.packages} readOnly />
          </div>
          <div className="main-form__item">
            <div className="main-form__input_name">Место производства</div>
            <div className="main-form__input_field">
              <input
                type="text"
                name="productionLocation"
                defaultValue={formInputs.productionLocation}
                readOnly
              />
            </div>
          </div>
          <div className="main-form__item">
            <div className="main-form__input_name">Комментарий</div>
            <div className="main-form__input_field">
              <input
                type="text"
                name="comment"
                defaultValue={formInputs.comment}
                readOnly
              />
            </div>
          </div>
          <div className="main-form__buttons main-form__buttons--full">
            <Button
              className="main-form__submit main-form__submit--inverted"
              inverted
              onClick={() => props.history.push('/products')}
              text="Вернуться назад"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ViewProduct;
