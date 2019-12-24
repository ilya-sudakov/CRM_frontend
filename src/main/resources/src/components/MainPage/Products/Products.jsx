import React, { useEffect, useState } from 'react';
import './Products.scss';
import SearchBar from '../SearchBar/SearchBar.jsx';
import TableView from './TableView/TableView.jsx';
import { getProducts, deleteProduct } from '../../../utils/utilsAPI.jsx';

const Products = (props) => {
    const [products, setProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        document.title = "Продукция";
        loadProducts();
    }, [])

    const deleteItem = (event) => {
        const id = event.target.dataset.id;
        deleteProduct(id)
            .then(() => loadProducts())
    }

    const loadProducts = () => {
        getProducts()
            .then(response => response.json())
            .then(response => {
                setProducts(response);
            })
            .catch(error => {
                console.log(error);
            })
    }

    return (
        <div className="products">
            <div className="products__title">Продукция</div>
            <SearchBar
                title="Поиск продукции"
                placeholder="Введите название продукции для поиска..."
                setSearchQuery={setSearchQuery}
            />
            <div className="products__amount_table">Всего: {products.length} записей</div>
            <TableView
                data={products}
                searchQuery={searchQuery}
                userHasAccess={props.userHasAccess}
                deleteItem={deleteItem}
            />
        </div>
    );
};

export default Products;