import { useEffect, useContext } from 'react';
import './EtceteraPage.scss';
import 'Components/MainWindow/MainWindow.scss';
// import { Link } from 'react-router-dom'
import UserContext from '../../../App.js';

import tasksImg from 'Assets/sidemenu/tasks.svg';
import clientImg from 'Assets/sidemenu/client.svg';
import listImg from 'Assets/sidemenu/list.svg';
import boxImg from 'Assets/sidemenu/box.svg';
import playListImg from 'Assets/sidemenu/play_list.svg';
import supplierIcon from 'Assets/sidemenu/supplier_icon.svg';
import workTimeIcon from 'Assets/sidemenu/work_time_icon.svg';
// import graphIcon from 'Assets/graph-icon.svg';
import statsIcon from 'Assets/statistics/stats-alt.svg';

import Button from 'Components/Form/Button/Button.jsx';

const EtceteraPage = (props) => {
  const userContext = useContext(UserContext);

  useEffect(() => {
    document.title = 'Разное';
  }, []);

  const menuItems = {
    Клиенты: [
      {
        linkTo: '/clients/categories',
        name: 'Категории клиентов',
        access: ['ROLE_ADMIN'],
        icon: clientImg,
      },
      {
        linkTo: '/clients/categories',
        name: 'Категории поставщиков',
        access: ['ROLE_ADMIN'],
        icon: supplierIcon,
      },
    ],
    'Учет времени': [
      {
        linkTo: '/work-management',
        name: 'Отчет производства',
        access: [
          'ROLE_ADMIN',
          'ROLE_WORKSHOP',
          'ROLE_DISPATCHER',
          'ROLE_ENGINEER',
          'ROLE_MANAGER',
        ],
        icon: workTimeIcon,
      },
      {
        linkTo: '/report-table',
        name: 'Табель',
        access: [
          'ROLE_ADMIN',
          'ROLE_DISPATCHER',
          'ROLE_MANAGER',
          'ROLE_WORKSHOP',
          'ROLE_ENGINEER',
        ],
        icon: tasksImg,
      },
    ],
    Производство: [
      {
        linkTo: '/packaging',
        name: 'Упаковка',
        access: ['ROLE_ADMIN'],
        icon: boxImg,
      },
      {
        linkTo: '/rigging-list',
        name: 'Очередь инстр. производства',
        access: ['ROLE_ADMIN', 'ROLE_WORKSHOP'],
        icon: listImg,
      },
      {
        linkTo: '/work-list',
        name: 'Виды работ',
        access: ['ROLE_ADMIN', 'ROLE_DISPATCHER', 'ROLE_ENGINEER'],
        icon: playListImg,
      },
    ],
    Статистика: [
      {
        linkTo: '/statistics',
        name: 'Статистика',
        access: ['ROLE_ADMIN'],
        icon: statsIcon,
      },
    ],
  };

  return (
    <div className="etcetera-page">
      <div className="main-window">
        <div className="main-window__header main-window__header--full">
          <div className="main-window__title">Остальное</div>
        </div>
        <div className="etcetera-page__buttons">
          {/* {console.log(Object.entries(menuItems))} */}
          {Object.entries(menuItems).map((category, index) => {
            return (
              <div className="excetera-page__category" key={index}>
                <span className="excetera-page__category-name">
                  {category[0]}
                </span>
                {category[1].map((item) => {
                  if (userContext.userHasAccess(item.access)) {
                    return (
                      <Button
                        onClick={() => {
                          props.history.push(item.linkTo);
                        }}
                        imgSrc={item.icon}
                        text={item.name}
                        className="main-window__button"
                      />
                    );
                  }
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default EtceteraPage;
