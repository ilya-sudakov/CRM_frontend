import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import sortIcon from '../../../../../../../../../assets/tableview/sort_icon.png'
import viewIcon from '../../../../../../../../../assets/tableview/view.svg'
import editIcon from '../../../../../../../../../assets/tableview/edit.svg'
import deleteIcon from '../../../../../../../../../assets/tableview/delete.svg'
import printSVG from '../../../../../../../../../assets/tableview/print.svg'
import printIcon from '../../../../../../../../../assets/print.png'
import pdfMake from 'pdfmake'
import './TableView.scss'
import { formatDateString } from '../../../../../utils/functions.jsx'
import { getEmployeesByWorkshopListPdfText } from '../../../../../utils/pdfFunctions.jsx'
import TableDataLoading from '../../../../../utils/TableView/TableDataLoading/TableDataLoading.jsx'

const TableView = (props) => {
  const [workshops, setWorkshops] = useState([
    'ЦехЛЭМЗ',
    'ЦехЛепсари',
    'ЦехЛиговский',
    'Офис',
    'Уволенные',
  ])
  const [workshopsVisible, setWorkshopsVisible] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [sortOrder, setSortOrder] = useState({
    curSort: 'lastName',
    date: 'desc',
  })

  const changeSortOrder = (event) => {
    const name = event.target.getAttribute('name')
    setSortOrder({
      curSort: name,
      [name]: sortOrder[name] === 'desc' ? 'asc' : 'desc',
    })
  }

  const searchQuery = (data) => {
    const query = props.searchQuery.toLowerCase()
    return data.filter(
      (item) =>
        item.lastName.toLowerCase().includes(query) ||
        item.name.toLowerCase().includes(query) ||
        item.middleName.toLowerCase().includes(query) ||
        item.id.toString().includes(query) ||
        item.yearOfBirth.toString().includes(query) ||
        item.citizenship.toLowerCase().includes(query) ||
        item.workshop.toLowerCase().includes(query) ||
        item.position.toLowerCase().includes(query) ||
        item.comment.toLowerCase().includes(query) ||
        item.relevance.toLowerCase().includes(query),
    )
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

  const checkWorkshop = (index) => {
    index = Number.parseInt(index)
    return workshopsVisible.map((element, element_index) => {
      if (element.id == index) {
        let temp2 = Object.assign({
          id: index,
          hidden: !element.hidden,
        })
        return temp2
      }
      return element
    })
  }

  const isWorkshopHidden = (index) => {
    index = Number.parseInt(index)
    let check = true
    workshopsVisible.map((element) => {
      if (element.id === index) {
        check = element.hidden
      }
    })
    return check
  }

  const handleClickWorkshop = (id) => {
    setWorkshopsVisible([...checkWorkshop(id)])
  }

  useEffect(() => {
    if (workshopsVisible.length === 0) {
      let temp = []
      workshops.map((element, index) =>
        temp.push({
          id: index,
          hidden: true,
        }),
      )
      setWorkshopsVisible([...temp])
    }
    props.data.length > 0 && setIsLoading(false)
  }, [props.data])

  return (
    <div className="tableview-employees">
      <div className="main-window__list">
        <div className="main-window__list-item main-window__list-item--header">
          <span>Подразделение</span>
          <div className="main-window__actions">Действия</div>
        </div>
        {workshops.map((item, index) => (
          <React.Fragment>
            <div
              className="main-window__list-item"
              onClick={() => handleClickWorkshop(index)}
            >
              <span>
                <div className="main-window__mobile-text">Подразделение:</div>
                {item}
              </span>
              <div className="main-window__actions">
                <div
                  className="main-window__action"
                  onClick={() => {
                    let dd = getEmployeesByWorkshopListPdfText(
                      props.data.filter(
                        (employee) =>
                          (item === employee.workshop &&
                            employee.relevance !== 'Уволен') ||
                          (item === 'Уволенные' &&
                            employee.relevance === 'Уволен'),
                      ),
                      item,
                    )
                    pdfMake.createPdf(dd).print()
                  }}
                  title="Печать"
                >
                  <img className="main-window__img" src={printSVG} alt="" />
                  {'    '}
                  Печать
                </div>
              </div>
            </div>
            <div
              className={
                isWorkshopHidden(index)
                  ? 'main-window__list-options main-window__list-options--hidden'
                  : 'main-window__list-options'
              }
            >
              <div className="main-window__list">
                <div className="main-window__list-item main-window__list-item--header">
                  <span>ФИО</span>
                  <span>Дата рождения</span>
                  <span>Гражданство</span>
                  {/* <span>Подразделение</span> */}
                  <span>Должность</span>
                  {/* <span>Комментарий</span> */}
                  <span>Актуальность</span>
                  <div className="main-window__actions">Действия</div>
                </div>
                {sortEmployees(props.data).map(
                  (employee, employee_id) =>
                    ((item === employee.workshop &&
                      employee.relevance !== 'Уволен') ||
                      (item === 'Уволенные' &&
                        employee.relevance === 'Уволен')) && (
                      <div
                        key={employee_id}
                        className={'main-window__list-item'}
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
                        <span>
                          <div className="main-window__mobile-text">
                            Гражданство:
                          </div>
                          {employee.citizenship}
                        </span>
                        {/* <span>{employee.workshop}</span> */}
                        <span>
                          <div className="main-window__mobile-text">
                            Должность:
                          </div>
                          {employee.position}
                        </span>
                        {/* <span>{employee.comment}</span> */}
                        <span>
                          <div className="main-window__mobile-text">
                            Актуальность:
                          </div>
                          {employee.relevance}
                        </span>
                        <div className="main-window__actions">
                          <Link
                            to={'/dispatcher/employees/view/' + employee.id}
                            className="main-window__action"
                            title="Просмотр"
                          >
                            <img
                              className="main-window__img"
                              src={viewIcon}
                              alt=""
                            />
                          </Link>
                          <Link
                            to={'/dispatcher/employees/edit/' + employee.id}
                            className="main-window__action"
                            title="Редактирование"
                          >
                            <img
                              className="main-window__img"
                              src={editIcon}
                              alt=""
                            />
                          </Link>
                          {props.userHasAccess(['ROLE_ADMIN']) && (
                            <div
                              data-id={employee.id}
                              className="main-window__action"
                              onClick={props.deleteItem}
                              title="Удалить"
                            >
                              <img
                                className="main-window__img"
                                src={deleteIcon}
                                alt=""
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    ),
                )}
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>
      {/* <div className="tableview-employees__row tableview-employees__row--header">
        <div className="tableview-employees__col">ФИО</div>
        <div className="tableview-employees__col">
          <span>Дата рождения</span>
          <img
            name="yearOfBirth"
            className="tableview-employees__img"
            onClick={changeSortOrder}
            src={sortIcon}
          />
        </div>
        <div className="tableview-employees__col">Гражданство</div>
        <div className="tableview-employees__col">Подразделение</div>
        <div className="tableview-employees__col">Должность</div>
        <div className="tableview-employees__col">Комментарий</div>
        <div className="tableview-employees__col">Актуальность</div>
        <div className="tableview-employees__col">Действия</div>
      </div>
      {workshops.map((item, index) => (
        <React.Fragment>
          <div
            className="tableview-employees__row tableview-employees__row--even"
            id={index}
            onClick={handleClickWorkshop}
          >
            <div className="tableview-employees__col"></div>
            <div className="tableview-employees__col"></div>
            <div className="tableview-employees__col"></div>
            <div className="tableview-employees__col">{item}</div>
            <div className="tableview-employees__col"></div>
            <div className="tableview-employees__col"></div>
            <div className="tableview-employees__col"></div>
            <div className="tableview-employees__actions">
              <div
                className="tableview-employees__action"
                onClick={() => {
                  let dd = getEmployeesByWorkshopListPdfText(
                    props.data.filter(
                      (employee) =>
                        (item === employee.workshop &&
                          employee.relevance !== 'Уволен') ||
                        (item === 'Уволенные' &&
                          employee.relevance === 'Уволен'),
                    ),
                    item,
                  )
                  pdfMake.createPdf(dd).print()
                }}
              >
                Печать
              </div>
            </div>
          </div>
          <div
            id={index}
            className={
              isWorkshopHidden(index) === true
                ? 'tableview-employees__employees tableview-employees__employees--hidden'
                : 'tableview-employees__employees'
            }
          >
            {isLoading && (
              <TableDataLoading
                minHeight="50px"
                className="tableview-employees__row tableview-employees__row--even"
              />
            )}
            {sortEmployees(props.data).map(
              (employee, employee_id) =>
                ((item === employee.workshop &&
                  employee.relevance !== 'Уволен') ||
                  (item === 'Уволенные' &&
                    employee.relevance === 'Уволен')) && (
                  <div
                    key={employee_id}
                    className={
                      'tableview-employees__row tableview-employees__row--odd'
                    }
                  >
                    <div className="tableview-employees__col">
                      {employee.lastName +
                        ' ' +
                        employee.name +
                        ' ' +
                        employee.middleName}
                    </div>
                    <div className="tableview-employees__col">
                      {formatDateString(employee.yearOfBirth)}
                    </div>
                    <div className="tableview-employees__col">
                      {employee.citizenship}
                    </div>
                    <div className="tableview-employees__col">
                      {employee.workshop}
                    </div>
                    <div className="tableview-employees__col">
                      {employee.position}
                    </div>
                    <div className="tableview-employees__col">
                      {employee.comment}
                    </div>
                    <div className="tableview-employees__col">
                      {employee.relevance}
                    </div>
                    <div className="tableview-employees__actions">
                      <Link
                        to={'/dispatcher/employees/view/' + employee.id}
                        className="tableview-employees__action"
                      >
                        Просмотр
                      </Link>
                      <Link
                        to={'/dispatcher/employees/edit/' + employee.id}
                        className="tableview-employees__action"
                      >
                        Редактировать
                      </Link>
                      {props.userHasAccess(['ROLE_ADMIN']) && (
                        <div
                          data-id={employee.id}
                          className="tableview-employees__action"
                          onClick={props.deleteItem}
                        >
                          Удалить
                        </div>
                      )}
                    </div>
                  </div>
                ),
            )}
          </div>
        </React.Fragment>
      ))} */}
    </div>
  )
}

export default TableView
