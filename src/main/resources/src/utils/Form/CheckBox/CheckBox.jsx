import React from 'react';
import './CheckBox.scss';

const CheckBox = (props) => {
    return (
        <div className="checkbox">
            <label className="checkbox__container">
                {props.text}
                <input
                    type="checkbox"
                    name={props.name}
                    id={props.id}
                    value={props.value}
                    disabled={props.disabled}
                    onChange={(event) => {
                        const name = event.target.name;
                        const value = event.target.checked;
                        const id = event.target.id
                        props.onChange(value, name, id)
                    }}
                    checked={props.checked && props.checked}
                    defaultChecked={(props.defaultChecked !== undefined) ? props.defaultChecked : true}
                />
                <div class="checkbox__checkmark"></div>
            </label>
        </div>
    );
};

export default CheckBox;