import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './FileUploader.scss';
import ImageView from 'Utils/Form/ImageView/ImageView.jsx';

const FileUploader = ({
  regex = /.+\.(jpeg|jpg|png|img)/,
  type = 'readAsDataURL',
  onChange,
  maxSize = 5,
  uniqueId = 0,
  error = false,
  hideError,
  multipleFiles = true,
}) => {
  const [data, setData] = useState([]);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  let dragCounter = 0;
  const [hasError, setHasError] = useState(false);
  const dropRef = React.createRef();

  const formats = {
    '/.+\\.(jpeg|jpg|png|img)/': {
      text: 'Форматы JPEG, PNG, IMG',
    },
    '/.+\\.(xlsx|csv)/': {
      text: 'Форматы XLSX и CSV',
    },
    '/.+\\.(docx)/': {
      text: 'Формат DOCX',
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
    dragCounter = 0;
    const files =
      event?.dataTransfer?.files && event?.dataTransfer?.files?.length > 0
        ? event.dataTransfer.files
        : event.target.files;
    let file = files[0];
    console.log(files);

    //При загрузке файла, проверяем удовлетворяет ли файл необходимому формату
    if (file.name.match(regex) === null)
      return setHasError('Некорректный формат файла!');
    if (type === 'fileOnly') return onChange(file);

    let reader = new FileReader();
    const { size } = file;
    // setData([]);
    if (size / 1024 / 1024 > maxSize) {
      setHasError(`Файл превышает ${maxSize} МБайт`);
      return false;
    }
    setHasError(false);
    //Для разных типов файла - разные функции обработки данных
    switch (type) {
      case 'readAsArrayBuffer':
        reader.readAsArrayBuffer(file);
        break;
      case 'readAsDataURL':
        reader.readAsDataURL(file);
        break;
      default:
        reader.readAsDataURL(file);
        break;
    }
    reader.onload = (loadEvent) => {
      setData([...data, ...files]);
      onChange(loadEvent.target.result);
    };
    setHasError(false);
  };

  const handleDeleteFile = (event, index) => {
    event.preventDefault();
    let temp = data;
    temp.splice(index, 1);
    setData([...temp]);
    onChange('');
  };

  useEffect(() => {
    if (!dropRef.current) return;
    const div = dropRef.current;
    div.addEventListener('dragenter', onDragEnter);
    div.addEventListener('dragleave', onDragLeave);
    div.addEventListener('dragover', onDragOver);
    div.addEventListener('drop', handleDropFile);

    return () => {
      div.removeEventListener('dragenter', onDragEnter);
      div.removeEventListener('dragleave', onDragLeave);
      div.removeEventListener('dragover', onDragOver);
      div.removeEventListener('drop', handleDropFile);
    };
  }, []);

  useEffect(() => {}, [isDraggingOver]);

  const canLoadMoreFiles =
    multipleFiles || (!multipleFiles && data.length === 0);
  return (
    <div className="file-uploader">
      {canLoadMoreFiles ? (
        <div
          className={`file-uploader__wrapper ${
            isDraggingOver ? 'file-uploader__wrapper--dragging' : ''
          } ${hasError || error ? 'file-uploader__wrapper--error' : ''}`}
          ref={dropRef}
          style={{
            minHeight: 'var(--file-uploader__min-height)',
          }}
        >
          {isDraggingOver ? (
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
                  multiple={multipleFiles ? 'multiple' : false}
                  id={`fileuploader-${uniqueId}`}
                />
              </div>
            </div>
          )}
        </div>
      ) : null}
      {(error || hasError) && (
        <div
          className="file-uploader__error"
          onClick={() => {
            if (hideError) hideError();
            setHasError(false);
          }}
        >
          {error ? 'Поле не заполнено!' : hasError}
        </div>
      )}
      {canLoadMoreFiles
        ? formats[regex.toString()] && (
            <div className="file-uploader__hint">
              {formats[regex.toString()].text}
            </div>
          )
        : null}
      {data.length > 0 ? (
        <ul className="file-uploader__file-list">
          {data.map((item, index) => (
            <li key={index}>
              <ImageView imgSrc={item.name} />
              <div>{item?.name ?? 'фотография.jpeg'}</div>
              <div onClick={(event) => handleDeleteFile(event, index)}>
                удалить
              </div>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};

export default FileUploader;

FileUploader.propTypes = {
  regex: PropTypes.string,
  type: PropTypes.string,
  onChange: PropTypes.func,
  uniqueId: PropTypes.string,
  error: PropTypes.string,
  hideError: PropTypes.func,
};
