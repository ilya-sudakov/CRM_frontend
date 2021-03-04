import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './PlaceholderLoading.scss';

const PlaceholderLoading = ({
  items = 3,
  itemClassName,
  minHeight = '1.5rem',
  placeholderContent,
  wrapperClassName,
}) => {
  const [elements, setElements] = useState([]);

  useEffect(() => {
    let temp = [];
    const count = items;
    for (let i = 1; i <= count; i++) {
      temp.push(
        <div
          className={`placeholder-loading__item ${itemClassName}`}
          style={{ minHeight: minHeight }}
        ></div>,
      );
    }
    setElements([...temp]);
  }, []);

  if (placeholderContent) {
    return (
      <div className={`placeholder-loading ${wrapperClassName}`}>
        {elements.map(() => (
          <div className={itemClassName} style={{ minHeight: minHeight }}>
            {placeholderContent}
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className={`placeholder-loading ${wrapperClassName}`}>
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
