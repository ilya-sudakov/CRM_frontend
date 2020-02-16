import React, { useState, useEffect } from 'react';
import './PriceList.scss';
import '../../../utils/MainWindow/MainWindow.scss';
import TableDataLoading from '../../../utils/TableView/TableDataLoading/TableDataLoading.jsx';
import SearchBar from '../SearchBar/SearchBar.jsx';
import ImgLoader from '../../../utils/TableView/ImgLoader/ImgLoader.jsx';
import { getPriceListPdfText } from '../../../utils/functions.jsx';
import testImg from '../../../../../../../assets/priceList/test.jpg';
import category1Img from '../../../../../../../assets/priceList/крепеж_для_деревянных_досок.jpg';
import category2Img from '../../../../../../../assets/priceList/крепеж_для_дпк_досок.jpg';
import category3Img from '../../../../../../../assets/priceList/крепежные_элементы.jpg';
import categoryImg from '../../../../../../../assets/priceList/крепежные_элементы.jpg';
import FormWindow from '../../../utils/Form/FormWindow/FormWindow.jsx';
import EditCoefficient from './EditCoefficient/EditCoefficient.jsx';
import { getPriceList, deletePriceGroupById, deleteProductFromPriceGroupById } from '../../../utils/RequestsAPI/PriceList/PriceList.jsx';

