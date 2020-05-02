import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import sortIcon from '../../../../../../../../assets/tableview/sort_icon.png';
import plusIcon from '../../../../../../../../assets/tableview/add_item.png';
import plusContIcon from '../../../../../../../../assets/tableview/add_cont.png';
import './TableView.scss';
import ImgLoader from '../../../../utils/TableView/ImgLoader/ImgLoader.jsx';
import TableDataLoading from '../../../../utils/TableView/TableDataLoading/TableDataLoading.jsx';

const TableView = (props) => {
    const [sortOrder, setSortOrder] = useState({
        curSort: 'name',
        id: 'desc'
    })
    const [isLoading, setIsLoading] = useState(true);
    const [productsVisible, setProductsVisible] = useState([]);
    // const [categories, setCategories] = useState([]);

    const changeSortOrder = (event) => {
        const name = event.target.getAttribute("name");
        setSortOrder({
            curSort: name,
            [name]: (sortOrder[name] === "desc" ? "asc" : "desc")
        })
    }

    const searchQuery = (data) => {
        const query = props.searchQuery.toLowerCase();
        return data.filter(item => {
            return (
                item.name.toLowerCase().includes(query) ||
                item.id.toString().includes(query) ||
                item.weight.toString().includes(query) ||
                (item.packaging !== null) && item.packaging.toLowerCase().includes(query) ||
                (item.comment !== null) && item.comment.toLowerCase().includes(query)
            )
        })
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
        setProductsVisible([...checkProduct(id)]);
    }

    useEffect(() => {
        let temp = [];
        props.categories.map((element, index) => (
            temp.push({
                id: element.id,
                hidden: true
            })
        ));
        setProductsVisible([
            ...temp,
        ]);
        props.closeWindow && props.setShowWindow(false);
        props.categories.length > 0 && setIsLoading(false);
    }, [props.categories, props.closeWindow]);

    return (
        <div className="tableview_products">
            <div className="tableview_products__row tableview_products__row--header">
                {/* <div className="tableview_products__col">
                    <span>ID</span>
                    <img name="id" className="tableview_products__img" onClick={changeSortOrder} src={sortIcon} />
                </div> */}
                <div className="tableview_products__col"></div>
                <div className="tableview_products__col">Название</div>
                <div className="tableview_products__col"></div>
                {/* <div className="tableview_products__col"></div> */}
                <div className="tableview_products__col"></div>
                <div className="tableview_products__col"></div>
                <div className="tableview_products__col">Действия</div>
            </div>
            {props.categories.map((category, category_id) => (
                <React.Fragment>
                    <div id={category.id} key={category_id}
                        className="tableview_products__row"
                        onClick={handleClickCategory}
                    >
                        {/* <div className="tableview_products__col">{category.id}</div> */}
                        <div className="tableview_products__col"></div>
                        <div className="tableview_products__col">{category.category}</div>
                        <div className="tableview_products__col"></div>
                        <div className="tableview_products__col"></div>
                        {/* <div className="tableview_products__col"></div> */}
                        <div className="tableview_products__col"></div>
                        <div className="tableview_products__actions">
                            {props.userHasAccess && props.userHasAccess(['ROLE_ADMIN', 'ROLE_MANAGER']) && <Link to={"/products/category/edit/" + category.id} className="tableview_products__action">Редактировать</Link>}
                            {props.userHasAccess && props.userHasAccess(['ROLE_ADMIN']) && <div data-id={category_id} className="tableview_products__action" onClick={null}>Удалить</div>}
                        </div>
                    </div>
                    <div id={category_id} className={(isProductsHidden(category.id) === true) ? "tableview_products__categories tableview_products__categories--hidden" : "tableview_products__categories"}>
                        <div className="tableview_products__row tableview_products__row--header">
                            <div className="tableview_products__col">Фото</div>
                            <div className="tableview_products__col">Название</div>
                            <div className="tableview_products__col">Вес</div>
                            {/* <div className="tableview_products__col">Упаковка</div> */}
                            <div className="tableview_products__col">Место производства</div>
                            <div className="tableview_products__col">Комментарий</div>
                            <div className="tableview_products__col">Действия</div>
                        </div>
                        {isLoading && <TableDataLoading
                            minHeight='50px'
                            className="tableview_products__row tableview_products__row--even"
                        />}
                        {sortProducts(props.products).map((product, product_id) => (
                            (product.category === category.category) && <div key={product_id} className={"tableview_products__row tableview_products__row--odd"}>
                                {/* <div className="tableview_products__col">{product.id}</div> */}
                                <div className="tableview_products__col">
                                    <ImgLoader
                                        imgSrc={product.photo}
                                        imgClass="tableview_products__product_img"
                                    />
                                    {/* <img className="tableview_products__product_img" src={product.photo} alt="" /> */}
                                </div>
                                <div className="tableview_products__col">{product.name}</div>
                                <div className="tableview_products__col">{product.weight}</div>
                                {/* <div className="tableview_products__col">{product.packaging}</div> */}
                                <div className="tableview_products__col">{product.productionLocation}</div>
                                <div className="tableview_products__col">{product.comment}</div>
                                <div className="tableview_products__actions">
                                    <Link to={"/products/view/" + product.id} className="tableview_products__action">Просмотр</Link>
                                    {props.userHasAccess && props.userHasAccess(['ROLE_ADMIN', 'ROLE_MANAGER']) && <Link to={"/products/edit/" + product.id} className="tableview_products__action">Редактировать</Link>}
                                    {props.userHasAccess && props.userHasAccess(['ROLE_ADMIN']) && <div data-id={product.id} className="tableview_products__action" onClick={props.deleteItem}>Удалить</div>}
                                    {props.selectProduct && <div className="tableview_products__action tableview_products__action--double">
                                        <div data-id={product.id} className="tableview_products__action tableview_products__action--continue" onClick={() => {
                                            props.selectProduct(product.id, product.name);
                                            // props.setCloseWindow(!props.closeWindow);
                                        }}>
                                            <img className="tableview_products__img" src={plusContIcon} alt="" />
                                        </div>
                                        <div data-id={product.id} className="tableview_products__action tableview_products__action--close" onClick={() => {
                                            props.selectProduct(product.id, product.name);
                                            props.setCloseWindow(!props.closeWindow);
                                        }}>
                                            <img className="tableview_products__img" src={plusIcon} alt="" />
                                        </div>
                                    </div>}
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