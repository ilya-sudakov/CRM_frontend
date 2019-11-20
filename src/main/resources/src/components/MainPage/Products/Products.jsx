import React, { useEffect, useState } from 'react';
import './Products.scss';
import SearchBar from '../SearchBar/SearchBar.jsx';

const Products = (props) => {
    const [products, setProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    useEffect(() => {
        document.title = "Продукция";
    }, [])
    return (
        <div className="products">
            <div className="products__title">Продукция</div>
            <SearchBar
                title="Поиск продукции"
                placeholder="Введите название продукции для поиска..."
                setSearchQuery={setSearchQuery}
            />
            <div className="requests__amount_table">Всего: {products.length} записей</div>
        </div>
    );
};

export default Products;