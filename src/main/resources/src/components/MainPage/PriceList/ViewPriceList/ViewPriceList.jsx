import React, { useState, useEffect } from 'react';
import './ViewPriceList.scss';
import '../../../../utils/Form/Form.scss';
import InputText from '../../../../utils/Form/InputText/InputText.jsx';
import ErrorMessage from '../../../../utils/Form/ErrorMessage/ErrorMessage.jsx';
import ImgLoader from '../../../../utils/TableView/ImgLoader/ImgLoader.jsx';
import SelectPriceItem from '../SelectPriceItem/SelectPriceItem.jsx';
import { addPriceGroup, addProductToPriceGroup, getPriceListCoefficient, getPriceGroupById } from '../../../../utils/RequestsAPI/PriceList/PriceList.jsx';
import CheckBox from '../../../../utils/Form/CheckBox/CheckBox.jsx';

const ViewPriceList = (props) => {
    const [priceListInputs, setPriceListInputs] = useState({
        name: '',
        description: '',
        products: [],
        locationType: ['Фасад'],
        linkAddress: '',
        infoText: '',
        cost: 0,
        dealerPrice: 0,
        distributorPrice: 0,
        partnerPrice: 0,
        img: '',
        retailMarketPrice: 0,
        category: 'Крепеж для деревянных досок'
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        setIsLoading(true);
    }

    useEffect(() => {
        document.title = "Добавление продукции";
        const id = props.history.location.pathname.split("/price-list/view/")[1];
        if (isNaN(Number.parseInt(id))) {
            alert('Неправильный индекс продукции!');
            props.history.push("/price-list");
        } else {
            getPriceGroupById(id)
                .then(res => res.json())
                .then(res => {
                    console.log(res);
                    setPriceListInputs({ ...res, locationType: res.locationType.split('/') });
                })
        }
    }, [])

    return (
        <div className="view-price-item">
            <div className="main-form">
                <div className="main-form__title">Новая продукция</div>
                <form className="main-form__form">
                    <InputText
                        inputName="Название"
                        name="name"
                        readOnly
                        defaultValue={priceListInputs.name}
                    />
                    <InputText
                        inputName="Описание"
                        readOnly
                        name="description"
                        defaultValue={priceListInputs.description}
                    />
                    <InputText
                        inputName="Себестоимость"
                        name="cost"
                        type="number"
                        readOnly
                        defaultValue={priceListInputs.cost}
                    />
                    <InputText
                        inputName="Розница (рыночная цена)"
                        name="retailMarketPrice"
                        type="number"
                        readOnly
                        defaultValue={priceListInputs.retailMarketPrice}
                    />
                    <InputText
                        inputName="Цена дилера"
                        name="dealerPrice"
                        type="number"
                        defaultValue={priceListInputs.dealerPrice}
                        readOnly
                    />
                    <InputText
                        inputName="Цена дистрибутора"
                        readOnly
                        name="distributorPrice"
                        type="number"
                        defaultValue={priceListInputs.distributorPrice}
                    />
                    <InputText
                        inputName="Цена партнера"
                        readOnly
                        name="partnerPrice"
                        type="number"
                        defaultValue={priceListInputs.partnerPrice}
                    />
                    {/* SelectPriceProduct */}
                    <div className="main-form__item">
                        <div className="main-form__input_name">Продукция*</div>
                        <div className="main-form__input_field">
                            <SelectPriceItem
                                handlePriceItemChange={(value) => {
                                    validateField("products", value);
                                    setPriceListInputs({
                                        ...priceListInputs,
                                        products: value
                                    })
                                }}
                                groupImg1={priceListInputs.img}
                                readOnly
                                userHasAccess={props.userHasAccess}
                                defaultValue={priceListInputs.products}
                            />
                        </div>
                    </div>
                    <div className="main-form__item">
                        <div className="main-form__input_name">Тип местоположения*</div>
                        <div className="main-form__input_field main-form__input_field--vertical">
                            <CheckBox
                                text="Фасад"
                                defaultChecked={
                                    priceListInputs.locationType.reduce((prev, cur) => {
                                        if (cur === 'Фасад') {
                                            return true
                                        }
                                        else return false;
                                    }, false)
                                }
                                disabled="disabled"
                                value="Фасад"
                                name="locationType"
                            />
                            <CheckBox
                                text="Терраса"
                                defaultChecked={
                                    priceListInputs.locationType.reduce((prev, cur) => {
                                        if (cur === 'Терраса') {
                                            return true
                                        }
                                        else return false;
                                    }, false)
                                }
                                disabled="disabled"
                                value="Терраса"
                                name="locationType"
                            />
                        </div>
                    </div>
                    {priceListInputs.img && <div className="main-form__item">
                        <div className="main-form__input_name">Фотография</div>
                        <div className="main-form__product_img">
                            <img src={priceListInputs.img} alt="" />
                        </div>
                    </div>}
                    <InputText
                        inputName="Ссылка на продукцию"
                        readOnly
                        defaultValue={priceListInputs.linkAddress}
                        name="linkAddress"
                    />
                    <InputText
                        inputName="Примечание"
                        readOnly
                        defaultValue={priceListInputs.infoText}
                        name="infoText"
                    />

                    <InputText
                        inputName="Категория"
                        readOnly
                        defaultValue={priceListInputs.category}
                        name="category"
                    />
                    <div className="main-form__buttons">
                        <input className="main-form__submit main-form__submit--inverted" type="submit" onClick={() => props.history.push('/price-list')} value="Вернуться назад" />
                        {isLoading && <ImgLoader />}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ViewPriceList;