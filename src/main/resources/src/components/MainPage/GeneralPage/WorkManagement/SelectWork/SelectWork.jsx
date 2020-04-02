import React, { useState, useEffect } from 'react';
import deleteSVG from '../../../../../../../../../assets/select/delete.svg';
import './SelectWork.scss';
import SelectWorkItem from '../../../Work/SelectWorkItem/SelectWorkItem.jsx';
import InputProducts from '../../../../../utils/Form/InputProducts/InputProducts.jsx';
import SelectDraft from '../../../Dispatcher/Rigging/SelectDraft/SelectDraft.jsx';

const SelectWork = (props) => {
    const [selected, setSelected] = useState([
        {
            product: [],
            workName: '',
            workType: '',
            workId: null,
            hours: 0,
            draft: []
        }
    ]);
    const [options, setOptions] = useState([]);
    const [curItemsType, setCurItemsType] = useState('');

    const clickOverlay = (event) => {
        const overlay = document.getElementsByClassName("select-work__overlay")[0];
        if (!overlay.classList.contains("select-work__overlay--hidden")) {
            overlay.classList.add("select-work__overlay--hidden");
        }
    }

    useEffect(() => {
        if (props.defaultValue !== undefined) {
            setSelected([...props.defaultValue]);
            const total = props.defaultValue.reduce((sum, cur) => sum + Number.parseInt(cur.hours), 0);
            if (isNaN(total)) {
                props.setTotalHours(0);
            }
            else props.setTotalHours(total);
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
                workName: '',
                workType: '',
                workId: null,
                hours: 0,
            }
        ]);
        props.handleWorkChange([
            ...selected,
            {
                product: [],
                workName: '',
                workId: null,
                workType: '',
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
        const total = temp.reduce((sum, cur) => sum + Number.parseInt(cur.hours), 0);
        if (isNaN(total)) {
            props.setTotalHours(0);
        }
        else props.setTotalHours(total);
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
        if (name === 'hours') {
            const total = temp.reduce((sum, cur) => sum + Number.parseInt(cur.hours), 0);
            if (isNaN(total))
                props.setTotalHours(0);
            else props.setTotalHours(total);
        }
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
                    <div className="select-work__selected_item" key={index}>
                        {/* <div className="select-work__selected_header" index={index} onClick={clickOnForm}>
                            <div className="select-work__selected_name">
                                <span>Работа: </span> {item.workName}
                            </div>
                            <div className="select-work__selected_name">
                                <span>Продукция: </span> {(item.product.length > 0) && item.product.reduce((sum, item) => sum + item.name + ', ', '')}
                            </div>
                        </div> */}
                        <div className="select-work__selected_form" >
                            <SelectWorkItem
                                inputName="Выбор работы"
                                required
                                defaultValue={item.workName}
                                id={index}
                                handleWorkItemChange={(name, id, type) => {
                                    console.log(name, id, type);
                                    let temp = selected;
                                    let originalItem = selected[index];
                                    temp.splice(index, 1, {
                                        ...originalItem,
                                        workType: type,
                                        workName: name,
                                        workId: id
                                    });
                                    setCurItemsType(type);
                                    setSelected([...temp]);
                                    props.handleWorkChange([...temp])
                                }}
                                userHasAccess={props.userHasAccess}
                                readOnly
                            />
                            {/* Вставить InputProducts, только вместо фасовки сделать 
                                единицу измерения(или просто кол-во оставить) */}
                            {(selected[index].workType === 'Продукция' || selected[index].workType === undefined)
                                ?
                                <InputProducts
                                    inputName="Продукция"
                                    options
                                    id={0}
                                    customName={'select-products' + index}
                                    defaultValue={item.product}
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
                                    searchPlaceholder="Введите название продукта для поиска..."
                                // workshop={props.userHasAccess(['ROLE_WORKSHOP'])}
                                />
                                : null
                            }
                            {/* //:(selected[index].workType !== '') &&  */}
                            {/* <div className="select-work__item">
                                <div className="select-work__input_name">Чертежи</div>
                                <div className="select-work__input_field">
                                    <SelectDraft
                                        onChange={(value) => {
                                            // console.log(value)
                                            let temp = selected;
                                            let originalItem = selected[index];
                                            temp.splice(index, 1, {
                                                ...originalItem,
                                                draft: value
                                            })
                                            setSelected([...temp]);
                                            props.handleWorkChange([...temp]);
                                        }}
                                        options
                                        searchPlaceholder={"Добавьте чертеж нажав на кнопку 'Добавить чертеж'"}
                                        userHasAccess={props.userHasAccess}
                                        id={index}
                                    />
                                </div>
                            </div> */}
                            {!props.noTime && <div className="select-work__item">
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
                            </div>}
                        </div>
                        {!props.readOnly && (selected.length > 1) &&
                            <img index={index} onClick={deletePart} className="select-work__img" src={deleteSVG} />
                        }
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SelectWork;