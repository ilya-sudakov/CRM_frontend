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

const Table = ({ columns = [], data = [], loading = { isLoading: false } }) => {
  return (
    <StyledTable>
      <Row headerRow>
        {columns.map((column) => (
          <CellHeader key={column.text}>{column.text}</CellHeader>
        ))}
      </Row>
      {loading.isLoading ? (
        <TableLoading
          WrapperElement={RowLoading}
          ItemElement={CellLoading}
          items={loading.itemsPerPage}
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
    border: 1px solid #ccc;
    border-color: ${(props) => (props.type === 'error' ? '#d4b0b0' : '#fff')};
    border-radius: 3px;
    width: fit-content;
    min-width: 100px;
    min-height: 1.5rem;
    padding: 3px 10px;
    background-color: ${(props) =>
      props.type === 'error' ? '#fadada' : '#fff'};
    font-size: 14px;
    color: ${(props) => (props.type === 'error' ? '#ad1c1c' : '#333')};
  `;
  return <Badge type={type}>{text}</Badge>;
};
