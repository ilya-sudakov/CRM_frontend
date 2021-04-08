import { useState } from 'react';
import PropTypes from 'prop-types';
import DotsIcon from 'Assets/sidemenu/more.inline.svg';
import DeleteItemAction from './Actions/DeleteItemAction.jsx';
import './TableActions.scss';
import ActionItem from './Actions/ActionItem.jsx';

const TableActions = ({ actionsList = [] }) => {
  const [isHidden, setIsHidden] = useState(true);

  const editActionItem = actionsList.find(
    (item) => item.elementType === 'edit',
  );
  const outsideItems = actionsList.filter((item) => item.isOutside);
  return (
    <div
      className={`main-window__table-actions ${
        isHidden ? 'main-window__table-actions--is-hidden' : ''
      }`}
      onMouseLeave={() => setIsHidden(true)}
    >
      {outsideItems.map((item, index) => {
        if (item.elementType === 'delete') {
          return <DeleteItemAction title={item.text} onClick={item.onClick} />;
        }
        return <ActionItem key={index} icon={item.elementType} item={item} />;
      })}
      {editActionItem ? <ActionItem icon="edit" item={editActionItem} /> : null}
      {actionsList.filter((item) => !item.isOutside).length > 0 && (
        <DotsIcon
          className="main-window__img main-window__img--more"
          width={24}
          height={24}
          style={{ padding: '5px', transform: 'rotate(90deg)' }}
          viewBox="0 0 24 24"
          alt=""
          onMouseEnter={() => setIsHidden(false)}
        />
      )}
      <div className="table-actions__menu">
        {actionsList.map((item, index) => {
          if (item.isOutside) return;
          if (editActionItem && item.elementType === 'edit') return;
          if (item.elementType === 'delete') {
            return (
              <DeleteItemAction
                key={index}
                title={item.text}
                onClick={item.onClick}
              />
            );
          }
          return <ActionItem key={index} icon={item.elementType} item={item} />;
        })}
      </div>
    </div>
  );
};

export default TableActions;

TableActions.propTypes = {
  actionsList: PropTypes.array,
};
