import './MainPageWorkspace.scss';
import { WorkManagement } from '../../lazyImports.jsx';
import TasksWidget from '../TasksWidget/TasksWidget.jsx';
import GraphWidget from '../GraphWidget/GraphWidget.jsx';
import Notifications from '../Notifications/NotificationsWidget.jsx';
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
    if (
      props.userHasAccess(['ROLE_ADMIN']) ||
      props.userHasAccess(['ROLE_DISPATCHER'])
    ) {
      return workshops;
    }
    if (props.userHasAccess(['ROLE_LEMZ'])) {
      return ['ЦехЛЭМЗ'];
    }
    if (props.userHasAccess(['ROLE_LEPSARI'])) {
      return ['ЦехЛепсари'];
    }
    if (props.userHasAccess(['ROLE_LIGOVSKIY'])) {
      return ['ЦехЛиговский'];
    }
    if (props.userHasAccess(['ROLE_ENGINEER'])) {
      return ['Офис'];
    }
    if (props.userHasAccess(['ROLE_MANAGER'])) {
      return ['Офис'];
    }
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
        {props.userHasAccess([
          'ROLE_ADMIN',
          'ROLE_DISPATCHER',
          'ROLE_MANAGER',
          'ROLE_WORKSHOP',
          'ROLE_ENGINEER',
        ]) && (
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
        )}
        {props.userHasAccess([
          'ROLE_ADMIN',
          'ROLE_DISPATCHER',
          'ROLE_MANAGER',
          'ROLE_WORKSHOP',
          'ROLE_ENGINEER',
        ]) && (
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
        )}
        <Button
          text={
            <div className="button__text-group">
              <span>Табель</span>
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
                {`за ${months[new Date().getMonth()]}`}
              </span>
            </div>
          }
          // imgSrc={DownloadIcon}
          className="main-window__button main-window__button--inverted main-window__button--big"
          inverted
          isLoading={isLoading}
          onClick={downloadTableReport}
        />
      </div>
      <div className="main-page-workspace__row main-page-workspace__row--horizontal">
        <TasksWidget />
        <WorkManagement />
        {props.userHasAccess(['ROLE_ADMIN']) && <GraphWidget />}
      </div>
      <div className="main-page-workspace__row main-page-workspace__row--vertical">
        {props.userHasAccess(['ROLE_ADMIN', 'ROLE_DISPATCHER']) && (
          <Notifications type="birthday" />
        )}
        {props.userHasAccess(['ROLE_ADMIN', 'ROLE_DISPATCHER']) && (
          <Notifications type="documents" />
        )}
      </div>
    </div>
  );
};

export default MainPageWorkspace;
