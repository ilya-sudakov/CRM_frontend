import { useEffect, useState } from 'react';
import TitleHeader from 'Components/MainWindow/TitleHeader/TitleHeader.jsx';

const useTitleHeader = (
  title,
  menuItems,
  initPage,
  type = 'main-window',
  updates = [],
) => {
  const [curPage, setCurPage] = useState(initPage);

  useEffect(() => {}, [...updates, curPage]);

  const titleHeader = (
    <TitleHeader
      title={title}
      menuItems={menuItems}
      curPage={curPage}
      setCurPage={setCurPage}
      type={type}
    />
  );

  return { titleHeader, curPage, setCurPage };
};

export default useTitleHeader;
