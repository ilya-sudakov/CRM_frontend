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
    const [imgName, setImgName] = useState("");
    const [nameValid, setNameValid] = useState(true);
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
        //     .then(() => props.history.push("/requests"))
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
        setImgName(file.name.match(regex) !== null ? file.name : 'Некорректный формат файла!');
    }

    useEffect(() => {
        document.title = "Создание продукции";
    }, [])
    return (
        <div className="new_product">
            <div className="new_product__title">Новая продукция</div>
            <form className="new_product__form">
                <div className="new_product__input_name">Наименование</div>
                <div className="new_product__input_field">
                    <input type="text" name="name" autoComplete="off" onChange={handleInputChange} />
                </div>
                <div className="new_product__input_name">Артикул</div>
                <div className="new_product__input_field">
                    <input type="text" name="item" autoComplete="off" onChange={handleInputChange} />
                </div>
                <div className="new_product__input_name">Вес изделия</div>
                <div className="new_product__input_field">
                    <input type="text" name="weight" autoComplete="off" onChange={handleInputChange} />
                </div>
                <div className="new_product__input_name">Фотография</div>
                {/* <div className="new_product__input_field">
                    <input type="text" name="photo" autoComplete="off" readOnly onChange={handleInputChange} />
                </div> */}
                <div className="new_product__file_upload">
                    <div className="new_product__file_name">
                        {imgName}
                    </div>
                    <label className="new_product__label" htmlFor="file">
                        Загрузить файл
                                {/* <img className="logo" src={fileUploadImg} alt="" /> */}
                    </label>
                    <input type="file" name="file" id="file" onChange={handleFileInputChange}/>
                </div>
                <input className="new_product__submit" type="submit" onClick={handleSubmit} value="Оформить заявку" />
            </form>
        </div>
    );
};

export default NewProduct;