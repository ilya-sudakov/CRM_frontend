import React, { useState, useEffect } from 'react';
import deleteSVG from '../../../../../../../assets/select/delete.svg';
import './Select.scss';

const Select = (props) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selected, setSelected] = useState([]);
    let myRef = React.createRef();

    const search = () => {
        return props.options.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
    }

    const handleInputChange = (event) => {
        setSearchQuery(event.target.value);
    }

    const clickOnInput = (event) => {
        const options = document.getElementsByClassName("select__options")[0];
        if (options.classList.contains("select__options--hidden")) {
            options.classList.remove("select__options--hidden")
        }
        else {
            options.classList.add("select__options--hidden")
        }
    }

    const clickOnOption = (event) => {
        const value = event.target.getAttribute("name");
        const id = event.target.getAttribute("id");
        setSelected([
            ...selected,
            {
                id: id,
                name: value,
                quantity: 0
            }
        ])
        props.onChange([
            ...selected,
            {
                id: id,
                name: value,
                quantity: 0
            }
        ]);
    }

    const clickOnSelected = (event) => {
        const id = event.target.getAttribute("id");
        let newSelected = selected;
        newSelected.splice(id, 1);
        setSelected([...newSelected]);
        props.onChange([...newSelected]);
    }

    const handleQuantityChange = (event) => {
        const quantity = event.target.value;
        const id = event.target.getAttribute("id");
        let newSelected = selected;
        newSelected = newSelected.map((item, index) => {
            return ({
                ...item,
                quantity: index == id ? quantity : item.quantity
            })
        })
        setSelected([...newSelected]);
        props.onChange([...newSelected]);
    }

    useEffect(() => {
        if (props.defaultValue !== undefined) {
            setSelected([...props.defaultValue])
        }
    }, [props.defaultValue])

    return (
        <div className="select">
            {!props.readOnly && <input
                type="text"
                className="select__input"
                onChange={handleInputChange}
                onClick={!props.readOnly ? clickOnInput : null}
                // onClick={props.readOnly !== undefined ? "true" : "false"}
                ref={myRef}
                readOnly={props.readOnly}
            />}
            {props.options && <div className="select__options select__options--hidden">
                {search().map((item, index) => (
                    <div id={item.id} name={item.name} className="select__option_item" onClick={clickOnOption}>
                        {item.name}
                    </div>
                ))}
            </div>}
            {/* {console.log(selected)} */}
            <div className="select__selected">
                {selected.map((item, index) => (
                    <div className="select__selected_row">
                        <div className="select__selected_item" >
                            {item.name}
                            {!props.readOnly && <img id={index} className="select__img" src={deleteSVG} alt="" onClick={clickOnSelected} />}
                        </div>
                        <div className="select__selected_quantity">
                            Кол-во
                            <input
                                id={index}
                                type="text"
                                name="quantity"
                                autoComplete="off"
                                defaultValue={item.quantity != 0 ? item.quantity : 0}
                                onChange={handleQuantityChange}
                                readOnly={props.readOnly}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Select;