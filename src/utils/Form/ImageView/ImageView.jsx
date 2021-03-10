import useFormWindow from 'Utils/hooks/useFormWindow';

import './ImageView.scss';

const ImageView = ({ file }) => {
  const { formWindow, setShowWindow, showWindow } = useFormWindow(
    'Картинка',
    <img
      className="image-view__img image-view__img--full"
      src={{ file: file.imgSrc }}
    />,
  );
  return (
    <div className="image-view">
      {file.imgSrc && file.imgSrc !== '' ? (
        <img
          className="image-view__img image-view__img--preview"
          src={{ file: file.imgSrc }}
          onClick={() => setShowWindow(!showWindow)}
        />
      ) : (
        <div className="image-view__img image-view__img--placeholder">
          {file?.extension ?? '.png'}
        </div>
      )}
      {formWindow}
    </div>
  );
};

export default ImageView;
