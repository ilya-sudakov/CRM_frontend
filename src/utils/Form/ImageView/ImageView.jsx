import { createRef, useEffect } from 'react';
import useFormWindow from 'Utils/hooks/useFormWindow';

import './ImageView.scss';

const ImageView = ({ file }) => {
  const imgRef = createRef(null);
  const imgBigRef = createRef(null);
  const { formWindow, setShowWindow, showWindow } = useFormWindow(
    'Просмотр',
    <img className="image-view__img image-view__img--full" ref={imgBigRef} />,
  );

  const isImage =
    file?.extension === 'png' ||
    file?.extension === 'jpeg' ||
    file?.extension === 'img' ||
    file?.extension === 'jpg';

  useEffect(() => {
    if (!isImage || !file || !imgRef || !imgRef.current) return;
    if (!imgBigRef || !imgBigRef.current) return;
    loadFile(file.data, imgRef.current);
    loadFile(file.data, imgBigRef.current);
  }, [file]);

  const loadFile = (file, object) => {
    const isBase64 = typeof file === 'string';
    if (isBase64) return (object.src = file);
    object.src = URL.createObjectURL(file);
    object.onload = () => URL.revokeObjectURL(object.src); // free memory
  };

  return (
    <div className="image-view">
      {file.data && file.data !== '' && isImage ? (
        <img
          className="image-view__img image-view__img--preview"
          ref={imgRef}
          onClick={() => setShowWindow(!showWindow)}
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
