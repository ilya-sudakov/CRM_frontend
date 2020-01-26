import React, { useEffect, useState } from 'react';
import './Products.scss';
import '../../../utils/MainWindow/MainWindow.scss';
import SearchBar from '../SearchBar/SearchBar.jsx';
import TableView from './TableView/TableView.jsx';
import { getProducts, deleteProduct, getProductsByCategory, getProductById } from '../../../utils/RequestsAPI/Products.jsx';
import { getCategories, deleteCategory, getCategoriesNames } from '../../../utils/RequestsAPI/Products/Categories.jsx';
import FormWindow from '../../../utils/Form/FormWindow/FormWindow.jsx';
import TableViewCategory from './CategoryManagement/TableView/TableViewCategory.jsx';

const Products = (props) => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchQueryCategory, setSearchQueryCategory] = useState('');
    const [showWindow, setShowWindow] = useState(false);

    useEffect(() => {
        document.title = "Продукция";
        loadCategories();
    }, [])

    const deleteItem = (event) => {
        const id = event.target.dataset.id;
        deleteProduct(id)
            .then(() => loadCategories())
    }

    const deleteItemCategory = (event) => {
        const id = event.target.dataset.id;
        deleteCategory(id)
            .then(() => loadCategories())
    }

    const loadCategories = () => {
        //Стандартная загрузка
        // getCategories()
        //     .then(response => response.json())
        //     .then(response => {
        //         let count = response.reduce((total, item) => {
        //             return (total + item.products.length);
        //         }, 0)
        //         setProductsCount(count);
        //         setCategories(response);
        //     })
        //     .catch(error => {
        //         console.log(error);
        //     })
        // getCategoriesNames()
        //     .then(res => res.json())
        //     .then(res => {
        //         setCategoriesNames(res);
        //     })
        //Динамическая загрузка продукции
        getCategoriesNames() //Только категории
            .then(res => res.json())
            .then(res => {
                const categoriesArr = res;
                setCategories(res);
                let productsArr = [];
                const temp = categoriesArr.map((item) => {
                    let category = {
                        category: item.name
                    };
                    return getProductsByCategory(category) //Продукция по категории
                        .then(res => res.json())
                        .then(res => {
                            res.map(item => productsArr.push(item));
                            setProducts([...productsArr]);
                        })
                })
                Promise.all(temp)
                    .then(() => {
                        //Загружаем картинки по отдельности для каждой продукции
                        const temp = productsArr.map((item, index) => {
                            getProductById(item.id)
                                .then(res => res.json())
                                .then(res => {
                                    // console.log(res);
                                    productsArr.splice(index, 1, res);
                                    setProducts([...productsArr]);
                                })
                        })
                        Promise.all(temp)
                            .then(() => console.log('all images downloaded'))
                    })
            })
    }

    return (
        <div className="products">
            <div className="main-window">
                <div className="main-window__header">
                    <div className="main-window__title">Продукция</div>
                    {props.userHasAccess(['ROLE_ADMIN', 'ROLE_MANAGER', 'ROLE_ENGINEER']) && <div className="main-window__button" onClick={() => setShowWindow(!showWindow)}>Категории</div>}
                </div>
                <FormWindow
                    title="Категории продукции"
                    content={
                        <React.Fragment>
                            <SearchBar
                                title="Поиск по категориям"
                                placeholder="Введите название категории для поиска..."
                                setSearchQuery={setSearchQueryCategory}
                            />
                            <TableViewCategory
                                data={categories}
                                searchQuery={searchQueryCategory}
                                userHasAccess={props.userHasAccess}
                                deleteItem={deleteItemCategory}
                            />
                        </React.Fragment>
                    }
                    headerButton={{
                        name: 'Создать категорию',
                        path: '/products/category/new'
                    }}
                    showWindow={showWindow}
                    setShowWindow={setShowWindow}
                />
                <SearchBar
                    title="Поиск продукции"
                    placeholder="Введите название продукции для поиска..."
                    setSearchQuery={setSearchQuery}
                />
                <div className="main-window__info-panel">
                    <div className="main-window__amount_table">Всего: {products.length} записей</div>
                </div>
                <TableView
                    products={products}
                    categories={categories}
                    searchQuery={searchQuery}
                    userHasAccess={props.userHasAccess}
                    deleteItem={deleteItem}
                />
            </div>
        </div>
    );
};

export default Products;