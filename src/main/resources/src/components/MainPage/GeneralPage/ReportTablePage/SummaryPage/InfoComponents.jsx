import React, { useEffect } from "react";
import FormWindow from "../../../../../utils/Form/FormWindow/FormWindow.jsx";
import EmployeeInfoPanel from "../EmployeeInfo.jsx";

//Окно для вывода информации о сотруднике и его работе за день
export const EmployeeInfo = (props) => {
  useEffect(() => {}, [props.dates]);

  return (
    <div className="report-table-page__employee-info">
      <FormWindow
        title="Отчет работника"
        showWindow={props.showWindow}
        setShowWindow={props.setShowWindow}
        content={
          <EmployeeInfoPanel
            dates={props.dates}
            header={props.header}
            selectedInfo={props.selectedInfo}
          />
        }
      />
    </div>
  );
};
