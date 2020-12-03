import React from "react";
import "./PageLoading.scss";

import ImgLoader from "../../../utils/TableView/ImgLoader/ImgLoader.jsx";
import logo from "../../../../../../../assets/header/header__mobile_logo.png";

const PageLoading = () => {
  return (
    <div className="page-loading">
      <div className="page-loading__wrapper">
        <ImgLoader
          imgSrc={logo}
          noPhotoTemplate
          imgClass="page-loading__img page-loading__img--placeholder"
        />
        <div className="page-loading__circle"></div>
      </div>
    </div>
  );
};

export default PageLoading;
