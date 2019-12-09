import React, { useEffect, useState } from 'react';
import './EditPart.scss';

const EditPart = (props) => {
    const [partInputs, setPartInputs] = useState({
        number: '',
        name: '',
        dimensions: '',
        processing: ''
    })
    const [productErrors, setProductErrors] = useState({
        number: '',
        name: '',
        dimensions: '',
        processing: ''
    })
    const [partId, setPartId] = useState(1);
    const [nameValid, setNameValid] = useState(true);

    const validateField = (fieldName, value) => {
        switch (fieldName) {
            case 'package':
                setNameValid(value !== "");
                break;
        }
    }

    const formIsValid = () => {
        if (nameValid) {
            return true;
        }
        else {
            alert("Форма не заполнена");
            return false;
        };
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(partInputs);

        // formIsValid() && addPart(partInputs)
        //     .then(() => props.history.push("/dispatcher/rigging/parts"))
    }

    const handleInputChange = e => {
        const { name, value } = e.target;
        validateField(name, value);
        setPartInputs({
            ...partInputs,
            [name]: value
        })
    }

    useEffect(() => {
        document.title = "Редактирование детали";
        const id = props.history.location.pathname.split("/dispatcher/rigging/parts/edit/")[1];
        if (isNaN(Number.parseInt(id))) {
            alert('Неправильный индекс транспортировки!');
            props.history.push("/dispatcher/rigging/parts");
        } else {
            setPartId(id);
            // getPartById(id)
            //     .then(res => res.json())
            //     .then(oldRequest => {
            //         setPartInputs({
            //             name: oldRequest.name,
            //             number: oldRequest.number,
            //             dimensions: oldRequest.dimensions,
            //             processing: oldRequest.processing
            //         });
            //     })
            //     .catch(error => {
            //         console.log(error);
            //         alert('Неправильный индекс детали!');
            //         props.history.push("/dispatcher/rigging/parts");
            //     })
        }
    }, [])
    return (
        <div className="edit_part">
            <div className="edit_part__title">Редактирование детали</div>
            <form className="edit_part__form">
                <div className="edit_part__item">
                    <div className="edit_part__input_name">Артикул*</div>
                    <div className="edit_part__input_field">
                        <input type="text"
                            name="number"
                            autoComplete="off"
                            defaultValue={partInputs.number}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div className="edit_part__item">
                    <div className="edit_part__input_name">Название*</div>
                    <div className="edit_part__input_field">
                        <input type="text"
                            name="name"
                            autoComplete="off"
                            defaultValue={partInputs.name}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div className="edit_part__item">
                    <div className="edit_part__input_name">Размеры*</div>
                    <div className="edit_part__input_field">
                        <input type="text"
                            name="dimensions"
                            autoComplete="off"
                            defaultValue={partInputs.dimensions}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div className="edit_part__item">
                    <div className="edit_part__input_name">Обработка*</div>
                    <div className="edit_part__input_field">
                        <input type="text"
                            name="processing"
                            autoComplete="off"
                            defaultValue={partInputs.processing}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div className="edit_part__input_hint">* - поля, обязательные для заполнения</div>
                <input className="edit_part__submit" type="submit" onClick={handleSubmit} value="Изменить деталь" />
            </form>
        </div>
    );
};

export default EditPart;