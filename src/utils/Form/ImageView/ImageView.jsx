import { createRef, useEffect } from 'react';
import useFormWindow from 'Utils/hooks/useFormWindow';

import './ImageView.scss';

const getFileExtension = (item) => {
  const isBase64 =
    (typeof item === 'string' && item.length > 1000) ||
    (typeof item === 'string' && item.length === 0);
  const isLocalPath = typeof item === 'string' && item.length <= 200;
  const isRemoteFile =
    typeof item === 'object' && item?.url !== undefined && item?.url !== null;
  if (isRemoteFile)
    return item?.url?.split(/\/fileWithoutDB\/downloadFile\/[^.]*./)[1];
  if (isLocalPath) return item.split('.')[1];
  if (isBase64) return item.split('image/')[1]?.split(';base64')[0];
  return item?.type?.split('/')[1] ?? 'file';
};

const getFileName = (item) => {
  const isBase64 =
    (typeof item === 'string' && item.length > 1000) ||
    (typeof item === 'string' && item.length === 0);
  const isLocalPath = typeof item === 'string' && item.length <= 200;
  const isRemoteFile =
    typeof item === 'object' && item?.url !== undefined && item?.url !== null;
  const isRawFile =
    typeof item === 'object' &&
    item?.name !== undefined &&
    item?.name !== null &&
    item?.size !== undefined &&
    item?.size !== null;
  if (isRemoteFile)
    return item?.url?.split(/\/fileWithoutDB\/downloadFile\//)[1];
  if (isLocalPath) return item.split('assets/')[1];
  if (isBase64) return 'Просмотр';
  if (isRawFile) return item?.name;
  return item?.type?.split('/')[1] ?? 'file';
};

const ImageView = ({ file, closeWindow = null }) => {
  const imgRef = createRef(null);
  const imgBigRef = createRef(null);
  const isBase64 = typeof file === 'string';
  const isRemoteFile = typeof file === 'object' && file?.url;
  const { formWindow, toggleFormWindow } = useFormWindow(
    getFileName(file),
    <img className="image-view__img image-view__img--full" ref={imgBigRef} />,
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
        <div className="image-view__img image-view__img--placeholder">Файл</div>
      )}
      {formWindow}
    </div>
  );
};

export default ImageView;
