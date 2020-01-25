import React, { useState, useEffect } from 'react';
import deleteSVG from '../../../../../../../assets/select/delete.svg';
import './SelectUser.scss';
import { getUsers } from '../../../utils/RequestsAPI/Users.jsx';

const SelectUser = (props) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [options, setOptions] = useState([]);
    const [selectedUser, setSelectedUser] = useState('');
    const [customUser, setCustomUser] = useState(false);
    let myRef = React.createRef();

    const search = () => {
        let searchFilter = options.filter(item =>
            item.username.toLowerCase().includes(searchQuery.toLowerCase())
        )
        return searchFilter;
    }

    const handleInputChange = (event) => {
        setSearchQuery(event.target.value);
        setSelectedUser(event.target.value);
        props.onChange(event.target.value);
    }

    const clickOnInput = () => {
        const options = document.getElementsByClassName("select_user__options")[0];
        const overlay = document.getElementsByClassName("select_user__overlay")[0];
        if (options.classList.contains("select_user__options--hidden") && search().length != 0) {
            options.classList.remove("select_user__options--hidden");
            overlay.classList.remove("select_user__overlay--hidden");
        }
        else {
            (search().length != 0) && options.classList.add("select_user__options--hidden");
            (search().length != 0) && overlay.classList.add("select_user__overlay--hidden");
        }
    }

    const clickOverlay = (event) => {
        const overlay = document.getElementsByClassName("select_user__overlay")[0];
        if (!overlay.classList.contains("select_user__overlay--hidden")) {
            overlay.classList.add("select_user__overlay--hidden");
            clickOnInput();
        }
    }

    const clickOnOption = (event) => {
        const value = event.target.getAttribute("name");
        const id = event.target.getAttribute("id");
        clickOnInput();
        setSelectedUser(value);
        props.onChange(value);
    }

    useEffect(() => {
        // if (props.options !== undefined) {
        //     setOptions([...props.options])
        // }
        getUsers()
            .then(res => res.json())
            .then(res => {
                setOptions(res);
            })
            .catch(error => {
                !props.defaultValue && setSelectedUser(props.userData.username);
            })
        if (props.defaultValue) {
            setSelectedUser(props.defaultValue);
        }
    }, [options])

    return (
        <div className="select_user">
            {search().length != 0 && <div className="select_user__overlay select_user__overlay--hidden" onClick={clickOverlay}></div>}
            <input
                type="text"
                className="select_user__input"
                onChange={handleInputChange}
                onClick={!props.readOnly ? clickOnInput : null}
                value={!props.readOnly ? selectedUser : props.defaultValue}
                placeholder={props.searchPlaceholder}
                ref={myRef}
                readOnly={props.readOnly || (options.length === 0)}
            />
            {options && <div className={"select_user__options select_user__options--hidden" + ((search().length == 0) ? " select_user__options--hidden" : '')}>
                {search().map((item, index) => (
                    <div id={item.id} optionId={index} name={item.username} className="select_user__option_item" onClick={clickOnOption}>
                        {item.username}
                    </div>
                ))}
            </div>}
        </div>
    )
}

export default SelectUser;