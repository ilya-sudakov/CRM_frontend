import React, { useEffect, useState, useContext } from 'react';
import './PartsStatistic.scss';
import { createGraph, loadCanvas } from '../../../../../../utils/graphs.js';
import chevronDownSVG from '../../../../../../../assets/tableview/chevron-down.svg';
import TableLoading from '../../../../../../utils/TableView/TableLoading/TableLoading.jsx';
import { sortByField } from '../../../../../../utils/sorting/sorting';
import ProductsStatisticsList from './ProductsStatisticsList.jsx';
import UserContext from '../../../../../../App.js';

const PartsStatistic = (props) => {
  const [graph, setGraph] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [canvasLoaded, setCanvasLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  // const originalColor = '029b09' // ? green color, but works for big amount of elements
  const userContext = useContext(UserContext);
  const originalColor = '00a3a2';
  const [curPage, setCurPage] = useState('Продукция');
  const workshopsSwitch = {
    ЦехЛЭМЗ: 'ROLE_LEMZ',
    ЦехЛепсари: 'ROLE_LEPSARI',
    ЦехЛиговский: 'ROLE_LIGOVSKIY',
  };
  const filterWorkshops = (data) => {
    return data.filter((part) => {
      if (userContext.userHasAccess(['ROLE_ADMIN'])) {
        return true;
      } else {
        return userContext.userHasAccess([
          workshopsSwitch[part.product.productionLocation],
        ]);
      }
    });
  };

  const sortWorkshops = (data) => {
    return sortByField(data, {
      fieldName: 'quantity',
      direction: 'desc',
    });
  };

  const defaultOptions = {
    maintainAspectRatio: false,
    responsive: true,
    cornerRadius: 2.5,
    fullCornerRadius: false,
    animation: {
      easing: 'easeInOutCirc',
    },
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
          gridLines: {
            display: false,
          },
          scaleLabel: {
            display: false,
            labelString: 'Название',
            fontStyle: 'italic',
          },
        },
      ],
      xAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
          scaleLabel: {
            display: true,
            labelString: 'Количество (шт.)',
            fontStyle: 'italic',
          },
        },
      ],
    },
  };

  const optionsProducts = {
    type: 'horizontalBar',
    data: {
      labels: [
        ...sortWorkshops(filterWorkshops(Object.values(props.data))).map(
          (product) => product.name,
        ),
      ],
      datasets: [
        {
          barThickness: 'flex',
          label: 'Количество ед. продукции',
          backgroundColor: [
            ...filterWorkshops(Object.values(props.data)).map(
              () => '#' + originalColor,
            ),
          ],
          data: [
            ...sortWorkshops(filterWorkshops(Object.values(props.data))).map(
              (product) => product.quantity,
            ),
          ],
        },
      ],
    },
    options: defaultOptions,
  };

  const optionsDrafts = {
    type: 'horizontalBar',
    data: {
      labels: [...sortWorkshops(props.drafts).map((product) => product.name)],
      datasets: [
        {
          barThickness: 'flex',
          label: 'Количество ед. чертежей',
          backgroundColor: [...props.drafts.map(() => '#' + originalColor)],
          data: [
            ...sortWorkshops(props.drafts).map((product) => product.quantity),
          ],
        },
      ],
    },
    options: defaultOptions,
  };

  useEffect(() => {
    setIsLoading(true);
    if (
      filterWorkshops(Object.values(props.data)).length > 0 ||
      props.drafts.length > 0
    ) {
      setIsLoading(true);
      if (!canvasLoaded) {
        console.log('loading canvas');
        loadCanvas('main-window__chart-wrapper', 'main-window__chart');
        setCanvasLoaded(true);
      }
      setTimeout(() => {
        if (
          (window.innerWidth ||
            document.documentElement.clientWidth ||
            document.body.clientWidth) > 768
        ) {
          setIsVisible(true);
        }
        canvasLoaded && graph.destroy();
        setGraph(
          createGraph(
            curPage === 'Продукция' ? optionsProducts : optionsDrafts,
          ),
        );
        setIsLoading(false);
      }, 150);
    } else {
      setIsVisible(false);
      canvasLoaded && graph.destroy();
      setIsLoading(false);
    }
  }, [props.drafts, curPage]);

  const getMenuItem = (name) => {
    return (
      <div
        className={`main-window__item ${
          curPage === name ? 'main-window__item--active' : ''
        }`}
        onClick={() => setCurPage(name)}
      >
        {name}
      </div>
    );
  };

  return (
    <div
      className="parts-statistic"
      style={{
        paddingBottom: !isVisible && 0,
      }}
    >
      <div
        className="main-window__title"
        title={isVisible ? 'Свернуть' : 'Развернуть'}
        onClick={() => {
          return setIsVisible(!isVisible);
        }}
      >
        Отчет производства
        <img
          className={`main-window__img ${
            !isVisible ? '' : 'main-window__img--rotated'
          }`}
          src={chevronDownSVG}
        />
      </div>
      <div
        className={`main-window__header ${
          isVisible ? '' : 'main-window__header--hidden'
        }`}
      >
        <div className="main-window__menu">
          {getMenuItem('Продукция')}
          {getMenuItem('Чертежи')}
        </div>
      </div>
      <div
        className={
          isVisible
            ? 'parts-statistic__wrapper'
            : 'parts-statistic__wrapper parts-statistic__wrapper--hidden'
        }
      >
        <TableLoading isLoading={props.isLoading} />
        <div
          className="main-window__chart-wrapper"
          style={{
            height: `${
              curPage === 'Продукция'
                ? filterWorkshops(Object.values(props.data)).length * 50
                : props.drafts.length * 50
            }px`,
          }}
        ></div>
        <ProductsStatisticsList
          data={filterWorkshops(Object.values(props.data))}
          isLoading={isLoading}
          isHidden={curPage !== 'Продукция'}
        />
        <ProductsStatisticsList
          data={props.drafts}
          isLoading={isLoading}
          isHidden={curPage !== 'Чертежи'}
        />
      </div>
    </div>
  );
};

export default PartsStatistic;
