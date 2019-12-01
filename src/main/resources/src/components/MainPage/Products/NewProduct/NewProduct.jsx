import React, { useEffect, useState } from 'react';
import './NewProduct.scss';

const NewProduct = (props) => {
    const [productInputs, setProductInputs] = useState({
        name: "",
        item: "",
        weight: "",
    })
    const [productErrors, setProductErrors] = useState({
        name: "",
        item: "",
        weight: "",
    })
    const [imgName, setImgName] = useState("Имя файла...");
    const [imgBASE64, setImgBASE64] = useState('');
    const [nameValid, setNameValid] = useState(false);
    const [itemValid, setItemValid] = useState(false);
    const [weightValid, setWeightValid] = useState(false);

    const validateField = (fieldName, value) => {
        switch (fieldName) {
            case 'name':
                setNameValid(value !== "");
                break;
            case 'item':
                setItemValid(value !== "");
                break;
            case 'weight':
                setWeightValid(value !== "");
                break;
        }
    }

    const formIsValid = () => {
        if (nameValid && itemValid && weightValid) {
            return true;
        }
        else {
            alert("Форма не заполнена");
            return false;
        };
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        // formIsValid() && addRequest(requestInputs)
        //     .then(() => props.history.push("/products"))
    }

    const handleInputChange = e => {
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
        document.title = "Создание продукции";
    }, [])
    return (
        <div className="new_product">
            <div className="new_product__title">Новая продукция</div>
            <form className="new_product__form">
                <div className="new_product__item">
                    <div className="new_product__input_name">Наименование</div>
                    <div className="new_product__input_field">
                        <input type="text" name="name" autoComplete="off" onChange={handleInputChange} />
                    </div>
                </div>
                <div className="new_product__item">
                    <div className="new_product__input_name">Артикул</div>
                    <div className="new_product__input_field">
                        <input type="text" name="item" autoComplete="off" onChange={handleInputChange} />
                    </div>
                </div>
                <div className="new_product__item">
                    <div className="new_product__input_name">Группа продукции</div>
                    <div className="new_product__input_field">
                        <input type="text" name="comment" autoComplete="off" onChange={handleInputChange} />
                    </div>
                </div>
                <div className="new_product__item">
                    <div className="new_product__input_name">Вес изделия</div>
                    <div className="new_product__input_field">
                        <input type="text" name="weight" autoComplete="off" onChange={handleInputChange} />
                    </div>
                </div>
                <div className="new_product__item">
                    <div className="new_product__input_name">Единица измерения</div>
                    <div className="new_product__input_field">
                        {/* <input type="text" name="unit" autoComplete="off" onChange={handleInputChange} /> */}
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
                <div className="new_product__item">
                    <div className="new_product__input_name">Упаковка</div>
                    <div className="new_product__input_field">
                        <input type="text" name="packaging" autoComplete="off" onChange={handleInputChange} />
                    </div>
                </div>
                <div className="new_product__item">
                    <div className="new_product__input_name">Комментарий</div>
                    <div className="new_product__input_field">
                        <input type="text" name="comment" autoComplete="off" onChange={handleInputChange} />
                    </div>
                </div>
                {/* <div className="new_product__input_field">
                    <input type="text" name="photo" autoComplete="off" readOnly onChange={handleInputChange} />
                </div> */}
                <div className="new_product__item">
                    <div className="new_product__input_name">Фотография</div>
                    <div className="new_product__file_upload">
                        <div className="new_product__file_name">
                            {imgName}
                        </div>
                        <label className="new_product__label" htmlFor="file">
                            Загрузить файл
                                {/* <img className="logo" src={fileUploadImg} alt="" /> */}
                        </label>
                        <input type="file" name="file" id="file" onChange={handleFileInputChange} />
                    </div>
                </div>
                <input className="new_product__submit" type="submit" onClick={handleSubmit} value="Оформить заявку" />
            </form>
        </div>
    );
};

export default NewProduct;