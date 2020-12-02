import React, { useEffect } from 'react'
import FormWindow from '../../../../utils/Form/FormWindow/FormWindow.jsx'
import {
  numberToString,
  addSpaceDelimiter,
  formatDateString,
} from '../../../../utils/functions.jsx'
import editIcon from '../../../../../../../../assets/tableview/edit.svg'
import { Link } from 'react-router-dom'

//Окно для вывода информации о сотруднике и его работе за день
export const EmployeeInfo = (props) => {
  useEffect(() => {}, [props.date])

  return (
    <div className="report-table-page__employee-info">
      <FormWindow
        title="Отчет работника"
        showWindow={props.showWindow}
        setShowWindow={props.setShowWindow}
        content={
          <div className="report-table-page__employee-wrapper">
            <div className="report-table-page__employee-date">
              {formatDateString(
                new Date(
                  props.selectedInfo?.year,
                  props.selectedInfo?.month - 1,
                  props.selectedInfo?.day,
                ),
              )}
            </div>
            <div className="report-table-page__employee-title">
              Данные сотрудника
            </div>
            <div className="report-table-page__employee-general">
              <div className="report-table-page__full-name">
                {props.selectedInfo?.employee?.lastName +
                  ' ' +
                  props.selectedInfo?.employee?.name +
                  ' ' +
                  props.selectedInfo?.employee?.middleName}
              </div>
              <div className="report-table-page__workshop">
                {props.selectedInfo?.employee?.workshop}
              </div>
              <div className="report-table-page__position">
                {props.selectedInfo?.employee?.position}
              </div>
            </div>
            {/* //Вывод работ сотрудника */}
            <div className="report-table-page__employee-title">
              Список работ
            </div>
            <div className="report-table-page__employee-works-wrapper">
              {props.selectedInfo?.works?.length === undefined ? (
                <div>Нет учтенной работы</div>
              ) : (
                props.selectedInfo?.works?.map((item) => {
                  {
                    /* console.log(item) */
                  }
                  return (
                    <div className="report-table-page__employee-works-item">
                      <span>
                        <Link
                          to={`/work-management/record-time/edit/${item.workId}`}
                        >
                          {item.workList.work}
                          <img
                            className="report-table-page__img"
                            src={editIcon}
                            alt=""
                          />
                        </Link>
                      </span>
                      <span className="report-table-page__employee-hours">
                        {item.hours +
                          ' ' +
                          numberToString(
                            Number.parseInt(Math.floor(item.hours * 100) / 100),
                            ['час', 'часа', 'часов'],
                          )}
                      </span>
                      {(item.workControlProduct.length > 0 ||
                        item?.partsWorks.length > 0) && (
                        <div className="report-table-page__list">
                          {item.workControlProduct.map((product) => (
                            <ProductItem item={product} />
                          ))}
                          {item.partsWorks.map((draft) => (
                            <ProductItem item={draft} />
                          ))}
                        </div>
                      )}
                    </div>
                  )
                })
              )}
            </div>
            <div className="report-table-page__employee-title">
              Всего:{' '}
              {props.selectedInfo?.works?.length > 0
                ? props.selectedInfo?.works?.reduce(
                    (sum, cur) => sum + cur.hours,
                    0,
                  ) +
                  ' ' +
                  numberToString(
                    Number.parseInt(
                      Math.floor(
                        props.selectedInfo?.works?.reduce(
                          (sum, cur) => sum + cur.hours,
                          0,
                        ) * 100,
                      ) / 100,
                    ),
                    ['час', 'часа', 'часов'],
                  )
                : 0}
            </div>
          </div>
        }
      />
    </div>
  )
}

const ProductItem = ({ item }) => {
  return (
    <div className="report-table-page__list-item">
      <span>
        <div className="main-window__mobile-text">Название:</div>
        {item.name ?? item.product.name}
      </span>
      <span>
        <div className="main-window__mobile-text">Кол-во:</div>
        {`${addSpaceDelimiter(item.quantity)} шт`}
      </span>
    </div>
  )
}
