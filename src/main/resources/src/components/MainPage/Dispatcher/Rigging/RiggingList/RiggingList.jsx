import React, { useState, useEffect } from 'react'
import './RiggingList.scss'

import TableView from './TableView/TableView.jsx'
import { getStamp } from '../../../../../utils/RequestsAPI/Rigging/Stamp.jsx'
import { getPressForm } from '../../../../../utils/RequestsAPI/Rigging/PressForm.jsx'
import { getMachine } from '../../../../../utils/RequestsAPI/Rigging/Machine.jsx'
import { getParts } from '../../../../../utils/RequestsAPI/Parts.jsx'

const RiggingList = (props) => {
  const [drafts, setDrafts] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [dataLoaded, setDataLoaded] = useState(false)
  const [statuses, setStatuses] = useState({
    cuttingDimensions: {
      name: 'Распил/Габариты',
      visibility: ['ROLE_ADMIN'],
      active: true,
      previous: null,
    },
    milling: {
      name: 'Фрезеровка/Точение',
      visibility: ['ROLE_ADMIN'],
      active: false,
      previous: 'cuttingDimensions',
    },
    harding: {
      name: 'Закалка',
      visibility: ['ROLE_ADMIN'],
      active: false,
      previous: 'milling',
    },
    grinding: {
      name: 'Шлифовка',
      visibility: ['ROLE_ADMIN'],
      active: false,
      previous: 'harding',
    },
    erosion: {
      name: 'Эрозия',
      visibility: ['ROLE_ADMIN'],
      active: false,
      previous: 'grinding',
    },
  })

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
            setDataLoaded(true)
            setDrafts([...newDrafts])
            // console.log(newDrafts)
          })
      })
      .catch((error) => {
        console.log(error)
        setIsLoading(false)
      })
  }

  useEffect(() => {
    document.title = 'Список оснастки'
    if (dataLoaded) {
      //Временное решение пока нет бэка
      let temp = []
      Object.entries(statuses).map((status) => {
        return temp.push(
          ...drafts.filter((draft) => {
            if (
              status[1].active &&
              draft[status[0]] === '' &&
              (draft[status[1].previous] !== '' || status[1].previous === null)
            ) {
              return true
            }
            return false
          }),
        )
      })
      console.log(temp)
      setFilteredData([...temp])
    }

    if (!dataLoaded && !isLoading) {
      loadDrafts()
    }
  }, [dataLoaded, drafts, statuses])

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
          // data={drafts}
          data={filteredData}
        />
      </div>
    </div>
  )
}

export default RiggingList
