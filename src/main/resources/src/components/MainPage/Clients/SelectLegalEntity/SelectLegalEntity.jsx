import React, { useState, useEffect } from 'react';
import deleteSVG from '../../../../../../../../assets/select/delete.svg';
import './SelectLegalEntity.scss';
import { getInfoByINN, getBIKByINN } from '../../../../utils/RequestsAPI/Clients.jsx';
import ImgLoader from '../../../../utils/TableView/ImgLoader/ImgLoader.jsx';

const SelectLegalEntity = (props) => {
    const [selected, setSelected] = useState([
        {
            INN: '7707083893',
            KPP: '',
            OGRN: '',
            BIK: '',
            checkingAccount: '',
            legalAddress: '',
            factualAddress: '',
        }
    ]);
    const [options, setOptions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const clickOverlay = (event) => {
        const overlay = document.getElementsByClassName("select-legal-entity__overlay")[0];
        if (!overlay.classList.contains("select-legal-entity__overlay--hidden")) {
            overlay.classList.add("select-legal-entity__overlay--hidden");
        }
    }

    useEffect(() => {
        if (props.defaultValue !== undefined) {
            setSelected([...props.defaultValue]);
        }
        if (props.options !== undefined) {
            setOptions([...props.options])
        }

    }, [props.defaultValue, props.options])

    const clickOnForm = (e) => {
        const id = e.currentTarget.getAttribute("index");
        const form = document.getElementsByClassName("select-legal-entity__selected_form")[id];
        if (form.classList.contains("select-legal-entity__selected_form--hidden")) {
            e.target.type !== 'text' && !e.target.classList.contains("select-legal-entity__img") && form.classList.remove("select-legal-entity__selected_form--hidden");
        }
        else {
            e.target.type !== 'text' && !e.target.classList.contains("select-legal-entity__img") && form.classList.add("select-legal-entity__selected_form--hidden");
        }
    }

    const handleNewLegalEntity = (e) => {
        e.preventDefault();
        //Открыть по дефолту форму
        const id = selected.length;
        setSelected([
            ...selected,
            {
                INN: '7707083893',
                KPP: '',
                OGRN: '',
                BIK: '',
                checkingAccount: '',
                legalAddress: '',
                factualAddress: ''
            }
        ]);
        props.handleLegalEntityChange([
            ...selected,
            {
                INN: '7707083893',
                KPP: '',
                OGRN: '',
                BIK: '',
                checkingAccount: '',
                legalAddress: '',
                factualAddress: ''
            }
        ]);
        // const form = document.getElementsByClassName("select-legal-entity__selected_form")[0];
        // console.log(form);

        // form.classList.remove("select-legal-entity__selected_form--hidden");
    }

    const deleteLegalEntity = (e) => {
        const id = e.target.getAttribute("index");
        let temp = selected;
        temp.splice(id, 1);
        setSelected([...temp]);
        props.handleLegalEntityChange([...temp]);
    }

    const handleInputChange = (event) => {
        const id = event.target.getAttribute("index");
        const name = event.target.getAttribute("name");
        let value = event.target.value;
        let temp = selected;
        let originalItem = selected[id];
        temp.splice(id, 1, {
            ...originalItem,
            [name]: value
        })
        setSelected([...temp]);
        props.handleLegalEntityChange([...temp])
    }

    return (
        <div className="select-legal-entity">
            <div className="select-legal-entity__overlay select-legal-entity__overlay--hidden" onClick={clickOverlay}></div>
            {!props.readOnly &&
                <button className="select-legal-entity__button" onClick={handleNewLegalEntity}>
                    Добавить юридическое лицо
                </button>
            }
            <div className="select-legal-entity__selected">
                {selected.map((item, index) => (
                    <div className="select-legal-entity__selected_item" >
                        <div className="select-legal-entity__selected_header" index={index} onClick={clickOnForm}>
                            <div className="select-legal-entity__selected_name">
                                <span>ИНН: </span> <span>{item.INN}</span>
                            </div>
                            <div className="select-legal-entity__selected_name">
                                <span>ОГРН: </span> <span>{item.OGRN}</span>
                            </div>
                            <div className="select-legal-entity__selected_name">
                                <span>Адрес: </span> <span>{item.legalAddress}</span>
                            </div>
                        </div>
                        <div className="select-legal-entity__selected_form" >
                            <div className="select-legal-entity__item">
                                <div className="select-legal-entity__input_name">ИНН</div>
                                <div className="select-legal-entity__input_field">
                                    <input
                                        type="text"
                                        name="INN"
                                        index={index}
                                        autoComplete="off"
                                        onChange={handleInputChange}
                                        value={item.INN}
                                        readOnly={props.readOnly}
                                    />
                                </div>
                            </div>
                            <div className="select-legal-entity__item">
                                <div className="select-legal-entity__input_name">КПП</div>
                                <div className="select-legal-entity__input_field">
                                    <input
                                        type="text"
                                        name="KPP"
                                        index={index}
                                        autoComplete="off"
                                        onChange={handleInputChange}
                                        value={item.KPP}
                                        readOnly={props.readOnly}
                                    />
                                </div>
                            </div>
                            <div className="select-legal-entity__item">
                                <div className="select-legal-entity__input_name">ОГРН</div>
                                <div className="select-legal-entity__input_field">
                                    <input
                                        type="text"
                                        name="OGRN"
                                        index={index}
                                        autoComplete="off"
                                        onChange={handleInputChange}
                                        value={item.OGRN}
                                        readOnly={props.readOnly}
                                    />
                                </div>
                            </div>
                            <div className="select-legal-entity__item">
                                <div className="select-legal-entity__input_name">БИК</div>
                                <div className="select-legal-entity__input_field">
                                    <input
                                        type="text"
                                        name="BIK"
                                        index={index}
                                        autoComplete="off"
                                        onChange={handleInputChange}
                                        value={item.BIK}
                                        readOnly={props.readOnly}
                                    />
                                </div>
                            </div>
                            <div className="select-legal-entity__item">
                                <div className="select-legal-entity__input_name">Расчетный счет</div>
                                <div className="select-legal-entity__input_field">
                                    <input
                                        type="text"
                                        name="checkingAccount"
                                        index={index}
                                        autoComplete="off"
                                        onChange={handleInputChange}
                                        value={item.checkingAccount}
                                        readOnly={props.readOnly}
                                    />
                                </div>
                            </div>
                            <div className="select-legal-entity__item">
                                <div className="select-legal-entity__input_name">Юридический адрес</div>
                                <div className="select-legal-entity__input_field">
                                    <input
                                        type="text"
                                        name="legalAddress"
                                        index={index}
                                        autoComplete="off"
                                        onChange={handleInputChange}
                                        value={item.legalAddress}
                                        readOnly={props.readOnly}
                                    />
                                </div>
                            </div>
                            <div className="select-legal-entity__item">
                                <div className="select-legal-entity__input_name">Фактический адрес</div>
                                <div className="select-legal-entity__input_field">
                                    <input
                                        type="text"
                                        name="factualAddress"
                                        index={index}
                                        autoComplete="off"
                                        onChange={handleInputChange}
                                        value={item.factualAddress}
                                        readOnly={props.readOnly}
                                    />
                                </div>
                            </div>
                            {isLoading ? <ImgLoader /> : <button className="select-legal-entity__button" onClick={(event) => {
                                event.preventDefault();
                                setIsLoading(true);
                                //Получаем данные о компании(Головной офис - MAIN BRANCH) по ИНН
                                getInfoByINN({ query: item.INN, branch_type: 'MAIN' })
                                    .then(res => res.json())
                                    .then(res => {
                                        console.log(res);
                                        setIsLoading(false);
                                        if (res.suggestions.length > 0) {
                                            let newData = Object.assign({
                                                ...item,
                                                name: res.suggestions[0].data.name.full,
                                                KPP: res.suggestions[0].data.kpp,
                                                OGRN: res.suggestions[0].data.ogrn,
                                                legalAddress: res.suggestions[0].data.address.value,
                                                legalEntity: res.suggestions[0].data.management.name
                                            })
                                            return newData;
                                        }
                                        else return null;
                                    })
                                    .then((newData) => {
                                        if (newData !== null) {
                                            //Получаем БИК банка по названию компании
                                            getBIKByINN({ query: newData.name })
                                                .then(res => res.json())
                                                .then(res => {
                                                    // console.log(res);
                                                    setIsLoading(false);
                                                    let temp = selected;
                                                    temp.splice(index, 1, {
                                                        ...item,
                                                        ...newData,
                                                        BIK: res.suggestions[0].data.bic,
                                                    })
                                                    setSelected([...temp]);
                                                    props.handleLegalEntityChange([...temp])
                                                })
                                        }
                                        else {
                                            alert("Не найдено данных с данным ИНН");
                                        }
                                    })
                            }}>
                                Загрузить данные по ИНН
                            </button>}
                        </div>
                        {!props.readOnly && (index !== 0) &&
                            <img index={index} onClick={deleteLegalEntity} className="select-legal-entity__img" src={deleteSVG} />
                        }
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SelectLegalEntity;