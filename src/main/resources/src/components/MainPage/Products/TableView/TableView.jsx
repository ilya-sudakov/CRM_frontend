import React, { useState } from 'react';
import sortIcon from '../../../../../../../../assets/tableview/sort_icon.png';
import './Tableview.scss';

const TableView = (props) => {
    const [sortOrder, setSortOrder] = useState({
        curSort: 'id',
        id: 'desc'
    })

    const changeSortOrder = (event) => {
        const name = event.target.getAttribute("name");
        setSortOrder({
            curSort: name,
            [name]: (sortOrder[name] === "desc" ? "asc" : "desc")
        })
    }

    const searchQuery = (data) => {
        return data.filter(item => item.name.includes(props.searchQuery))
    }

    const sortProducts = (data) => {
        return searchQuery(data).sort((a, b) => {
            if (a[sortOrder.curSort] < b[sortOrder.curSort]) {
                return (sortOrder[sortOrder.curSort] === "desc" ? 1 : -1);
            }
            if (a[sortOrder.curSort] > b[sortOrder.curSort]) {
                return (sortOrder[sortOrder.curSort] === "desc" ? -1 : 1);
            }
            return 0;
        })
    }

    return (
        <div className="tableview_products">
            <div className="tableview_products__row tableview_products__row--header">
                <div className="tableview_products__col">
                    <span>ID</span>
                    <img name="id" className="tableview_products__img" onClick={changeSortOrder} src={sortIcon} />
                </div>
                <div className="tableview_products__col">Фото</div>
                <div className="tableview_products__col">Название</div>
                <div className="tableview_products__col">Артикул</div>
                <div className="tableview_products__col">Вес</div>
                <div className="tableview_products__col">Действия</div>
            </div>
            {sortProducts(props.data).map((product, product_id) => (
                <div key={product_id} className={"tableview_products__row " + (product.id % 2 === 0 ? "tableview_products__row--even" : "tableview_products__row--odd")}>
                    <div className="tableview_products__col">{product.id}</div>
                    <div className="tableview_products__col">
                        <img className="tableview_products__product_img" src={product.imgUrl} alt=""/>
                    </div>
                    <div className="tableview_products__col">{product.name}</div>
                    <div className="tableview_products__col">{product.item}</div>
                    <div className="tableview_products__col">{product.weight}</div>
                    <div className="tableview_products__actions">
                        {/* <div data-id={product.id} className="tableview_products__action" >Просмотр</div> */}
                        <div data-id={product.id} className="tableview_products__action">Редактировать</div>
                        {/* <div data-id={product.id} className="tableview_products__action" onClick={props.deleteItem}>Удалить</div> */}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default TableView;