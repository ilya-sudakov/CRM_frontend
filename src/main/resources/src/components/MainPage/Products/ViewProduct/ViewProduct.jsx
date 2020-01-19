import React, { useEffect, useState } from 'react';
import './ViewProduct.scss';
import { getProductById } from '../../../../utils/RequestsAPI/Products.jsx';

const ViewProduct = (props) => {
    const [productInputs, setProductInputs] = useState({
        name: "",
        item: "",
        weight: "",
        group: "",
        category: "",
        unit: "",
        productionLocation: "",
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
                        category: oldProduct.category,
                        productionLocation: oldProduct.productionLocation,
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
                <div className="view_product__item">
                    <div className="view_product__input_name">Категория</div>
                    <div className="view_product__input_field">
                        <input type="text" name="weight" defaultValue={productInputs.category} readOnly />
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
                    <div className="view_product__input_name">Место производства</div>
                    <div className="view_product__input_field">
                        <input type="text" name="productionLocation" defaultValue={productInputs.productionLocation} readOnly />
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