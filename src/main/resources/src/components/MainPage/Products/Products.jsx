import React, { useEffect, useState } from 'react';
import './Products.scss';
import SearchBar from '../SearchBar/SearchBar.jsx';
import TableView from './TableView/TableView.jsx';
import { getProducts, deleteProduct } from '../../../utils/RequestsAPI/Products.jsx';
import { getCategories, deleteCategory } from '../../../utils/RequestsAPI/Products/Categories.jsx';
import FormWindow from '../../../utils/Form/FormWindow/FormWindow.jsx';
import TableViewCategory from './CategoryManagement/TableView/TableViewCategory.jsx';

const Products = (props) => {
    // const [products, setProducts] = useState([]);
    const [productsCount, setProductsCount] = useState(0);
    const [categories, setCategories] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchQueryCategory, setSearchQueryCategory] = useState('');
    const [showWindow, setShowWindow] = useState(false);

    useEffect(() => {
        document.title = "Продукция";
        // loadProducts();
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

    // const loadProducts = () => {
    //     getProducts()
    //         .then(response => response.json())
    //         .then(response => {
    //             // console.log(response);
    //             setProducts(response);
    //         })
    //         .catch(error => {
    //             console.log(error);
    //         })
    // }

    const loadCategories = () => {
        getCategories()
            .then(response => response.json())
            .then(response => {
                // console.log(response);
                let count = 0;
                response.map(item => {
                    item.products.map(() => {
                        count++;
                    })
                })
                setProductsCount(count);
                setCategories(response);
            })
            .catch(error => {
                console.log(error);
            })
    }

    return (
        <div className="products">
            <div className="products__header">
                <div className="products__title">Продукция</div>
                <div className="products__button" onClick={() => setShowWindow(!showWindow)}>Категории</div>
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
                    path: 'products/category/new'
                }}
                showWindow={showWindow}
                setShowWindow={setShowWindow}
            />
            <SearchBar
                title="Поиск продукции"
                placeholder="Введите название продукции для поиска..."
                setSearchQuery={setSearchQuery}
            />
            <div className="products__amount_table">Всего: {productsCount} записей</div>
            <TableView
                categories={categories}
                searchQuery={searchQuery}
                userHasAccess={props.userHasAccess}
                deleteItem={deleteItem}
            />
        </div>
    );
};

export default Products;