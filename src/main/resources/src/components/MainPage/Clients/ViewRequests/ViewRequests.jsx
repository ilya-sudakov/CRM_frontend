import React from "react";
import "./ViewRequests.scss";
import { formatDateStringNoYear } from "../../../../utils/functions.jsx";
import PlaceholderLoading from "../../../../utils/TableView/PlaceholderLoading/PlaceholderLoading.jsx";
import { Link } from "react-router-dom";

const sortRequests = (requests) => {
  return requests.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    }
    if (a.date > b.date) {
      return -1;
    }
    return 0;
  });
};

const ViewRequests = (props) => {
  return (
    <div className="view-requests">
      <div className="main-window">
        <div className="main-window__list">
          <div className="main-window__list-item main-window__list-item--header">
            <span className="main-window__col main-window__col--date">
              Дата
            </span>
            <span className="main-window__col main-window__col--id">ID</span>
            <span className="main-window__col main-window__col--status">
              Статус
            </span>
            <span className="main-window__col main-window__col--comment">
              Комментарий
            </span>
            <span className="main-window__col main-window__col--sum">
              Сумма
            </span>
          </div>
          {props.isLoading ? (
            <PlaceholderLoading
              itemClassName="main-window__list-item"
              minHeight="30px"
              items={3}
            />
          ) : (
            sortRequests(props.requests).map((item, index) => (
              <ListItem item={item} index={index} key={item.id} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewRequests;

const ListItem = ({ item, index }) => {
  return (
    <div className="main-window__list-item" key={index}>
      <span className="main-window__col main-window__col--date">
        {formatDateStringNoYear(item.date)}
      </span>
      <span className="main-window__col main-window__col--id">
        <Link to={`/requests/edit/${item.id}`}>{`ID #${item.id}`}</Link>
      </span>
      <span className="main-window__col main-window__col--status">
        {item.status}
      </span>
      <span className="main-window__col main-window__col--comment">
        {item.comment}
      </span>
      <span className="main-window__col main-window__col--sum">
        {`${item.sum ?? 0} руб.`}
      </span>
    </div>
  );
};
