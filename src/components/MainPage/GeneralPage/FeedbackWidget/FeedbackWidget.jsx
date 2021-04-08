import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import Widget from '../Widget/Widget.jsx';

import ReportIcon from 'Assets/sidemenu/feedback.inline.svg';
import QuestionIcon from 'Assets/widgets/question-circle-outlined.inline.svg';
import SuggestIcon from 'Assets/widgets/talk-bubbles-line.inline.svg';
import { addFeedback } from 'API/Feedback/feedback.js';
import UserContext from '../../../../App.js';
import { Link } from 'react-router-dom';

const StyledWidget = styled(Widget)`
  font-size: 0.9rem;
  .widget__content {
    padding-right: 0;
  }
`;

const Title = styled.div`
  margin-top: 5px;
  margin-bottom: 10px;
  color: #555;
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.submit ? 'center' : 'flex-start')};
  box-sizing: border-box;
  margin-bottom: 10px;
  border: ${(props) =>
    props.submit ? '1px solid transparent' : '1px solid #ccc'};
  border-radius: 5px;
  width: 100%;
  padding: 8px 12px;
  background-color: ${(props) => (props.submit ? '#247fa7' : '#fff')};
  transition: 100ms ease-in-out;
  cursor: pointer;
  font-size: 0.85rem;
  color: ${(props) => (props.submit ? '#fff' : '#555')};

  &:hover {
    background-color: ${(props) => (props.submit ? '#298FBC' : '#eee')};
  }

  svg {
    margin-right: 8px;
    min-width: 20px;
  }

  @media (max-width: 768px) {
    padding: 5px 10px;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;

  div {
    width: 50%;
    margin-bottom: 0 !important;
    text-align: center;

    &:first-child {
      margin-right: 10px;
    }
  }
`;

const TextInput = styled.textarea`
  width: 100%;
  resize: none;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 5px;
  min-height: 80px;
  padding: 5px 10px;
  margin-bottom: 5px;
  outline: none;
`;

const FeedbackWidget = () => {
  const [formInputs, setFormInputs] = useState({
    isLoading: false,
    type: '',
  });
  const [curPage, setCurPage] = useState('startPage');

  const pages = {
    startPage: (
      <StartPage setFormInputs={setFormInputs} setCurPage={setCurPage} />
    ),
    formPage: (
      <FormPage
        formInputs={formInputs}
        setFormInputs={setFormInputs}
        setCurPage={setCurPage}
      />
    ),
    messagePage: (
      <MessagePage setCurPage={setCurPage} formInputs={formInputs} />
    ),
  };

  useEffect(() => {}, [curPage]);

  return (
    <StyledWidget
      className="feedback-widget"
      title="Обратная связь"
      linkTo={{
        address: '/feedback',
        text: 'Перейти',
      }}
      content={
        <>
          <Title>Вы можете поделиться с нами своим мнением</Title>
          <div>{pages[curPage]}</div>
        </>
      }
    />
  );
};

export default FeedbackWidget;

const StartPage = ({ setCurPage, setFormInputs }) => {
  const handleClick = (type = '') => {
    setFormInputs({
      type: type,
    });
    return setCurPage('formPage');
  };
  return (
    <>
      <Button onClick={() => handleClick('Сообщение об ошибке')}>
        <ReportIcon fill="#777" width={20} height={20} viewBox="0 0 24 24" />
        <span>Сообщить об ошибке</span>
      </Button>
      <Button onClick={() => handleClick('Предложение по улучшению')}>
        <SuggestIcon fill="#777" width={20} height={20} />
        <span>У вас есть предложение по улучшению</span>
      </Button>
      <Button onClick={() => handleClick('Вопрос')}>
        <QuestionIcon fill="#777" width={20} height={20} />
        <span>Задать вопрос</span>
      </Button>
    </>
  );
};

const FormPage = ({ setCurPage, formInputs, setFormInputs }) => {
  const { userData } = useContext(UserContext);
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    setFormInputs((formInputs) => ({
      ...formInputs,
      isLoading: true,
    }));
    addFeedback({
      date: Math.ceil(new Date().getTime() / 1000),
      subject: `${formInputs.type} - из виджета`,
      text: message,
      author: userData.username,
      status: 'in-progress',
    })
      .then((res) => res.json())
      .then(({ id }) => {
        setFormInputs((formInputs) => ({
          ...formInputs,
          id: id,
          isLoading: false,
        }));
        setCurPage('messagePage');
      });
  };

  const StyledButton = styled(Button)`
    justify-content: center;
  `;

  return (
    <>
      <TextInput
        value={message}
        onChange={({ target }) => setMessage(target.value)}
        placeholder="Текст вашего сообщения..."
        autoComplete="off"
      />
      <ButtonWrapper>
        <StyledButton onClick={() => setCurPage('startPage')} inverted>
          <span>Вернуться назад</span>
        </StyledButton>
        <Button onClick={handleSubmit} submit>
          <span>Отправить</span>
        </Button>
      </ButtonWrapper>
    </>
  );
};

const MessagePage = ({ setCurPage, formInputs }) => {
  useEffect(() => {
    if (formInputs.isLoading) return;
    const timeout = setTimeout(() => setCurPage('startPage'), 6000);
    return () => {
      timeout && clearTimeout(timeout);
    };
  }, [formInputs]);

  const StyledButton = styled(Button)`
    border-color: ${(props) => (props.isLoading ? '#ccc' : '#6bdc59')};
    color: ${(props) => (props.isLoading ? '#555' : '#1e9e09')};
  `;

  return (
    <>
      <StyledButton
        onClick={() => setCurPage('startPage')}
        isLoading={formInputs.isLoading}
      >
        <span>
          {formInputs.isLoading
            ? 'Отправляем сообщение...'
            : 'Успешно отправлено, спасибо за отзыв!'}
        </span>
      </StyledButton>
      {!formInputs.isLoading && (
        <Link to={`/feedback/view/${formInputs.id}`} target="_blank">
          <Button>
            <span>Просмотреть ваше сообщение</span>
          </Button>
        </Link>
      )}
    </>
  );
};
