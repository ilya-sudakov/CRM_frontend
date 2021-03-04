import { useState, useEffect } from 'react';
import SearchBar from '../../../../SearchBar/SearchBar.jsx';
import './RiggingWorkshop.scss';
import TableView from '../TableView/TableView.jsx';
import {
  getStampById,
  deletePartsFromStamp,
  deleteStamp,
  getStampsByStatus,
} from '../../../../../../utils/RequestsAPI/Rigging/Stamp.jsx';
import FloatingPlus from '../../../../../../utils/MainWindow/FloatingPlus/FloatingPlus.jsx';
import ControlPanel from '../../../../../../utils/MainWindow/ControlPanel/ControlPanel.jsx';
import useTitleHeader from '../../../../../../utils/hooks/uiComponents/useTitleHeader.js';
import { filterRigItems } from './functions.js';

const RiggingWorkshop = (props) => {
  const [rigItems, setRigItems] = useState({
    stamp: [],
    machine: [],
    pressForm: [],
    parts: [],
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const { curPage, setCurPage, titleHeader } = useTitleHeader(
    undefined,
    [
      {
        pageTitle: 'Активные',
        pageName: 'Активные',
      },
      !props.userHasAccess(['ROLE_WORKSHOP']) && {
        pageTitle: 'Завершено',
        pageName: 'Завершено',
      },
    ],
    'Активные',
  );

  useEffect(() => {
    document.title = 'Штампы';
    const abortController = new AbortController();
    if (
      isLoaded !== props.type &&
      !isLoading &&
      rigItems[props.type].length === 0
    ) {
      setCurPage('Активные');
      loadRigItems(abortController.signal);
    }
    return function cancel() {
      abortController.abort();
    };
  }, [props.type]);

  const loadRigItems = (signal) => {
    setIsLoading(true);
    getStampsByStatus(props.type, signal)
      .then((res) => res.json())
      .then((res) => {
        setIsLoaded(props.type);
        setRigItems((rigItems) => ({
          ...rigItems,
          [props.type]: res,
        }));
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
      });
  };

  const deleteItem = (id) => {
    getStampById(id)
      .then((res) => res.json())
      .then((res) =>
        Promise.all(
          res.stampParts.map((item) => deletePartsFromStamp(item.id)),
        ),
      )
      .then(() => deleteStamp(id))
      .then(() => loadRigItems());
  };

  return (
    <div className="rigging-workshop">
      <FloatingPlus
        linkTo="/dispatcher/rigging/stamp/new"
        visibility={['ROLE_ADMIN', 'ROLE_WORKSHOP', 'ROLE_ENGINEER']}
      />
      <SearchBar
        fullSize
        setSearchQuery={setSearchQuery}
        placeholder="Введите здесь запрос для поиска..."
      />
      {titleHeader}
      <ControlPanel
        itemsCount={`Всего: ${rigItems[props.type].length} записей`}
      />
      <TableView
        data={filterRigItems(rigItems[props.type], curPage)}
        searchQuery={searchQuery}
        userHasAccess={props.userHasAccess}
        loadData={loadRigItems}
        deleteItem={deleteItem}
        cachedItems={props.cachedItems}
        setCachedItems={(items) => props.setCachedItems(items)}
        isLoading={isLoading}
        type={props.type}
      />
    </div>
  );
};

export default RiggingWorkshop;
