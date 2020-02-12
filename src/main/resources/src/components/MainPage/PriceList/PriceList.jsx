import React, { useState, useEffect } from 'react';
import './PriceList.scss';
import '../../../utils/MainWindow/MainWindow.scss';
import TableDataLoading from '../../../utils/TableView/TableDataLoading/TableDataLoading.jsx';
import SearchBar from '../SearchBar/SearchBar.jsx';
import ImgLoader from '../../../utils/TableView/ImgLoader/ImgLoader.jsx';
import { getPriceListPdfText } from '../../../utils/functions.jsx';

const PriceList = (props) => {
    const [priceList, setPriceList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    const deleteItem = (event) => {
        const id = event.target.dataset.id;
        deleteClient(id)
            .then(() => getprice - list())
            .then(res => res.json())
            .then((priceList) => {
                setPriceList(priceList);
            })
    }

    const loadData = () => {
        // getprice-list()
        //     .then(res => res.json())
        //     .then((price-list) => {
        //         setprice-list(price-list);
        //         setIsLoading(false);
        //     })
        setPriceList([
            {
                id: 1,
                name: 'OSFIX КОНСТРУКТОР 130',
                description: ' sd sdf sd fsd fds f',
                linkAddress: 'https://trello.com/c/HLJQbCNq',
                products: [
                    {
                        id: 1,
                        name: 'Продукт1',
                        number: 'цинк с/д и б/д',
                        description: 'цинк с/д и б/д',
                        units: 'цинк с/д и б/д',
                        retailPrice: 200,
                        lessThan1500Price: 32,
                        lessThan5000Price: 30
                    }
                ],
                retailPrice: 200,
                lessThan1500Price: 32,
                lessThan5000Price: 30,
                category: 'Крепеж для деревянных досок',
                isVisible: false
            },
            {
                id: 2,
                name: 'OSFIX КОНСТРУКТОР 110',
                description: ' sd sdf sd fsd fds f',
                category: 'Крепеж для ДПК досок',
                products: [
                    {
                        id: 1,
                        name: 'Продукт1',
                        number: 'цинк с/д и б/д',
                        description: 'цинк с/д и б/д',
                        units: 'цинк с/д и б/д',
                        retailPrice: 200,
                        lessThan1500Price: 32,
                        lessThan5000Price: 30
                    },
                    {
                        id: 2,
                        name: 'Продукт2',
                        number: '',
                        description: '',
                        units: '',
                        retailPrice: 300,
                        lessThan1500Price: 32,
                        lessThan5000Price: 30
                    },
                    {
                        id: 1,
                        name: 'Продукт1',
                        number: '',
                        description: '',
                        units: '',
                        retailPrice: 200,
                        lessThan1500Price: 32,
                        lessThan5000Price: 30
                    },
                    {
                        id: 2,
                        name: 'Продукт2',
                        number: '',
                        description: '',
                        units: '',
                        retailPrice: 300,
                        lessThan1500Price: 32,
                        lessThan5000Price: 30
                    }
                ],
                retailPrice: 300,
                lessThan1500Price: 32,
                lessThan5000Price: 30,
                isVisible: false
            },
            {
                id: 3,
                name: 'OSFIX КОНСТРУКТОР 100',
                description: ' sd sdf sd fsd fds f',
                category: 'Крепежные инструменты',
                products: [
                    {
                        id: 1,
                        name: 'Продукт1',
                        number: 'цинк с/д и б/д',
                        description: 'цинк с/д и б/д',
                        units: 'цинк с/д и б/д',
                        retailPrice: 200,
                        lessThan1500Price: 32,
                        lessThan5000Price: 30
                    },
                    {
                        id: 2,
                        name: 'Продукт2',
                        number: '',
                        description: '',
                        units: '',
                        retailPrice: 300,
                        lessThan1500Price: 32,
                        lessThan5000Price: 30
                    },
                    {
                        id: 1,
                        name: 'Продукт1',
                        number: '',
                        description: '',
                        units: '',
                        retailPrice: 200,
                        lessThan1500Price: 32,
                        lessThan5000Price: 30
                    },
                    {
                        id: 2,
                        name: 'Продукт2',
                        number: '',
                        description: '',
                        units: '',
                        retailPrice: 300,
                        lessThan1500Price: 32,
                        lessThan5000Price: 30
                    }
                ],
                retailPrice: 300,
                lessThan1500Price: 32,
                lessThan5000Price: 30,
                isVisible: false
            },
            {
                id: 4,
                name: 'OSFIX КОНСТРУКТОР 1000',
                description: ' sd sdf sd fsd fds f',
                category: 'Крепежные инструменты',
                products: [
                    {
                        id: 1,
                        name: 'Продукт1',
                        number: 'цинк с/д и б/д',
                        description: 'цинк с/д и б/д',
                        units: 'цинк с/д и б/д',
                        retailPrice: 200,
                        lessThan1500Price: 32,
                        lessThan5000Price: 30
                    },
                    {
                        id: 2,
                        name: 'Продукт2',
                        number: '',
                        description: '',
                        units: '',
                        retailPrice: 300,
                        lessThan1500Price: 32,
                        lessThan5000Price: 30
                    },
                    {
                        id: 1,
                        name: 'Продукт1',
                        number: '',
                        description: '',
                        units: '',
                        retailPrice: 200,
                        lessThan1500Price: 32,
                        lessThan5000Price: 30
                    },
                    {
                        id: 2,
                        name: 'Продукт2',
                        number: '',
                        description: '',
                        units: '',
                        retailPrice: 300,
                        lessThan1500Price: 32,
                        lessThan5000Price: 30
                    }
                ],
                retailPrice: 300,
                lessThan1500Price: 32,
                lessThan5000Price: 30,
                isVisible: false
            },
            {
                id: 3,
                name: 'OSFIX КОНСТРУКТОР 100',
                description: ' sd sdf sd fsd fds f',
                category: 'Крепежные инструменты',
                products: [
                    {
                        id: 1,
                        name: 'Продукт1',
                        number: 'цинк с/д и б/д',
                        description: 'цинк с/д и б/д',
                        units: 'цинк с/д и б/д',
                        retailPrice: 200,
                        lessThan1500Price: 32,
                        lessThan5000Price: 30
                    },
                    {
                        id: 2,
                        name: 'Продукт2',
                        number: '',
                        description: '',
                        units: '',
                        retailPrice: 300,
                        lessThan1500Price: 32,
                        lessThan5000Price: 30
                    },
                    {
                        id: 1,
                        name: 'Продукт1',
                        number: '',
                        description: '',
                        units: '',
                        retailPrice: 200,
                        lessThan1500Price: 32,
                        lessThan5000Price: 30
                    },
                    {
                        id: 2,
                        name: 'Продукт2',
                        number: '',
                        description: '',
                        units: '',
                        retailPrice: 300,
                        lessThan1500Price: 32,
                        lessThan5000Price: 30
                    }
                ],
                retailPrice: 300,
                lessThan1500Price: 32,
                lessThan5000Price: 30,
                isVisible: false
            },
            {
                id: 3,
                name: 'OSFIX КОНСТРУКТОР 100',
                description: ' sd sdf sd fsd fds f',
                category: 'Крепежные инструменты',
                products: [
                    {
                        id: 1,
                        name: 'Продукт1',
                        number: 'цинк с/д и б/д',
                        description: 'цинк с/д и б/д',
                        units: 'цинк с/д и б/д',
                        retailPrice: 200,
                        lessThan1500Price: 32,
                        lessThan5000Price: 30
                    },
                    {
                        id: 2,
                        name: 'Продукт2',
                        number: '',
                        description: '',
                        units: '',
                        retailPrice: 300,
                        lessThan1500Price: 32,
                        lessThan5000Price: 30
                    },
                    {
                        id: 1,
                        name: 'Продукт1',
                        number: '',
                        description: '',
                        units: '',
                        retailPrice: 200,
                        lessThan1500Price: 32,
                        lessThan5000Price: 30
                    },
                    {
                        id: 2,
                        name: 'Продукт2',
                        number: '',
                        description: '',
                        units: '',
                        retailPrice: 300,
                        lessThan1500Price: 32,
                        lessThan5000Price: 30
                    }
                ],
                retailPrice: 300,
                lessThan1500Price: 32,
                lessThan5000Price: 30,
                isVisible: false
            },
        ])
        setIsLoading(false);
    }

    useEffect(() => {
        document.title = "Каталог продукции";
        loadData();
    }, [])

    return (
        <div className="price-list">
            <div className="main-window">
                <div className="main-window__header">
                    <div className="main-window__title">Каталог продукции</div>
                    {props.userHasAccess(['ROLE_ADMIN']) && <div className="main-window__button" onClick={() => {
                        // let dd;
                        getPriceListPdfText([
                            'Крепеж для деревянных досок',
                            'Крепеж для ДПК досок',
                            'Крепежные инструменты'
                        ], priceList)
                        // .then(PriceTextList => {
                        //     pdfMake.createPdf(PriceTextList).open();
                        // })
                    }}>Скачать .pdf</div>}
                </div>
                <SearchBar
                    title="Поиск по клиентам"
                    placeholder="Введите запрос для поиска..."
                    setSearchQuery={setSearchQuery}
                />
                <div className="main-window__info-panel">
                    <div className="main-window__amount_table">Всего: {priceList.length} записей</div>
                </div>
                <div className="main-window__list">
                    <div className="main-window__list-item main-window__list-item--header">
                        <span>Фото</span>
                        <span>Название</span>
                        <span>Описание</span>
                        <span>Категория</span>
                        <span>Розница</span>
                        <span>ц. &lt; 1500 шт.</span>
                        <span>ц. &lt; 5000 шт.</span>
                        <div className="main-window__actions">Действие</div>
                    </div>
                    {isLoading && <TableDataLoading
                        className="main-window__list-item"
                        minHeight="20px"
                    />}
                    {priceList.sort((a, b) => {
                        if (a.category < b.category) {
                            return -1;
                        }
                        if (a.category > b.category) {
                            return 1;
                        }
                        return 0;
                    }).map((item, index) => {
                        return <React.Fragment>
                            <div className="main-window__list-item" onClick={() => {
                                let temp = priceList;
                                temp.splice(index, 1, {
                                    ...item,
                                    isVisible: !item.isVisible
                                });
                                console.log(temp);
                                setPriceList([
                                    ...temp
                                ])
                            }}>
                                <span><div className="main-window__mobile-text">Фото: </div>
                                    <ImgLoader
                                        imgSrc={item.img}
                                    />
                                </span>
                                <span><div className="main-window__mobile-text">Название: </div>{item.name}</span>
                                <span><div className="main-window__mobile-text">Описание: </div>{item.description}</span>
                                <span><div className="main-window__mobile-text">Категория: </div>{item.category}</span>
                                <span><div className="main-window__mobile-text">Розничная цена: </div>{item.retailPrice}</span>
                                <span><div className="main-window__mobile-text">цена &lt; 1500 шт.: </div>{item.lessThan1500Price}</span>
                                <span><div className="main-window__mobile-text">цена &lt; 5000 шт.: </div>{item.lessThan5000Price}</span>
                                <div className="main-window__actions">
                                    <div className="main-window__action" onClick={() => { }}>Просмотр</div>
                                    <div className="main-window__action" onClick={() => { }}>Редактировать</div>
                                    {props.userHasAccess(['ROLE_ADMIN']) && <div className="main-window__action" onClick={() => { }}>Удалить</div>}
                                </div>
                            </div>
                            <div className={item.isVisible === true ? "main-window__list-options" : "main-window__list-options main-window__list-options--hidden"}
                                style={{ minHeight: `calc(${item.isVisible ? item.products.length : 0}*60px + 0px)` }}>
                                {item.products.map(product => <div className="main-window__list-item">
                                    <span></span>
                                    <span><div className="main-window__mobile-text">Название: </div>{product.name}</span>
                                    <span><div className="main-window__mobile-text">Описание: </div>{product.description}</span>
                                    <span><div className="main-window__mobile-text">Категория: </div>{product.category}</span>
                                    <span><div className="main-window__mobile-text">Розничная цена: </div>{product.retailPrice}</span>
                                    <span><div className="main-window__mobile-text">цена &lt; 1500 шт.: </div>{product.lessThan1500Price}</span>
                                    <span><div className="main-window__mobile-text">цена &lt; 5000 шт.: </div>{product.lessThan5000Price}</span>
                                    <div className="main-window__actions">
                                        {props.userHasAccess(['ROLE_ADMIN']) && <div className="main-window__action" onClick={() => { }}>Удалить</div>}
                                    </div>
                                </div>)}
                            </div>
                        </React.Fragment>
                    })}
                </div>
            </div>
        </div>
    );
}

export default PriceList;