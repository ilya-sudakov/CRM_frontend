import React, { useState, useEffect } from "react";
import "./ViewFeedback.scss";
import "../../../../utils/Form/Form.scss";
import InputText from "../../../../utils/Form/InputText/InputText.jsx";
import FeedbackChat from "../FeedbackChat/FeedbackChat.jsx";
import {
  getFeedbackById,
  editFeedback,
} from "../../../../utils/RequestsAPI/Feedback/feedback.js";
import {
  addMessage,
  getMessagesByDiscussionId,
} from "../../../../utils/RequestsAPI/Feedback/messages";
import { formatDateStringWithTime } from "../../../../utils/functions.jsx";
import Button from "../../../../utils/Form/Button/Button.jsx";

const ViewFeedback = (props) => {
  const [formInputs, setFormInputs] = useState({
    date: new Date(),
    subject: "",
    text: "",
    author: props.userData.username,
    status: "in-progress",
    messages: [],
    isRead: true,
  });
  const [formErrors, setFormErrors] = useState({
    subject: false,
    text: false,
  });
  const [validInputs, setValidInputs] = useState({
    subject: false,
    text: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [feedbackId, setFeedbackId] = useState(0);

  useEffect(() => {
    document.title = "Просмотр обсуждения";
    const id = props.history.location.pathname.split("/feedback/view/")[1];
    setFeedbackId(id);
    if (isNaN(Number.parseInt(id))) {
      alert("Неправильный индекс обсуждения!");
      props.history.push("/feedback");
    } else {
      loadData(id);
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    validateField(name, value);
    setFormInputs({
      ...formInputs,
      [name]: value,
    });
    setFormErrors({
      ...formErrors,
      [name]: false,
    });
  };

  const validateField = (fieldName, value) => {
    switch (fieldName) {
      default:
        if (validInputs[fieldName] !== undefined) {
          setValidInputs({
            ...validInputs,
            [fieldName]: value !== "",
          });
        }
        break;
    }
  };

  const handleSubmit = () => {
    // event.preventDefault()
    console.log("handleEditSubmit");
    setIsLoading(true);
    console.log(formInputs);
    editFeedback(
      {
        date: new Date(formInputs.date).getTime() / 1000,
        subject: formInputs.subject,
        text: formInputs.text,
        author: formInputs.author,
        status: formInputs.status,
        isRead: formInputs.isRead,
      },
      feedbackId
    )
      .then(() => setIsLoading(false))
      // .then(() => props.history.push('/feedback'))
      .catch((error) => {
        setIsLoading(false);
        alert("Ошибка при изменении записи");
      });
  };

  const loadData = (id) => {
    setIsLoading(true);
    getFeedbackById(id)
      .then((res) => res.json())
      .then((res) => ({
        ...formInputs,
        date: res.date,
        subject: res.subject,
        text: res.text,
        author: res.author,
        status: res.status,
        isRead: res.isRead,
      }))
      .then((temp) =>
        getMessagesByDiscussionId(id)
          .then((res) => res.json())
          .then((res) => {
            setFormInputs({
              ...temp,
              messages: res ? res : [],
            });
            setIsLoading(false);
          })
      );
  };

  return (
    <div className="view-feedback">
      <div className="main-form">
        <form className="main-form__form">
          <div className="main-form__header main-form__header--full">
            <div className="main-form__title">Просмотр обсуждения</div>
          </div>
          {/* <InputDate
                        inputName="Дата"
                        readOnly
                        selected={Date.parse(formInputs.date)}
                    /> */}
          <InputText
            inputName="Дата"
            defaultValue={formatDateStringWithTime(formInputs.date)}
            readOnly
          />
          <InputText
            inputName="Автор"
            defaultValue={formInputs.author}
            readOnly
          />
          <div className="main-form__item">
            <div className="main-form__input_name">Статус</div>
            <div className="main-form__input_field">
              <select
                name="status"
                onChange={(event) => {
                  const value = event.target.value;
                  console.log(formInputs);
                  setFormInputs({
                    ...formInputs,
                    status: value,
                  });
                  editFeedback(
                    {
                      date: new Date(formInputs.date).getTime() / 1000,
                      subject: formInputs.subject,
                      text: formInputs.text,
                      author: formInputs.author,
                      isRead: formInputs.isRead,
                      status: value,
                    },
                    feedbackId
                  );
                }}
                value={formInputs.status}
                disabled={
                  props.userHasAccess(["ROLE_ADMIN"]) ? false : "disabled"
                }
              >
                <option value="in-progress">В процессе</option>
                <option value="completed">Завершено</option>
                <option value="urgent">Срочно</option>
                <option value="testing">Тестирование</option>
                <option value="waiting">Ожидание ответа</option>
              </select>
            </div>
          </div>
          <div className="main-form__fieldset">
            <div className="main-form__group-name">Содержание</div>
            <InputText
              inputName="Тема"
              defaultValue={formInputs.subject}
              readOnly
            />
            <InputText
              inputName="Сообщение"
              type="textarea"
              name="text"
              defaultValue={formInputs.text}
              handleInputChange={handleInputChange}
              readOnly={!props.userHasAccess(["ROLE_ADMIN"])}
            />
            <FeedbackChat
              messages={formInputs.messages}
              userData={props.userData}
              isRead={formInputs.isRead}
              handleReadMessages={() => {
                setIsLoading(true);
                // console.log(formInputs)
                console.log("handleReadMessages", formInputs.isRead);
                return (
                  editFeedback(
                    {
                      date: new Date(formInputs.date).getTime() / 1000,
                      subject: formInputs.subject,
                      text: formInputs.text,
                      author: formInputs.author,
                      status: formInputs.status,
                      isRead: true,
                    },
                    feedbackId
                  )
                    .then(() => setIsLoading(false))
                    .then(() => {
                      // loadData(feedbackId)
                    })
                    // .then(() => props.history.push('/feedback'))
                    .catch((error) => {
                      setIsLoading(false);
                      alert("Ошибка при изменении записи");
                    })
                );
              }}
              handleSubmit={(message) => {
                console.log("handleSubmit");
                return addMessage({
                  author: props.userData.username,
                  date: new Date().getTime() / 1000,
                  text: message,
                  discussionId: feedbackId,
                })
                  .then(() => {
                    setFormInputs({
                      ...formInputs,
                      isRead: false,
                    });
                    return editFeedback(
                      {
                        date: new Date(formInputs.date).getTime() / 1000,
                        subject: formInputs.subject,
                        text: formInputs.text,
                        author: formInputs.author,
                        status: formInputs.status,
                        isRead: false,
                      },
                      feedbackId
                    );
                  })
                  .then(() => {
                    return loadData(feedbackId);
                  });
              }}
            />
          </div>
          <div className="main-form__buttons main-form__buttons--full">
            <Button
              text="Вернуться назад"
              isLoading={isLoading}
              inverted
              className="main-form__submit main-form__submit--inverted"
              onClick={() => props.history.push(`/feedback#${feedbackId}`)}
            />
            {props.userHasAccess(["ROLE_ADMIN"]) && (
              <Button
                text="Редактировать содержание"
                isLoading={isLoading}
                // inverted
                className="main-form__submit"
                onClick={handleSubmit}
              />
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ViewFeedback;
