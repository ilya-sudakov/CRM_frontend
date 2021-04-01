import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import TableLoading from './PlaceholderLoading/TableLoading.jsx';

const StyledTable = styled.table`
  box-sizing: border-box;
  border-collapse: collapse;
  width: 100%;
  max-width: 100vw;
  padding: 0 1px;
  font-size: 14px;

  .placeholder-loading {
    min-width: 100%;
  }
`;
const Row = styled.tr`
  position: relative;
  border-bottom: 1px solid #ccc;
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

const Table = ({ columns = [], data = [], isLoading = false }) => {
  return (
    <StyledTable>
      <Row headerRow>
        {columns.map((column) => (
          <CellHeader key={column.text}>{column.text}</CellHeader>
        ))}
      </Row>
      {isLoading ? (
        <TableLoading
          WrapperElement={RowLoading}
          ItemElement={CellLoading}
          minHeight="40px"
          items={10}
          columnLength={columns.length}
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
              if (column.link) {
                const newTab = column.link.newTab;
                if (column.link.isOutside) {
                  return (
                    <Cell key={index}>
                      <TableOutsideLink
                        href={
                          column.link.getURL
                            ? column.link.getURL(curColumn)
                            : curColumn
                        }
                        target={newTab ? '_blank' : undefined}
                        rel={newTab ? 'noreferrer' : undefined}
                      >
                        {column.formatFn
                          ? column.formatFn(curColumn)
                          : curColumn}
                      </TableOutsideLink>
                    </Cell>
                  );
                }
                return (
                  <Cell key={index}>
                    <TableAppLink
                      to={
                        column.link.getURL
                          ? column.link.getURL(curColumn)
                          : curColumn
                      }
                      target={newTab ? '_blank' : undefined}
                      rel={newTab ? 'noreferrer' : undefined}
                    >
                      {column.formatFn ? column.formatFn(curColumn) : curColumn}
                    </TableAppLink>
                  </Cell>
                );
              }
              return (
                <Cell key={index}>
                  {column.formatFn ? column.formatFn(curColumn) : curColumn}
                </Cell>
              );
            })}
          </Row>
        ))
      )}
    </StyledTable>
  );
};

export default Table;
