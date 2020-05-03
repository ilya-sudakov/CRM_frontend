import React, { useEffect, useState } from 'react'
import './ViewProduct.scss'
import '../../../../utils/Form/Form.scss'
import { getProductById } from '../../../../utils/RequestsAPI/Products.jsx'
import { imgToBlobDownload } from '../../../../utils/functions.jsx'
import SelectPackaging from '../../PackagingPage/SelectPackaging/SelectPackaging.jsx'
import ImgLoader from '../../../../utils/TableView/ImgLoader/ImgLoader.jsx'

const ViewProduct = (props) => {
  const [productInputs, setProductInputs] = useState({
    name: '',
    item: '',
    weight: '',
    group: '',
    vendor: '',
    category: '',
    unit: '',
    productionLocation: '',
    packaging: [],
    comment: '',
  })

  const handleSubmit = (event) => {
    event.preventDefault()
    props.history.push('/products')
  }

  useEffect(() => {
    document.title = 'Просмотр продукта'
    const id = props.history.location.pathname.split('/products/view/')[1]
    if (isNaN(Number.parseInt(id))) {
      alert('Неправильный индекс заявки!')
      props.history.push('/products')
    } else {
      getProductById(id)
        .then((res) => res.json())
        .then((oldProduct) => {
          console.log(oldProduct)
          setProductInputs({
            name: oldProduct.name,
            photo: oldProduct.photo,
            item: oldProduct.item,
            weight: oldProduct.weight,
            category: oldProduct.category,
            vendor: oldProduct.vendor,
            productionLocation: oldProduct.productionLocation,
            unit: oldProduct.unit,
            packaging: oldProduct.packings,
            comment: oldProduct.comment,
          })
        })
        .catch((error) => {
          console.log(error)
          alert('Неправильный индекс заявки!')
          props.history.push('/products')
        })
    }
  }, [])

  return (
    <div className="view-product">
      <div className="main-form">
        <div className="main-form__title">Просмотр продукта</div>
        <form className="main-form__form">
          <div className="main-form__item">
            <div className="main-form__input_name">Фотография</div>
            <div className="main-form__product_img">
              <ImgLoader
                imgClass=""
                imgSrc={productInputs.photo}
                noPhotoTemplate
              />
              {productInputs.photo !== '' && (
                <div
                  className="main-form__submit"
                  onClick={() =>
                    imgToBlobDownload(
                      productInputs.photo,
                      productInputs.name + '.jpeg',
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
                defaultValue={productInputs.name}
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
                defaultValue={productInputs.category}
                readOnly
              />
            </div>
          </div>
          <div className="main-form__item">
            <div className="main-form__input_name">Вес изделия</div>
            <div className="main-form__input_field">
              <input
                type="text"
                name="weight"
                defaultValue={productInputs.weight}
                readOnly
              />
            </div>
          </div>
          {/* <div className="main-form__item">
          <div className="main-form__input_name">Единица измерения</div>
          <div className="main-form__input_field">
            <input
              type="text"
              name="unit"
              defaultValue={productInputs.unit}
              readOnly
            />
          </div>
        </div> */}
          <div className="main-form__item">
            <div className="main-form__input_name">Артикул</div>
            <div className="main-form__input_field">
              <input
                type="text"
                name="vendor"
                defaultValue={productInputs.vendor}
                readOnly
              />
            </div>
          </div>
          {/* <div className="main-form__item">
                    <div className="main-form__input_name">Упаковка</div>
                    <div className="main-form__input_field">
                        <input type="text" name="packaging" defaultValue={productInputs.packaging} readOnly />
                    </div>
                </div> */}
          <SelectPackaging defaultValue={productInputs.packaging} readOnly />
          <div className="main-form__item">
            <div className="main-form__input_name">Место производства</div>
            <div className="main-form__input_field">
              <input
                type="text"
                name="productionLocation"
                defaultValue={productInputs.productionLocation}
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
                defaultValue={productInputs.comment}
                readOnly
              />
            </div>
          </div>
          <div className="main-form__buttons">
            <input
              className="main-form__submit main-form__submit--inverted"
              type="submit"
              onClick={handleSubmit}
              value="Вернуться назад"
            />
          </div>
        </form>
      </div>
    </div>
  )
}

export default ViewProduct
