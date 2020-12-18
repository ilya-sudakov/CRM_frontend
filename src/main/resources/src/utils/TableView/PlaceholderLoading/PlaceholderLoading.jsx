import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./PlaceholderLoading.scss";

const PlaceholderLoading = (props) => {
  const [elements, setElements] = useState([]);

  useEffect(() => {
    let temp = [];
    const count = props.items || 3;
    for (let i = 1; i <= count; i++) {
      temp.push(
        <div
          className={`placeholder-loading__item ${props.itemClassName}`}
          style={{ minHeight: `${props.minHeight || "1.5rem"}` }}
        ></div>
      );
    }
    setElements([...temp]);
  }, []);

  if (props.placeholderContent) {
    return (
      <div className={`placeholder-loading ${props.wrapperClassName}`}>
        {elements.map(() => (
          <div
            className={` ${props.itemClassName}`}
            style={{ minHeight: `${props.minHeight || "1.5rem"}` }}
          >
            {props.placeholderContent}
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className={`placeholder-loading ${props.wrapperClassName}`}>
      {elements.map((item) => item)}
    </div>
  );
};

export default PlaceholderLoading;

PlaceholderLoading.propTypes = {
  items: PropTypes.number,
  minHeight: PropTypes.string,
  itemClassName: PropTypes.string,
  wrapperClassName: PropTypes.string,
  placeholderContent: PropTypes.any,
};
