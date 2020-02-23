import React, { useState, useEffect } from 'react';
import './NewPriceList.scss';
import '../../../../utils/Form/Form.scss';
import ImgLoader from '../../../../utils/TableView/ImgLoader/ImgLoader.jsx';
import SelectPriceItem from '../SelectPriceItem/SelectPriceItem.jsx';
import XLSX from 'xlsx';
import { addPriceGroup, addProductToPriceGroup, getPriceListCoefficient, getImage } from '../../../../utils/RequestsAPI/PriceList/PriceList.jsx';
import { getPriceListPdfText } from '../../../../utils/pdfFunctions.jsx';
import category1Img from '../../../../../../../../assets/priceList/крепеж_для_деревянных_досок.png';
import category2Img from '../../../../../../../../assets/priceList/крепеж_для_дпк_досок.png';
import category3Img from '../../../../../../../../assets/priceList/крепежные_элементы.png';
import categoryImg from '../../../../../../../../assets/priceList/крепежные_элементы.png';
import locationType1Img from '../../../../../../../../assets/priceList/Фасад.png';
import locationType2Img from '../../../../../../../../assets/priceList/Терраса.png';
import FileUploader from '../../../../utils/Form/FileUploader/FileUploader.jsx';
import CheckBox from '../../../../utils/Form/CheckBox/CheckBox.jsx';

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
            property: 'dealerPrice',
            name: 'Дилер',
            active: false
        },
        {
            property: 'distributorPrice',
            name: 'Дистрибутор',
            active: false
        },
        {
            property: 'partnerPrice',
            name: 'Партнер',
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
    const [priceList, setPriceList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [disclaimer, setDisclaimer] = useState('');
    // const [priceListInputs, setPriceListInputs] = useState({
    //     name: '',
    //     description: '',
    //     products: [],
    //     locationType: ['Фасад'],
    //     linkAddress: '',
    //     infoText: '',
    //     cost: 0,
    //     dealerPrice: 0,
    //     distributorPrice: 0,
    //     partnerPrice: 0,
    //     img: '',
    //     retailMarketPrice: 0,
    //     category: 'Крепеж для деревянных досок'
    // });
    // const [formErrors, setFormErrors] = useState({
    //     name: false,
    //     description: false,
    //     products: false,
    //     linkAddress: false,
    //     infoText: false,
    //     cost: false,
    //     dealerPrice: false,
    //     distributorPrice: false,
    //     partnerPrice: false,
    //     retailMarketPrice: false,
    // });
    // const [validInputs, setValidInputs] = useState({
    //     name: false,
    //     description: false,
    //     products: false,
    //     linkAddress: false,
    //     infoText: false,
    //     cost: false,
    //     dealerPrice: true,
    //     distributorPrice: true,
    //     partnerPrice: true,
    //     retailMarketPrice: false,
    // });

    // const [showError, setShowError] = useState(false);
    // const [coefficients, setCoefficients] = useState({
    //     retailPrice: 1,
    //     dealerPrice: 0.56,
    //     distributorPrice: 0.485,
    //     partnerPrice: 0.79,
    //     stopPrice: 0.4545,
    //     lessThan5000Price: 0.89,
    //     lessThan1500Price: 0.96,
    // });

    // const validateField = (fieldName, value) => {
    //     switch (fieldName) {
    //         default:
    //             if (validInputs[fieldName] !== undefined) {
    //                 setValidInputs({
    //                     ...validInputs,
    //                     [fieldName]: (value !== "")
    //                 })
    //             }
    //             break;
    //     }
    // }

    // const formIsValid = () => {
    //     let check = true;
    //     let newErrors = Object.assign({
    //         name: false,
    //         description: false,
    //         products: false,
    //         linkAddress: false,
    //         infoText: false,
    //         cost: false,
    //         dealerPrice: false,
    //         distributorPrice: false,
    //         partnerPrice: false,
    //         retailMarketPrice: false,
    //     });
    //     for (let item in validInputs) {
    //         // console.log(item, validInputs[item]);            
    //         if (validInputs[item] === false) {
    //             check = false;
    //             newErrors = Object.assign({
    //                 ...newErrors,
    //                 [item]: true
    //             })
    //         }
    //     }
    //     setFormErrors(newErrors);
    //     if (check === true) {
    //         return true;
    //     }
    //     else {
    //         // alert("Форма не заполнена");
    //         setIsLoading(false);
    //         setShowError(true);
    //         return false;
    //     };
    // }

    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     setIsLoading(true);
    //     console.log(priceListInputs);
    //     formIsValid() && addPriceGroup({
    //         ...priceListInputs,
    //         locationType: priceListInputs.locationType.reduce((sum, cur, index) => {
    //             if (index < (priceListInputs.locationType.length - 1)) {
    //                 return (sum + cur + '/')
    //             }
    //             else {
    //                 return (sum + cur)
    //             }
    //         }, '')
    //     })
    //         .then(res => res.json())
    //         .then((res) => {
    //             Promise.all(priceListInputs.products.map(item => {
    //                 console.log({ ...item, priceGroupProductId: res.id });

    //                 return addProductToPriceGroup({ ...item, priceGroupProductId: res.id });
    //             }))
    //                 .then(() => props.history.push("/price-list"))
    //                 .catch(error => {
    //                     setIsLoading(false);
    //                     alert('Ошибка при добавлении записи');
    //                     console.log(error);
    //                 })
    //         })
    // }

    const isExistingCategory = (category) => {
        return categories.find(item => item.name === category);
    }

    const parseExcelData = (result) => {
        let data = new Uint8Array(result);
        let wb = XLSX.read(data, { type: 'array' });
        var firstSheetName = wb.SheetNames[0];
        let firstSheet = wb.Sheets[firstSheetName];
        var excelRows = XLSX.utils.sheet_to_json(firstSheet);
        console.log(excelRows);
        if (excelRows.length === 0) {
            alert('Файл пустой либо заполнен некорректно!')
        }
        else {
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
                    if (!isExistingCategory(item.category)) {
                        let newCategories = categories;
                        newCategories.push({
                            img: categoryImg,
                            name: item.category,
                            active: true
                        })
                    }
                    groupData = Object.assign({
                        id: item.id,
                        img: '',
                        draftImg: '',
                        number: item.number,
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
                        partnerName: item.partnerName,
                        active: true,
                        newItem: item.newItem === 'да' ? true : false,
                        uniqueItem: item.uniqueItem === 'да' ? true : false,
                        proprietaryItem: item.proprietaryItem === 'да' ? true : false
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
                            onSale: excelRows[i].onSale === 'да' ? true : false,
                            isTopSeller: excelRows[i].topSeller === 'да' ? true : false
                        }));
                    }
                    if (item.number) {
                        if (item.number.includes(tempNumber)) {
                            endId++;
                        }
                        else {
                            if (!isExistingCategory(item.category)) {
                                let newCategories = categories;
                                newCategories.push({
                                    img: categoryImg,
                                    name: item.category,
                                    active: true
                                })
                            }
                            newData.push({
                                ...groupData,
                                products
                            });
                            groupData = Object.assign({
                                id: item.id,
                                img: '',
                                draftImg: '',
                                number: item.number,
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
                                partnerName: item.partnerName,
                                active: true,
                                newItem: item.newItem === 'да' ? true : false,
                                uniqueItem: item.uniqueItem === 'да' ? true : false,
                                proprietaryItem: item.proprietaryItem === 'да' ? true : false
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
        }
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
        // getPriceListCoefficient()
        //     .then(res => res.json())
        //     .then(res => {
        //         // console.log(res);
        //         setCoefficients({
        //             retailPrice: Number.parseFloat(res.retailPrice),
        //             dealerPrice: Number.parseFloat(res.dealerPrice),
        //             distributorPrice: Number.parseFloat(res.distributorPrice),
        //             partnerPrice: Number.parseFloat(res.partnerPrice),
        //             stopPrice: Number.parseFloat(res.stopPrice),
        //             lessThan5000Price: Number.parseFloat(res.lessThan5000Price),
        //             lessThan1500Price: Number.parseFloat(res.lessThan1500Price),
        //         })
        //     })
    }, [])

    return (
        <div className="new-price-item">
            <div className="main-form">
                <div className="main-form__title">Считать данные из файла</div>
                <form className="main-form__form">
                    <div className="main-form__item">
                        <div className="main-form__input_name">Файл .xlsx</div>
                        <FileUploader
                            regex={/.+\.(xlsx|csv)/}
                            uniqueId={"file"}
                            type="readAsArrayBuffer"
                            onChange={(result) => {
                                parseExcelData(result);
                            }}
                        />
                    </div>
                    <div className="main-form__buttons">
                        <input className="main-form__submit main-form__submit--inverted" type="submit" onClick={() => props.history.push('/price-list')} value="Вернуться назад" />
                        {priceList.length > 0 && <input className="main-form__submit" type="submit" onClick={(event) => {
                            event.preventDefault();
                            setIsLoading(true);
                            getPriceListPdfText(
                                categories,
                                priceList.filter(item => item.active),
                                optionalCols.filter(item => item.active && item),
                                locationTypes,
                                disclaimer
                            );
                            setIsLoading(false);
                        }} value="Открыть .pdf" />}
                        {isLoading && <ImgLoader />}
                    </div>
                    {priceList.length > 0 && <div className="main-form__buttons">
                        <div className="new-price-item__checkbox-container">
                            <CheckBox
                                text="Выделить все категории"
                                defaultChecked={true}
                                name="header"
                                onChange={(value) => {
                                    let originalList = categories.map(item => {
                                        return {
                                            ...item,
                                            active: value
                                        }
                                    })
                                    setCategories([...originalList])
                                }}
                            />
                            <CheckBox
                                text="Выделить все группы товаров"
                                defaultChecked={true}
                                name="header"
                                onChange={(value) => {
                                    let originalList = priceList.map(item => {
                                        return {
                                            ...item,
                                            active: value
                                        }
                                    })
                                    setPriceList([...originalList])
                                }}
                            />
                        </div>
                        <div className="main-form__info-panel">
                            <span>Дополнительные столбцы: </span>
                            {optionalCols.map((item, index) => {
                                return <div
                                    className={item.active ? "main-form__button" : "main-form__button main-form__button--inverted"}
                                    onClick={() => {
                                        let temp = optionalCols;
                                        temp.splice(index, 1, {
                                            ...item,
                                            active: !item.active
                                        })
                                        setOptionalCols([...temp]);
                                    }}
                                >{item.name}</div>
                            })}
                        </div>
                    </div>}
                    {
                        categories.sort((a, b) => {
                            if (a.name.localeCompare(b.name, undefined, { numeric: true }) < 0) {
                                return -1;
                            }
                            if (a.name.localeCompare(b.name, undefined, { numeric: true }) > 0) {
                                return 1;
                            }
                            return 0;
                        }).map((category, categoryIndex) => {
                            if (priceList.reduce((prev, cur) => {
                                if (cur.category === category.name) {
                                    return prev + 1;
                                }
                                else {
                                    return prev;
                                }
                            }, 0) > 0) {
                                return <React.Fragment>
                                    <div className="main-form__item main-form__item--header">
                                        <div className="main-form__input_name">Категория</div>
                                        <CheckBox
                                            checked={category.active}
                                            name='category'
                                            onChange={(value) => {
                                                let originalList = categories;
                                                originalList.splice(categoryIndex, 1, {
                                                    ...category,
                                                    active: value
                                                })
                                                setCategories([...originalList])
                                            }}
                                        />
                                        <div className="main-form__input_field">
                                            {/* <input
                                            name="categoryName"
                                            type="text"
                                            value={item.name}
                                            readOnly
                                        /> */}
                                            <div className="main-form__title" style={{
                                                backgroundImage: `url('${category.img}')`,
                                                backgroundSize: '100% 100%',
                                            }}>{category.name}</div>
                                            {/* <div className="main-form__product_img">
                                                <img src={category.img} alt="" />
                                            </div> */}
                                            <FileUploader
                                                uniqueId={"categoryImg" + categoryIndex}
                                                regex={/.+\.(jpeg|jpg|png|img)/}
                                                onChange={(result) => {
                                                    let temp = categories;
                                                    temp.splice(categoryIndex, 1, {
                                                        ...category,
                                                        img: result
                                                    });
                                                    setCategories([...temp]);
                                                }}
                                            />
                                        </div>
                                    </div>
                                    {category.active && priceList.sort((a, b) => {
                                        if (a.id.localeCompare(b.id, undefined, { numeric: true }) < 0) {
                                            return -1;
                                        }
                                        if (a.id.localeCompare(b.id, undefined, { numeric: true }) > 0) {
                                            return 1;
                                        }
                                        return 0;
                                    }).map((item, index) => {
                                        if (item.category === category.name) {
                                            return <React.Fragment>
                                                <div className="main-form__item">
                                                    <div className="main-form__input_name">Группа продукций</div>
                                                    <CheckBox
                                                        checked={item.active}
                                                        name='groupOfProducts'
                                                        onChange={(value) => {
                                                            let originalList = priceList;
                                                            originalList.splice(index, 1, {
                                                                ...item,
                                                                active: value
                                                            })
                                                            setPriceList([...originalList])
                                                        }}
                                                    />
                                                    <div className="main-form__input_field">
                                                        <input
                                                            name="name"
                                                            type="text"
                                                            autoComplete="off"
                                                            onChange={(event) => {
                                                                let temp = priceList;
                                                                temp.splice(index, 1, {
                                                                    ...item,
                                                                    name: event.target.value
                                                                })
                                                                setPriceList([...temp])
                                                            }}
                                                            value={item.name}
                                                            readOnly={props.readOnly}
                                                        />
                                                    </div>
                                                </div>
                                                <div className={item.active ? "main-form__item" : " main-form__item main-form__item--hidden"}>
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
                                                            newItem={item.newItem}
                                                            uniqueItem={item.uniqueItem}
                                                            proprietaryItem={item.proprietaryItem}
                                                            handleLabelChange={(value, name) => {
                                                                console.log(item[name])
                                                                let temp = priceList;
                                                                temp.splice(index, 1, {
                                                                    ...item,
                                                                    [name]: value
                                                                })
                                                                setPriceList([...temp]);
                                                            }}
                                                            handleImgChange={(newImg, name) => {
                                                                let temp = priceList;
                                                                temp.splice(index, 1, {
                                                                    ...item,
                                                                    [name]: newImg
                                                                })
                                                                setPriceList([...temp])
                                                            }}
                                                            uniqueId={index}
                                                            defaultValue={item.products.sort((a, b) => {
                                                                if (priceList.length <= 1) return 0;
                                                                else {
                                                                    if (a.number.localeCompare(b.number, undefined, { numeric: true }) < 0) {
                                                                        return -1;
                                                                    }
                                                                    if (a.number.localeCompare(b.number, undefined, { numeric: true }) > 0) {
                                                                        return 1;
                                                                    }
                                                                    return 0;
                                                                }
                                                            })}
                                                            userHasAccess={props.userHasAccess}
                                                        />
                                                    </div>
                                                </div>
                                            </React.Fragment>
                                        }
                                    })}
                                </React.Fragment>
                            }
                        })
                    }
                    {/* {priceList.map((item, index) => {
                        return <React.Fragment>
                            <div className="main-form__item">
                                <div className="main-form__input_name">Группа продукций</div>
                                <CheckBox
                                    checked={item.active}
                                    name='groupOfProducts'
                                    onChange={(value) => {
                                        let originalList = priceList;
                                        originalList.splice(index, 1, {
                                            ...item,
                                            active: value
                                        })
                                        setPriceList([...originalList])
                                    }}
                                />
                                <div className="main-form__input_field">
                                    <input
                                        name="name"
                                        type="text"
                                        autoComplete="off"
                                        onChange={(event) => {
                                            let temp = priceList;
                                            temp.splice(index, 1, {
                                                ...item,
                                                name: event.target.value
                                            })
                                            setPriceList([...temp])
                                        }}
                                        value={item.name}
                                        readOnly={props.readOnly}
                                    />
                                </div>
                            </div>
                            <div className={item.active ? "main-form__item" : " main-form__item main-form__item--hidden"}>
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
                    })} */}
                </form>
            </div>
        </div>
    );
};

export default NewPriceList;