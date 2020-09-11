import React from 'react'
import DatePicker from 'react-datepicker'
import ru from 'date-fns/locale/ru'
import 'react-datepicker/dist/react-datepicker.css'
import '../../../../../../../node_modules/react-datepicker/dist/react-datepicker.css'
import './InputDate.scss'

const InputDate = (props) => {
  return (
    <div className="input_date">
      <div className="input_date__input">
        <div className="input_date__input_name">
          {props.inputName + (props.required ? '*' : '')}
        </div>
        <div
          className={
            props.error === true
              ? 'input_date__input_field input_date__input_field--error'
              : 'input_date__input_field'
          }
        >
          <DatePicker
            {...props}
            onChange={props.handleDateChange}
            disabledKeyboardNavigation
            dateFormat={props.showMonthYearPicker ? 'MM.yyyy' : 'dd.MM.yyyy'}
            locale={ru}
          />
        </div>
      </div>
      {props.error === true && (
        <div
          className="input_date__error"
          onClick={
            props.setErrorsArr
              ? () =>
                  props.setErrorsArr({
                    ...props.errorsArr,
                    [props.name]: false,
                  })
              : null
          }
        >
          Поле не заполнено!
        </div>
      )}
    </div>
  )
}

export default InputDate
