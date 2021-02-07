import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./FileUploader.scss";

const FileUploader = ({ regex, type, onChange }) => {
  const [data, setData] = useState(null);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [error, setError] = useState(false);
  const dropRef = React.createRef();

  const onDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingOver(true);
  };

  const onDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingOver(false);
  };

  const onDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDropFile = (event) => {
    event.preventDefault();
    let file =
      event?.dataTransfer?.files && event.dataTransfer.files.length > 0
        ? event.dataTransfer.files[0]
        : event.target.files[0];

    //При загрузке файла, проверяем удовлетворяет ли файл необходимому формату
    if (file.name.match(regex) === null) {
      return setError("Некорректный формат файла!");
    }
    if (type === "fileOnly") return onChange(file);

    let reader = new FileReader();
    const { size } = file;
    setData(null);
    if (size / 1024 / 1024 > 5) {
      setError("Файл превышает 5 МБайт");
      return false;
    }
    setError(false);

    //Для разных типов файла - разные функции обработки данных
    switch (type) {
      default:
        reader.readAsDataURL(file);
        break;
      case "readAsArrayBuffer":
        reader.readAsArrayBuffer(file);
    }
    reader.onloadend = () => {
      setData(file);
      onChange(reader.result);
    };
    setError(false);
  };

  const handleDeleteFile = () => {
    setData(null);
    onChange("");
  };

  useEffect(() => {
    const div = dropRef.current;
    div.addEventListener("dragenter", onDragEnter);
    div.addEventListener("dragleave", onDragLeave);
    div.addEventListener("dragover", onDragOver);
    div.addEventListener("drop", handleDropFile);

    return () => {
      div.removeEventListener("dragenter", onDragEnter);
      div.removeEventListener("dragleave", onDragLeave);
      div.removeEventListener("dragover", onDragOver);
      div.removeEventListener("drop", handleDropFile);
    };
  }, []);

  return (
    <div className="file-uploader">
      <div
        className={`file-uploader__wrapper ${
          isDraggingOver ? "file-uploader__wrapper--dragging" : ""
        } ${error ? "file-uploader__wrapper--error" : ""}`}
        ref={dropRef}
        style={{
          minHeight: data ? "fit-content" : "var(--file-uploader__min-height)",
        }}
      >
        {data ? (
          <ul className="file-uploader__file-list">
            <li>
              {data.name}
              <div onClick={handleDeleteFile}>удалить</div>
            </li>
          </ul>
        ) : isDraggingOver ? (
          <div className="file-uploader__info">
            <div className="file-uploader__text">Отпустите файл</div>
          </div>
        ) : (
          <div className="file-uploader__info">
            <div className="file-uploader__text">Перетащите файл сюда</div>
            <div className="file-uploader__text file-uploader__text--small">
              или
            </div>

            <div className="file-uploader__input">
              <label className="main-window__button" htmlFor="file">
                Выберите файл
              </label>
              <input
                onChange={handleDropFile}
                type="file"
                name="file"
                id="file"
              />
            </div>
          </div>
        )}
      </div>
      {error && <div className="file-uploader__error">{error}</div>}
    </div>
  );
};

export default FileUploader;

FileUploader.propTypes = {
  regex: PropTypes.string,
  type: PropTypes.string,
  onChange: PropTypes.func,
};
