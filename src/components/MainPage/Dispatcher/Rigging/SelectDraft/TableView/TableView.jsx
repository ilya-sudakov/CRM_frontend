import { useEffect } from 'react';
import './TableView.scss';
import 'Components/MainWindow/MainWindow.scss';
import Table from 'Components/Table/Table.jsx';

const TableView = ({
  isLoading,
  searchQuery,
  drafts = [],
  setShowWindow,
  closeWindow,
  selectDraft,
  setCloseWindow,
}) => {
  const search = () => {
    let re = /[.,\s\-_]/gi;
    const query = searchQuery.toLowerCase();
    let searchArr = query.split(' ');
    return drafts.filter((item) => {
      let check = true;
      searchArr.map((searchWord) => {
        if (
          item.name.toLowerCase().includes(searchWord.toLowerCase()) ===
            false &&
          item.number
            .toLowerCase()
            .replace(re, '')
            .includes(query.replace(re, '')) === false
        )
          check = false;
      });
      if (check === true) {
        return true;
      } else {
        return false;
      }
    });
  };

  const partTypes = {
    Bench: 'Станок',
    Stamp: 'Штамп',
    Press: 'Пресс-форма',
    Detail: 'Деталь',
  };

  const locations = {
    lemz: 'ЦехЛЭМЗ',
    lepsari: 'ЦехЛепсари',
    ligovskiy: 'ЦехЛиговский',
  };

  useEffect(() => {
    setShowWindow(false);
  }, [closeWindow]);

  const columns = [
    { text: 'Артикул', value: 'number' },
    { text: 'Название', value: 'name' },
    {
      text: 'Местоположение',
      value: 'location',
      formatFn: ({ location }) => locations[location],
    },
    { text: 'Тип', value: 'comment', formatFn: ({ type }) => partTypes[type] },
  ];
  return (
    <Table
      data={search()}
      columns={columns}
      options={{ fullSize: true }}
      loading={{ isLoading }}
      onClick={(item) => {
        console.log(item);
        selectDraft(item.id, item.name, item.type, item.number);
        setCloseWindow(!closeWindow);
      }}
    />
  );
};

export default TableView;
