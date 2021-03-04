import { useEffect, useState } from 'react';
import TitleHeader from '../../MainWindow/TitleHeader/TitleHeader.jsx';

const useTitleHeader = (title, menuItems, initPage, updates = []) => {
  const [curPage, setCurPage] = useState(initPage);

  useEffect(() => {}, [...updates, curPage]);

  const titleHeader = (
    <TitleHeader
      title={title}
      menuItems={menuItems}
      curPage={curPage}
      setCurPage={setCurPage}
    />
  );

  return { titleHeader, curPage, setCurPage };
};

export default useTitleHeader;
