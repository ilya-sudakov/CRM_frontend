import React, { useState, useEffect } from 'react'
import './RiggingList.scss'

import TableView from './TableView/TableView.jsx'
import { getStamp } from '../../../../../utils/RequestsAPI/Rigging/Stamp.jsx'
import { getPressForm } from '../../../../../utils/RequestsAPI/Rigging/PressForm.jsx'
import { getMachine } from '../../../../../utils/RequestsAPI/Rigging/Machine.jsx'
import { getParts } from '../../../../../utils/RequestsAPI/Parts.jsx'

const RiggingList = (props) => {
  const [drafts, setDrafts] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [dataLoaded, setDataLoaded] = useState(false)
  const [statuses, setStatuses] = useState({
    cuttingDimensions: {
      name: 'Распил/Габариты',
      visibility: ['ROLE_ADMIN'],
      active: true,
    },
    milling: {
      name: 'Фрезеровка/Точение',
      visibility: ['ROLE_ADMIN'],
      active: false,
    },
    harding: {
      name: 'Закалка',
      visibility: ['ROLE_ADMIN'],
      active: false,
    },
    grinding: {
      name: 'Шлифовка',
      visibility: ['ROLE_ADMIN'],
      active: false,
    },
    erosion: {
      name: 'Эрозия',
      visibility: ['ROLE_ADMIN'],
      active: false,
    },
  })

  const testData = [
    {
      amount: '1',
      color: 'completed',
      comment: 'Выполнено Лиговка 31.01.20 / Отдано в ЛЭМЗ 03.02.20',
      controll: '-',
      cuttingDimensions: 'Анатолий 10.10.19 -14.11.19 (ЛЭМЗ)',
      drawing: null,
      erosion: 'Глеб 27-30.01.20 (Лиговка)',
      grinding: 'ЛЭМЗ',
      harding: 'ЮЗМЗ 16.12.19',
      id: 86,
      location: 'ЛЭМЗ',
      milling: 'Анатолий 26.11.19',
      name: 'Пуансонодержатель',
      number: 'ТМ_АН-047.002',
      status: {
        current: {
          statusName: 'Распил/Габариты',
          date: new Date(),
          worker: 'Борис',
          comment: 'Комментарий',
        },
        cuttingDimensions: {
          statusName: 'Распил/Габариты',
          date: new Date(),
          worker: 'Борис',
          comment: 'Комментарий',
        },
        milling: {
          statusName: 'Фрезеровка/Точение',
          date: new Date(),
          worker: 'Борис',
          comment: 'Комментарий',
        },
        harding: {
          statusName: 'Закалка',
          date: new Date(),
          worker: 'Борис',
          comment: 'Комментарий',
        },
        grinding: {
          statusName: 'Шлифовка',
          date: new Date(),
          worker: 'Борис',
          comment: 'Комментарий',
        },
        erosion: {
          statusName: 'Эрозия',
          date: new Date(),
          worker: 'Борис',
          comment: 'Комментарий',
        },
      },
    },
    {
      amount: '1',
      color: 'completed',
      comment: 'Выполнено Лиг. 20.04.19',
      controll: '-',
      cuttingDimensions: 'Лепс. Володя 01.03.19',
      drawing: null,
      erosion: '-',
      grinding: 'Леша 11.03.19',
      harding: '-',
      id: 43,
      location: 'Лепсари',
      milling: 'Лиговка',
      name: 'Плита верхняя',
      number: 'ТМ_АН-039.001',
      status: {
        current: {
          statusName: 'Распил/Габариты',
          date: new Date(),
          worker: 'Борис',
          comment: 'Комментарий',
        },
        cuttingDimensions: {
          statusName: 'Распил/Габариты',
          date: new Date(),
          worker: 'Борис',
          comment: 'Комментарий',
        },
        milling: {
          statusName: 'Фрезеровка/Точение',
          date: new Date(),
          worker: 'Борис',
          comment: 'Комментарий',
        },
        harding: {
          statusName: 'Закалка',
          date: new Date(),
          worker: 'Борис',
          comment: 'Комментарий',
        },
        grinding: {
          statusName: 'Шлифовка',
          date: new Date(),
          worker: 'Борис',
          comment: 'Комментарий',
        },
        erosion: {
          statusName: 'Эрозия',
          date: new Date(),
          worker: 'Борис',
          comment: 'Комментарий',
        },
      },
    },
  ]

  async function loadDrafts() {
    let newDrafts = []
    setIsLoading(true)
    getStamp()
      .then((response) => response.json())
      .then((response) => {
        // console.log(response);
        response.map((item) => {
          return item.stampParts.map((stamp) => {
            newDrafts.push({
              ...stamp,
              type: 'Stamp',
            })
          })
        })
        // console.log(newDrafts);
        setDrafts([...newDrafts])
      })
      .then(() => {
        getPressForm()
          .then((response) => response.json())
          .then((response) => {
            // console.log(response);
            response.map((item) => {
              return item.pressParts.map((stamp) => {
                newDrafts.push({
                  ...stamp,
                  type: 'Press',
                })
              })
            })
            return setDrafts([...newDrafts])
          })
      })
      .then(() => {
        getMachine()
          .then((response) => response.json())
          .then((response) => {
            // console.log(response)
            response.map((item) => {
              return item.benchParts.map((stamp) => {
                newDrafts.push({
                  ...stamp,
                  type: 'Bench',
                })
              })
            })
            setDrafts([...newDrafts])
            // console.log(newDrafts)
          })
      })
      .then(() => {
        getParts()
          .then((res) => res.json())
          .then((res) => {
            // console.log(res)
            res.map((item) => {
              return item.detailParts.map((stamp) => {
                newDrafts.push({
                  ...stamp,
                  type: 'Detail',
                })
              })
            })
            setDrafts([...newDrafts])
            console.log(newDrafts)
          })
      })
      .catch((error) => {
        console.log(error)
        setIsLoading(false)
      })
  }

  useEffect(() => {
    !dataLoaded && loadDrafts()
  }, [])

  return (
    <div className="rigging-list">
      <div className="main-window">
        <div className="main-window__title">Список оснастки</div>
        <div className="main-window__status-panel">
          {Object.entries(statuses).map((status) => (
            <div
              className={`main-window__button ${
                !status[1].active ? 'main-window__button--inverted' : ''
              } main-window__list-item--${status[0]}`}
              onClick={() => {
                let temp = statuses
                Object.entries(statuses).map((status) => {
                  temp[status[0]] = {
                    ...temp[status[0]],
                    active: false,
                  }
                })
                temp[status[0]] = {
                  ...status[1],
                  active: !status[0].active,
                }
                setStatuses({ ...temp })
              }}
            >
              {status[1].name}
            </div>
          ))}
        </div>
        <TableView
          //  data={testData}
          data={drafts}
        />
      </div>
    </div>
  )
}

export default RiggingList
