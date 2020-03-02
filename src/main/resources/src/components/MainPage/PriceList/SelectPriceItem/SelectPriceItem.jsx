import React, { useState, useEffect } from 'react';
import deleteSVG from '../../../../../../../../assets/select/delete.svg';
import './SelectPriceItem.scss';
import { getPriceListCoefficient } from '../../../../utils/RequestsAPI/PriceList/PriceList.jsx';
import FileUploader from '../../../../utils/Form/FileUploader/FileUploader.jsx';
import CheckBox from '../../../../utils/Form/CheckBox/CheckBox.jsx';

const SelectPriceItem = (props) => {
    // const [imgName, setImgName] = useState("Имя файла...");
    const [selected, setSelected] = useState([
        {
            number: '',
            units: '',
            name: '',
            description: '',
            retailPrice: 0,
            lessThan1500Price: 0,
            lessThan5000Price: 0,
            retailMarketPrice: 0,
            cost: 0,
            dealerPrice: 0,
            distributorPrice: 0,
            partnerPrice: 0,
            stopPrice: 0,
            onSale: false,
            isTopSeller: false,
        }
    ]);
    const [options, setOptions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [newItem, setNewItem] = useState(false);
    const [uniqueItem, setUniqueItem] = useState(false);
    const [proprietaryItem, setProprietaryItem] = useState(false);
    const [coefficients, setCoefficients] = useState({
        retailPrice: 1,
        dealerPrice: 0.56,
        distributorPrice: 0.485,
        partnerPrice: 0.79,
        stopPrice: 0.4545,
        lessThan5000Price: 0.89,
        lessThan1500Price: 0.96,
    })
    const [groupImg1, setGroupImg1] = useState(null);
    const [groupImg2, setGroupImg2] = useState(null);
    const [groupImg3, setGroupImg3] = useState(null);
    const [groupImg4, setGroupImg4] = useState(null);
    const [footerImg, setFooterImg] = useState(null);
    // const [visibleItems, setVisibleItems] = useState([{
    //     id: 
    // }])

    useEffect(() => {
        if (props.defaultValue !== undefined) {
            setSelected([...props.defaultValue]);
        }
        if (props.options !== undefined) {
            setOptions([...props.options])
        }
        if (props.groupImg1 !== undefined) {
            setGroupImg1(props.groupImg1)
        }
        if (props.groupImg2 !== undefined) {
            setGroupImg1(props.groupImg2)
        }
        if (props.newItem !== undefined) {
            setNewItem(props.newItem)
        }
        if (props.uniqueItem !== undefined) {
            setUniqueItem(props.uniqueItem)
        }
        if (props.proprietaryItem !== undefined) {
            setProprietaryItem(props.proprietaryItem)
        }
        getPriceListCoefficient()
            .then(res => res.json())
            .then(res => {
                setCoefficients({
                    retailPrice: Number.parseFloat(res.retailPrice),
                    dealerPrice: Number.parseFloat(res.dealerPrice),
                    distributorPrice: Number.parseFloat(res.distributorPrice),
                    partnerPrice: Number.parseFloat(res.partnerPrice),
                    stopPrice: Number.parseFloat(res.stopPrice),
                    lessThan5000Price: Number.parseFloat(res.lessThan5000Price),
                    lessThan1500Price: Number.parseFloat(res.lessThan1500Price),
                })
            })
    }, [props.defaultValue, props.options])

    const clickOnForm = (e) => {
        const id = e.currentTarget.getAttribute("index");
        const form = document.getElementsByClassName(props.uniqueId ? ("select-price-item__selected_form-" + props.uniqueId) : "select-price-item__selected_form")[id];
        if (form.classList.contains("select-price-item__selected_form--hidden")) {
            e.target.type !== 'text' && !e.target.classList.contains("select-price-item__img") && form.classList.remove("select-price-item__selected_form--hidden");
        }
        else {
            e.target.type !== 'text' && !e.target.classList.contains("select-price-item__img") && form.classList.add("select-price-item__selected_form--hidden");
        }
    }

    const handleNewPriceItem = (e) => {
        e.preventDefault();
        //Открыть по дефолту форму
        const id = selected.length;
        setSelected([
            ...selected,
            {
                number: '',
                units: '',
                name: '',
                description: '',
                retailPrice: 0,
                lessThan1500Price: 0,
                lessThan5000Price: 0,
                retailMarketPrice: 0,
                cost: 0,
                dealerPrice: 0,
                distributorPrice: 0,
                partnerPrice: 0,
                stopPrice: 0,
                onSale: false,
                isTopSeller: false,
            }
        ]);
        props.handlePriceItemChange([
            ...selected,
            {
                number: '',
                units: '',
                name: '',
                description: '',
                retailMarketPrice: 0,
                lessThan5000Price: 0,
                lessThan1500Price: 0,
                retailPrice: 0,
                cost: 0,
                dealerPrice: 0,
                distributorPrice: 0,
                partnerPrice: 0,
                stopPrice: 0,
                onSale: false,
                isTopSeller: false,
            }
        ]);
    }

    const deletePriceItem = (e) => {
        const id = e.target.getAttribute("index");
        let temp = selected;
        temp.splice(id, 1);
        setSelected([...temp]);
        props.handlePriceItemChange([...temp]);
    }

    const handleInputChange = (event) => {
        const id = event.target.getAttribute("index");
        const name = event.target.getAttribute("name");
        let value = event.target.value;
        let temp = selected;
        let originalItem = selected[id];
        if (name === 'cost') {
            value = parseFloat(value);
            temp.splice(id, 1, {
                ...originalItem,
                [name]: value,
                retailPrice: originalItem.retailMarketPrice,
                dealerPrice: (value + (originalItem.retailMarketPrice - value) * coefficients.dealerPrice).toFixed(2),
                distributorPrice: (value + (originalItem.retailMarketPrice - value) * coefficients.distributorPrice).toFixed(2),
                partnerPrice: (value + (originalItem.retailMarketPrice - value) * coefficients.partnerPrice).toFixed(2),
                stopPrice: (value + (originalItem.retailMarketPrice - value) * coefficients.stopPrice).toFixed(2),
                lessThan5000Price: (value + (originalItem.retailMarketPrice - value) * coefficients.lessThan5000Price).toFixed(2),
                lessThan1500Price: (value + (originalItem.retailMarketPrice - value) * coefficients.lessThan1500Price).toFixed(2),
            })
            setSelected([...temp]);
            props.handlePriceItemChange([...temp])
        }
        else if (name === 'retailMarketPrice') {
            value = parseFloat(value);
            temp.splice(id, 1, {
                ...originalItem,
                [name]: value,
                retailPrice: value,
                dealerPrice: (originalItem.cost + (value - originalItem.cost) * coefficients.dealerPrice).toFixed(2),
                distributorPrice: (originalItem.cost + (value - originalItem.cost) * coefficients.distributorPrice).toFixed(2),
                partnerPrice: (originalItem.cost + (value - originalItem.cost) * coefficients.partnerPrice).toFixed(2),
                stopPrice: (originalItem.cost + (value - originalItem.cost) * coefficients.stopPrice).toFixed(2),
                lessThan5000Price: (originalItem.cost + (value - originalItem.cost) * coefficients.lessThan5000Price).toFixed(2),
                lessThan1500Price: (originalItem.cost + (value - originalItem.cost) * coefficients.lessThan1500Price).toFixed(2),
            })
            setSelected([...temp]);
            props.handlePriceItemChange([...temp])
        }
        else {
            temp.splice(id, 1, {
                ...originalItem,
                [name]: value
            })
            setSelected([...temp]);
            props.handlePriceItemChange([...temp])
        }
    }

    return (
        <div className="select-price-item">
            {!props.readOnly &&
                <button className="select-price-item__button" onClick={handleNewPriceItem}>
                    Добавить продукцию
                </button>
            }
            <div className="select-price-item__selected">
                {!props.readOnly && <React.Fragment>
                    <div className="main-form__item">
                        <div className="main-form__input_name">Фотография 1</div>
                        <div className="main-form__input_field">
                            {groupImg1 &&
                                <div className="main-form__product_img">
                                    <img src={groupImg1} alt="" />
                                </div>
                            }
                            {!props.readOnly && <FileUploader
                                uniqueId={"file1" + props.uniqueId}
                                regex={/.+\.(jpeg|jpg|png|img)/}
                                onChange={(result) => {
                                    setGroupImg1(result)
                                    props.handleImgChange(result, 'img')
                                }}
                            />}
                        </div>
                    </div>
                    <div className="main-form__item">
                        <div className="main-form__input_name">Фотография 2</div>
                        <div className="main-form__input_field">
                            {groupImg2 &&
                                <div className="main-form__product_img">
                                    <img src={groupImg2} alt="" />
                                </div>
                            }
                            {!props.readOnly && <FileUploader
                                uniqueId={"file2" + props.uniqueId}
                                regex={/.+\.(jpeg|jpg|png|img)/}
                                onChange={(result) => {
                                    setGroupImg2(result)
                                    props.handleImgChange(result, 'groupImg2')
                                }}
                            />}
                        </div>
                    </div>
                    <div className="main-form__item">
                        <div className="main-form__input_name">Фотография 3</div>
                        <div className="main-form__input_field">
                            {groupImg3 &&
                                <div className="main-form__product_img">
                                    <img src={groupImg3} alt="" />
                                </div>
                            }
                            {!props.readOnly && <FileUploader
                                uniqueId={"file3" + props.uniqueId}
                                regex={/.+\.(jpeg|jpg|png|img)/}
                                onChange={(result) => {
                                    setGroupImg3(result)
                                    props.handleImgChange(result, 'groupImg3')
                                }}
                            />}
                        </div>
                    </div>
                    <div className="main-form__item">
                        <div className="main-form__input_name">Фотография 4</div>
                        <div className="main-form__input_field">
                            {groupImg4 &&
                                <div className="main-form__product_img">
                                    <img src={groupImg4} alt="" />
                                </div>
                            }
                            {!props.readOnly && <FileUploader
                                uniqueId={"file4" + props.uniqueId}
                                regex={/.+\.(jpeg|jpg|png|img)/}
                                onChange={(result) => {
                                    setGroupImg4(result)
                                    props.handleImgChange(result, 'groupImg4')
                                }}
                            />}
                        </div>
                    </div>
                    <div className="main-form__item">
                        <div className="main-form__input_name">Фотография снизу</div>
                        <div className="main-form__input_field">
                            {footerImg &&
                                <div className="main-form__product_img">
                                    <img src={footerImg} alt="" />
                                </div>
                            }
                            {!props.readOnly && <FileUploader
                                uniqueId={"file5" + props.uniqueId}
                                regex={/.+\.(jpeg|jpg|png|img)/}
                                onChange={(result) => {
                                    setFooterImg(result)
                                    props.handleImgChange(result, 'footerImg')
                                }}
                            />}
                        </div>
                    </div>
                </React.Fragment>}
                <div className="main-form__item">
                    <div className="main-form__input_name">Ярлыки</div>
                    <div className="main-form__input_field">
                        {/* <CheckBox
                            text="Новинка"
                            checked={newItem}
                            name="newItem"
                            onChange={(value, name) => {
                                setNewItem(value);
                                props.handleLabelChange(value, name);
                            }}
                        />
                        <CheckBox
                            text="Уникальная"
                            checked={uniqueItem}
                            name="uniqueItem"
                            onChange={(value, name) => {
                                setUniqueItem(value);
                                props.handleLabelChange(value, name);
                            }}
                        /> */}
                        <CheckBox
                            text="Запатентована"
                            checked={proprietaryItem}
                            name="proprietaryItem"
                            onChange={(value, name) => {
                                setProprietaryItem(value);
                                props.handleLabelChange(value, name);
                            }}
                        />
                    </div>
                </div>
                {selected.map((item, index) => (
                    <div className="select-price-item__selected_item" >
                        <div className="select-price-item__selected_header" index={index} onClick={clickOnForm}>
                            <div className="select-price-item__selected_name">
                                <span>Артикул: </span> <span>{item.number}</span>
                            </div>
                            <div className="select-price-item__selected_name">
                                <span>Описание: </span> <span>{item.description}</span>
                            </div>
                            <div className="select-price-item__selected_name">
                                <span>Розница: </span> <span>{item.retailPrice}</span>
                            </div>
                            <div className="select-price-item__selected_name">
                                <span>до 1500 шт.: </span> <span>{item.lessThan1500Price}</span>
                            </div>
                            <div className="select-price-item__selected_name">
                                <span>до 5000 шт.: </span> <span>{item.lessThan5000Price}</span>
                            </div>
                        </div>
                        <div className={props.uniqueId ? ("select-price-item__selected_form select-price-item__selected_form--hidden select-price-item__selected_form-" + props.uniqueId) : "select-price-item__selected_form select-price-item__selected_form--hidden"}>
                            <div className="select-price-item__item">
                                <div className="select-price-item__input_name">Название</div>
                                <div className="select-price-item__input_field">
                                    <input
                                        type="text"
                                        name="name"
                                        index={index}
                                        autoComplete="off"
                                        onChange={handleInputChange}
                                        defaultValue={item.name}
                                        readOnly={props.readOnly}
                                    />
                                </div>
                            </div>
                            <div className="select-price-item__item">
                                <div className="select-price-item__input_name">Артикул</div>
                                <div className="select-price-item__input_field">
                                    <input
                                        type="text"
                                        name="number"
                                        index={index}
                                        autoComplete="off"
                                        onChange={handleInputChange}
                                        defaultValue={item.number}
                                        readOnly={props.readOnly}
                                    />
                                </div>
                            </div>
                            <div className="select-price-item__item">
                                <div className="select-price-item__input_name">Описание</div>
                                <div className="select-price-item__input_field">
                                    <input
                                        type="text"
                                        name="description"
                                        index={index}
                                        autoComplete="off"
                                        onChange={handleInputChange}
                                        defaultValue={item.description}
                                        readOnly={props.readOnly}
                                    />
                                </div>
                            </div>
                            {/* <div className="select-price-item__item">
                                <div className="select-price-item__input_name">Себестоимость</div>
                                <div className="select-price-item__input_field">
                                    <input
                                        type="number"
                                        name="cost"
                                        index={index}
                                        autoComplete="off"
                                        onChange={handleInputChange}
                                        value={item.cost}
                                        readOnly={props.readOnly}
                                    />
                                </div>
                            </div> */}
                            <div className="select-price-item__item">
                                <div className="select-price-item__input_name">Розница (рыночная цена)</div>
                                <div className="select-price-item__input_field">
                                    <input
                                        type="number"
                                        name="retailMarketPrice"
                                        index={index}
                                        autoComplete="off"
                                        onChange={handleInputChange}
                                        value={item.retailMarketPrice}
                                        readOnly={props.readOnly}
                                    />
                                </div>
                            </div>
                            <div className="select-price-item__item">
                                <div className="select-price-item__input_name">Розница</div>
                                <div className="select-price-item__input_field">
                                    <input
                                        type="number"
                                        name="retailPrice"
                                        index={index}
                                        autoComplete="off"
                                        onChange={handleInputChange}
                                        value={item.retailPrice}
                                        readOnly={props.readOnly}
                                    />
                                </div>
                            </div>
                            <div className="select-price-item__item">
                                <div className="select-price-item__input_name">до 1500 шт.</div>
                                <div className="select-price-item__input_field">
                                    <input
                                        type="number"
                                        name="lessThan1500Price"
                                        index={index}
                                        autoComplete="off"
                                        onChange={handleInputChange}
                                        value={item.lessThan1500Price}
                                        readOnly={props.readOnly}
                                    />
                                </div>
                            </div>
                            <div className="select-price-item__item">
                                <div className="select-price-item__input_name">до 5000 шт.</div>
                                <div className="select-price-item__input_field">
                                    <input
                                        type="number"
                                        name="lessThan5000Price"
                                        index={index}
                                        autoComplete="off"
                                        onChange={handleInputChange}
                                        value={item.lessThan5000Price}
                                        readOnly={props.readOnly}
                                    />
                                </div>
                            </div>
                            <div className="select-price-item__item">
                                <div className="select-price-item__input_name">Партнер</div>
                                <div className="select-price-item__input_field">
                                    <input
                                        type="number"
                                        name="cost"
                                        index={index}
                                        autoComplete="off"
                                        onChange={handleInputChange}
                                        value={item.partnerPrice}
                                        readOnly={props.readOnly}
                                    />
                                </div>
                            </div>
                            <div className="select-price-item__item">
                                <div className="select-price-item__input_name">Дилер</div>
                                <div className="select-price-item__input_field">
                                    <input
                                        type="number"
                                        name="dealerPrice"
                                        index={index}
                                        autoComplete="off"
                                        onChange={handleInputChange}
                                        value={item.dealerPrice}
                                        readOnly={props.readOnly}
                                    />
                                </div>
                            </div>
                            <div className="select-price-item__item">
                                <div className="select-price-item__input_name">Дистрибутор</div>
                                <div className="select-price-item__input_field">
                                    <input
                                        type="number"
                                        name="distributorPrice"
                                        index={index}
                                        autoComplete="off"
                                        onChange={handleInputChange}
                                        value={item.distributorPrice}
                                        readOnly={props.readOnly}
                                    />
                                </div>
                            </div>
                            <div className="select-price-item__item">
                                <div className="select-price-item__input_name">Стопцена</div>
                                <div className="select-price-item__input_field">
                                    <input
                                        type="number"
                                        name="stopPrice"
                                        index={index}
                                        autoComplete="off"
                                        onChange={handleInputChange}
                                        value={item.stopPrice}
                                        readOnly={props.readOnly}
                                    />
                                </div>
                            </div>
                            <div className="select-price-item__item">
                                <div className="select-price-item__input_name">Акция</div>
                                <div className="select-price-item__input_field">
                                    <CheckBox
                                        checked={item.onSale}
                                        onChange={(value) => {
                                            let temp = selected;
                                            temp.splice(index, 1, {
                                                ...item,
                                                onSale: value
                                            })
                                            setSelected([...temp]);
                                            props.handlePriceItemChange([...temp]);
                                        }}
                                    />
                                </div>
                            </div>
                            {/* <div className="select-price-item__item">
                                <div className="select-price-item__input_name">Хит</div>
                                <div className="select-price-item__input_field">
                                    <CheckBox
                                        checked={item.isTopSeller}
                                        onChange={(value) => {
                                            let temp = selected;
                                            temp.splice(index, 1, {
                                                ...item,
                                                isTopSeller: value
                                            })
                                            setSelected([...temp]);
                                            props.handlePriceItemChange([...temp]);
                                        }}
                                    />
                                </div>
                            </div> */}
                        </div>
                        {!props.readOnly && (index !== 0) &&
                            <img index={index} onClick={deletePriceItem} className="select-price-item__img" src={deleteSVG} />
                        }
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SelectPriceItem;