const PriceList = (props) => {
    const [priceList, setPriceList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [showWindow, setShowWindow] = useState(false);
    const [checkedItems, setCheckedItems] = useState([]);
    const [closeWindow, setCloseWindow] = useState(false);
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
    ])

    const deleteItem = (event) => {
        const id = Number.parseInt(event.target.id);
        const name = event.target.getAttribute("name");
        // const name = event.target.dataset.product_id;
        loadData();
        if (name === 'group') {
            let originalItem = priceList.find(item => item.id === id && item);
            Promise.all(originalItem.products.map(item => {
                return deleteProductFromPriceGroupById(item.id)
            }))
                .then(() => {
                    deletePriceGroupById(id)
                        .then(() => {
                            loadData();
                        })
                })
        }
        else {
            deleteProductFromPriceGroupById(id)
                .then(() => {
                    loadData();
                })
        }
    }

    const loadData = () => {
        getPriceList()
            .then(res => res.json())
            .then(res => {
                console.log(res);
                setCheckedItems([...res.map(item => {
                    return {
                        id: item.id,
                        active: true
                    }
                })])
                setPriceList(res)
                setIsLoading(false);
            })
    }

    const handleCheckboxChange = (event) => {
        // event.preventDefault();
        const name = event.target.name;
        const value = event.target.checked;
        const id = event.target.id;
        if (name === 'header') {
            setCheckedItems([
                ...checkedItems.map(item => {
                    return {
                        ...item,
                        active: value
                    }
                })
            ])
        }
        else {
            let temp = checkedItems.map(item => {
                // console.log(id, item.id)
                if (item.id === Number.parseInt(id)) {
                    return {
                        ...item,
                        active: value
                    }
                }
                else {
                    return item;
                }
            });
            setCheckedItems([...temp]);
        }
    }

    useEffect(() => {
        document.title = "Каталог продукции";
        loadData();
    }, [])

    return (
        <div className="price-list">
            <div className="main-window">
                <FormWindow
                    title="Коэффициенты"
                    content={
                        <React.Fragment>
                            <EditCoefficient
                                showWindow={showWindow}
                                setShowWindow={setShowWindow}
                                setCloseWindow={setCloseWindow}
                                closeWindow={closeWindow}
                            />
                        </React.Fragment>
                    }
                    headerButton={{
                        name: 'Добавить товар',
                        path: '/price-list/new'
                    }}
                    showWindow={showWindow}
                    setShowWindow={setShowWindow}
                />
                <div className="main-window__header">
                    <div className="main-window__title">Каталог продукции</div>
                    {props.userHasAccess(['ROLE_ADMIN']) && <div className="main-window__button" onClick={() => {
                        getPriceListPdfText(
                            categories,
                            priceList.filter(item => checkedItems.find(checkedItem => {
                                return item.id === Number.parseInt(checkedItem.id)
                            }).active),
                            optionalCols.filter(item => item.active && item),
                            [],
                            ''
                        )
                    }}>Скачать .pdf</div>}
                    {props.userHasAccess(['ROLE_ADMIN']) && <div className="main-window__button" onClick={() => setShowWindow(!showWindow)}>Редактировать коэффициенты</div>}
                </div>
                <SearchBar
                    title="Поиск по каталогу продукции"
                    placeholder="Введите запрос для поиска..."
                    setSearchQuery={setSearchQuery}
                />
                <div className="main-window__info-panel">
                    <div className="price-list__category-pick">
                        <div className="main-window__amount_table">Фильтр по категории:</div>
                        {categories.sort((a, b) => {
                            if (a.name < b.name) {
                                return -1;
                            }
                            if (a.name > b.name) {
                                return 1;
                            }
                            return 0;
                        }).map((item, index) => {
                            return <div
                                className={item.active ? "main-window__button" : "main-window__button main-window__button--inverted"}
                                onClick={() => {
                                    let temp = categories;
                                    temp.splice(index, 1, {
                                        ...temp[index],
                                        name: item.name,
                                        active: !item.active
                                    })
                                    setCategories([...temp]);
                                }}
                            >{item.name}</div>
                        })}
                        <div className="main-window__amount_table">Всего: {priceList.length + priceList.reduce((prev, cur) => prev + cur.products.length, 0)} записей</div>
                    </div>
                </div>
                <div className="main-window__info-panel">
                    <div className="price-list__cols-pick">
                        <div className="main-window__amount_table">Дополнительные столбцы для pdf-файла:</div>
                        {optionalCols.map((item, index) => {
                            return <div
                                className={item.active ? "main-window__button" : "main-window__button main-window__button--inverted"}
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
                </div>
                <div className="main-window__list">
                    <div className="main-window__list-item main-window__list-item--header">
                        <span>Фото</span>
                        <span>Название</span>
                        <span>Описание</span>
                        <span>Категория</span>
                        <span>Розница (рын. цена)</span>
                        <span>Розница</span>
                        <span>до 1500 шт.</span>
                        <span>до 5000 шт.</span>
                        <span>Партнер</span>
                        <span>Дилер</span>
                        <span>Дистрибутор</span>
                        <span>Стопцена</span>
                        <span>
                            <label class="main-window__checkbox-container">
                                <input
                                    type="checkbox"
                                    name="header"
                                    defaultChecked={true}
                                    onChange={handleCheckboxChange}
                                />
                                <div class="main-window__checkmark"></div>
                            </label>
                        </span>
                        <div className="main-window__actions">Действие</div>
                    </div>
                    {isLoading && <TableDataLoading
                        className="main-window__list-item"
                        minHeight="20px"
                    />}
                    {priceList
                        .sort((a, b) => {
                            if (a.name < b.name) {
                                return -1;
                            }
                            if (a.name > b.name) {
                                return 1;
                            }
                            return 0;
                        })
                        .filter(item => {
                            let check = false;
                            if (
                                item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                item.category.toLowerCase().includes(searchQuery.toLowerCase())
                            ) {
                                categories.map(category => {
                                    if (category.active && (category.name === item.category)) {
                                        check = true;
                                        return;
                                    }
                                })
                            }
                            return check;
                        })
                        .map((item, index) => {
                            return <React.Fragment>
                                <div className="main-window__list-item">
                                    <span>
                                        <div className="main-window__mobile-text">Фото: </div>
                                        <ImgLoader
                                            imgClass="main-window__img"
                                            imgSrc={item.img}
                                        />
                                    </span>
                                    <span><div className="main-window__mobile-text">Название: </div>{item.name}</span>
                                    <span><div className="main-window__mobile-text">Описание: </div>{item.description}</span>
                                    <span><div className="main-window__mobile-text">Категория: </div>{item.category}</span>
                                    <span><div className="main-window__mobile-text">Розница (рыночная цена): </div>{item.retailMarketPrice}</span>
                                    <span><div className="main-window__mobile-text">Розница: </div>{item.retailPrice}</span>
                                    <span><div className="main-window__mobile-text">цена &lt; 1500 шт.: </div>{item.lessThan1500Price}</span>
                                    <span><div className="main-window__mobile-text">цена &lt; 5000 шт.: </div>{item.lessThan5000Price}</span>
                                    <span><div className="main-window__mobile-text">Партнер: </div>{item.partnerPrice}</span>
                                    <span><div className="main-window__mobile-text">Дилер: </div>{item.dealerPrice}</span>
                                    <span><div className="main-window__mobile-text">Дистрибутор: </div>{item.distributorPrice}</span>
                                    <span><div className="main-window__mobile-text">Стопцена: </div>{item.stopPrice}</span>
                                    <span><div className="main-window__mobile-text">Выбрать: </div>
                                        <label class="main-window__checkbox-container">
                                            <input
                                                type="checkbox"
                                                id={item.id}
                                                name="groupOfProducts"
                                                checked={checkedItems.find(checkedItem => checkedItem.id === item.id) !== undefined ? checkedItems.find(checkedItem => checkedItem.id === item.id).active : true}
                                                onChange={handleCheckboxChange}
                                            />
                                            <div class="main-window__checkmark"></div>
                                        </label>
                                    </span>
                                    <div className="main-window__actions">
                                        <div className="main-window__action" onClick={() => props.history.push('/price-list/view/' + item.id)}>Просмотр</div>
                                        <div className="main-window__action" onClick={() => props.history.push('/price-list/edit/' + item.id)}>Редактировать</div>
                                        {props.userHasAccess(['ROLE_ADMIN']) && <div className="main-window__action" id={item.id} name="group" onClick={deleteItem}>Удалить</div>}
                                    </div>
                                </div>
                                {item.products.filter(item =>
                                    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                    item.description.toLowerCase().includes(searchQuery.toLowerCase())
                                ).map(product => <div className="main-window__list-item">
                                    <span>
                                        <div className="main-window__mobile-text">Фото: </div>
                                        <ImgLoader
                                            imgClass="main-window__img"
                                            imgSrc={item.img}
                                        />
                                    </span>
                                    <span><div className="main-window__mobile-text">Название: </div>{product.name}</span>
                                    <span><div className="main-window__mobile-text">Описание: </div>{product.description}</span>
                                    <span><div className="main-window__mobile-text">Категория: </div>{item.category}</span>
                                    <span><div className="main-window__mobile-text">Розница (рыночная цена): </div>{product.retailMarketPrice}</span>
                                    <span><div className="main-window__mobile-text">Розница: </div>{product.retailPrice}</span>
                                    <span><div className="main-window__mobile-text">цена &lt; 1500 шт.: </div>{product.lessThan1500Price}</span>
                                    <span><div className="main-window__mobile-text">цена &lt; 5000 шт.: </div>{product.lessThan5000Price}</span>
                                    <span><div className="main-window__mobile-text">Партнер: </div>{product.partnerPrice}</span>
                                    <span><div className="main-window__mobile-text">Дилер: </div>{product.dealerPrice}</span>
                                    <span><div className="main-window__mobile-text">Дистрибутор: </div>{product.distributorPrice}</span>
                                    <span><div className="main-window__mobile-text">Стопцена: </div>{product.stopPrice}</span>
                                    <span><div className="main-window__mobile-text">Выбрать: </div>
                                    </span>
                                    <div className="main-window__actions">
                                        <div className="main-window__action" onClick={() => props.history.push('/price-list/view/' + item.id)}>Просмотр</div>
                                        <div className="main-window__action" onClick={() => props.history.push('/price-list/edit/' + item.id)}>Редактировать</div>
                                        {props.userHasAccess(['ROLE_ADMIN']) && <div className="main-window__action" id={product.id} name="product" onClick={deleteItem}>Удалить</div>}
                                    </div>
                                </div>)}
                            </React.Fragment>
                        })}
                </div>
            </div>
        </div>
    );
}

export default PriceList;