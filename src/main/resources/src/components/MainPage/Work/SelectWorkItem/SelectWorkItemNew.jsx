import React, { useState, useEffect } from 'react'
import './SelectWorkItem.scss'
import { getWork } from '../../../../utils/RequestsAPI/WorkManaging/WorkList.jsx'
import Select from 'react-select'

const SelectWorkItem = (props) => {
  const [works, setWorks] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (props.workItems) return setWorks([...props.workItems])
    works.length === 0 && loadWorks()
  }, [])

  const loadWorks = () => {
    setIsLoading(true)
    getWork()
      .then((res) => res.json())
      .then((res) => {
        setWorks(
          res.map((work) => {
            return {
              // work.work, work.id, work.typeOfWork
              value: work.id,
              label: work.work,
              typeOfWork: work.typeOfWork,
            }
          }),
        )
        setIsLoading(false)
      })
      .catch((error) => {
        console.log(error)
        setIsLoading(false)
      })
  }

  const clickWork = (workItem) => {
    console.log(workItem)
    props.handleWorkItemChange(
      workItem.value,
      workItem.label,
      workItem.typeOfWork,
    )
  }

  return (
    <div className="select-work-item select-work-item--new">
      <div className="select-work-item__input">
        <div className="select-work-item__input_name">Вид работы</div>
        <Select
          value={props.defaultValue.value ? props.defaultValue : null}
          className="select-work-item__input_field"
          options={works}
          styles={{
            menu: (styles) => {
              return {
                ...styles,
                zIndex: 999,
              }
            },
          }}
          placeholder={
            works.length > 0 ? 'Выберите вид работы...' : 'Идет загрузка...'
          }
          isDisabled={works.length === 0 || props.readOnly}
          onChange={clickWork}
        />
      </div>
      {props.error === true && (
        <div
          className="select-work-item__error"
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

export default SelectWorkItem
