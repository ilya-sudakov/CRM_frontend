import styled from 'styled-components';

const FormErrorMessage = ({ error = false, hideError }) => {
  const Message = styled.div`
    border: 1px solid #d48282;
    border-radius: 3px;
    box-sizing: border-box;
    margin-top: 1px;
    width: 100%;
    height: 1.6rem;
    padding: 5px 10px;
    font-size: 0.8rem;
    background-color: #fadada;
    cursor: pointer;
    text-align: left;
    color: #ad1c1c;
  `;

  if (!error) return null;
  return (
    <Message
      onClick={(event) => {
        event.preventDefault();
        hideError();
      }}
    >
      Поле не заполнено!
    </Message>
  );
};

export default FormErrorMessage;
