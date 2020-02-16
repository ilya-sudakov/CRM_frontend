import React, { useState, useEffect } from 'react';
import './NewPriceList.scss';
import '../../../../utils/Form/Form.scss';
import InputText from '../../../../utils/Form/InputText/InputText.jsx';
import ErrorMessage from '../../../../utils/Form/ErrorMessage/ErrorMessage.jsx';
import ImgLoader from '../../../../utils/TableView/ImgLoader/ImgLoader.jsx';
import SelectPriceItem from '../SelectPriceItem/SelectPriceItem.jsx';
import XLSX from 'xlsx';
import { addPriceGroup, addProductToPriceGroup, getPriceListCoefficient } from '../../../../utils/RequestsAPI/PriceList/PriceList.jsx';
import { getPriceListPdfText, getHTML } from '../../../../utils/functions.jsx';
import testImg from '../../../../../../../../assets/priceList/test.jpg';
import category1Img from '../../../../../../../../assets/priceList/крепеж_для_деревянных_досок.jpg';
import category2Img from '../../../../../../../../assets/priceList/крепеж_для_дпк_досок.jpg';
import category3Img from '../../../../../../../../assets/priceList/крепежные_элементы.jpg';
import categoryImg from '../../../../../../../../assets/priceList/крепежные_элементы.jpg';
import locationType1Img from '../../../../../../../../assets/priceList/Фасад.png';
import locationType2Img from '../../../../../../../../assets/priceList/Терраса.png';

