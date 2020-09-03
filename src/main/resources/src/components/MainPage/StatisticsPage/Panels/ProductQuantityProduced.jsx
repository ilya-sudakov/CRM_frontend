import React, { useState, useEffect } from 'react'
import SmallPanel from './SmallPanel.jsx'
import BoxIcon from '../../../../../../../../assets/sidemenu/box.inline.svg'
import {
  addSpaceDelimiter,
  dateDiffInDays,
} from '../../../../utils/functions.jsx'

const ProductQuantityProduced = (props) => {
  const [stats, setStats] = useState({
    category: 'Кол-во произведенной продукции',
    percentage: 0,
    value: null,
    linkTo: '/work-management',
    isLoaded: false,
    timePeriod: 'От прошлой недели',
    difference: 0,
    renderIcon: () => <BoxIcon className="panel__img panel__img--money" />,
  })

  const getStats = (data) => {
    let prevWeekQuantity = 0
    let curWeekQuantity = 0

    //получаем след. понедельник
    let curMonday = new Date()
    curMonday = new Date(
      curMonday.setDate(
        curMonday.getDate() - ((curMonday.getDay() + 6) % 7) + 7,
      ),
    )

    data.map((workItem) => {
      let productCount = workItem.workControlProduct.reduce(
        (sum, cur) => sum + cur.quantity,
        0,
      )
      //если неделя не текущая, до прибавляем к счетчику пред. недели
      if (
        dateDiffInDays(
          new Date(workItem.year, workItem.month - 1, workItem.day),
          curMonday,
        ) >= 7
      ) {
        prevWeekQuantity += productCount
      } else {
        curWeekQuantity += productCount
      }
    })

    setStats((stats) => ({
      ...stats,
      isLoaded: true,
      value: `${addSpaceDelimiter(curWeekQuantity)} ед.`,
      difference: curWeekQuantity - prevWeekQuantity,
      percentage:
        Math.floor(
          ((curWeekQuantity - prevWeekQuantity) /
            (prevWeekQuantity === 0 ? 1 : prevWeekQuantity)) *
            100 *
            100,
        ) / 100,
    }))
  }

  useEffect(() => {
    if (stats.isLoaded || props.data.length === 0 || props.data === undefined)
      return
    getStats(props.data)
  }, [props.data, stats])

  return <SmallPanel {...stats} />
}

export default ProductQuantityProduced
