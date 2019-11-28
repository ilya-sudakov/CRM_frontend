import React, { useEffect, useState } from 'react';
import './Products.scss';
import SearchBar from '../SearchBar/SearchBar.jsx';
import TableView from './TableView/TableView.jsx';

import imgTest from '../../../../../../../assets/searchbar/plus.svg'

const Products = (props) => {
    const [products, setProducts] = useState([
        {
            id: 1,
            imgUrl: imgTest,
            name: 'Продукт1',
            typeOfProduct: 'п',
            weight: '125',
            unit: 'г',
            packaging: 'коробка',
            comment: 'комментарий'
        },
        {
            id: 2,
            imgUrl: imgTest,
            name: 'Продукт2',
            typeOfProduct: 'пf',
            weight: '11225',
            unit: 'г',
            packaging: 'коробка',
            comment: 'комментарий'
        },
        {
            id: 3,
            imgUrl: imgTest,
            name: '3',
            typeOfProduct: 'пsfgsf',
            weight: '112sd25',
            unit: 'г',
            packaging: 'коробка',
            comment: 'комментарий'
        }
    ]);
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
            <TableView 
                data={products}
                searchQuery={searchQuery}
            />
        </div>
    );
};

export default Products;