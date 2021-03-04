import { useState, useEffect, useCallback } from 'react';
import { withRouter } from 'react-router-dom';
import editIcon from 'Assets/tableview/edit.svg';
import deleteIcon from 'Assets/tableview/delete.svg';
import './TableView.scss';
import { scrollToElement } from 'Utils/functions.jsx';
import { rigStatuses, rigTypes } from '../rigsVariables';
import { editStampColor } from 'Utils/RequestsAPI/Rigging/Stamp.jsx';
import PlaceholderLoading from 'Utils/TableView/PlaceholderLoading/PlaceholderLoading.jsx';
import TableActions from 'Utils/TableView/TableActions/TableActions.jsx';
import DeleteItemAction from 'Utils/TableView/TableActions/Actions/DeleteItemAction.jsx';
import useQuery from 'Utils/hooks/useQuery.js';
import useSort from 'Utils/hooks/useSort/useSort.js';
import { isPartHidden, searchQuery, sortStampParts } from './functions.js';
import { riggingListOptionsHeader } from './objects.js';
import PartItem from './PartItem.jsx';

const TableView = (props) => {
  const [partsVisible, setPartsVisible] = useState([]);
  const [scrolledToPrev, setScrolledToPrev] = useState(false);
  const { query } = useQuery();
  const { sortedData } = useSort(
    searchQuery(props.data, props.searchQuery),
    {
      ignoreURL: false,
      sortOrder: {
        curSort: 'id',
        id: 'desc',
      },
      sortOptions: [{ value: 'id desc', text: 'id' }],
    },
    [props.data],
  );

  useEffect(() => {
    if (query.get('rig'))
      return setPartsVisible([...checkPart(query.get('rig'))]);
  }, []);

  useEffect(() => {
    // console.log(props.data);
    let temp = [];
    props.data.map((element) => {
      if (props.cachedItems[element.id] === undefined) {
        props.setCachedItems({
          ...props.cachedItems,
          [element.id]: true,
        });
      }
      return temp.push({
        id: element.id,
        hidden:
          props.cachedItems[element.id] !== undefined
            ? props.cachedItems[element.id]
            : true,
      });
    });
    setPartsVisible([...temp]);
  }, [props.data]);

  const checkPart = (index) => {
    index = Number.parseInt(index);
    return partsVisible.map((element) => {
      if (element.id == index) {
        props.setCachedItems({
          ...props.cachedItems,
          [index]: !element.hidden,
        });
        return {
          id: index,
          hidden: !element.hidden,
        };
      }
      return element;
    });
  };

  const handleClickStamp = (event) => {
    const id = event.currentTarget.getAttribute('id');
    !event.target.className.includes('main-window__status_select') &&
      !event.target.className.includes('main-window__action') &&
      !event.target.className.includes('main-window__img') &&
      setPartsVisible([...checkPart(id)]);
  };

  const prevRef = useCallback(
    (node) => {
      const rig = Number.parseInt(query.get('rig'));
      const part = Number.parseInt(query.get('part'));

      if (
        !props.data ||
        scrolledToPrev ||
        props.data.find((item) => item.id === rig) === undefined
      )
        return;

      if (node !== null && props.data) {
        setTimeout(() => scrollToElement(node, -200), 600);
        setScrolledToPrev(true);
      }
    },
    [props.data],
  );

  return (
    <div className="rigging-tableview">
      <div className="main-window__list main-window__list--full">
        <div className="main-window__list-item main-window__list-item--header">
          <span>ID</span>
          <span>Артикул</span>
          <span>Название</span>
          <span>Комментарий</span>
          <span>Статус</span>
          <div className="main-window__table-actions"></div>
        </div>
        {props.isLoading && (
          <PlaceholderLoading
            itemClassName="main-window__list-item"
            minHeight="35px"
            items={5}
          />
        )}
        {sortedData.map((stamp) => (
          <>
            <div
              id={stamp.id}
              ref={
                Number.parseInt(query.get('rig')) === stamp.id &&
                query.get('part') === null
                  ? prevRef
                  : null
              }
              className={
                'main-window__list-item main-window__list-item--' +
                (stamp.color || 'production')
              }
              onClick={handleClickStamp}
            >
              <span>
                <div className="main-window__mobile-text">ID:</div>
                {stamp.id}
              </span>
              <span>
                <div className="main-window__mobile-text">Артикул:</div>
                {stamp.number}
              </span>
              <span>
                <div className="main-window__mobile-text">Название:</div>
                {stamp.name}
              </span>
              <span title={stamp.comment}>
                <div className="main-window__mobile-text">Комментарий:</div>
                {stamp.comment}
              </span>
              <span
                className={
                  'main-window__list-item--' +
                  rigStatuses[stamp.color || 'production'].className
                }
              >
                <div className="main-window__mobile-text">Статус заявки:</div>
                <select
                  id={stamp.id}
                  className="main-window__status_select"
                  value={stamp.color || 'production'}
                  onChange={({ target }) => {
                    return editStampColor(
                      {
                        color: target.value,
                      },
                      stamp.id,
                    ).then(() => props.loadData());
                  }}
                >
                  {Object.values(rigStatuses).map((status) => (
                    <option value={status.className}>{status.name}</option>
                  ))}
                </select>
              </span>
              <TableActions
                actionsList={[
                  {
                    link: `${rigTypes[props.type].redirectURL}/edit/${
                      stamp.id
                    }`,
                    title: 'Редактирование',
                    imgSrc: editIcon,
                  },
                  {
                    customElement: (
                      <DeleteItemAction
                        onClick={() => props.deleteItem(stamp.id)}
                        icon={deleteIcon}
                        title="Удалить"
                      />
                    ),
                  },
                ]}
              />
            </div>
            <div
              id={stamp.id}
              className={`main-window__list-options ${
                !isPartHidden(partsVisible, stamp.id) ||
                Number.parseInt(query.get('rig')) === stamp.id
                  ? ''
                  : 'main-window__list-options--hidden'
              }`}
            >
              <div className="main-window__list">
                {riggingListOptionsHeader}
                {sortStampParts(stamp.stampParts).map((part) => {
                  const ref =
                    Number.parseInt(query.get('rig')) === stamp.id &&
                    Number.parseInt(query.get('part')) === part.id
                      ? prevRef
                      : null;
                  return (
                    <PartItem
                      part={part}
                      refItem={ref}
                      loadData={props.loadData}
                      type={props.type}
                      stampId={stamp.id}
                    />
                  );
                })}
              </div>
            </div>
          </>
        ))}
      </div>
    </div>
  );
};

export default withRouter(TableView);
