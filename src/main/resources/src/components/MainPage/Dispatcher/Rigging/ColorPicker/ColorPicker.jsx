import React from 'react';
import chevronDownIcon from '../../../../../../../../../assets/tableview/chevron-down.svg';
import './ColorPicker.scss';

const ColorPicker = (props) => {
    const clickOnColorPicker = (event) => {
        let id = event.target.getAttribute("index");
        //Check if click on chevron, then get currentTarget
        if (id === null) {
            id = event.currentTarget.getAttribute("index");
        }
        let colorPicker = document.getElementsByClassName("tableview__color_picker")[id];
        let overlay = document.getElementsByClassName("tableview__color_overlay")[id];
        if (colorPicker.classList.contains("tableview__color_picker--hidden")) {
            colorPicker.classList.remove("tableview__color_picker--hidden");
            overlay.classList.remove("tableview__color_overlay--hidden");
        }
        else {
            colorPicker.classList.add("tableview__color_picker--hidden");
            overlay.classList.add("tableview__color_overlay--hidden");
        }
    }

    const clickOnColorPickerOverlay = (event) => {
        const id = event.target.getAttribute("index");
        let overlay = document.getElementsByClassName("tableview__color_overlay")[id];
        let colorPicker = document.getElementsByClassName("tableview__color_picker")[id];
        overlay.classList.add("tableview__color_overlay--hidden");
        colorPicker.classList.add("tableview__color_picker--hidden");
    }

    const clickOnColorOption = (event) => {
        const id = event.target.getAttribute("index");
        const color = event.target.classList[1].split("tableview__color_option--")[1];
        console.log(id, color);
        clickOnColorPickerOverlay(event); //Hide options
    }

    return (
        <div className="tableview__color">
            <div className="tableview__color_overlay tableview__color_overlay--hidden" index={props.index} onClick={clickOnColorPickerOverlay}></div>
            <div className="tableview__color_name" index={props.index} onClick={clickOnColorPicker}>
                {props.defaultName}
                <img className="tableview__img" src={chevronDownIcon} />
            </div>
            <div className="tableview__color_picker tableview__color_picker--hidden">
                <div
                    index={props.index}
                    onClick={clickOnColorOption}
                    className="tableview__color_option tableview__color_option--completed"
                >Завершено</div>
                <div
                    index={props.index}
                    onClick={clickOnColorOption}
                    className="tableview__color_option tableview__color_option--defect"
                >Брак</div>
                <div
                    index={props.index}
                    onClick={clickOnColorOption}
                    className="tableview__color_option tableview__color_option--production"
                >В работе</div>
            </div>
        </div>
    )
}

export default ColorPicker;