import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import sortIcon from '../../../../../../../../assets/tableview/sort_icon.png';
import './TableView.scss';

const TableView = (props) => {
    const [sortOrder, setSortOrder] = useState({
        curSort: 'id',
        id: 'desc'
    })
    const [productsVisible, setProductsVisible] = useState([]);
    const [categories, setCategories] = useState([
        {
            id: 1,
            name: 'Первая группа'
        },
        {
            id: 2,
            name: 'Вторая группа'
        },
        {
            id: 3,
            name: 'Третья группа'
        },
    ])

    const changeSortOrder = (event) => {
        const name = event.target.getAttribute("name");
        setSortOrder({
            curSort: name,
            [name]: (sortOrder[name] === "desc" ? "asc" : "desc")
        })
    }

    const searchQuery = (data) => {
        const query = props.searchQuery.toLowerCase();
        return data.filter(item =>
            item.name.toLowerCase().includes(query) ||
            item.id.toString().includes(query) ||
            item.typeOfProduct.toLowerCase().includes(query) ||
            item.weight.toString().includes(query) ||
            item.packaging.toLowerCase().includes(query) ||
            item.comment.toLowerCase().includes(query)
            // item.vendor.toLowerCase().includes(query)
        )
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

    const checkProduct = (index) => {
        index = Number.parseInt(index);
        return productsVisible.map((element, element_index) => {
            if (element.id == index) {
                let temp2 = Object.assign({
                    id: index,
                    hidden: !element.hidden
                })
                return temp2;
            }
            return (element);
        })
    }

    const isProductsHidden = (index) => {
        index = Number.parseInt(index);
        let check = true;
        productsVisible.map((element) => {
            if (element.id === index) {
                check = element.hidden;
            }
        })
        return check;
    }

    const handleClickCategory = (event) => {
        let id = event.currentTarget.getAttribute('id');
        // ((event.target.className !== "tableview__color_name") &&
        //     (!event.target.className.includes("tableview__color_option")) &&
        //     (!event.target.className.includes("tableview__color_overlay")) &&
        //     (!event.target.className.includes("tableview__img"))
        // ) && 
        setProductsVisible([...checkProduct(id)]);
    }

    useEffect(() => {
        let temp = [];
        categories.map((element, index) => (
            temp.push({
                id: element.id,
                hidden: true
            })
        ));
        setProductsVisible([
            ...temp,
        ]);
    }, [props.data])

    return (
        <div className="tableview_products">
            <div className="tableview_products__row tableview_products__row--header">
                <div className="tableview_products__col">
                    <span>ID</span>
                    <img name="id" className="tableview_products__img" onClick={changeSortOrder} src={sortIcon} />
                </div>
                <div className="tableview_products__col">Фото</div>
                <div className="tableview_products__col">Название</div>
                <div className="tableview_products__col">Вес</div>
                <div className="tableview_products__col">Упаковка</div>
                <div className="tableview_products__col">Комментарий</div>
                <div className="tableview_products__col">Действия</div>
            </div>
            {/* {sortProducts(props.data).map((product, product_id) => (
                    <div key={product_id} className={"tableview_products__row " + (product.id % 2 === 0 ? "tableview_products__row--even" : "tableview_products__row--odd")}>
                        <div className="tableview_products__col">{product.id}</div>
                        <div className="tableview_products__col">
                            <img className="tableview_products__product_img" src={product.photo} alt="" />
                        </div>
                        <div className="tableview_products__col">{product.name}</div>
                        <div className="tableview_products__col">{product.weight}</div>
                        <div className="tableview_products__col">{product.packaging}</div>
                        <div className="tableview_products__col">{product.comment}</div>
                        <div className="tableview_products__actions">
                            <Link to={"/products/view/" + product.id} className="tableview_products__action">Просмотр</Link>
                            {props.userHasAccess && props.userHasAccess(['ROLE_ADMIN', 'ROLE_MANAGER']) && <Link to={"/products/edit/" + product.id} className="tableview_products__action">Редактировать</Link>}
                            {props.userHasAccess && props.userHasAccess(['ROLE_ADMIN']) && <div data-id={product.id} className="tableview_products__action" onClick={props.deleteItem}>Удалить</div>}
                            {props.selecting && <div data-id={product.id} className="tableview_products__action" onClick={props.deleteItem}>Выбрать</div>}
                        </div>
                    </div>
            ))} */}
            {categories.map((category, category_id) => (
                <React.Fragment>
                    <div id={category.id} key={category_id}
                        className="tableview_products__row"
                        onClick={handleClickCategory}
                    >
                        <div className="tableview_products__col">{category.id}</div>
                        <div className="tableview_products__col"></div>
                        <div className="tableview_products__col">{category.name}</div>
                        <div className="tableview_products__col"></div>
                        <div className="tableview_products__col"></div>
                        <div className="tableview_products__col"></div>
                        <div className="tableview_products__actions">
                            {props.userHasAccess && props.userHasAccess(['ROLE_ADMIN', 'ROLE_MANAGER']) && <Link to={"/products/category/edit/" + category.id} className="tableview_products__action">Редактировать</Link>}
                            {props.userHasAccess && props.userHasAccess(['ROLE_ADMIN']) && <div data-id={category_id} className="tableview_products__action" onClick={null}>Удалить</div>}
                        </div>
                    </div>
                    <div id={category_id} className={"tableview_products__categories " + ((isProductsHidden(category.id) === true) && "tableview_products__categories--hidden")}>
                        {sortProducts(props.data).map((product, product_id) => (
                            (product.typeOfProduct === "FIRST" ? "Первая группа" === category.name :
                                product.typeOfProduct === "SECOND" ? "Вторая группа" === category.name :
                                    product.typeOfProduct === "THIRD" ? "Третья группа" === category.name :
                                        false) && <div key={product_id} className={"tableview_products__row " + (product.id % 2 === 0 ? "tableview_products__row--even" : "tableview_products__row--odd")}>
                                <div className="tableview_products__col">{product.id}</div>
                                <div className="tableview_products__col">
                                    <img className="tableview_products__product_img" src={product.photo} alt="" />
                                </div>
                                <div className="tableview_products__col">{product.name}</div>
                                <div className="tableview_products__col">{product.weight}</div>
                                <div className="tableview_products__col">{product.packaging}</div>
                                <div className="tableview_products__col">{product.comment}</div>
                                <div className="tableview_products__actions">
                                    <Link to={"/products/view/" + product.id} className="tableview_products__action">Просмотр</Link>
                                    {props.userHasAccess && props.userHasAccess(['ROLE_ADMIN', 'ROLE_MANAGER']) && <Link to={"/products/edit/" + product.id} className="tableview_products__action">Редактировать</Link>}
                                    {props.userHasAccess && props.userHasAccess(['ROLE_ADMIN']) && <div data-id={product.id} className="tableview_products__action" onClick={props.deleteItem}>Удалить</div>}
                                    {props.selecting && <div data-id={product.id} className="tableview_products__action" onClick={props.deleteItem}>Выбрать</div>}
                                </div>
                            </div>
                        ))}
                    </div>
                </React.Fragment>
            ))}
        </div>
    )
}

export default TableView;