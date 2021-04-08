import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

const nestedBorderRadius = '10px';

export const StyledTable = styled.table`
  box-sizing: border-box;
  border-collapse: collapse;
  width: ${(props) => (props.fullSize ? 'calc(100% + 30px)' : '100%')};
  margin-left: ${(props) => (props.fullSize ? '-15px' : '0')};
  border-radius: ${(props) => (props.isNested ? nestedBorderRadius : '0')};
  max-width: 100vw;
  padding: 0 1px;
  font-size: 14px;
  background-color: #fff;

  .main-window__table-actions {
    max-width: fit-content;
    margin-left: auto;
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
export const Row = styled.tr`
  position: relative;
  border-bottom: 1px solid #ddd;
  height: 40px;
  transition: 100ms ease-in-out;

  &:hover {
    background-color: ${(props) =>
      props.headerRow || props.loading ? '#fff' : '#eee'};
  }

  &:first-child {
    th:first-child {
      border-top-left-radius: ${(props) =>
        props.isNested ? nestedBorderRadius : '0'};
    }
    th:last-child {
      border-top-right-radius: ${(props) =>
        props.isNested ? nestedBorderRadius : '0'};
    }
  }
  &:last-child {
    td:first-child {
      border-bottom-left-radius: ${(props) =>
        props.isNested ? nestedBorderRadius : '0'};
    }
    td:last-child {
      border-bottom-right-radius: ${(props) =>
        props.isNested ? nestedBorderRadius : '0'};
    }
  }
`;
export const RowLoading = styled(Row)`
  transform: scale(1);

  &:hover {
    background-color: #fff;
  }
`;
export const baseCellStyles = css`
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
export const Cell = styled.td`
  ${baseCellStyles}
`;
export const CellHeader = styled.th`
  ${baseCellStyles}
  font-weight: 400;
  text-align: left;
  color: #999;
`;
export const CellLoading = styled.td`
  ${baseCellStyles}

  > div {
    border: none;
    border-radius: 5px;
  }
`;
export const TableLinkStyles = css`
  color: var(--main-color);
`;
export const TableAppLink = styled(Link)`
  ${TableLinkStyles}
`;
export const TableOutsideLink = styled.a`
  ${TableLinkStyles}
`;
export const MobileText = styled.span`
  display: none;
  padding-right: 5px;
  text-align: left;
  color: #999;

  @media (max-width: 768px) {
    display: block;
  }
`;

export const NestedTable = styled(StyledTable)`
  border-radius: 15px;
`;

export const TableNestedRow = styled(Row)`
  display: ${({ isHidden }) => (isHidden ? 'none' : 'table-row')};
`;

export const TableNestedWrapper = styled.td`
  width: 100%;
  padding: 20px 30px;
  background-color: #ddd;
`;

export const TableItemsCount = styled.span`
  margin-left: 10px;
  color: #bbb;
`;

export const TableNotItems = styled.div`
  padding: 10px 25px;
  font-size: 1rem;
  color: #555;
`;
