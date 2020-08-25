import React, { useState, useEffect } from 'react'
import './TableView.scss'
import '../../../../../../utils/MainWindow/MainWindow.scss'
import { formatDateString } from '../../../../../../utils/functions.jsx'
import okSVG from '../../../../../../../../../../assets/tableview/ok.svg'
import PlaceholderLoading from '../../../../../../utils/TableView/PlaceholderLoading/PlaceholderLoading.jsx'

const TableView = (props) => {
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

  const searchQuery = (data) => {
    const query = props.searchQuery.toLowerCase()
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
    return searchQuery(data).sort((a, b) => {
      if (a[sortOrder.curSort] < b[sortOrder.curSort]) {
        return sortOrder[sortOrder.curSort] === 'desc' ? 1 : -1
      }
      if (a[sortOrder.curSort] > b[sortOrder.curSort]) {
        return sortOrder[sortOrder.curSort] === 'desc' ? -1 : 1
      }
      return 0
    })
  }

  useEffect(() => {
    props.setShowWindow && props.setShowWindow(false)
  }, [props.closeWindow])

  return (
    <div className="tableview-employees">
      <div className="main-window">
        <div className="main-window__sort-panel">
          <span>Сортировка: </span>
          <select onChange={changeSortOrder}>
            <option value="lastName asc">По алфавиту (А-Я)</option>
            <option value="lastName desc">По алфавиту (Я-А)</option>
            <option value="yearOfBirth asc">По дате рождения</option>
          </select>
        </div>
        <div className="main-window__list">
          <div className="main-window__list-item main-window__list-item--header">
            <span>ФИО</span>
            <span>Дата рождения</span>
            {/* <span>Гражданство</span> */}
            <span>Подразделение</span>
            <span>Должность</span>
            {/* <span>Комментарий</span> */}
            {/* <span>Актуальность</span> */}
            <div className="main-window__actions">Действия</div>
          </div>
          {props.isLoading && (
            <PlaceholderLoading
              itemClassName="main-window__list-item"
              minHeight="35px"
              items={10}
            />
          )}
          {sortEmployees(props.data).map(
            (employee, employee_id) =>
              employee.relevance !== 'Уволен' && (
                <div
                  className="main-window__list-item"
                  key={employee_id}
                  onClick={() => {
                    props.selectEmployee(
                      employee.lastName +
                        ' ' +
                        employee.name +
                        ' ' +
                        employee.middleName,
                      employee.id,
                    )
                    props.setCloseWindow(!props.closeWindow)
                  }}
                >
                  <span>
                    <div className="main-window__mobile-text">ФИО:</div>
                    {employee.lastName +
                      ' ' +
                      employee.name +
                      ' ' +
                      employee.middleName}
                  </span>
                  <span>
                    <div className="main-window__mobile-text">
                      Дата рождения:
                    </div>
                    {formatDateString(employee.yearOfBirth)}
                  </span>
                  {/* <span>{employee.citizenship}</span> */}
                  <span>
                    <div className="main-window__mobile-text">
                      Подразделение:
                    </div>
                    {employee.workshop}
                  </span>
                  <span>
                    <div className="main-window__mobile-text">Должность:</div>
                    {employee.position}
                  </span>
                  {/* <span>{employee.comment}</span> */}
                  {/* <span>{employee.relevance}</span> */}
                  <div className="main-window__actions">
                    <div
                      className="main-window__action"
                      title="Выбрать сотрудника"
                      onClick={() => {
                        props.selectEmployee(
                          employee.lastName +
                            ' ' +
                            employee.name +
                            ' ' +
                            employee.middleName,
                          employee.id,
                        )
                        props.setCloseWindow(!props.closeWindow)
                      }}
                    >
                      <img className="main-window__img" src={okSVG} />
                    </div>
                  </div>
                </div>
              ),
          )}
        </div>
      </div>
    </div>
  )
}

export default TableView
