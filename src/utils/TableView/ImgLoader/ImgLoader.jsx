import noPhotoIMG from '../../../../assets/priceList/no_img.png';
import './ImgLoader.scss';

const ImgLoader = (props) => {
  return (
    <div className="img-loader">
      {props.imgSrc || props.imgSrc === '' ? (
        props.imgSrc === '' && props.noPhotoTemplate ? (
          <img className={props.imgClass} src={noPhotoIMG} alt="" />
        ) : (
          <img
            className={props.imgClass}
            src={props.imgSrc}
            alt=""
            loading="lazy"
          />
        )
      ) : (
        <div className={`img-loader__img--placeholder ${props.imgClass}`}></div>
      )}
    </div>
  );
};

export default ImgLoader;
