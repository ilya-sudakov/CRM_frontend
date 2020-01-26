import React from 'react';
import './ImgLoader.scss';

const ImgLoader = (props) => {
    return (
        <div className="img-loader">
            {
                (props.imgSrc && props.imgSrc !== '')
                    ? <img className={props.imgClass} src={props.imgSrc} alt="" />
                    : <div class="lds-roller">
                        <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
                    </div>
            }
        </div>
    );
};

export default ImgLoader;