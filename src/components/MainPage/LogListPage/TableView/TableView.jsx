import { Link } from 'react-router-dom';
import {
  formatDateStringNoYear,
  formatDateStringToTime,
} from '../../../../utils/functions.jsx';
import PlaceholderLoading from '../../../../utils/TableView/PlaceholderLoading/PlaceholderLoading.jsx';
import './TableView.scss';
import { logItemsRedirectLinks } from '../objects.js';

const TableView = ({ data = [], isLoading = false }) => {
  return (
    <div className="log-list-page__table">
      <div className="main-window__list main-window__list--full">
        <div className="main-window__list-item main-window__list-item--header">
          <span>Время</span>
          <span>Пользователь</span>
          <span>Действие</span>
          <span>Описание</span>
        </div>
        {isLoading ? (
          <PlaceholderLoading
            itemClassName="main-window__list-item"
            minHeight="35px"
            items={10}
          />
        ) : (
          data.map((item) => {
            const itemId = item.description.split('№')[1];
            return (
              <div key={item.id} className="main-window__list-item">
                <span>
                  <div className="main-window__mobile-text">Время</div>
                  {`${formatDateStringNoYear(
                    item.date,
                  )} ${formatDateStringToTime(item.date)} `}
                </span>
                <span>
                  <div className="main-window__mobile-text">Пользователь</div>
                  {item.author}
                </span>
                <span>
                  <div className="main-window__mobile-text">Действие</div>
                  {item.action}
                </span>
                <span>
                  {logItemsRedirectLinks[item.type] ? (
                    <Link
                      className="main-window__link"
                      to={`${logItemsRedirectLinks[item.type]}/${
                        item.elementId ?? itemId
                      }`}
                    >
                      <div className="main-window__mobile-text">Описание</div>
                      {item.description}
                    </Link>
                  ) : (
                    <div>
                      <div className="main-window__mobile-text">Описание</div>
                      {item.description}
                    </div>
                  )}
                </span>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default TableView;
