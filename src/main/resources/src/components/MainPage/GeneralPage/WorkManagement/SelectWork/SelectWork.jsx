import React, { useState, useEffect } from 'react';
import deleteSVG from '../../../../../../../../../assets/select/delete.svg';
import './SelectWork.scss';
import SelectWorkItem from '../../../Work/SelectWorkItem/SelectWorkItem.jsx';
import InputProducts from '../../../../../utils/Form/InputProducts/InputProducts.jsx';

const SelectWork = (props) => {
    const [selected, setSelected] = useState([]);
    const [options, setOptions] = useState([]);

    const clickOverlay = (event) => {
        const overlay = document.getElementsByClassName("select-work__overlay")[0];
        if (!overlay.classList.contains("select-work__overlay--hidden")) {
            overlay.classList.add("select-work__overlay--hidden");
        }
    }

    useEffect(() => {
        if (props.defaultValue !== undefined) {
            setSelected([...props.defaultValue])
        }
        if (props.options !== undefined) {
            setOptions([...props.options])
        }
        
    }, [props.defaultValue, props.options, props.products])

    const clickOnForm = (e) => {
        const id = e.currentTarget.getAttribute("index");
        const form = document.getElementsByClassName("select-work__selected_form")[id];
        if (form.classList.contains("select-work__selected_form--hidden")) {
            e.target.type !== 'text' && !e.target.classList.contains("select-work__img") && form.classList.remove("select-work__selected_form--hidden");
        }
        else {
            e.target.type !== 'text' && !e.target.classList.contains("select-work__img") && form.classList.add("select-work__selected_form--hidden");
        }
    }

    const handleNewPart = (e) => {
        e.preventDefault();
        //Открыть по дефолту форму
        const id = selected.length;
        setSelected([
            ...selected,
            {
                product: [],
                work: '',
                hours: 0,
            }
        ]);
        props.handleWorkChange([
            ...selected,
            {
                product: [],
                work: '',
                hours: 0,
            }
        ]);
        // const form = document.getElementsByClassName("select-work__selected_form")[0];
        // console.log(form);

        // form.classList.remove("select-work__selected_form--hidden");
    }

    const deletePart = (e) => {
        const id = e.target.getAttribute("index");
        let temp = selected;
        temp.splice(id, 1);
        setSelected([...temp]);
        props.handleWorkChange([...temp]);
    }

    const handleInputChange = (event) => {
        const id = event.target.getAttribute("index");
        const name = event.target.getAttribute("name");
        let value = event.target.value;
        if (name === 'hours' && value > 12) {
            value = 12;
        }
        let temp = selected;
        let originalItem = selected[id];
        temp.splice(id, 1, {
            ...originalItem,
            [name]: value
        })
        setSelected([...temp]);
        props.handleWorkChange([...temp])
    }

    return (
        <div className="select-work">
            <div className="select-work__overlay select-work__overlay--hidden" onClick={clickOverlay}></div>
            {!props.readOnly &&
                <button className="select-work__button" onClick={handleNewPart}>
                    Добавить работу
                </button>
            }
            <div className="select-work__selected">
                {selected.map((item, index) => (
                    <div className="select-work__selected_item" >
                        <div className="select-work__selected_header" index={index} onClick={clickOnForm}>
                            <div className="select-work__selected_name">
                                <span>Работа: </span> {item.work}
                            </div>
                            <div className="select-work__selected_name">
                                <span>Продукция: </span> {(item.product.length > 0) && item.product.reduce((sum, item) => sum + item.name + ', ', '')}
                            </div>
                            <div className="select-work__selected_name">
                                <span>Кол-во часов: </span> {item.hours}
                            </div>
                        </div>
                        <div className="select-work__selected_form" >
                            <SelectWorkItem
                                inputName="Выбор работы"
                                required
                                id={index}
                                handleWorkItemChange={(value) => {
                                    let temp = selected;
                                    let originalItem = selected[index];
                                    temp.splice(index, 1, {
                                        ...originalItem,
                                        work: value
                                    })
                                    setSelected([...temp]);
                                    props.handleWorkChange([...temp])
                                }}
                                userHasAccess={props.userHasAccess}
                                readOnly
                            />
                            {/* Вставить InputProducts, только вместо фасовки сделать 
                                единицу измерения(или просто кол-во оставить) */}
                            <InputProducts
                                inputName="Продукция"
                                options
                                id={index}
                                categories={props.categories}
                                products={props.products}
                                name="product"
                                noPackaging
                                onChange={(value) => {
                                    // console.log(value)
                                    let temp = selected;
                                    let originalItem = selected[index];
                                    temp.splice(index, 1, {
                                        ...originalItem,
                                        product: value
                                    })
                                    setSelected([...temp]);
                                    props.handleWorkChange([...temp])
                                }}
                                userHasAccess={props.userHasAccess}
                                // error={requestErrors.requestProducts}
                                searchPlaceholder="Введите название продукта для поиска..."
                            // errorsArr={requestErrors}
                            // setErrorsArr={setRequestErrors}
                            />
                            <div className="select-work__item">
                                <div className="select-work__input_name">Часы</div>
                                <div className="select-work__input_field">
                                    <input
                                        type="number"
                                        name="hours"
                                        index={index}
                                        autoComplete="off"
                                        onChange={handleInputChange}
                                        defaultValue={item.hours}
                                        readOnly={props.readOnly}
                                    />
                                </div>
                            </div>
                        </div>
                        {!props.readOnly &&
                            <img index={index} onClick={deletePart} className="select-work__img" src={deleteSVG} />
                        }
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SelectWork;