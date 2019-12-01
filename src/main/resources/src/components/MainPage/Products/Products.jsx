import React, { useEffect, useState } from 'react';
import './Products.scss';
import SearchBar from '../SearchBar/SearchBar.jsx';
import TableView from './TableView/TableView.jsx';

import imgTest from '../../../../../../../assets/searchbar/plus.svg';
import imgVertical from '../../../../../../../assets/product_vertical.jpg';
import imgLandscape from '../../../../../../../assets/product_landscape.jpg';

const Products = (props) => {
    const [products, setProducts] = useState([
        {
            id: 1,
            imgUrl: imgVertical,
            name: 'Продукт1',
            typeOfProduct: 'п',
            weight: '125',
            unit: 'г',
            packaging: 'коробка',
            comment: 'комментарий'
        },
        {
            id: 2,
            imgUrl: imgLandscape,
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
            weight: '11225',
            unit: 'г',
            packaging: 'коробка',
            comment: 'комментарий'
        },
        {
            id: 4,
            imgUrl: imgLandscape,
            name: 'Продукт2',
            typeOfProduct: 'пf',
            weight: '11225',
            unit: 'г',
            packaging: 'коробка',
            comment: 'комментарий'
        },
        {
            id: 5,
            imgUrl: imgLandscape,
            name: 'Продукт2',
            typeOfProduct: 'пf',
            weight: '11225',
            unit: 'г',
            packaging: 'коробка',
            comment: 'комментарий'
        },
        {
            id: 6,
            imgUrl: imgLandscape,
            name: 'Продукт2',
            typeOfProduct: 'пf',
            weight: '11225',
            unit: 'г',
            packaging: 'коробка',
            comment: 'комментарий'
        },
        {
            id: 7,
            imgUrl: imgLandscape,
            name: 'Продукт2',
            typeOfProduct: 'пf',
            weight: '11225',
            unit: 'г',
            packaging: 'коробка',
            comment: 'комментарий'
        },
        {
            id: 8,
            imgUrl: imgLandscape,
            name: 'Продукт2',
            typeOfProduct: 'пf',
            weight: '11225',
            unit: 'г',
            packaging: 'коробка',
            comment: 'комментарий'
        },
        {
            id: 9,
            imgUrl: imgLandscape,
            name: 'Продукт2',
            typeOfProduct: 'пf',
            weight: '11225',
            unit: 'г',
            packaging: 'коробка',
            comment: 'комментарий'
        },
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