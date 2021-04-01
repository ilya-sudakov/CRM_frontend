import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import TableLoading from './PlaceholderLoading/TableLoading.jsx';
import TableActions from 'Utils/TableView/TableActions/TableActions.jsx';

const StyledTable = styled.table`
  /* table-layout: fixed; */
  box-sizing: border-box;
  border-collapse: collapse;
  width: 100%;
  max-width: 100vw;
  padding: 0 1px;
  font-size: 14px;
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
  padding: 3px 10px;
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
              width: '30px',
              maxWidth: '30px',
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
                key: index,
                style: {
                  width: column.width ?? 'auto',
                  maxWidth: column.maxWidth ?? column.width ?? 'auto',
                },
              };
              if (column.link) {
                const newTab = column.link.newTab;
                if (column.link.isOutside) {
                  return (
                    <Cell {...props}>
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
                    <TableBadge
                      type={column.badge?.type}
                      text={formattedText}
                    />
                  </Cell>
                );
              }
              return (
                <Cell key={index} {...props}>
                  {formattedText}
                </Cell>
              );
            })}
            {actions ? (
              <Cell
                style={{
                  width: '30px',
                  maxWidth: '30px',
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
