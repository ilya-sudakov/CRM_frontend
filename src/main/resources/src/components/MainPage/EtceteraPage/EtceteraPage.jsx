import React, { useState, useEffect } from 'react'
import './EtceteraPage.scss'
import '../../../utils/MainWindow/MainWindow.scss'
import { Link } from 'react-router-dom'

const EtceteraPage = (props) => {
  useEffect(() => {
    document.title = 'Разное'
  }, [])

  const [menuItems, setMenuItems] = useState([
    {
      linkTo: '/clients/categories',
      name: 'Категории клиентов',
    },
    {
      linkTo: '/work-management',
      name: 'Учет времени',
    },
    {
      linkTo: '/graphs',
      name: 'Графики',
    },
    {
      linkTo: '/packaging',
      name: 'Упаковка',
    },
    {
      linkTo: '/report-table',
      name: 'Интерактивный табель',
    },
  ])

  return (
    <div className="etcetera-page">
      <div className="main-window">
        <div className="main-window__title">Остальное</div>
        <div className="etcetera-page__buttons">
          {menuItems.map((item) => {
            return (
              <Link to={item.linkTo} className="main-window__button">
                {item.name}
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default EtceteraPage
