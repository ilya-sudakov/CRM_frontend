import PropTypes from 'prop-types';
import TableLoading from './PlaceholderLoading/TableLoading.jsx';
import TableActions from 'Utils/TableView/TableActions/TableActions.jsx';
import TableSelectStatus from './TableSelectStatus.jsx';
import TableBadge from './TableBadge.jsx';
import {
  Cell,
  TableOutsideLink,
  TableAppLink,
  StyledTable,
  Row,
  CellHeader,
  RowLoading,
  CellLoading,
  MobileText,
  TableNestedWrapper,
  TableNestedRow,
  NestedTable,
  TableItemsCount,
  TableNoItems,
} from './styles';

const getMaxLines = (lines = 3) => ({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitLineClamp: lines,
  WebkitBoxOrient: 'vertical',
});

const renderTableLinkCell = ({
  link,
  item,
  props,
  mobileText,
  formattedText,
}) => {
  const newTab = link.newTab;
  const linkProps = {
    [link.isOutside ? 'href' : 'to']: link.getURL
      ? link.getURL(item)
      : formattedText,
    target: newTab ? '_blank' : undefined,
    rel: newTab ? 'noreferrer' : undefined,
  };
  if (link.isOutside) {
    return (
      <Cell {...props}>
        {mobileText}
        <TableOutsideLink {...linkProps}>{formattedText}</TableOutsideLink>
      </Cell>
    );
  }
  return (
    <Cell {...props}>
      {mobileText}
      <TableAppLink {...linkProps}>{formattedText}</TableAppLink>
    </Cell>
  );
};

const renderTableCell = (column, item, index, options) => {
  const mobileText = <MobileText>{column.text}</MobileText>;
  const count = column.itemsCount && column.itemsCount(item);
  const itemsCount =
    count || count === 0 ? <TableItemsCount>{count}</TableItemsCount> : null;
  const curColumn = item[column.value];
  const formattedText = column.formatFn ? column.formatFn(item) : curColumn;
  const props = {
    key: `${item.id}.${column.text}` ?? index,
    title: formattedText,
    style: {
      width: column.width ?? 'auto',
      maxWidth: column.maxWidth ?? column.width ?? 'auto',
      ...(options.fullBorder && { borderRight: '1px solid #ddd' }),
    },
  };
  if (column.link) {
    return renderTableLinkCell({
      link: column.link,
      item,
      props,
      mobileText,
      formattedText,
    });
  }
  const hasBadge =
    column.badge &&
    (column.badge?.isVisible ||
      (column.badge?.isVisible === undefined &&
        column.badge?.isVisibleFn === undefined) ||
      column.badge?.isVisibleFn(item));
  if (hasBadge) {
    return (
      <Cell {...props}>
        {mobileText}
        <TableBadge type={column.badge?.type} text={formattedText} />
        {itemsCount}
      </Cell>
    );
  }
  if (column.status) {
    return (
      <Cell {...props}>
        {mobileText}
        <TableSelectStatus
          id={props.key}
          value={formattedText}
          onChange={(value) => column.status.onChange(value, item)}
          options={column.status.options}
          readOnly={!column.status.onChange}
        />
        {itemsCount}
      </Cell>
    );
  }
  return (
    <Cell key={index} {...props}>
      {mobileText}
      <div style={{ ...getMaxLines(column.options?.maxLines) }}>
        {formattedText}
        {itemsCount}
      </div>
    </Cell>
  );
};

const Table = ({
  columns = [],
  data = [],
  actions,
  loading = { isLoading: false },
  options = {
    fullBorder: false,
    fullSize: false,
  },
  isNested,
  nestedTable,
  onClick,
}) => {
  const TableStyle = nestedTable ? NestedTable : StyledTable;
  return (
    <TableStyle
      style={{ ...options.style }}
      fullSize={options.fullSize}
      isNested={isNested}
    >
      {data.length > 0 || loading.isLoading ? (
        <Row headerRow isNested={isNested}>
          {columns.map((column) => (
            <CellHeader
              key={column.text}
              style={{
                ...(options.fullBorder && { borderRight: '1px solid #ddd' }),
              }}
            >
              {column.text}
            </CellHeader>
          ))}
          {actions ? (
            <CellHeader
              isAction
              style={{
                width: '60px',
                maxWidth: 'fit-content',
              }}
            ></CellHeader>
          ) : null}
        </Row>
      ) : (
        <TableNoItems>
          Не найдено записей. Создайте запись и она отобразиться здесь
        </TableNoItems>
      )}
      {loading.isLoading ? (
        <TableLoading
          WrapperElement={RowLoading}
          ItemElement={CellLoading}
          items={loading.itemsPerPage}
          columns={columns}
          actions={actions}
          itemStyles={{
            borderRadius: '5px',
            marginBottom: '4px',
            marginTop: '4px',
          }}
        />
      ) : (
        data.map((item, index) => (
          <>
            <Row
              key={index}
              onClick={onClick ? () => onClick(item, index) : undefined}
              style={{ cursor: onClick ? 'pointer' : 'auto' }}
              isNested={isNested}
            >
              {columns.map((column) =>
                renderTableCell(column, item, index, options),
              )}
              {actions ? (
                <Cell
                  style={{
                    width: '60px',
                    maxWidth: 'fit-content',
                  }}
                >
                  <TableActions actionsList={actions(item, index)} />
                </Cell>
              ) : null}
            </Row>
            {nestedTable ? (
              <TableNestedRow isHidden={item?.isHidden ?? true}>
                <TableNestedWrapper colSpan={100}>
                  <Table
                    columns={nestedTable?.columns}
                    data={item[nestedTable.fieldName]}
                    actions={nestedTable?.actions}
                    loading={nestedTable?.loading}
                    isNested
                  />
                </TableNestedWrapper>
              </TableNestedRow>
            ) : null}
          </>
        ))
      )}
    </TableStyle>
  );
};

export default Table;

Table.propTypes = {
  columns: PropTypes.array,
  data: PropTypes.array,
  actions: PropTypes.array,
  loading: PropTypes.object,
  options: PropTypes.object,
  onClick: PropTypes.func,
};
