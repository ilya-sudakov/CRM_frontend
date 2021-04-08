import { useEffect, useState } from 'react';
import Table from 'Components/Table/Table.jsx';

const useTable = ({
  data,
  columns,
  actions,
  isLoading,
  nestedTable,
  onClick,
  options,
  dependancy = [],
}) => {
  const [nestedItems, setNestedItems] = useState([]);

  useEffect(() => {
    if (!data || data.length === 0 || isLoading) return;
    const hiddenItems = data.map((item, index) => ({
      ...item,
      isHidden: nestedItems[index]?.isHidden ?? true,
    }));
    setNestedItems([...hiddenItems]);
  }, [data, ...dependancy]);

  const handleClickOnRow = (item, index) => {
    let temp = nestedItems;
    temp.splice(index, 1, { ...item, isHidden: !nestedItems[index].isHidden });
    console.log(nestedItems, temp, item);
    setNestedItems([...temp]);
    onClick && onClick(item, index);
  };

  const table = (
    <Table
      columns={columns}
      data={nestedItems}
      loading={{ isLoading }}
      actions={actions}
      onClick={handleClickOnRow}
      options={options}
      nestedTable={
        nestedTable
          ? {
              columns: nestedTable.columns,
              actions: nestedTable.actions,
              loading: { isLoading },
              fieldName: nestedTable.fieldName,
            }
          : undefined
      }
    />
  );

  return [table];
};

export default useTable;
