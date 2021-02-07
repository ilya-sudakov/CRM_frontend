import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./FileUploader.scss";

const FileUploader = ({
  regex = /.+\.(jpeg|jpg|png|img)/,
  type = "readAsDataURL",
  onChange,
  previewImage,
  maxSize = 5,
  uniqueId = 0,
  error,
}) => {
  const [data, setData] = useState(null);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  let dragCounter = 0;
  const [hasError, setHasError] = useState(false);
  const dropRef = React.createRef();

  const formats = {
    "/.+\\.(jpeg|jpg|png|img)/": {
      text: "Поддерживаемые форматы JPEG, PNG, IMG",
    },
    "/.+\\.(xlsx|csv)/": {
      text: "Поддерживаемые форматы XLSX и CSV",
    },
    "/.+\\.(docx)/": {
      text: "Поддерживаемые форматы DOCX",
    },
  };

  const onDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter++;
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsDraggingOver(true);
    }
  };

  const onDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log(dragCounter, e);
    dragCounter--;
    if (dragCounter === 0) {
      setIsDraggingOver(false);
    }
  };

  const onDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDropFile = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDraggingOver(false);
    let file =
      event?.dataTransfer?.files && event?.dataTransfer?.files?.length > 0
        ? event.dataTransfer.files[0]
        : event.target.files[0];
    dragCounter = 0;

    //При загрузке файла, проверяем удовлетворяет ли файл необходимому формату
    if (file.name.match(regex) === null) {
      return setHasError("Некорректный формат файла!");
    }
    if (type === "fileOnly") return onChange(file);

    let reader = new FileReader();
    const { size } = file;
    setData(null);
    if (size / 1024 / 1024 > maxSize) {
      setHasError(`Файл превышает ${maxSize} МБайт`);
      return false;
    }
    setHasError(false);

    //Для разных типов файла - разные функции обработки данных
    switch (type) {
      case "readAsArrayBuffer":
        reader.readAsArrayBuffer(file);
        break;
      case "readAsDataURL":
        reader.readAsDataURL(file);
        break;
      default:
        reader.readAsDataURL(file);
        break;
    }
    reader.onload = (loadEvent) => {
      setData(file);
      onChange(loadEvent.target.result);
    };
    setHasError(false);
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

  useEffect(() => {}, [previewImage, isDraggingOver]);

  return (
    <div className="file-uploader">
      {previewImage ? (
        <img className="file-uploader__preview-image" src={previewImage} />
      ) : null}
      <div
        className={`file-uploader__wrapper ${
          isDraggingOver ? "file-uploader__wrapper--dragging" : ""
        } ${hasError ? "file-uploader__wrapper--error" : ""}`}
        ref={dropRef}
        style={{
          minHeight:
            data || previewImage
              ? "fit-content"
              : "var(--file-uploader__min-height)",
        }}
      >
        {data || previewImage ? (
          <ul className="file-uploader__file-list">
            <li>
              {data?.name ?? "фотография.jpeg"}
              <div onClick={handleDeleteFile}>удалить</div>
            </li>
          </ul>
        ) : isDraggingOver ? (
          <div
            className="file-uploader__info"
            draggable="true"
            onDragStart={(e) => e.preventDefault()}
          >
            <div className="file-uploader__text">
              Отпустите файл для загрузки
            </div>
          </div>
        ) : (
          <div
            className="file-uploader__info"
            draggable="true"
            onDragStart={(e) => e.preventDefault()}
          >
            <div className="file-uploader__text">Перетащите файл сюда</div>
            <div className="file-uploader__text file-uploader__text--small">
              или
            </div>

            <div className="file-uploader__input">
              <label
                className="main-window__button"
                htmlFor={`fileuploader-${uniqueId}`}
              >
                Загрузите файл
              </label>
              <input
                onChange={handleDropFile}
                type="file"
                name="file"
                id={`fileuploader-${uniqueId}`}
              />
            </div>
          </div>
        )}
      </div>
      {hasError && (
        <div
          className="file-uploader__error"
          onClick={() => setHasError(false)}
        >
          {hasError}
        </div>
      )}
      {formats[regex.toString()] && (
        <div className="file-uploader__hint">
          {formats[regex.toString()].text}
        </div>
      )}
    </div>
  );
};

export default FileUploader;

FileUploader.propTypes = {
  regex: PropTypes.string,
  type: PropTypes.string,
  onChange: PropTypes.func,
  previewImage: PropTypes.string,
  uniqueId: PropTypes.string,
  error: PropTypes.string,
};
