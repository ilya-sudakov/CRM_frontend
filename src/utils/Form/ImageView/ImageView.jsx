import useFormWindow from 'Utils/hooks/useFormWindow';

import './ImageView.scss';

const ImageView = ({ imgSrc }) => {
  const { formWindow, setShowWindow, showWindow } = useFormWindow(
    'Картинка',
    <img className="image-view__img image-view__img--full" src={imgSrc} />,
  );
  return (
    <div className="image-view">
      <img
        className="image-view__img image-view__img--preview"
        src={imgSrc}
        onClick={() => setShowWindow(!showWindow)}
      />
      {formWindow}
    </div>
  );
};

export default ImageView;
