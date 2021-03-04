import PropTypes from 'prop-types';

const TableHeader = ({ headerItems = [] }) => {
  console.log(headerItems);
  return <div></div>;
};

export default TableHeader;

TableHeader.propTypes = {
  headerItems: PropTypes.array,
};
