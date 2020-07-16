import React, { useState, useEffect, useContext } from 'react'
import './EtceteraPage.scss'
import '../../../utils/MainWindow/MainWindow.scss'
import { Link } from 'react-router-dom'
import { UserContext } from '../../../App.js'

import tasksImg from '../../../../../../../assets/sidemenu/tasks.svg'
import employeesImg from '../../../../../../../assets/sidemenu/employee.svg'
import wrenchImg from '../../../../../../../assets/sidemenu/wrench.svg'
import truckImg from '../../../../../../../assets/sidemenu/truck.svg'
import priceListImg from '../../../../../../../assets/sidemenu/price.svg'
import clientImg from '../../../../../../../assets/sidemenu/client.svg'
import contractImg from '../../../../../../../assets/sidemenu/contract.svg'
import listImg from '../../../../../../../assets/sidemenu/list.svg'
import boxImg from '../../../../../../../assets/sidemenu/box.svg'
import screwImg from '../../../../../../../assets/sidemenu/screw.svg'
import feedbackImg from '../../../../../../../assets/sidemenu/feedback.svg'
import moreImg from '../../../../../../../assets/sidemenu/more.svg'
import playListImg from '../../../../../../../assets/sidemenu/play_list.svg'
import supplierIcon from '../../../../../../../assets/sidemenu/supplier_icon.svg'
import workTimeIcon from '../../../../../../../assets/sidemenu/work_time_icon.svg'
import graphIcon from '../../../../../../../assets/graph-icon.svg'

import Button from '../../../utils/Form/Button/Button.jsx'

const EtceteraPage = (props) => {
  const userContext = useContext(UserContext)

  useEffect(() => {
    document.title = 'Разное'
  }, [])

  const [menuItems, setMenuItems] = useState({
    Клиенты: [
      {
        linkTo: '/clients/categories',
        name: 'Категории клиентов',
        access: ['ROLE_ADMIN'],
        icon: clientImg,
      },
    ],
    'Учет времени': [
      {
        linkTo: '/work-management',
        name: 'Учет времени',
        access: ['ROLE_ADMIN'],
        icon: workTimeIcon,
      },
      {
        linkTo: '/report-table',
        name: 'Интерактивный табель',
        access: ['ROLE_ADMIN'],
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
        name: 'Список оснастки',
        access: ['ROLE_ADMIN'],
        icon: tasksImg,
      },
      {
        linkTo: '/work-list',
        name: 'Список работ',
        access: ['ROLE_ADMIN', 'ROLE_DISPATCHER', 'ROLE_ENGINEER'],
        icon: tasksImg,
      },
    ],
    Статистика: [
      {
        linkTo: '/graphs',
        name: 'Графики',
        access: ['ROLE_ADMIN'],
        icon: graphIcon,
      },
    ],
  })

  return (
    <div className="etcetera-page">
      <div className="main-window">
        <div className="main-window__title">Остальное</div>
        <div className="etcetera-page__buttons">
          {console.log(Object.entries(menuItems))}
          {Object.entries(menuItems).map((category) => {
            return (
              <div className="excetera-page__category">
                <span className="excetera-page__category-name">
                  {category[0]}
                </span>
                {category[1].map((item) => {
                  if (userContext.userHasAccess(item.access)) {
                    return (
                      <Button
                        onClick={() => {
                          props.history.push(item.linkTo)
                        }}
                        imgSrc={item.icon}
                        text={item.name}
                        className="main-window__button"
                      />
                    )
                  }
                })}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default EtceteraPage
