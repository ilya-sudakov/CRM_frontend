import React, { useEffect, useState } from 'react';
import './EditProduct.scss';

const EditProduct = (props) => {
    const [productInputs, setProductInputs] = useState({
        name: "",
        item: "",
        weight: "",
        group: "",
        weight: "",
        unit: "",
        packaging: "",
        comment: ""
    });
    const [imgName, setImgName] = useState("Имя файла...");
    const [imgBASE64, setImgBASE64] = useState('');
    const [nameValid, setNameValid] = useState(true);
    const [itemValid, setItemValid] = useState(false);
    const [weightValid, setWeightValid] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();

    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        validateField(name, value);
        setProductInputs({
            ...productInputs,
            [name]: value
        })
    }

    const handleFileInputChange = (event) => {
        let regex = /.+\.(jpeg|jpg|png|img)/;
        let file = event.target.files[0];
        if (file.name.match(regex) !== null) {
            setImgName(file.name);
            let reader = new FileReader();
            reader.onloadend = (() => {
                setImgBASE64(reader.result);
            });
            reader.readAsDataURL(file);
        }
        else {
            setImgName('Некорректный формат файла!');
        }
    }

    useEffect(() => {
        document.title = "Редактирование продукта";
        const id = props.history.location.pathname.split("/products/edit/")[1];
        if (isNaN(Number.parseInt(id))) {
            alert('Неправильный индекс заявки!');
            props.history.push("/products");
        } else {
            // getProductById(id)
            //     .then(res => res.json())
            //     .then(oldProduct => {
            //         setProductInputs({
            //             date: oldProduct.date,
            //             products: oldProduct.products,
            //             quantity: oldProduct.quantity,
            //             codeWord: oldProduct.codeWord,
            //             responsible: oldProduct.responsible,
            //             status: oldProduct.status
            //         });
            //     })
            //     .catch(error => {
            //         console.log(error);
            //         alert('Неправильный индекс заявки!');
            //         props.history.push("/products");
            //     })
        }
    }, [])
    return (
        <div className="edit_product">
            <div className="edit_product__title">Редактирование продукта</div>
            <form className="edit_product__form">
                {/* <div className="edit_product__item">
                    <div className="edit_product__input_name">Фотография</div>
                    <div className="edit_product__product_img">
                        <img src={imgLandscape} alt="" />
                    </div>
                </div> */}
                <div className="edit_product__item">
                    <div className="edit_product__input_name">Наименование</div>
                    <div className="edit_product__input_field">
                        <input type="text"
                            name="name"
                            defaultValue={name}
                            onChange={handleInputChange}
                            autoComplete="off"
                        />
                    </div>
                </div>
                <div className="edit_product__item">
                    <div className="edit_product__input_name">Артикул</div>
                    <div className="edit_product__input_field">
                        <input type="text"
                            name="item"
                            defaultValue={productInputs.item}
                            onChange={handleInputChange}
                            autoComplete="off"
                        />
                    </div>
                </div>
                <div className="edit_product__item">
                    <div className="edit_product__input_name">Группа продукции</div>
                    <div className="edit_product__input_field">
                        <input type="text"
                            name="comment"
                            defaultValue={productInputs.group}
                            onChange={handleInputChange}
                            autoComplete="off"
                        />
                    </div>
                </div>
                <div className="edit_product__item">
                    <div className="edit_product__input_name">Вес изделия</div>
                    <div className="edit_product__input_field">
                        <input type="text"
                            name="weight"
                            defaultValue={productInputs.weight}
                            onChange={handleInputChange}
                            autoComplete="off"
                        />
                    </div>
                </div>
                <div className="edit_product__item">
                    <div className="edit_product__input_name">Единица измерения</div>
                    <div className="edit_product__input_field">
                        <select
                            name="unit"
                            onChange={handleInputChange}
                        >
                            <option>шт.</option>
                            <option>тыс. шт.</option>
                            <option>упак.</option>
                        </select>
                    </div>
                </div>
                <div className="edit_product__item">
                    <div className="edit_product__input_name">Упаковка</div>
                    <div className="edit_product__input_field">
                        <input type="text"
                            name="packaging"
                            defaultValue={productInputs.packaging}
                            onChange={handleInputChange}
                            autoComplete="off"
                        />
                    </div>
                </div>
                <div className="edit_product__item">
                    <div className="edit_product__input_name">Комментарий</div>
                    <div className="edit_product__input_field">
                        <input type="text"
                            name="comment"
                            defaultValue={productInputs.comment}
                            onChange={handleInputChange}
                            autoComplete="off"
                        />
                    </div>
                </div>
                <div className="edit_product__item">
                    <div className="edit_product__input_name">Фотография</div>
                    <div className="edit_product__file_upload">
                        <div className="edit_product__file_name">
                            {imgName}
                        </div>
                        <label className="edit_product__label" htmlFor="file">
                            Загрузить файл
                                {/* <img className="logo" src={fileUploadImg} alt="" /> */}
                        </label>
                        <input type="file" name="file" id="file" onChange={handleFileInputChange} />
                    </div>
                </div>
                <input className="edit_product__submit" type="submit" onClick={handleSubmit} value="Изменить данные" />
            </form>
        </div>
    );
};

export default EditProduct;