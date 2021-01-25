import React, { useEffect, useState } from 'react'
import './EditTask.scss'
import '../../../../../utils/Form/Form.scss'
import {
  getMainTaskById,
  editMainTask,
} from '../../../../../utils/RequestsAPI/MainTasks.js'
import { getUsers } from '../../../../../utils/RequestsAPI/Users.jsx'
import InputText from '../../../../../utils/Form/InputText/InputText.jsx'
import InputDate from '../../../../../utils/Form/InputDate/InputDate.jsx'
import InputUser from '../../../../../utils/Form/InputUser/InputUser.jsx'
import ErrorMessage from '../../../../../utils/Form/ErrorMessage/ErrorMessage.jsx'
import Button from '../../../../../utils/Form/Button/Button.jsx'

const EditTask = (props) => {
  const [taskId, setTaskId] = useState(1)
  const [users, setUsers] = useState([])
  const [taskInputs, setTaskInputs] = useState({
    dateCreated: new Date(),
    description: '',
    responsible: '',
    dateControl: new Date(),
    status: '',
    condition: 'Материалы',
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
    description: true,
    responsible: true,
    dateControl: true,
    // status: true
  })
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
      // status: false
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
    formIsValid() &&
      editMainTask(taskInputs, taskId)
        .then(() => props.history.push(`/dispatcher/general-tasks#${taskId}`))
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
    document.title = 'Редактирование основной задачи'
    const id = props.history.location.pathname.split(
      '/dispatcher/general-tasks/edit/',
    )[1]
    if (isNaN(Number.parseInt(id))) {
      alert('Неправильный индекс задачи!')
      props.history.push('/dispatcher/general-tasks')
    } else {
      setTaskId(id)
      getMainTaskById(id)
        .then((res) => res.json())
        .then((oldRequest) => {
          // console.log(oldRequest);
          setTaskInputs({
            dateCreated: oldRequest.dateCreated,
            description: oldRequest.description,
            responsible: oldRequest.responsible,
            dateControl: oldRequest.dateControl,
            condition: oldRequest.condition,
            status: oldRequest.status,
          })
        })
        .then(() => {
          getUsers()
            .then((res) => res.json())
            .then((res) => {
              setUsers(res)
            })
        })
        .catch((error) => {
          console.log(error)
          alert('Неправильный индекс задачи!')
          props.history.push('/dispatcher/general-tasks')
        })
    }
  }, [])
  return (
    <div className="main-form">
      <form className="main-form__form">
        <div className="main-form__header main-form__header--full">
          <div className="main-form__title">Редактирование задачи</div>
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
          selected={Date.parse(taskInputs.dateCreated)}
          errorsArr={taskErrors}
          readOnly={!props.userHasAccess(['ROLE_ADMIN'])}
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
            readOnly={!props.userHasAccess(['ROLE_ADMIN'])}
            errorsArr={taskErrors}
            setErrorsArr={setTaskErrors}
            defaultValue={taskInputs.description}
          />
          <InputUser
            inputName="Ответственный"
            userData={props.userData}
            required
            error={taskErrors.responsible}
            defaultValue={taskInputs.responsible}
            readOnly={!props.userHasAccess(['ROLE_ADMIN'])}
            name="responsible"
            options={users}
            handleUserChange={handleResponsibleChange}
            errorsArr={taskErrors}
            setErrorsArr={setTaskErrors}
            searchPlaceholder="Введите имя пользователя для поиска..."
          />
        </div>
        <InputDate
          inputName="Дата контроля"
          required
          error={taskErrors.dateControl}
          name="dateControl"
          selected={Date.parse(taskInputs.dateControl)}
          readOnly={!props.userHasAccess(['ROLE_ADMIN'])}
          errorsArr={taskErrors}
          setErrorsArr={setTaskErrors}
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
          defaultValue={taskInputs.status}
        />
        <div className="main-form__item">
          <div className="main-form__input_name">Статус*</div>
          <div className="main-form__input_field">
            <select
              name="condition"
              onChange={handleInputChange}
              value={taskInputs.condition}
            >
              <option>Выполнено</option>
              <option>Отложено</option>
              <option>Материалы</option>
              <option>В процессе</option>
              <option>Проблема</option>
            </select>
          </div>
        </div>
        <div className="main-form__input_hint">
          * - поля, обязательные для заполнения
        </div>
        <div className="main-form__buttons main-form__buttons--full">
          <input
            className="main-form__submit main-form__submit--inverted"
            type="submit"
            onClick={() =>
              props.history.push(`/dispatcher/general-tasks#${taskId}`)
            }
            value="Вернуться назад"
          />
          <Button
            text="Редактировать задачу"
            isLoading={isLoading}
            className="main-form__submit"
            onClick={handleSubmit}
          />
        </div>
      </form>
    </div>
  )
}

export default EditTask
