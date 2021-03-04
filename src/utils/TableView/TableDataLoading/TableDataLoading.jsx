import './TableDataLoading.scss';

const TableDataLoading = (props) => {
  return (
    <div className={props.className}>
      <div
        className="table-data-loader"
        style={{ 'min-height': `${props.minHeight}` }}
      >
        <div className="lds-ellipsis">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default TableDataLoading;
