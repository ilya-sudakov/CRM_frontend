import React, { useState, useEffect } from 'react';
import './NewPriceList.scss';
import '../../../../utils/Form/Form.scss';
import ImgLoader from '../../../../utils/TableView/ImgLoader/ImgLoader.jsx';
import SelectPriceItem from '../SelectPriceItem/SelectPriceItem.jsx';
import XLSX from 'xlsx';
import { addPriceGroup, addProductToPriceGroup, getPriceListCoefficient, getImage, getPriceGroupImageByName, updatePriceGroupByName } from '../../../../utils/RequestsAPI/PriceList/PriceList.jsx';
import { getPriceListPdfText } from '../../../../utils/pdfFunctions.jsx';
import category1Img from '../../../../../../../../assets/priceList/крепеж_для_деревянных_досок.png';
import category2Img from '../../../../../../../../assets/priceList/крепеж_для_дпк_досок.png';
import category3Img from '../../../../../../../../assets/priceList/крепежные_элементы.png';
import categoryImg from '../../../../../../../../assets/priceList/default_category.png';
import locationType1Img from '../../../../../../../../assets/priceList/Фасад.png';
import locationType2Img from '../../../../../../../../assets/priceList/Терраса.png';
import InputText from '../../../../utils/Form/InputText/InputText.jsx';
import FileUploader from '../../../../utils/Form/FileUploader/FileUploader.jsx';
import CheckBox from '../../../../utils/Form/CheckBox/CheckBox.jsx';
import { formatDateString, getDataUri } from '../../../../utils/functions.jsx';
import Button from '../../../../utils/Form/Button/Button.jsx';

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
            id: 1,
            property: 'partnerPrice',
            name: 'Опт 1',
            active: false
        },
        {
            id: 2,
            property: 'dealerPrice',
            name: 'Опт 2',
            active: false
        },
        {
            id: 3,
            property: 'distributorPrice',
            name: 'Опт 3',
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
    const [groupOfProductsList, setGroupOfProductsList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [disclaimer, setDisclaimer] = useState('');
    const [titlePage, setTitlePage] = useState({
        to: '',
        date: formatDateString(new Date()),
        slogan: '',
        list: [],
        active: true,
        img1: '',
        img2: '',
        img3: ''
    });

    const isExistingCategory = (category) => {
        return categories.find(item => item.name === category);
    }

    const loadImages = (data, titlePage1) => {
        setIsLoading(true);
        // console.log(priceList);
        Promise.all(data.map((item, index) => {
            return getPriceGroupImageByName(item.number)
                .then(res => {
                    // console.log(res);
                    return res.json()
                })
                .then(res => {
                    console.log(res, item.number);
                    if (res.id !== null) {
                        let temp = data;
                        temp.splice(index, 1, {
                            ...temp[index],
                            groupImg1: res.imgOne,
                            groupImg2: res.imgTwo,
                            groupImg3: res.imgThree,
                            groupImg4: res.imgFour,
                            footerImg: res.imgFive,
                        });
                        setPriceList(temp)
                    }
                })
                .catch(error => {
                    console.log(error);
                })
        })).then(() => {
            return getPriceGroupImageByName('titlePage')
                .then(res => res.json())
                .then(res => {
                    console.log(res);

                    setTitlePage({
                        ...titlePage1,
                        img1: res.imgOne,
                        img2: res.imgTwo,
                        img3: res.imgThree,
                    })
                    setIsLoading(false);
                })
        });
    }

    const saveImages = () => {
        setIsLoading(true);
        console.log(titlePage);
        Promise.all(priceList.map((item, index) => {
            return updatePriceGroupByName(item.number, {
                name: item.number,
                imgOne: item.groupImg1,
                imgTwo: item.groupImg2,
                imgThree: item.groupImg3,
                imgFour: item.groupImg4,
                imgFive: item.footerImg,
            })
        })).then(() => {
            updatePriceGroupByName('titlePage', {
                name: 'titlePage',
                imgOne: titlePage.img1,
                imgTwo: titlePage.img2,
                imgThree: titlePage.img3,
            })
                .then(() => {
                    setIsLoading(false);
                    alert('Данные были успешно сохранены!');
                })
        })
    }

    const parseExcelData = (result) => {
        let data = new Uint8Array(result);
        let wb = XLSX.read(data, { type: 'array' });
        var firstSheetName = wb.SheetNames[0];
        let firstSheet = wb.Sheets[firstSheetName];
        var excelRows = XLSX.utils.sheet_to_json(firstSheet);
        // console.log(excelRows);
        if (excelRows.length === 0) {
            alert('Файл пустой либо заполнен некорректно!')
        }
        else {
            setDisclaimer(excelRows[excelRows.length - 1].id);
            const titlePage1 = Object.assign({
                // ...titlePage,
                to: excelRows[0].titlePage,
                date: excelRows[1].titlePage,
                slogan: excelRows[2].titlePage,
                list: excelRows[3].titlePage.split('/'),
                active: true
            });
            setTitlePage(titlePage1)
            let newData = [];
            let tempNumber = '000';
            let groupData = null;
            let startId = 0, endId = 0;
            for (let index = 3; index < excelRows.length; index++) {
                let item = excelRows[index];
                if (item.id === 1) {
                    startId = index;
                    endId = index;
                    if (!isExistingCategory(item.category)) {
                        let newCategories = categories;
                        newCategories.push({
                            groupImg1: categoryImg,
                            name: (item.category !== undefined) ? item.category : '',
                            active: true
                        })
                    }
                    groupData = Object.assign({
                        id: item.id,
                        groupImg1: '',
                        groupImg2: '',
                        groupImg3: '',
                        groupImg4: '',
                        footerImg: '',
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
                        proprietaryItemText1: item.proprietaryItemText1,
                        proprietaryItemText2: item.proprietaryItemText2,
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
                            lessThan1500Price: excelRows[i].firstPrice ? excelRows[i].firstPrice.toFixed(2) : 0,
                            lessThan5000Price: excelRows[i].secondPrice ? excelRows[i].secondPrice.toFixed(2) : 0,
                            cost: excelRows[i].cost ? excelRows[i].cost.toFixed(2) : 0,
                            retailMarketPrice: excelRows[i].retailMarketPrice ? excelRows[i].retailMarketPrice.toFixed(2) : 0,
                            retailPrice: excelRows[i].retailPrice ? excelRows[i].retailPrice.toFixed(2) : 0,
                            firstPrice: excelRows[i].firstPrice ? excelRows[i].firstPrice.toFixed(2) : 0,
                            secondPrice: excelRows[i].secondPrice ? excelRows[i].secondPrice.toFixed(2) : 0,
                            partnerPrice: excelRows[i].partnerPrice ? excelRows[i].partnerPrice.toFixed(2) : 0,
                            dealerPrice: excelRows[i].dealerPrice ? excelRows[i].dealerPrice.toFixed(2) : 0,
                            distributorPrice: excelRows[i].distributorPrice ? excelRows[i].distributorPrice.toFixed(2) : 0,
                            onSale: excelRows[i].onSale === 'да' ? true : false
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
                                    groupImg1: categoryImg,
                                    name: (item.category !== undefined) ? item.category : '',
                                    active: true
                                })
                            }

                            newData.push({
                                ...groupData,
                                products
                            });
                            groupData = Object.assign({
                                id: item.id,
                                groupImg1: '',
                                groupImg2: '',
                                groupImg3: '',
                                groupImg4: '',
                                footerImg: '',
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
                                proprietaryItemText1: item.proprietaryItemText1,
                                proprietaryItemText2: item.proprietaryItemText2,
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
            // console.log(newData)
            setPriceList(newData);
            return loadImages(newData, titlePage1);
        }
    }

    useEffect(() => {
        document.title = "Добавление продукции";
    }, [priceList])

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
                                parseExcelData(result)
                            }}
                        />
                    </div>
                    <div className="main-form__buttons">
                        {/* <input className="main-form__submit main-form__submit--inverted" type="submit" onClick={() => props.history.push('/')} value="Вернуться назад" /> */}
                        {/* {priceList.length > 0 && <input className="main-form__submit main-form__submit--inverted" type="submit" onClick={(event) => {
                            event.preventDefault();
                            setIsLoading(true);
                            console.log(priceList);
                            getPriceListPdfText(
                                categories,
                                priceList.filter(item => item.active),
                                optionalCols.filter(item => item.active && item).sort((a, b) => {
                                    if (a.id < b.id) {
                                        return -1;
                                    }
                                    if (a.id > b.id) {
                                        return 1;
                                    }
                                    return 0;
                                }),
                                locationTypes,
                                disclaimer,
                                titlePage
                            );
                            setIsLoading(false);
                        }} value="Открыть .pdf" />} */}
                        {priceList.length > 0 && <Button
                            text="Открыть .pdf"
                            isLoading={isLoading}
                            className="main-form__submit main-form__submit--inverted"
                            inverted
                            onClick={() => {
                                setIsLoading(true);
                                console.log(priceList);
                                getPriceListPdfText(
                                    categories,
                                    priceList.filter(item => item.active),
                                    optionalCols.filter(item => item.active && item).sort((a, b) => {
                                        if (a.id < b.id) {
                                            return -1;
                                        }
                                        if (a.id > b.id) {
                                            return 1;
                                        }
                                        return 0;
                                    }),
                                    locationTypes,
                                    disclaimer,
                                    titlePage
                                )
                                    .then(() => { setIsLoading(false); })
                            }}
                        />}
                        {priceList.length > 0 && <Button
                            text="Сохранить данные"
                            isLoading={isLoading}
                            className="main-form__submit"
                            onClick={() => {
                                // setIsLoading(true);
                                console.log(priceList)
                                saveImages();
                            }}
                        />}
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
                    {priceList.length > 0 && <div className="main-form__buttons main-form__buttons--vertical">
                        <div className="main-form__item main-form__item--header">
                            <div className="main-form__input_name">Титульная страница</div>
                            <CheckBox
                                defaultChecked={true}
                                name="titleList"
                                onChange={(value) => {
                                    setTitlePage({
                                        ...titlePage,
                                        active: value
                                    })
                                }}
                            />
                        </div>
                        {titlePage.active && <React.Fragment>
                            <InputText
                                inputName="Получатель"
                                name="to"
                                defaultValue={titlePage.to}
                                handleInputChange={(event) => {
                                    setTitlePage({
                                        ...titlePage,
                                        to: event.target.value
                                    })
                                }}
                            />
                            <div className="main-form__item">
                                <div className="main-form__input_name">Фотография 1</div>
                                <div className="main-form__input_field">
                                    {titlePage.img1 !== '' &&
                                        <div className="main-form__product_img">
                                            <img src={titlePage.img1} alt="" />
                                        </div>
                                    }
                                    <FileUploader
                                        uniqueId={"fileTitlePage" + 1}
                                        regex={/.+\.(jpeg|jpg|png|img)/}
                                        onChange={async (result) => {
                                            const downgraded = await getDataUri(result, "jpeg", 0.3);
                                            setTitlePage({
                                                ...titlePage,
                                                img1: downgraded
                                            })
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="main-form__item">
                                <div className="main-form__input_name">Фотография 2</div>
                                <div className="main-form__input_field">
                                    {titlePage.img2 !== '' &&
                                        <div className="main-form__product_img">
                                            <img src={titlePage.img2} alt="" />
                                        </div>
                                    }
                                    <FileUploader
                                        uniqueId={"fileTitlePage" + 2}
                                        regex={/.+\.(jpeg|jpg|png|img)/}
                                        onChange={async (result) => {
                                            const downgraded = await getDataUri(result, "jpeg", 0.3);
                                            setTitlePage({
                                                ...titlePage,
                                                img2: downgraded
                                            })
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="main-form__item">
                                <div className="main-form__input_name">Фотография 3</div>
                                <div className="main-form__input_field">
                                    {titlePage.img3 !== '' &&
                                        <div className="main-form__product_img">
                                            <img src={titlePage.img3} alt="" />
                                        </div>
                                    }
                                    <FileUploader
                                        uniqueId={"fileTitlePage" + 3}
                                        regex={/.+\.(jpeg|jpg|png|img)/}
                                        onChange={async (result) => {
                                            const downgraded = await getDataUri(result, "jpeg", 0.3);
                                            setTitlePage({
                                                ...titlePage,
                                                img3: downgraded
                                            })
                                        }}
                                    />
                                </div>
                            </div>
                        </React.Fragment>}
                    </div>}
                    {
                        categories.sort((a, b) => {
                            {/* console.log(a) */ }
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
                                            <div className="main-form__title" style={{
                                                backgroundImage: `url('${category.img}')`,
                                                backgroundSize: '100% 100%',
                                            }}>{category.name}</div>
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
                                        if (a.id < b.id) {
                                            return -1;
                                        }
                                        if (a.id > b.id) {
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
                                                            groupImg1={item.groupImg1}
                                                            groupImg2={item.groupImg2}
                                                            groupImg3={item.groupImg3}
                                                            groupImg4={item.groupImg4}
                                                            footerImg={item.footerImg}
                                                            proprietaryItem={item.proprietaryItemText}
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
                        })}
                </form>
            </div>
        </div>
    );
};

export default NewPriceList;