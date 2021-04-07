import { useContext, useEffect, useState } from 'react';
import { formatDateStringNoYear } from 'Utils/functions.jsx';
import TableLoading from 'Utils/TableView/TableLoading/TableLoading.jsx';
import Button from 'Utils/Form/Button/Button.jsx';
import { getRecordedWorkByDateRange } from 'Utils/RequestsAPI/WorkManaging/work_control';
import { createGraph, loadCanvas } from 'Utils/graphs.js';
import UserContext from '../../../../App.js';
import './GraphWidget.scss';

import {
  getDateFromWeekdayIndex,
  getWeekdaysListWithOffset,
} from './functions.js';
import { graphOptions, weekdays, workshopsDefaultValue } from './objects.js';
import Widget from '../Widget/Widget.jsx';

const GraphWidget = () => {
  const [weekOffset, setWeekOffset] = useState(0);
  const [graph, setGraph] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [canvasLoaded, setCanvasLoaded] = useState(false);
  const userContext = useContext(UserContext);
  const [workshops] = useState(workshopsDefaultValue);

  useEffect(() => {
    let abortController = new AbortController();
    const week = getWeekdaysListWithOffset(weekOffset);
    // console.log(week);
    workshops.map((workshop, index) => {
      let temp = workshops;
      temp.splice(index, 1, {
        ...workshop,
        data: [],
      });
    });
    setIsLoading(true);
    // console.log(week)

    getRecordedWorkByDateRange(
      week[0].getDate(),
      week[0].getMonth() + 1,
      week[0].getFullYear(),
      week[week.length - 1].getDate(),
      week[week.length - 1].getMonth() + 1,
      week[week.length - 1].getFullYear(),
      abortController.signal,
    )
      .then((res) => res.json())
      .then((res) => {
        // console.log(res, week)
        week.map((day) => {
          return workshops.map((workshop, index) => {
            let temp = workshops;
            let oldData = workshop.data;
            oldData.push(
              res.reduce((sum, cur) => {
                if (
                  workshop.label === cur.employee.workshop &&
                  new Date(day).getDate() ===
                    new Date(cur.year, cur.month - 1, cur.day).getDate()
                ) {
                  return Math.ceil((sum + cur.hours) * 10) / 10;
                } else return sum;
              }, 0),
            );
            return temp.splice(index, 1, {
              ...workshop,
              data: oldData,
            });
          });
        });
        console.log(workshops);
        if (userContext.userHasAccess(['ROLE_ADMIN'])) {
          !canvasLoaded &&
            loadCanvas('graph-widget__chart-wrapper', 'graph-widget__chart');
          setCanvasLoaded(true);
          const options = {
            type:
              (window.innerWidth ||
                document.documentElement.clientWidth ||
                document.body.clientWidth) > 500
                ? 'bar'
                : 'horizontalBar',
            data: {
              labels: [
                ...week.map((day, index) => {
                  return weekdays[index];
                }),
              ],
              datasets: [...workshops],
            },
            options: graphOptions,
          };
          setTimeout(() => {
            setIsLoading(false);
            canvasLoaded && graph.destroy();
            setGraph(createGraph(options));
          }, 150);
        }
      });
    return function cancel() {
      abortController.abort();
    };
  }, [weekOffset, workshops]);

  return (
    <Widget
      className="graph-widget"
      customHeader={
        <div className="graph-widget__header">
          <div className="graph-widget__title">
            <span className="graph-widget__date">
              {formatDateStringNoYear(getDateFromWeekdayIndex(1, weekOffset)) +
                ' - ' +
                formatDateStringNoYear(getDateFromWeekdayIndex(7, weekOffset))}
            </span>
            Сводка за неделю
          </div>
          <Button
            text="Пред. неделя"
            className="graph-widget__button"
            isLoading={weekOffset === 0 ? false : isLoading}
            onClick={() => setWeekOffset(weekOffset + 1)}
            inverted
          />
          <Button
            text="Тек. неделя"
            className="graph-widget__button"
            isLoading={weekOffset !== 0 ? false : isLoading}
            onClick={() => setWeekOffset(0)}
            inverted
          />
        </div>
      }
      content={
        <>
          <div className="main-window__mobile-text">
            <span className="graph-widget__date">
              {formatDateStringNoYear(getDateFromWeekdayIndex(1, weekOffset)) +
                ' - ' +
                formatDateStringNoYear(getDateFromWeekdayIndex(7, weekOffset))}
            </span>
            Сводка за неделю
          </div>
          <TableLoading isLoading={isLoading} />
          <div className="graph-widget__chart-wrapper"></div>
        </>
      }
    />
  );
};

export default GraphWidget;
