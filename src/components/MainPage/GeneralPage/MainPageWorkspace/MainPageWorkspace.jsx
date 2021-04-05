import './MainPageWorkspace.scss';
import {
  WorkListWidget,
  StatisticsWidget,
  UpdateLogWidget,
  NotificationsWidget,
  TasksWidget,
  GraphWidget,
  FeedbackWidget,
} from '../../lazyImports';
import Button from 'Utils/Form/Button/Button.jsx';
import { useHistory } from 'react-router';
import { useState } from 'react';
import { getReportTableExcel } from '../ReportTablePage/getReportTableExcel';
import { months } from 'Utils/dataObjects.js';

const MainPageWorkspace = (props) => {
  const history = useHistory();
  const workshops = [
    'ЦехЛЭМЗ',
    'ЦехЛепсари',
    'ЦехЛиговский',
    'Офис',
    'Уволенные',
  ];
  const [isLoading, setIsLoading] = useState(false);

  const getFilteredWorkshops = () => {
    if (props.userHasAccess(['ROLE_ADMIN', 'ROLE_DISPATCHER']))
      return workshops;
    if (props.userHasAccess(['ROLE_LEMZ'])) return ['ЦехЛЭМЗ'];
    if (props.userHasAccess(['ROLE_LEPSARI'])) return ['ЦехЛепсари'];
    if (props.userHasAccess(['ROLE_LIGOVSKIY'])) return ['ЦехЛиговский'];
    if (props.userHasAccess(['ROLE_ENGINEER'])) return ['Офис'];
    if (props.userHasAccess(['ROLE_MANAGER'])) return ['Офис'];
  };

  async function downloadTableReport() {
    setIsLoading(true);
    const filteredWorkshops = getFilteredWorkshops();
    await getReportTableExcel(new Date(), filteredWorkshops);
    return setIsLoading(false);
  }

  return (
    <div className="main-page-workspace">
      <div className="main-page-workspace__buttons">
        <Button
          text={
            <div className="button__text-group">
              <span>Учесть рабочее время</span>
              <span className="button__text--sub">
                Заполнить форму работы за день
              </span>
            </div>
          }
          className="main-window__button main-window__button--big"
          onClick={() => history.push('/work-management/record-time/new')}
        />
        <Button
          text={
            <div className="button__text-group">
              <span>Дневник производства</span>
              <span className="button__text--sub">
                Список работ сотрудников за 2 дня
              </span>
            </div>
          }
          className="main-window__button main-window__button--big"
          onClick={() => history.push('/work-management/journal')}
        />
        <Button
          text={
            <div className="button__text-group">
              <span>Табель сотрудников</span>
              <span className="button__text--sub">
                Таблица учета рабочего времени
              </span>
            </div>
          }
          className="main-window__button main-window__button--big"
          onClick={() => history.push('/report-table')}
        />
        {props.userHasAccess(['ROLE_ADMIN']) && (
          <Button
            className="main-window__button main-window__button--big"
            onClick={() => history.push('/statistics')}
            text={
              <div className="button__text-group">
                <span>Статистика</span>
                <span className="button__text--sub">
                  Показатели производства
                </span>
              </div>
            }
          />
        )}
        <Button
          text={
            <div className="button__text-group">
              <span>Скачать табель</span>
              <span className="button__text--sub">
                {`За ${months[new Date().getMonth()].toLowerCase()}`}
              </span>
            </div>
          }
          className="main-window__button main-window__button--inverted main-window__button--big"
          inverted
          isLoading={isLoading}
          onClick={downloadTableReport}
        />
      </div>
      <div className="main-page-workspace__columns">
        <div className="main-page-workspace__row main-page-workspace__row--horizontal">
          <TasksWidget />
          <WorkListWidget />
        </div>
        <div className="main-page-workspace__row main-page-workspace__row--horizontal">
          {props.userHasAccess(['ROLE_ADMIN']) && <GraphWidget />}
          {props.userHasAccess(['ROLE_ADMIN']) && <StatisticsWidget />}
          <FeedbackWidget />
        </div>
        <div className="main-page-workspace__row main-page-workspace__row--vertical">
          {props.userHasAccess(['ROLE_ADMIN', 'ROLE_DISPATCHER']) && (
            <NotificationsWidget type="birthday" />
          )}
          {props.userHasAccess(['ROLE_ADMIN', 'ROLE_DISPATCHER']) && (
            <NotificationsWidget type="documents" />
          )}
          <UpdateLogWidget />
        </div>
      </div>
    </div>
  );
};

export default MainPageWorkspace;
