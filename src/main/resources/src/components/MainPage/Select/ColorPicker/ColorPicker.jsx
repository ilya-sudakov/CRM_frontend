import React from 'react';
import chevronDownIcon from '../../../../../../../../assets/tableview/chevron-down.svg';
import './ColorPicker.scss';

const ColorPicker = (props) => {
    const clickOnColorPicker = (event) => {
        let id = event.target.getAttribute("index");
        //Check if click on chevron, then get currentTarget
        if (id === null) {
            id = event.currentTarget.getAttribute("index");
        }
        let colorPicker = document.getElementsByClassName("select-product__color_picker")[id];
        let overlay = document.getElementsByClassName("select-product__color_overlay")[id];
        if (colorPicker.classList.contains("select-product__color_picker--hidden")) {
            colorPicker.classList.remove("select-product__color_picker--hidden");
            overlay.classList.remove("select-product__color_overlay--hidden");
        }
        else {
            colorPicker.classList.add("select-product__color_picker--hidden");
            overlay.classList.add("select-product__color_overlay--hidden");
        }
    }

    const clickOnColorPickerOverlay = (event) => {
        const id = event.target.getAttribute("index");
        let overlay = document.getElementsByClassName("select-product__color_overlay")[id];
        let colorPicker = document.getElementsByClassName("select-product__color_picker")[id];
        overlay.classList.add("select-product__color_overlay--hidden");
        colorPicker.classList.add("select-product__color_picker--hidden");
    }

    const clickOnColorOption = (event) => {
        // const id = Number.parseInt(event.target.getAttribute("index"));
        const id = props.id;
        const color = event.target.classList[1].split("select-product__color_option--")[1];
        const req = Object.assign({
            color: color
        })
        console.log(color, id);
        clickOnColorPickerOverlay(event); //Hide options
    }

    return (
        <div className="select-product__color">
            <div className="select-product__color_overlay select-product__color_overlay--hidden" index={props.index} onClick={clickOnColorPickerOverlay}></div>
            <div className="select-product__color_name" index={props.index} onClick={clickOnColorPicker}>
                {props.defaultName}
                <img className="tableview__img" src={chevronDownIcon} />
            </div>
            <div className="select-product__color_picker select-product__color_picker--hidden">
                <div
                    index={props.index}
                    onClick={clickOnColorOption}
                    className="select-product__color_option select-product__color_option--completed"
                >Завершено</div>
                <div
                    index={props.index}
                    onClick={clickOnColorOption}
                    className="select-product__color_option select-product__color_option--defect"
                >Брак</div>
                <div
                    index={props.index}
                    onClick={clickOnColorOption}
                    className="select-product__color_option select-product__color_option--production"
                >В работе</div>
            </div>
        </div>
    )
}

export default ColorPicker;