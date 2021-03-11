import { createRef, useEffect } from 'react';
import useFormWindow from 'Utils/hooks/useFormWindow';

import './ImageView.scss';

const ImageView = ({ file, closeWindow = null }) => {
  const imgRef = createRef(null);
  const imgBigRef = createRef(null);
  const getFileExtension = (item) => {
    const isBase64 =
      (typeof item === 'string' && item.length > 1000) ||
      (typeof item === 'string' && item.length === 0);
    const isLocalPath = typeof item === 'string' && item.length <= 200;
    const extension = isLocalPath
      ? item.split('.')[1]
      : isBase64
      ? item.split('image/')[1]?.split(';base64')[0]
      : item?.type?.split('/')[1];
    return extension;
  };
  const isBase64 = typeof file === 'string';
  const { formWindow, toggleFormWindow } = useFormWindow(
    isBase64 ? 'Просмотр' : file?.name,
    <img className="image-view__img image-view__img--full" ref={imgBigRef} />,
  );

  const extension = getFileExtension(file);
  const isImage =
    extension === 'png' ||
    extension === 'jpeg' ||
    extension === 'img' ||
    extension === 'jpg';

  const loadFile = (file, object) => {
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
    if (!closeWindow) return;
    toggleFormWindow();
  }, [closeWindow]);

  return (
    <div
      className="image-view"
      onClick={file && file !== '' && isImage ? () => toggleFormWindow() : null}
    >
      {file && file !== '' && isImage ? (
        <img
          className="image-view__img image-view__img--preview"
          ref={imgRef}
        />
      ) : (
        <div className="image-view__img image-view__img--placeholder">
          {'Файл'}
        </div>
      )}
      {formWindow}
    </div>
  );
};

export default ImageView;
