import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './TableLoading.scss';

const TableLoading = ({
  items = 3,
  columns = [],
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
          {columns.map((item, index) => (
            <ItemElement
              style={{
                width: item.width ?? 'auto',
                maxWidth: item.maxWidth ?? item.width ?? 'auto',
              }}
              key={index}
            >
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
