import React, { useEffect, useState } from 'react';
import './SelectWorkHours.scss';
import { formatDateString } from '../../../../../utils/functions.jsx';

const SelectWorkHours = (props) => {
  useEffect(() => {}, [props.workArray]);

  const handleWorkHoursChange = (event, index, item) => {
    let value;
    if (event.target.value > 12) {
      value = 12;
    } else {
      if (event.target.value === '') {
        value = 0;
      } else {
        value = Number.parseFloat(event.target.value);
      }
    }
    let curSum = props.workArray.reduce((sum, cur, curIndex) => {
      if (index === curIndex) {
        return sum;
      } else {
        return sum + Number.parseFloat(cur.hours);
      }
    }, 0);
    if (curSum + value > 12) {
      value = Math.floor((12 - curSum) * 10) / 10;
    }
    let temp = props.workArray;
    temp.splice(index, 1, {
      ...item,
      hours: value,
    });
    props.onChange([...temp]);
  };

  return (
    <div className="select-work-hours">
      <div className="select-work-hours__timeline">
        <div className="select-work-hours__wrapper">
          <div className="select-work-hours__info">
            {formatDateString(props.date)}
          </div>
          <div className="select-work-hours__info select-work-hours__info--inverted">
            Всего часов:{' '}
            {Math.floor(
              props.workArray.reduce(
                (sum, cur) => sum + Number.parseFloat(cur.hours),
                0,
              ) * 10,
            ) / 10}
          </div>
        </div>
        <div className="select-work-hours__line"></div>
      </div>
      <div className="select-work-hours__list">
        {props.workArray.map((item, index) => {
          return (
            <div className="select-work-hours__list-item">
              <div className="select-work-hours__circle"></div>
              <span className="select-work-hours__work-name">
                {item.workName}
              </span>
              {item.product.length > 0 || item.draft.length > 0 ? (
                <ul className="select-work-hours__products">
                  {item.product.map((product) => {
                    return (
                      <li>
                        {`${product.name} - ${product.quantity} шт.`}
                        {/* <span>{product.name}</span>
                      <div>({product.quantity} шт.)</div> */}
                      </li>
                    );
                  })}
                  {item.draft.map((draft) => {
                    return (
                      <li>
                        {`${draft.name} - ${draft.quantity} шт.`}
                        {/* <span>{draft.name}</span>
                      <div>({draft.quantity} шт.)</div> */}
                      </li>
                    );
                  })}
                </ul>
              ) : null}
              <div className="select-work-hours__input">
                <span>Часы* </span>
                <input
                  type="number"
                  placeholder="Введите часы..."
                  value={item.hours.toString()}
                  onChange={(event) =>
                    handleWorkHoursChange(event, index, item)
                  }
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SelectWorkHours;
