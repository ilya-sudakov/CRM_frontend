import { useEffect } from 'react';
import okSVG from '../../../../../../assets/tableview/ok.svg';
import './TableView.scss';
import 'Utils/MainWindow/MainWindow.scss';
import PlaceholderLoading from 'Utils/TableView/PlaceholderLoading/PlaceholderLoading.jsx';
import { sortByField } from 'Utils/sorting/sorting';

const TableView = (props) => {
  const searchQuery = (data) => {
    const query = props.searchQuery.toLowerCase();
    return data.filter(
      (item) =>
        item.work.toLowerCase().includes(query) ||
        item.id.toString().includes(query),
    );
  };

  const sortProducts = (data) => {
    return sortByField(searchQuery(data), {
      fieldName: 'work',
      direction: 'asc',
    });
  };

  useEffect(() => {
    props.setShowWindow(false);
  }, [props.fullName]);

  return (
    <div className="tableview-work">
      <div className="main-window">
        <div className="main-window__list main-window__list--full">
          <div className="main-window__list-item main-window__list-item--header">
            <span>Название</span>
            <span>Тип</span>
            <div className="main-window__actions">Действия</div>
          </div>
          {props.isLoading ? (
            <PlaceholderLoading
              itemClassName="main-window__list-item"
              minHeight="2rem"
              items={15}
            />
          ) : (
            sortProducts(props.data).map((work, work_id) => (
              <div
                key={work_id}
                className="main-window__list-item"
                onClick={() => {
                  props.selectWork(work.work, work.id, work.typeOfWork);
                }}
              >
                <span>
                  <div className="main-window__mobile-text">Название:</div>
                  {work.work}
                </span>
                <span>
                  <div className="main-window__mobile-text">Тип:</div>
                  {work.typeOfWork}
                </span>
                <div className="main-window__actions">
                  <div
                    data-id={work.id}
                    className="main-window__action"
                    title="Выбрать"
                    onClick={() => {
                      props.selectWork(work.work, work.id, work.typeOfWork);
                    }}
                  >
                    {/* Выбрать */}
                    <img className="main-window__img" src={okSVG} />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default TableView;
