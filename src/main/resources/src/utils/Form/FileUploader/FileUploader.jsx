import React, { useState } from 'react';
import fileImg from '../../../../../../../assets/file.svg';
import './FileUploader.scss';

const FileUploader = (props) => {
    const [imgName, setImgName] = useState("Имя файла...");

    return (
        <div className="file-uploader">
            <div className="file-uploader__file_name">
                {imgName}
            </div>
            <label className="file-uploader__label" htmlFor={"file" + props.uniqueId}>
                Загрузить файл
                                <img className="file-uploader__img" src={fileImg} alt="" />
            </label>
            <input type="file" name="file" id={"file" + props.uniqueId} onChange={(event) => {
                let file = event.target.files[0];
                if (file.name.match(props.regex) !== null) {
                    setImgName(file.name);
                    let reader = new FileReader();
                    reader.onloadend = (() => {
                        props.onChange(reader.result);
                    });
                    switch (props.type) {
                        default:
                            reader.readAsDataURL(file);
                            break;
                        case 'readAsArrayBuffer':
                            reader.readAsArrayBuffer(file);
                    }
                }
                else {
                    setImgName('Некорректный формат файла!');
                }
            }} />
            <div className="file-uploader__remove" onClick={() => {
                setImgName('Имя файла...');
                props.onChange('');
            }}>
                <div className="file-uploader__line"></div>
                <div className="file-uploader__line"></div>
            </div>
        </div>
    );
};

export default FileUploader;