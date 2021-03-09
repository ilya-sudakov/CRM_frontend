import { useEffect, useState, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import openWidget from 'Assets/tableview/bx-window-open.svg';
import { getRecordedWorkByDay } from 'Utils/RequestsAPI/WorkManaging/WorkControl.jsx';
import { formatDateString } from 'Utils/functions.jsx';
import UserContext from '../../../../../App.js';
import PlaceholderLoading from 'Utils/TableView/PlaceholderLoading/PlaceholderLoading.jsx';
import { workshopsList } from './objects.js';
import WorkList from './WorkList.jsx';
import Widget from '../../Widget/Widget.jsx';
import useEmployeesList from 'Utils/hooks/useEmployeesList.js';

import './WorkListWidget.scss';

const WorkListWidget = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [recordedWork, setRecordedWork] = useState([]);
  const [employeesMap, setEmployeesMap] = useState({});
  const { employees, isLoadingEmployees } = useEmployeesList();
  const userContext = useContext(UserContext);

  const combineWorkHoursForSamePeople = (works) => {
    // let newEmployeesWorkMap = [];
    let newEmployeesMap = {};
    Promise.all(
      works.map(
        (work) =>
          (newEmployeesMap = {
            ...newEmployeesMap,
            [work.employee.id]: {
              hours:
                newEmployeesMap[work.employee.id] !== undefined
                  ? newEmployeesMap[work.employee.id].hours + work.hours
                  : work.hours,
            },
          }),
      ),
    ).then(() => {
      setEmployeesMap(newEmployeesMap);
    });
  };

  useEffect(() => {
    let abortController = new AbortController();
    let date = new Date();
    date.setDate(date.getDate() - 1);
    setIsLoading(true);
    recordedWork.length === 0 &&
      getRecordedWorkByDay(
        date.getMonth() + 1,
        date.getDate(),
        date.getFullYear(),
        abortController.signal,
      )
        .then((res) => res.json())
        .then((res) => {
          setRecordedWork(res);
          combineWorkHoursForSamePeople(res);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
        });
    return function cancel() {
      abortController.abort();
    };
  }, []);

  return (
    <Widget
      className="work-list-widget"
      title="Отчет производства"
      subTitle={formatDateString(
        new Date(new Date().setDate(new Date().getDate() - 1)),
      )}
      linkTo={{
        address: '/work-management',
        text: 'Открыть',
        img: openWidget,
      }}
      content={
        recordedWork.length === 0 || isLoadingEmployees ? (
          isLoading || isLoadingEmployees ? (
            <PlaceholderLoading
              minHeight="2rem"
              wrapperClassName="work-list-widget__list work-list-widget__list--placeholder"
              itemClassName="work-list-widget__item"
            />
          ) : (
            <div className="work-list-widget__info">
              Нет записей о проведенной работе!
            </div>
          )
        ) : (
          <WorkList
            workshops={workshopsList}
            employees={employees}
            employeesMap={employeesMap}
            userContext={userContext}
            date={new Date(new Date().setDate(new Date().getDate() - 1))}
          />
        )
      }
    />
  );
};

export default withRouter(WorkListWidget);
