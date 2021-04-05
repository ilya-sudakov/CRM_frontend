import styled from 'styled-components';
import { tableStatusesColors } from './objects.js';

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
    font-size: 14px;
    color: #333;
  `;
  return (
    <Badge
      type={type}
      style={{
        backgroundColor: tableStatusesColors[type].backgroundColor,
        color: tableStatusesColors[type].color,
      }}
    >
      {text}
    </Badge>
  );
};

export default TableBadge;
