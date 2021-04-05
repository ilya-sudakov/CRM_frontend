import styled from 'styled-components';
import { tableStatusesColors } from './objects.js';

const TableSelectStatus = ({
  value = 'success',
  options = [],
  onChange,
  key,
  readOnly = false,
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
  const item = tableStatusesColors[value] ?? tableStatusesColors['info'];
  return (
    <Select
      id={key}
      value={value}
      onChange={({ target }) => onChange(target.value)}
      style={{
        backgroundColor: item.backgroundColor,
        color: item.color,
      }}
      disabled={readOnly}
    >
      {options.map((option) => (
        <Option key={option.value} value={option.value ?? option.text}>
          {option.text ?? option.value}
        </Option>
      ))}
    </Select>
  );
};

export default TableSelectStatus;
