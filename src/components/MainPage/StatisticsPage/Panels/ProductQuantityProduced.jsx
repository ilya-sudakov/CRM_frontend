import { useState, useEffect } from 'react';
import SmallPanel from './SmallPanel.jsx';
import BoxIcon from 'Assets/sidemenu/box.inline.svg';
import { addSpaceDelimiter, dateDiffInDays } from 'Utils/functions.jsx';

const ProductQuantityProduced = ({ data, curDate }) => {
  const [stats, setStats] = useState({
    category: 'Кол-во произведенной продукции',
    percentage: 0,
    value: null,
    linkTo: '/work-management',
    isLoaded: false,
    isLoading: false,
    timePeriod: 'От прошлой недели',
    difference: 0,
    renderIcon: <BoxIcon className="panel__img panel__img--default" />,
  });

  const getStats = (data, curDate = new Date()) => {
    setStats((stats) => ({
      ...stats,
      isLoading: true,
      isLoaded: false,
    }));

    let prevWeekQuantity = 0;
    let curWeekQuantity = 0;

    //получаем след. понедельник
    let curMonday = curDate;
    curMonday = new Date(
      curMonday.setDate(
        curMonday.getDate() - ((curMonday.getDay() + 6) % 7) + 7,
      ),
    );

    data.map((workItem) => {
      let productCount = workItem.workControlProduct.reduce(
        (sum, cur) => sum + cur.quantity,
        0,
      );
      //если неделя не текущая, до прибавляем к счетчику пред. недели
      if (
        dateDiffInDays(
          new Date(workItem.year, workItem.month - 1, workItem.day),
          curMonday,
        ) > 7
      ) {
        prevWeekQuantity += productCount;
      } else {
        curWeekQuantity += productCount;
      }
    });

    setStats((stats) => ({
      ...stats,
      isLoaded: true,
      isLoading: false,
      value: `${addSpaceDelimiter(curWeekQuantity)} ед.`,
      difference: curWeekQuantity - prevWeekQuantity,
      percentage:
        Math.floor(
          ((curWeekQuantity - prevWeekQuantity) /
            (prevWeekQuantity === 0 ? 1 : prevWeekQuantity)) *
            100 *
            100,
        ) / 100,
    }));
  };

  useEffect(() => {
    if (
      stats.isLoaded ||
      stats.isLoading ||
      data.length === 0 ||
      data === undefined
    )
      return;
    getStats(data);
  }, [data, stats]);

  //При обновлении тек. даты
  useEffect(() => {
    if (!stats.isLoaded && data.length === 0) return;
    getStats(data);
  }, [curDate]);

  return <SmallPanel {...stats} />;
};

export default ProductQuantityProduced;
