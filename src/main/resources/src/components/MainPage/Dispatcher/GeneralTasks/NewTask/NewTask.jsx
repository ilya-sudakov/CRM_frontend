import React, { useContext, useEffect, useState } from 'react'
import './NewTask.scss'
import '../../../../../utils/Form/Form.scss'
import { addMainTask } from '../../../../../utils/RequestsAPI/MainTasks.jsx'
import { getUsers } from '../../../../../utils/RequestsAPI/Users.jsx'
import InputText from '../../../../../utils/Form/InputText/InputText.jsx'
import InputDate from '../../../../../utils/Form/InputDate/InputDate.jsx'
import InputUser from '../../../../../utils/Form/InputUser/InputUser.jsx'
import ErrorMessage from '../../../../../utils/Form/ErrorMessage/ErrorMessage.jsx'
import Button from '../../../../../utils/Form/Button/Button.jsx'
import { UserContext } from '../../../../../App.js'

const NewTask = (props) => {
  const userContext = useContext(UserContext)
  const [taskInputs, setTaskInputs] = useState({
    dateCreated: new Date(),
    description: '',
    responsible: userContext.userData.username,
    dateControl: new Date(new Date().setDate(new Date().getDate() + 7)), //Прибавляем 7 дней к сегодняшнему числу,
    status: '',
    condition: 'В процессе',
    // visibility: 'all'
  })
  const [taskErrors, setTaskErrors] = useState({
    dateCreated: false,
    description: false,
    responsible: false,
    dateControl: false,
    // status: false
  })
  const [validInputs, setValidInputs] = useState({
    dateCreated: true,
    description: false,
    responsible: true,
    dateControl: true,
    // status: false
  })
  const [users, setUsers] = useState([])
  const [showError, setShowError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const validateField = (fieldName, value) => {
    switch (fieldName) {
      case 'dateCreated':
        setValidInputs({
          ...validInputs,
          dateCreated: value !== null,
        })
        break
      case 'dateControl':
        setValidInputs({
          ...validInputs,
          dateControl: value !== null,
        })
        break
      default:
        if (validInputs[fieldName] !== undefined) {
          setValidInputs({
            ...validInputs,
            [fieldName]: value !== '',
          })
        }
        break
    }
  }

  const formIsValid = () => {
    let check = true
    let newErrors = Object.assign({
      dateCreated: false,
      description: false,
      responsible: false,
      dateControl: false,
    })
    for (let item in validInputs) {
      // console.log(item, validInputs[item]);
      if (validInputs[item] === false) {
        check = false
        newErrors = Object.assign({
          ...newErrors,
          [item]: true,
        })
      }
    }
    setTaskErrors(newErrors)
    if (check === true) {
      return true
    } else {
      // alert("Форма не заполнена");
      setIsLoading(false)
      setShowError(true)
      return false
    }
  }

  const handleSubmit = (event) => {
    // event.preventDefault();
    setIsLoading(true)
    // console.log(taskInputs);
    formIsValid() &&
      addMainTask(taskInputs)
        .then(() => props.history.push('/dispatcher/general-tasks'))
        .catch((error) => {
          setIsLoading(false)
          alert('Ошибка при добавлении записи')
          console.log(error)
        })
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    validateField(name, value)
    setTaskInputs({
      ...taskInputs,
      [name]: value,
    })
    setTaskErrors({
      ...taskErrors,
      [name]: false,
    })
  }

  const handleResponsibleChange = (newResponsible) => {
    validateField('responsible', newResponsible)
    setTaskInputs({
      ...taskInputs,
      responsible: newResponsible,
    })
    setTaskErrors({
      ...taskErrors,
      responsible: false,
    })
  }

  useEffect(() => {
    document.title = 'Создание основной задачи'
    getUsers()
      .then((res) => res.json())
      .then((res) => {
        setUsers(res)
      })
  }, [])

  return (
    <div className="main-form">
      <form className="main-form__form">
        <div className="main-form__header main-form__header--full">
          <div className="main-form__title">Новая задача</div>
        </div>
        <ErrorMessage
          message="Не заполнены все обязательные поля!"
          showError={showError}
          setShowError={setShowError}
        />
        <InputDate
          inputName="Дата постановки"
          required
          error={taskErrors.dateCreated}
          name="dateCreated"
          selected={taskInputs.dateCreated}
          errorsArr={taskErrors}
          setErrorsArr={setTaskErrors}
          handleDateChange={(dateCreated) => {
            validateField('dateCreated', dateCreated)
            setTaskInputs({
              ...taskInputs,
              dateCreated: dateCreated,
            })
            setTaskErrors({
              ...taskErrors,
              dateCreated: false,
            })
          }}
        />
        <div className="main-form__fieldset">
          <div className="main-form__group-name">Сведения</div>
          <InputText
            inputName="Описание"
            required
            type="textarea"
            error={taskErrors.description}
            name="description"
            handleInputChange={handleInputChange}
            errorsArr={taskErrors}
            setErrorsArr={setTaskErrors}
          />
          <InputUser
            inputName="Ответственный"
            userData={props.userData}
            required
            error={taskErrors.responsible}
            defaultValue={taskInputs.responsible}
            name="responsible"
            options={users}
            errorsArr={taskErrors}
            setErrorsArr={setTaskErrors}
            handleUserChange={handleResponsibleChange}
            searchPlaceholder="Введите имя пользователя для поиска..."
          />
        </div>
        <InputDate
          inputName="Дата контроля"
          required
          error={taskErrors.dateControl}
          errorsArr={taskErrors}
          setErrorsArr={setTaskErrors}
          name="dateControl"
          selected={taskInputs.dateControl}
          handleDateChange={(dateControl) => {
            validateField('dateControl', dateControl)
            setTaskInputs({
              ...taskInputs,
              dateControl: dateControl,
            })
            setTaskErrors({
              ...taskErrors,
              dateControl: false,
            })
          }}
        />
        <InputText
          inputName="Состояние"
          name="status"
          type="textarea"
          handleInputChange={handleInputChange}
        />
        <div className="main-form__input_hint">
          * - поля, обязательные для заполнения
        </div>
        <div className="main-form__buttons main-form__buttons--full">
          <input
            className="main-form__submit main-form__submit--inverted"
            type="submit"
            onClick={() => props.history.push('/dispatcher/general-tasks')}
            value="Вернуться назад"
          />
          <Button
            text="Добавить задачу"
            isLoading={isLoading}
            className="main-form__submit"
            onClick={handleSubmit}
          />
        </div>
      </form>
    </div>
  )
}

export default NewTask
