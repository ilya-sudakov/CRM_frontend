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
  return (
    <div
      className={`main-window__table-actions ${
        isHidden ? 'main-window__table-actions--is-hidden' : ''
      }`}
      onMouseLeave={() => setIsHidden(true)}
    >
      {editActionItem ? <ActionItem icon="edit" item={editActionItem} /> : null}
      <DotsIcon
        className="main-window__img main-window__img--more"
        style={{ transform: 'rotate(90deg)' }}
        width={30}
        height={30}
        alt=""
        onMouseEnter={() => setIsHidden(false)}
      />
      <div className="table-actions__menu">
        {actionsList.map((item, index) => {
          if (editActionItem && item.elementType === 'edit') return;
          if (item.elementType === 'delete') {
            return (
              <DeleteItemAction title={item.text} onClick={item.onClick} />
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
