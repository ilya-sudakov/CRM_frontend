import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import Widget from '../Widget/Widget.jsx';

import ReportIcon from 'Assets/sidemenu/feedback.inline.svg';
import QuestionIcon from 'Assets/widgets/question-circle-outlined.inline.svg';
import SuggestIcon from 'Assets/widgets/talk-bubbles-line.inline.svg';
import { addFeedback } from 'Utils/RequestsAPI/Feedback/feedback.js';
import UserContext from '../../../../App.js';

const StyledWidget = styled(Widget)`
  font-size: 0.9rem;
  .widget__content {
    padding-right: 0;
  }
`;

const Title = styled.div`
  margin-top: 5px;
  margin-bottom: 8px;
  color: #555;
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.submit ? 'center' : 'flex-start')};
  box-sizing: border-box;
  border: ${(props) =>
    props.submit ? '1px solid transparent' : '1px solid #ccc'};
  border-radius: 5px;
  width: 100%;
  padding: 10px 20px;
  background-color: ${(props) => (props.submit ? '#00A3A2' : '#fff')};
  color: ${(props) => (props.submit ? '#fff' : '#555')};
  transition: 100ms ease-in-out;
  cursor: pointer;

  &:not(:last-child) {
    margin-bottom: 10px;
  }

  &:hover {
    background-color: ${(props) => (props.submit ? '#00BDBB' : '#eee')};
  }

  svg {
    margin-right: 10px;
    min-width: 24px;
  }

  @media (max-width: 768px) {
    padding: 5px 10px;
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
        <ReportIcon fill="#777" width={24} height={24} viewBox="0 0 24 24" />
        <span>Сообщить об ошибке</span>
      </Button>
      <Button onClick={() => handleClick('Предложение')}>
        <SuggestIcon fill="#777" />
        <span>У вас есть предложение по улучшению</span>
      </Button>
      <Button onClick={() => handleClick('Вопрос')}>
        <QuestionIcon fill="#777" />
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
      subject: `${formInputs.type} - виджет обратной связи`,
      text: message,
      author: userData.username,
      status: 'in-progress',
    }).then(() => {
      setFormInputs((formInputs) => ({
        ...formInputs,
        isLoading: false,
      }));
      setCurPage('messagePage');
    });
  };

  return (
    <>
      <TextInput
        value={message}
        onChange={({ target }) => setMessage(target.value)}
        placeholder="Текст вашего сообщения..."
        autoComplete="off"
      />
      <Button onClick={handleSubmit} submit>
        <span>Отправить</span>
      </Button>
    </>
  );
};

const MessagePage = ({ setCurPage, formInputs }) => {
  useEffect(() => {
    if (formInputs.isLoading) return;
    const timeout = setTimeout(() => setCurPage('startPage'), 4000);
    return () => {
      timeout && clearTimeout(timeout);
    };
  }, [formInputs]);

  const StyledButton = styled(Button)`
    border-color: ${(props) => (props.isLoading ? '#ccc' : '#6bdc59')};
    color: ${(props) => (props.isLoading ? '#555' : '#1e9e09')};
  `;

  return (
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
  );
};
