import React, { useEffect, useState } from 'react';
import imgLandscape from '../../../../../../../../assets/product_landscape.jpg';
import './ViewProduct.scss';
import { getProductById } from '../../../../utils/utilsAPI.jsx';

const ViewProduct = (props) => {
    const [productInputs, setProductInputs] = useState({
        name: "",
        item: "",
        weight: "",
        group: "",
        typeOfProduct: "",
        unit: "",
        packaging: "",
        comment: ""
    })

    const handleSubmit = (event) => {
        event.preventDefault();
        props.history.push("/products");
    }

    useEffect(() => {
        document.title = "Просмотр продукта";
        const id = props.history.location.pathname.split("/products/view/")[1];
        if (isNaN(Number.parseInt(id))) {
            alert('Неправильный индекс заявки!');
            props.history.push("/products");
        } else {
            getProductById(id)
                .then(res => res.json())
                .then(oldProduct => {
                    setProductInputs({
                        name: oldProduct.name,
                        photo: oldProduct.photo,
                        item: oldProduct.item,
                        weight: oldProduct.weight,
                        typeOfProduct: oldProduct.typeOfProduct,
                        unit: oldProduct.unit,
                        packaging: oldProduct.packaging,
                        comment: oldProduct.comment
                    });
                })
                .catch(error => {
                    console.log(error);
                    alert('Неправильный индекс заявки!');
                    props.history.push("/products");
                })
        }
    }, [])
    return (
        <div className="view_product">
            <div className="view_product__title">Просмотр продукта</div>
            <form className="view_product__form">
                <div className="view_product__item">
                    <div className="view_product__input_name">Фотография</div>
                    <div className="view_product__product_img">
                        <img src={productInputs.photo} alt="" />
                    </div>
                </div>
                <div className="view_product__item">
                    <div className="view_product__input_name">Наименование</div>
                    <div className="view_product__input_field">
                        <input type="text" name="name" defaultValue={productInputs.name} readOnly />
                    </div>
                </div>
                {/* <div className="view_product__item">
                    <div className="view_product__input_name">Артикул</div>
                    <div className="view_product__input_field">
                        <input type="text" name="item" defaultValue={productInputs.item} readOnly />
                    </div>
                </div> */}
                <div className="view_product__item">
                    <div className="view_product__input_name">Группа продукции</div>
                    <div className="view_product__input_field">
                        <input type="text" name="comment" defaultValue={
                            productInputs.typeOfProduct === "FIRST" ? "Первая группа"
                                : productInputs.typeOfProduct === "SECOND" ? "Вторая группа"
                                    : productInputs.typeOfProduct === "THIRD" ? "Третья группа"
                                        : null
                        }
                            readOnly />
                    </div>
                </div>
                <div className="view_product__item">
                    <div className="view_product__input_name">Вес изделия</div>
                    <div className="view_product__input_field">
                        <input type="text" name="weight" defaultValue={productInputs.weight} readOnly />
                    </div>
                </div>
                <div className="view_product__item">
                    <div className="view_product__input_name">Единица измерения</div>
                    <div className="view_product__input_field">
                        <input type="text" name="unit" defaultValue={productInputs.unit} readOnly />
                    </div>
                </div>
                <div className="view_product__item">
                    <div className="view_product__input_name">Упаковка</div>
                    <div className="view_product__input_field">
                        <input type="text" name="packaging" defaultValue={productInputs.packaging} readOnly />
                    </div>
                </div>
                <div className="view_product__item">
                    <div className="view_product__input_name">Комментарий</div>
                    <div className="view_product__input_field">
                        <input type="text" name="comment" defaultValue={productInputs.comment} readOnly />
                    </div>
                </div>
                <input className="view_product__submit" type="submit" onClick={handleSubmit} value="Вернуться назад" />
            </form>
        </div>
    );
};

export default ViewProduct;