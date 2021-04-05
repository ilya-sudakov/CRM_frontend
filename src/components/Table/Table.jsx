import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import TableLoading from './PlaceholderLoading/TableLoading.jsx';
import TableActions from 'Utils/TableView/TableActions/TableActions.jsx';
import TableSelectStatus from './TableSelectStatus.jsx';
import TableBadge from './TableBadge.jsx';

const StyledTable = styled.table`
  box-sizing: border-box;
  border-collapse: collapse;
  width: ${(props) => (props.fullSize ? 'calc(100% + 30px)' : '100%')};
  margin-left: ${(props) => (props.fullSize ? '-15px' : '0')};
  max-width: 100vw;
  padding: 0 1px;
  font-size: 14px;
  background-color: #fff;

  .main-window__table-actions {
    max-width: none;
  }

  @media (max-width: 768px) {
    tr {
      &:first-child {
        display: none;
      }
    }
    td {
      box-sizing: border-box;
      float: left;
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100% !important;
      max-width: none !important;
      padding: 3px 20px !important;
      text-align: right;

      &:first-child {
        padding-top: 15px !important;
      }

      .main-window__table-actions {
        width: 100%;
        flex: none;
      }
    }
  }
`;
const Row = styled.tr`
  position: relative;
  border-bottom: 1px solid #ddd;
  height: 40px;
  transition: 100ms ease-in-out;

  &:hover {
    background-color: ${(props) =>
      props.headerRow || props.loading ? '#fff' : '#eee'};
  }
`;
const RowLoading = styled(Row)`
  transform: scale(1);

  &:hover {
    background-color: #fff;
  }
`;
const baseCellStyles = css`
  --side-padding: 30px;
  padding: 6px 10px;
  text-align: left;

  &:first-child {
    padding-left: var(--side-padding);
  }

  &:last-child {
    padding-right: var(--side-padding);
  }
`;
const Cell = styled.td`
  ${baseCellStyles}
`;
const CellHeader = styled.th`
  ${baseCellStyles}
  font-weight: 400;
  text-align: left;
  color: #777;
`;
const CellLoading = styled.td`
  ${baseCellStyles}

  > div {
    border: none;
    border-radius: 5px;
  }
`;
const TableLinkStyles = css`
  color: var(--main-color);
`;
const TableAppLink = styled(Link)`
  ${TableLinkStyles}
`;
const TableOutsideLink = styled.a`
  ${TableLinkStyles}
`;
const MobileText = styled.span`
  display: none;
  padding-right: 5px;
  text-align: left;
  color: #777;

  @media (max-width: 768px) {
    display: block;
  }
`;
const getMaxLines = (lines = 3) => ({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitLineClamp: lines,
  WebkitBoxOrient: 'vertical',
});

const Table = ({
  columns = [],
  data = [],
  actions,
  loading = { isLoading: false },
  options = { fullBorder: false, fullSize: false },
  onClick,
}) => {
  return (
    <StyledTable fullSize={options.fullSize}>
      <Row headerRow>
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
          <Row
            key={index}
            onClick={() => onClick(item, index)}
            style={{ cursor: onClick ? 'pointer' : 'auto' }}
          >
            {columns.map((column) => {
              const curColumn = item[column.value];
              const formattedText = column.formatFn
                ? column.formatFn(curColumn)
                : curColumn;
              const props = {
                key: `${item.id}.${column.text}` ?? index,
                title: formattedText,
                style: {
                  width: column.width ?? 'auto',
                  maxWidth: column.maxWidth ?? column.width ?? 'auto',
                  ...(options.fullBorder && { borderRight: '1px solid #ddd' }),
                },
              };
              const mobileText = <MobileText>{column.text}</MobileText>;
              if (column.link) {
                const newTab = column.link.newTab;
                const linkProps = {
                  [column.link.isOutside ? 'href' : 'to']: column.link.getURL
                    ? column.link.getURL(curColumn)
                    : curColumn,
                  target: newTab ? '_blank' : undefined,
                  rel: newTab ? 'noreferrer' : undefined,
                };
                if (column.link.isOutside) {
                  return (
                    <Cell {...props}>
                      {mobileText}
                      <TableOutsideLink {...linkProps}>
                        {formattedText}
                      </TableOutsideLink>
                    </Cell>
                  );
                }
                return (
                  <Cell {...props}>
                    {mobileText}
                    <TableAppLink {...linkProps}>{formattedText}</TableAppLink>
                  </Cell>
                );
              }
              const hasBadge =
                column.badge &&
                (column.badge?.isVisible ||
                  (column.badge?.isVisible === undefined &&
                    column.badge?.isVisibleFn === undefined) ||
                  column.badge?.isVisibleFn(curColumn));
              if (hasBadge) {
                return (
                  <Cell {...props}>
                    {mobileText}
                    <TableBadge
                      type={column.badge?.type}
                      text={formattedText}
                    />
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
                  </Cell>
                );
              }
              return (
                <Cell key={index} {...props}>
                  {mobileText}
                  <div style={{ ...getMaxLines(column.options?.maxLines) }}>
                    {formattedText}
                  </div>
                </Cell>
              );
            })}
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
        ))
      )}
    </StyledTable>
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
