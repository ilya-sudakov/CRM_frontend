import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './TableLoading.scss';

const TableLoading = ({
  items = 3,
  columnLength = 3,
  ItemElement,
  WrapperElement,
}) => {
  const [elements, setElements] = useState([]);

  useEffect(() => {
    let temp = [];
    const count = items;
    for (let i = 1; i <= count; i++) {
      temp.push(
        <WrapperElement>
          {new Array(columnLength).fill(0).map((_, index) => (
            <ItemElement key={index}>
              <div className="table-loading__item"></div>
            </ItemElement>
          ))}
        </WrapperElement>,
      );
    }
    setElements([...temp]);
  }, []);

  return elements.map((item) => item);
};

export default TableLoading;

TableLoading.propTypes = {
  items: PropTypes.number,
  minHeight: PropTypes.string,
  itemClassName: PropTypes.string,
  wrapperClassName: PropTypes.string,
  placeholderContent: PropTypes.any,
};