const NewPriceList = (props) => {
    const [locationTypes, setLocationTypes] = useState([
        {
            name: 'Фасад',
            img: locationType1Img
        },
        {
            name: 'Терраса',
            img: locationType2Img
        },
    ])
    const [optionalCols, setOptionalCols] = useState([
        {
            property: 'partnerPrice',
            name: 'Партнер',
            active: false
        },
        {
            property: 'dealerPrice',
            name: 'Дилер',
            active: false
        },
        {
            property: 'distributorPrice',
            name: 'Дистрибутор',
            active: false
        }
    ])
    const [categories, setCategories] = useState([
        {
            name: 'Крепеж для деревянных досок',
            img: category1Img,
            active: true
        },
        {
            name: 'Крепеж для ДПК досок',
            img: category2Img,
            active: true
        },
        {
            name: 'Крепежные элементы',
            img: category3Img,
            active: true
        },
        {
            name: 'Продукция для подконструкций',
            img: categoryImg,
            active: true
        },
        {
            name: 'Крепеж для НВФ',
            img: categoryImg,
            active: true
        },
    ]);
    const [disclaimer, setDisclaimer] = useState('');
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
    const [formErrors, setFormErrors] = useState({
        name: false,
        description: false,
        products: false,
        linkAddress: false,
        infoText: false,
        cost: false,
        dealerPrice: false,
        distributorPrice: false,
        partnerPrice: false,
        retailMarketPrice: false,
    });
    const [validInputs, setValidInputs] = useState({
        name: false,
        description: false,
        products: false,
        linkAddress: false,
        infoText: false,
        cost: false,
        dealerPrice: true,
        distributorPrice: true,
        partnerPrice: true,
        retailMarketPrice: false,
    });

    const [showError, setShowError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [imgName, setImgName] = useState("Имя файла...");
    const [coefficients, setCoefficients] = useState({
        retailPrice: 1,
        dealerPrice: 0.56,
        distributorPrice: 0.485,
        partnerPrice: 0.79,
        stopPrice: 0.4545,
        lessThan5000Price: 0.89,
        lessThan1500Price: 0.96,
    });
    const [priceList, setPriceList] = useState([]);

    const validateField = (fieldName, value) => {
        switch (fieldName) {
            default:
                if (validInputs[fieldName] !== undefined) {
                    setValidInputs({
                        ...validInputs,
                        [fieldName]: (value !== "")
                    })
                }
                break;
        }
    }

    const formIsValid = () => {
        let check = true;
        let newErrors = Object.assign({
            name: false,
            description: false,
            products: false,
            linkAddress: false,
            infoText: false,
            cost: false,
            dealerPrice: false,
            distributorPrice: false,
            partnerPrice: false,
            retailMarketPrice: false,
        });
        for (let item in validInputs) {
            // console.log(item, validInputs[item]);            
            if (validInputs[item] === false) {
                check = false;
                newErrors = Object.assign({
                    ...newErrors,
                    [item]: true
                })
            }
        }
        setFormErrors(newErrors);
        if (check === true) {
            return true;
        }
        else {
            // alert("Форма не заполнена");
            setIsLoading(false);
            setShowError(true);
            return false;
        };
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setIsLoading(true);
        console.log(priceListInputs);
        formIsValid() && addPriceGroup({
            ...priceListInputs,
            locationType: priceListInputs.locationType.reduce((sum, cur, index) => {
                if (index < (priceListInputs.locationType.length - 1)) {
                    return (sum + cur + '/')
                }
                else {
                    return (sum + cur)
                }
            }, '')
        })
            .then(res => res.json())
            .then((res) => {
                Promise.all(priceListInputs.products.map(item => {
                    console.log({ ...item, priceGroupProductId: res.id });

                    return addProductToPriceGroup({ ...item, priceGroupProductId: res.id });
                }))
                    .then(() => props.history.push("/price-list"))
                    .catch(error => {
                        setIsLoading(false);
                        alert('Ошибка при добавлении записи');
                        console.log(error);
                    })
            })
    }

    const handleInputChange = e => {
        let { name, value } = e.target;
        validateField(name, value);
        // setPriceListInputs({
        //     ...priceListInputs,
        //     [name]: value
        // })
        setFormErrors({
            ...formErrors,
            [name]: false
        })
        if (name === 'cost') {
            value = parseFloat(value);
            console.log(value, coefficients.dealerPrice);
            let temp = Object.assign({
                ...priceListInputs,
                [name]: value,
                retailPrice: priceListInputs.retailMarketPrice,
                dealerPrice: (value + (priceListInputs.retailMarketPrice - value) * coefficients.dealerPrice).toFixed(2),
                distributorPrice: (value + (priceListInputs.retailMarketPrice - value) * coefficients.distributorPrice).toFixed(2),
                partnerPrice: (value + (priceListInputs.retailMarketPrice - value) * coefficients.partnerPrice).toFixed(2),
                stopPrice: (value + (priceListInputs.retailMarketPrice - value) * coefficients.stopPrice).toFixed(2),
                lessThan5000Price: (value + (priceListInputs.retailMarketPrice - value) * coefficients.lessThan5000Price).toFixed(2),
                lessThan1500Price: (value + (priceListInputs.retailMarketPrice - value) * coefficients.lessThan1500Price).toFixed(2),
            })
            setPriceListInputs(temp);
        }
        else if (name === 'retailMarketPrice') {
            value = parseFloat(value);
            let temp = Object.assign({
                ...priceListInputs,
                [name]: value,
                retailPrice: value,
                dealerPrice: (priceListInputs.cost + (value - priceListInputs.cost) * coefficients.dealerPrice).toFixed(2),
                distributorPrice: (priceListInputs.cost + (value - priceListInputs.cost) * coefficients.distributorPrice).toFixed(2),
                partnerPrice: (priceListInputs.cost + (value - priceListInputs.cost) * coefficients.partnerPrice).toFixed(2),
                stopPrice: (priceListInputs.cost + (value - priceListInputs.cost) * coefficients.stopPrice).toFixed(2),
                lessThan5000Price: (priceListInputs.cost + (value - priceListInputs.cost) * coefficients.lessThan5000Price).toFixed(2),
                lessThan1500Price: (priceListInputs.cost + (value - priceListInputs.cost) * coefficients.lessThan1500Price).toFixed(2),
            })
            setPriceListInputs(temp);
        }
        else {
            setPriceListInputs({
                ...priceListInputs,
                [name]: value
            })
        }
    }

    useEffect(() => {
        document.title = "Добавление продукции";
        getPriceListCoefficient()
            .then(res => res.json())
            .then(res => {
                // console.log(res);
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
    }, [])

    return (
        <div className="new-price-item">
            <div className="main-form">
                <div className="main-form__title">Считать данные из файла</div>
                <form className="main-form__form">
                    {/* <ErrorMessage
                        message="Не заполнены все обязательные поля!"
                        showError={showError}
                        setShowError={setShowError}
                    />
                    <InputText
                        inputName="Название"
                        required
                        name="name"
                        error={formErrors.name}
                        defaultValue={priceListInputs.name}
                        errorsArr={formErrors}
                        setErrorsArr={setFormErrors}
                        handleInputChange={handleInputChange}
                    />
                    <InputText
                        inputName="Описание"
                        required
                        name="description"
                        error={formErrors.description}
                        errorsArr={formErrors}
                        setErrorsArr={setFormErrors}
                        handleInputChange={handleInputChange}
                    />
                    <InputText
                        inputName="Себестоимость"
                        required
                        name="cost"
                        type="number"
                        error={formErrors.cost}
                        defaultValue={priceListInputs.cost}
                        errorsArr={formErrors}
                        setErrorsArr={setFormErrors}
                        handleInputChange={handleInputChange}
                    />
                    <InputText
                        inputName="Розница (рыночная цена)"
                        required
                        name="retailMarketPrice"
                        type="number"
                        error={formErrors.retailMarketPrice}
                        defaultValue={priceListInputs.retailMarketPrice}
                        errorsArr={formErrors}
                        setErrorsArr={setFormErrors}
                        handleInputChange={handleInputChange}
                    />
                    <InputText
                        inputName="Цена дилера"
                        required
                        name="dealerPrice"
                        type="number"
                        error={formErrors.dealerPrice}
                        defaultValue={priceListInputs.dealerPrice}
                        errorsArr={formErrors}
                        setErrorsArr={setFormErrors}
                        handleInputChange={handleInputChange}
                    />
                    <InputText
                        inputName="Цена дистрибутора"
                        required
                        name="distributorPrice"
                        type="number"
                        error={formErrors.distributorPrice}
                        defaultValue={priceListInputs.distributorPrice}
                        errorsArr={formErrors}
                        setErrorsArr={setFormErrors}
                        handleInputChange={handleInputChange}
                    />
                    <InputText
                        inputName="Цена партнера"
                        required
                        name="partnerPrice"
                        type="number"
                        error={formErrors.partnerPrice}
                        defaultValue={priceListInputs.partnerPrice}
                        errorsArr={formErrors}
                        setErrorsArr={setFormErrors}
                        handleInputChange={handleInputChange}
                    />
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
                                userHasAccess={props.userHasAccess}
                            />
                        </div>
                    </div>
                    <div className="main-form__item">
                        <div className="main-form__input_name">Тип местоположения*</div>
                        <div className="main-form__input_field main-form__input_field--vertical">
                            <label class="main-form__checkbox-container">
                                Фасад
                                <input
                                    type="checkbox"
                                    name="locationType"
                                    value="Фасад"
                                    onChange={(event) => {
                                        const { name, value } = event.target;
                                        let check = false;
                                        priceListInputs.locationType.map((item, index) => {
                                            if (item === value) {
                                                check = index;
                                            }
                                        });
                                        let originalList = priceListInputs.locationType;
                                        if (check !== false) {
                                            originalList.splice(check, 1);
                                        }
                                        else {
                                            originalList.push(value)
                                        }
                                        setPriceListInputs({
                                            ...priceListInputs,
                                            locationType: originalList
                                        })
                                    }}
                                    defaultChecked={priceListInputs.locationType.reduce((prev, cur) => {
                                        if (cur === 'Фасад') {
                                            return true
                                        }
                                    }, false)}
                                />
                                <div class="main-form__checkmark"></div>
                            </label>
                            <label class="main-form__checkbox-container">
                                Терраса
                                <input
                                    type="checkbox"
                                    name="locationType"
                                    value="Терраса"
                                    onChange={(event) => {
                                        const { name, value } = event.target;
                                        let check = false;
                                        priceListInputs.locationType.map((item, index) => {
                                            if (item === value) {
                                                check = index;
                                            }
                                        });
                                        let originalList = priceListInputs.locationType;
                                        if (check !== false) {
                                            originalList.splice(check, 1);
                                        }
                                        else {
                                            originalList.push(value)
                                        }
                                        setPriceListInputs({
                                            ...priceListInputs,
                                            locationType: originalList
                                        })
                                    }}
                                    defaultChecked={priceListInputs.locationType.reduce((prev, cur) => {
                                        if (cur === 'Терраса') {
                                            return true
                                        }
                                    }, false)}
                                />
                                <div class="main-form__checkmark"></div>
                            </label>
                        </div>
                    </div>*/}
                    {/* {priceListInputs.img && <div className="main-form__item">
                        <div className="main-form__input_name">Фотография</div>
                        <div className="main-form__product_img">
                            <img src={priceListInputs.img} alt="" />
                        </div>
                    </div>} */}
                    <div className="main-form__item">
                        <div className="main-form__input_name">Файл .xlsx</div>
                        <div className="main-form__file_upload">
                            <div className="main-form__file_name">
                                {imgName}
                            </div>
                            <label className="main-form__label" htmlFor="file">
                                Загрузить файл
                            </label>
                            <input type="file" name="file" id="file" onChange={(event) => {
                                let regex = /.+\.(xlsx|csv)/;
                                let file = event.target.files[0];
                                if (file.name.match(regex) !== null) {
                                    setImgName(file.name);
                                    let reader = new FileReader();
                                    reader.onloadend = (() => {
                                        let data = new Uint8Array(reader.result);
                                        let wb = XLSX.read(data, { type: 'array' });
                                        var firstSheetName = wb.SheetNames[0];
                                        let firstSheet = wb.Sheets[firstSheetName];
                                        var excelRows = XLSX.utils.sheet_to_json(firstSheet);
                                        // console.log(excelRows);
                                        setDisclaimer(excelRows[excelRows.length - 1].id);
                                        let newData = [];
                                        let tempNumber = '000';
                                        let groupData = null;
                                        let startId = 0, endId = 0;
                                        for (let index = 3; index < excelRows.length; index++) {
                                            let item = excelRows[index];
                                            if (item.id === '1.') {
                                                startId = index;
                                                endId = index;
                                                groupData = Object.assign({
                                                    id: item.id,
                                                    img: '',
                                                    category: item.category,
                                                    name: item.groupName,
                                                    description: item.description,
                                                    infoText: item.infoText,
                                                    linkAddress: item.linkAddress,
                                                    locationType: item.locationType,
                                                    priceHeader: item.priceHeader,
                                                    retailName: item.retailName,
                                                    firstPriceName: item.firstPriceName,
                                                    secondPriceName: item.secondPriceName,
                                                    dealerName: item.dealerName,
                                                    distributorName: item.distributorName,
                                                    partnerName: item.partnerName
                                                });
                                                tempNumber = item.number.substring(0, 3);
                                            } else {
                                                let products = [];
                                                for (let i = startId; i <= endId; i++) {
                                                    products.push(Object.assign({
                                                        id: excelRows[i].id,
                                                        number: excelRows[i].number,
                                                        name: excelRows[i].name,
                                                        description: excelRows[i].productDescription,
                                                        units: excelRows[i].units,
                                                        lessThan1500Price: excelRows[i].firstPrice.toFixed(2),
                                                        lessThan5000Price: excelRows[i].secondPrice.toFixed(2),
                                                        cost: excelRows[i].cost.toFixed(2),
                                                        retailMarketPrice: excelRows[i].retailMarketPrice.toFixed(2),
                                                        retailPrice: excelRows[i].retailPrice.toFixed(2),
                                                        firstPrice: excelRows[i].firstPrice.toFixed(2),
                                                        secondPrice: excelRows[i].secondPrice.toFixed(2),
                                                        partnerPrice: excelRows[i].partnerPrice.toFixed(2),
                                                        dealerPrice: excelRows[i].dealerPrice.toFixed(2),
                                                        distributorPrice: excelRows[i].distributorPrice.toFixed(2),
                                                    }));
                                                }
                                                if (item.number) {
                                                    if (item.number.includes(tempNumber)) {
                                                        endId++;
                                                    }
                                                    else {
                                                        newData.push({
                                                            ...groupData,
                                                            products
                                                        });
                                                        groupData = Object.assign({
                                                            id: item.id,
                                                            img: '',
                                                            category: item.category,
                                                            name: item.groupName,
                                                            description: item.description,
                                                            infoText: item.infoText,
                                                            linkAddress: item.linkAddress,
                                                            locationType: item.locationType,
                                                            priceHeader: item.priceHeader,
                                                            retailName: item.retailName,
                                                            firstPriceName: item.firstPriceName,
                                                            secondPriceName: item.secondPriceName,
                                                            dealerName: item.dealerName,
                                                            distributorName: item.distributorName,
                                                            partnerName: item.partnerName
                                                        });
                                                        startId = index;
                                                        endId = index;
                                                        tempNumber = item.number.substring(0, 3);
                                                    }
                                                }
                                                else {
                                                    newData.push({
                                                        ...groupData,
                                                        products
                                                    });
                                                    break;
                                                }
                                            }
                                        }
                                        setPriceList(newData);
                                        console.log(newData)
                                    });
                                    reader.readAsArrayBuffer(file);
                                }
                                else {
                                    setImgName('Некорректный формат файла!');
                                }
                            }} />
                        </div>
                    </div>
                    <div className="main-form__buttons">
                        <input className="main-form__submit main-form__submit--inverted" type="submit" onClick={() => props.history.push('/price-list')} value="Вернуться назад" />
                        {/* <input className="main-form__submit" type="submit" onClick={handleSubmit} value="Добавить продукцию" /> */}
                        {priceList.length > 0 && <input className="main-form__submit" type="submit" onClick={(event) => {
                            event.preventDefault();
                            setIsLoading(true);
                            getPriceListPdfText(
                                categories,
                                priceList,
                                optionalCols.filter(item => item.active && item),
                                locationTypes,
                                disclaimer
                            );
                            setIsLoading(false);
                        }} value="Открыть .pdf" />}
                        {isLoading && <ImgLoader />}
                    </div>
                    {priceList.map((item, index) => {
                        return <React.Fragment>
                            {/* <hr /> */}
                            <InputText
                                inputName="Группа продукций"
                                name="name"
                                defaultValue={item.name}
                                handleInputChange={(event) => {
                                    let temp = priceList;
                                    temp.splice(index, 1, {
                                        ...item,
                                        name: event.target.value
                                    })
                                    setPriceList([...temp])
                                }}
                            />
                            <div className="main-form__item">
                                <div className="main-form__input_name">Продукция</div>
                                <div className="main-form__input_field">
                                    <SelectPriceItem
                                        handlePriceItemChange={(value) => {
                                            let temp = priceList;
                                            temp.splice(index, 1, {
                                                ...item,
                                                products: value
                                            })
                                            setPriceList([...temp])
                                        }}
                                        handleImgChange={(newImg) => {
                                            let temp = priceList;
                                            temp.splice(index, 1, {
                                                ...item,
                                                img: newImg
                                            })
                                            setPriceList([...temp])
                                        }}
                                        uniqueId={index}
                                        defaultValue={item.products}
                                        userHasAccess={props.userHasAccess}
                                    />
                                </div>
                            </div>
                        </React.Fragment>
                    })}
                    {/* <InputText
                        inputName="Ссылка на продукцию"
                        required
                        name="linkAddress"
                        error={formErrors.linkAddress}
                        errorsArr={formErrors}
                        setErrorsArr={setFormErrors}
                        handleInputChange={handleInputChange}
                    />
                    <InputText
                        inputName="Примечание"
                        required
                        name="infoText"
                        error={formErrors.infoText}
                        errorsArr={formErrors}
                        setErrorsArr={setFormErrors}
                        handleInputChange={handleInputChange}
                    />
                    <div className="main-form__item">
                        <div className="main-form__input_name">Категория*</div>
                        <div className="main-form__input_field">
                            <select
                                name="category"
                                onChange={handleInputChange}
                                defaultValue={priceListInputs.category}
                            >
                                <option>Крепеж для деревянных досок</option>
                                <option>Крепеж для ДПК досок</option>
                                <option>Крепежные элементы</option>
                                <option>Продукция для подконструкций</option>
                                <option>Крепеж для НВФ</option>
                            </select>
                        </div>
                    </div> */}
                    {/* <div className="main-form__buttons">
                        <input className="main-form__submit main-form__submit--inverted" type="submit" onClick={() => props.history.push('/price-list')} value="Вернуться назад" />
                        <input className="main-form__submit main-form__submit--inverted" type="submit" onClick={() => {
                            setIsLoading(true);
                            getPriceListPdfText(
                                categories,
                                priceList,
                                optionalCols.filter(item => item.active && item)
                            );
                            setIsLoading(false);
                        }} value="Открыть .pdf" />
                        {isLoading && <ImgLoader />}
                    </div> */}
                </form>
            </div>
        </div>
    );
};

export default NewPriceList;