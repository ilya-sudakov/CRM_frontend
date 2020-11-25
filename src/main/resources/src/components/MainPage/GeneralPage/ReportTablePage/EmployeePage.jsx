import React, { useEffect, useState } from 'react'
import SelectEmployee from '../../Dispatcher/Employees/SelectEmployee/SelectEmployee.jsx'
import Button from '../../../../utils/Form/Button/Button.jsx'
import EmployeeInfo from './EmployeeInfo.jsx'

const EmployeePage = ({ userContext, workList, isLoading, date }) => {
  const [selectedInfo, setSelectedInfo] = useState(null)

  const handleEmployeeChange = (value, name, employee) => {
    return setSelectedInfo({
      employeeId: value,
      employeeName: name,
      employee: employee,
      worksId: workList[value]?.workArray
        ? workList[value]?.workArray.map((item) => {
            return item.workList.id
          })
        : [],
      works: workList[value]?.workArray ?? [],
    })
  }

  useEffect(() => {
    console.log(date, selectedInfo)
  }, [selectedInfo, workList])

  return (
    <div className="employee-page">
      {!isLoading ? (
        <SelectEmployee
          userHasAccess={userContext.userHasAccess}
          inputName="Выбор сотрудника"
          name="employee"
          handleEmployeeChange={handleEmployeeChange}
        />
      ) : (
        <Button
          text=""
          className="main-window__button"
          // inverted
          isLoading={true}
        />
      )}
      {selectedInfo !== null && !isLoading ? (
        <EmployeeInfo selectedInfo={selectedInfo} date={date} />
      ) : null}
    </div>
  )
}

export default EmployeePage
