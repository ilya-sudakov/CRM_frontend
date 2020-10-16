import React, { useState, useEffect } from 'react'
import './SelectEmployee.scss'
import FormWindow from '../../../../../utils/Form/FormWindow/FormWindow.jsx'
import SearchBar from '../../../SearchBar/SearchBar.jsx'
import TableView from './TableView/TableView.jsx'
import {
  getEmployees,
  getEmployeesByWorkshop,
} from '../../../../../utils/RequestsAPI/Employees.jsx'
import ControlPanel from '../../../../../utils/MainWindow/ControlPanel/ControlPanel.jsx'
import Select from 'react-select'

const SelectEmployee = (props) => {
  const [showWindow, setShowWindow] = useState(false)
  const [closeWindow, setCloseWindow] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [employees, setEmployees] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [id, setId] = useState(0)
  const [fullName, setFullName] = useState('')

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value)
  }

  useEffect(() => {
    if (props.employees && employees.length === 0) {
      return setEmployees(props.employees)
    }
    employees.length === 0 && loadEmployees()
  }, [props.employees])

  const loadEmployees = () => {
    setIsLoading(true)
    let workshop = Object.assign({
      workshop: props.userHasAccess(['ROLE_ADMIN'])
        ? 'Админ'
        : props.userHasAccess(['ROLE_DISPATCHER'])
        ? 'Диспетчер'
        : props.userHasAccess(['ROLE_LEMZ'])
        ? 'ЦехЛЭМЗ'
        : props.userHasAccess(['ROLE_LEPSARI'])
        ? 'ЦехЛепсари'
        : props.userHasAccess(['ROLE_LIGOVSKIY'])
        ? 'ЦехЛиговский'
        : props.userHasAccess(['ROLE_ENGINEER'])
        ? 'Офис'
        : props.userHasAccess(['ROLE_MANAGER']) && 'Офис',
    })
    if (workshop.workshop === 'Админ' || workshop.workshop === 'Диспетчер') {
      getEmployees()
        .then((res) => res.json())
        .then((res) => {
          setIsLoading(false)
          setEmployees(res)
        })
        .catch((error) => {
          console.log(error)
          setIsLoading(false)
        })
    } else
      getEmployeesByWorkshop(workshop)
        .then((res) => res.json())
        .then((res) => {
          setIsLoading(false)
          setEmployees(res)
        })
        .catch((error) => {
          console.log(error)
          setIsLoading(false)
        })
  }

  const clickEmployee = (employeeName, employeeId) => {
    setId(employeeId)
    setFullName(employeeName)
    props.handleEmployeeChange(employeeId, employeeName)
    setShowWindow(!showWindow)
  }

  // * Sorting

  const [sortOrder, setSortOrder] = useState({
    curSort: 'lastName',
    lastName: 'asc',
  })

  const changeSortOrder = (event) => {
    const name = event.target.value.split(' ')[0]
    const order = event.target.value.split(' ')[1]
    setSortOrder({
      curSort: name,
      [name]: order,
    })
  }

  const filterSearchQuery = (data) => {
    const query = searchQuery.toLowerCase()
    return data.filter((item) => {
      if (item.name !== null) {
        return (
          item.lastName.toLowerCase().includes(query) ||
          item.name.toLowerCase().includes(query) ||
          item.middleName.toLowerCase().includes(query) ||
          item.id.toString().includes(query) ||
          item.yearOfBirth.toString().includes(query) ||
          item.citizenship.toLowerCase().includes(query) ||
          item.workshop.toLowerCase().includes(query) ||
          item.position.toLowerCase().includes(query) ||
          item.comment.toLowerCase().includes(query) ||
          item.relevance.toLowerCase().includes(query)
        )
      }
      return false
    })
  }

  const sortEmployees = (data) => {
    return filterSearchQuery(data).sort((a, b) => {
      if (a[sortOrder.curSort] < b[sortOrder.curSort]) {
        return sortOrder[sortOrder.curSort] === 'desc' ? 1 : -1
      }
      if (a[sortOrder.curSort] > b[sortOrder.curSort]) {
        return sortOrder[sortOrder.curSort] === 'desc' ? -1 : 1
      }
      return 0
    })
  }

  return (
    <div className="select-employee-new">
      <div className="select-employee-new__input">
        {props.inputName ? (
          <div className="select-employee-new__input_name">
            {props.inputName + (props.required ? '*' : '')}
          </div>
        ) : null}
        <div className={'select-employee-new__input_field'}>
          <Select
            options={employees.map((employee) => {
              return {
                value: employee.id,
                label: `${employee.lastName} ${employee.name} ${employee.middleName}`,
              }
            })}
            placeholder="Выберите сотрудника..."
          />
        </div>
      </div>
      {props.error === true && (
        <div
          className="select-employee-new__error"
          onClick={
            props.setErrorsArr
              ? () =>
                  props.setErrorsArr({
                    ...props.errorsArr,
                    [props.name]: false,
                  })
              : null
          }
        >
          Поле не заполнено!
        </div>
      )}
    </div>
  )
}

export default SelectEmployee