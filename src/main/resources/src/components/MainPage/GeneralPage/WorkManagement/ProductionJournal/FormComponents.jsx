import React from 'react'
import ChevronImg from '../../../../../../../../../assets/tableview/chevron-down.inline.svg'
import SelectWork from '../SelectWork/SelectWork.jsx'

const EmployeeData = ({
  setWorkTimeInputs,
  products,
  categories,
  drafts,
  works,
  worktimeInputs,
  workItem,
  workshop,
  employeesMap,
  readOnly,
  readOnlyMode,
}) => {
  const handleAddNewWork = () => {
    setWorkTimeInputs((worktimeInputs) => {
      return {
        ...worktimeInputs,
        [workshop[1]]: {
          ...worktimeInputs[workshop[1]],
          [workItem.employee.id]: {
            ...workItem,
            works: [
              ...workItem.works,
              {
                product: [],
                isOld: false,
                draft: [],
                workName: '',
                workType: '',
                workId: null,
                hours: 0,
                comment: '',
              },
            ],
          },
        },
      }
    })
  }

  const handleMinimizeWorkItem = () => {
    setWorkTimeInputs((worktimeInputs) => {
      return {
        ...worktimeInputs,
        [workshop[1]]: {
          ...worktimeInputs[workshop[1]],
          [workItem.employee.id]: {
            ...workItem,
            isMinimized: !workItem.isMinimized,
          },
        },
      }
    })
  }

  return (
    <>
      <div
        className={`main-form__item main-form__item--employee ${
          workItem.totalHours === 0 ? 'main-form__item--error' : ''
        }`}
        data-position={workItem.employee.position}
        data-hours={
          workItem.totalHours > 0 ? `${workItem.totalHours} ч` : `Нет записи!`
        }
      >
        <input
          type="text"
          className="main-form__input_field"
          value={`${workItem.employee.lastName} ${workItem.employee.name} ${workItem.employee.middleName}`}
          readOnly
        ></input>
      </div>
      <div className="production-journal__works-list">
        {!readOnly && !readOnlyMode ? (
          <div
            className="main-form__button main-form__button--inverted"
            style={{
              borderColor: 'transparent',
              fontSize: '28px',
              color: '#888888',
            }}
            title="Добавить запись о работе"
            onClick={handleAddNewWork}
          >
            +
          </div>
        ) : null}
        {workItem.works.length > 0 && !readOnlyMode ? (
          <div
            className="main-form__button main-form__button--inverted"
            style={{
              borderColor: 'transparent',
              color: '#555555',
              visibility:
                workItem.works.reduce(
                  (prev, cur) => prev + cur.product.length + cur.draft.length,
                  0,
                ) > 0
                  ? 'visible'
                  : 'hidden',
            }}
            title={`${
              workItem.isMinimized ? 'Раскрыть' : 'Скрыть'
            } продукцию и чертежи`}
            onClick={handleMinimizeWorkItem}
          >
            <ChevronImg
              className={`production-journal__img production-journal__img--chevron ${
                workItem.isMinimized ? 'main-window__img--rotated' : ''
              }`}
            />
          </div>
        ) : null}
        {readOnlyMode ? (
          <ReadOnlyWorksForm workItem={workItem} workshop={workshop} />
        ) : (
          <WorksForm
            setWorkTimeInputs={setWorkTimeInputs}
            worktimeInputs={worktimeInputs}
            workItem={workItem}
            workshop={workshop}
            categories={categories}
            products={products}
            works={works}
            drafts={drafts}
            readOnly={readOnly}
            employeesMap={employeesMap}
          />
        )}
      </div>
    </>
  )
}

export default EmployeeData

const WorksForm = ({
  setWorkTimeInputs,
  workItem,
  workshop,
  products,
  categories,
  drafts,
  works,
  readOnly,
}) => {
  const defaultConfig = [
    {
      isOld: false,
      product: [],
      draft: [],
      workName: '',
      workType: '',
      workId: null,
      hours: 0,
      comment: '',
    },
  ]

  const handleWorkChange = (value) => {
    setWorkTimeInputs((worktimeInputs) => {
      return {
        ...worktimeInputs,
        [workshop[1]]: {
          ...worktimeInputs[workshop[1]],
          [workItem.employee.id]: {
            ...workItem,
            works: value,
          },
        },
      }
    })
  }

  const handleTotalHoursChange = (value) => {
    setWorkTimeInputs((worktimeInputs) => {
      return {
        ...worktimeInputs,
        [workshop[1]]: {
          ...worktimeInputs[workshop[1]],
          [workItem.employee.id]: {
            ...workItem,
            totalHours: value,
          },
        },
      }
    })
  }

  return (
    <div
      className={`production-journal__form production-journal__form--readonly ${
        workItem.isMinimized ? 'production-journal__form--minimized' : ''
      }`}
    >
      {/* Создание работы */}
      <div className="main-form__item">
        <div className="main-form__input_field">
          {/* {console.log(workItem)} */}
          <SelectWork
            handleWorkChange={handleWorkChange}
            totalHours={workItem.totalHours}
            newDesign
            defaultConfig={defaultConfig}
            setTotalHours={handleTotalHoursChange}
            categories={categories}
            products={products}
            drafts={drafts}
            workItems={works}
            defaultValue={workItem.works}
            readOnly={readOnly}
          />
        </div>
      </div>
    </div>
  )
}

const ReadOnlyWorksForm = ({ workItem }) => {
  return (
    <div
      className={`production-journal__form production-journal__form--readonly ${
        workItem.isMinimized ? 'production-journal__form--minimized' : ''
      }`}
    >
      {/* Создание работы */}
      <div className="main-form__item">
        <div className="main-form__input_field">
          <div className="main-form__work-list">
            {workItem.works
              .sort((a, b) => {
                if (a.hours < b.hours) {
                  return 1
                }
                if (a.hours > b.hours) {
                  return -1
                }
                return 0
              })
              .map((work) => (
                <div className="main-form__work-item">
                  <div className="main-form__work-data main-form__work-data--hours">
                    <span>{work.workName}</span>
                    <span>{`${work.hours} ч`}</span>
                  </div>
                  {work.product.map((product) => (
                    <div className="main-form__work-data main-form__work-data--products">
                      <span>{product.name}</span>
                      <span>{`${product.quantity} шт`}</span>
                    </div>
                  ))}
                  {work.draft.map((draft) => (
                    <div className="main-form__work-data main-form__work-data--products">
                      <span>{draft.name}</span>
                      <span>{`${draft.quantity} шт`}</span>
                    </div>
                  ))}
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}
