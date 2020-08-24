import React from 'react'
import noPhotoIMG from '../../../../../../../assets/priceList/no_img.png'
import './ImgLoader.scss'

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
        /*<div class="sk-circle">
          <div class="sk-circle1 sk-child"></div>
          <div class="sk-circle2 sk-child"></div>
          <div class="sk-circle3 sk-child"></div>
          <div class="sk-circle4 sk-child"></div>
          <div class="sk-circle5 sk-child"></div>
          <div class="sk-circle6 sk-child"></div>
          <div class="sk-circle7 sk-child"></div>
          <div class="sk-circle8 sk-child"></div>
          <div class="sk-circle9 sk-child"></div>
          <div class="sk-circle10 sk-child"></div>
          <div class="sk-circle11 sk-child"></div>
          <div class="sk-circle12 sk-child"></div>
        </div>*/
        <div className="img-loader__img--placeholder"></div>
      )}
    </div>
  )
}

export default ImgLoader
