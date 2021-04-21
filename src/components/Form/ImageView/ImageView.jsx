import { createRef, useEffect } from 'react';
import useFormWindow from 'Utils/hooks/useFormWindow';
import Button from 'Components/Form/Button/Button.jsx';

import './ImageView.scss';
import {
  getFileName,
  downloadImage,
  getFileExtension,
  copyLinkToClipboard,
} from './functions';

const ImageView = ({
  file,
  closeWindow = null,
  style = {
    maxPreviewWidth: '50px',
  },
}) => {
  const imgRef = createRef(null);
  const imgBigRef = createRef(null);
  const isBase64 = typeof file === 'string';
  const isRemoteFile = typeof file === 'object' && file?.url;
  const { formWindow, toggleFormWindow } = useFormWindow(
    getFileName(file),
    <>
      <img className="image-view__img image-view__img--full" ref={imgBigRef} />
      <div className="image-view__buttons">
        <Button inverted onClick={() => downloadImage(file)} text="Скачать" />
        {isRemoteFile ? (
          <Button
            inverted
            onClick={() => copyLinkToClipboard(file)}
            text="Скопировать ссылку"
          />
        ) : null}
      </div>
    </>,
  );
  const extension = getFileExtension(file);
  const isImage =
    extension === 'png' ||
    extension === 'jpeg' ||
    extension === 'img' ||
    extension === 'jpg';

  const loadFile = (file, object) => {
    if (isRemoteFile) return (object.src = file?.url);
    if (isBase64) return (object.src = file);
    object.src = URL.createObjectURL(file);
    object.onload = () => URL.revokeObjectURL(object.src); // free memory
  };

  useEffect(() => {
    if (!isImage || !file || !imgRef || !imgRef.current) return;
    if (!imgBigRef || !imgBigRef.current) return;
    loadFile(file, imgRef.current);
    loadFile(file, imgBigRef.current);
  }, [file]);

  useEffect(() => {
    console.log(closeWindow);
    if (!closeWindow) return;
    toggleFormWindow();
  }, [closeWindow]);

  return (
    <div
      className="image-view"
      onClick={file && file !== '' && isImage ? () => toggleFormWindow() : null}
      title="Открыть в полном размере"
      style={{ maxWidth: style.maxPreviewWidth }}
    >
      {file && file !== '' && isImage ? (
        <img
          className="image-view__img image-view__img--preview"
          ref={imgRef}
          style={{ maxWidth: style.maxPreviewWidth }}
        />
      ) : (
        <div className="image-view__img image-view__img--placeholder">Файл</div>
      )}
      {formWindow}
    </div>
  );
};

export default ImageView;
