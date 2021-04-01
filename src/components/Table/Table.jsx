import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import TableLoading from './PlaceholderLoading/TableLoading.jsx';
import TableActions from 'Utils/TableView/TableActions/TableActions.jsx';

const StyledTable = styled.table`
  box-sizing: border-box;
  border-collapse: collapse;
  width: 100%;
  max-width: 100vw;
  padding: 0 1px;
  font-size: 14px;

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
  padding: 8px 10px;
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
}) => {
  return (
    <StyledTable>
      <Row headerRow>
        {columns.map((column) => (
          <CellHeader key={column.text}>{column.text}</CellHeader>
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
          <Row key={index}>
            {columns.map((column) => {
              const curColumn = item[column.value];
              const formattedText = column.formatFn
                ? column.formatFn(curColumn)
                : curColumn;
              const props = {
                key: `${item.id}.${column.text}` ?? index,
                style: {
                  width: column.width ?? 'auto',
                  maxWidth: column.maxWidth ?? column.width ?? 'auto',
                },
              };
              const mobileText = <MobileText>{column.text}</MobileText>;
              if (column.link) {
                const newTab = column.link.newTab;
                if (column.link.isOutside) {
                  return (
                    <Cell {...props}>
                      {mobileText}
                      <TableOutsideLink
                        href={
                          column.link.getURL
                            ? column.link.getURL(curColumn)
                            : curColumn
                        }
                        target={newTab ? '_blank' : undefined}
                        rel={newTab ? 'noreferrer' : undefined}
                      >
                        {formattedText}
                      </TableOutsideLink>
                    </Cell>
                  );
                }
                return (
                  <Cell {...props}>
                    {mobileText}
                    <TableAppLink
                      to={
                        column.link.getURL
                          ? column.link.getURL(curColumn)
                          : curColumn
                      }
                      target={newTab ? '_blank' : undefined}
                      rel={newTab ? 'noreferrer' : undefined}
                    >
                      {formattedText}
                    </TableAppLink>
                  </Cell>
                );
              }
              if (
                column.badge &&
                (column.badge?.isVisible ||
                  (column.badge?.isVisible === undefined &&
                    column.badge?.isVisibleFn === undefined) ||
                  column.badge?.isVisibleFn(curColumn))
              ) {
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
                if (column.status.onChange) {
                  <Cell {...props}>
                    {mobileText}
                    <TableSelectStatus
                      id={props.key}
                      value={formattedText}
                      onChange={(value) => column.status.onChange(value, item)}
                      options={column.status.options}
                    />
                  </Cell>;
                }
                return (
                  <Cell {...props}>
                    {mobileText}
                    <TableSelectStatus
                      id={props.key}
                      value={formattedText}
                      onChange={(value) => column.status.onChange(value, item)}
                      options={column.status.options}
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

const TableBadge = ({ text, type = 'error' }) => {
  const Badge = styled.div`
    display: flex;
    justify-content: center;
    box-sizing: border-box;
    border-radius: 5px;
    width: fit-content;
    min-width: 100px;
    min-height: 1.5rem;
    padding: 3px 10px;
    background-color: ${(props) =>
      props.type === 'error' ? '#F8CBD0' : '#fff'};
    font-size: 14px;
    color: ${(props) => (props.type === 'error' ? '#ad1c1c' : '#333')};
  `;
  return <Badge type={type}>{text}</Badge>;
};

const statuses = {
  ['success']: { backgroundColor: '#E5F6D3', color: 'green' },
  ['Материалы']: { backgroundColor: '#ffe5b4', color: '#795b1b' },
  ['Выполнено']: { backgroundColor: '#E5F6D3', color: '#43a556' },
  ['В процессе']: { backgroundColor: '#bdddfd', color: '#396c9e' },
  ['Отложено']: { backgroundColor: '#ffceec', color: '#a71c71' },
  ['Проблема']: { backgroundColor: '#F8CBD0', color: '#ad1c1c' },
};

const TableSelectStatus = ({
  value = 'success',
  options = [],
  onChange,
  key,
}) => {
  const Select = styled.select`
    display: flex;
    justify-content: center;
    box-sizing: border-box;
    border: 1px solid #bbbbbbbb;
    border-radius: 5px;
    width: fit-content;
    min-width: 100px;
    min-height: 1.5rem;
    padding: 3px 10px;
    outline: none;
    font-size: 14px;
  `;
  const Option = styled.option`
    background-color: #fff;
    color: #333;
  `;
  return (
    <Select
      id={key}
      value={value}
      onChange={({ target }) => onChange(target.value)}
      style={{
        backgroundColor: statuses[value].backgroundColor,
        color: statuses[value].color,
      }}
    >
      {options.map((option) => (
        <Option key={option.value} value={option.value ?? option.text}>
          {option.text ?? option.value}
        </Option>
      ))}
    </Select>
  );
};
