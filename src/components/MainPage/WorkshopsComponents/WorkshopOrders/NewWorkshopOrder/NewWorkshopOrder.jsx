import React, { useState, useEffect } from 'react';
import './NewWorkshopOrder.scss';
import '../../../../../utils/Form/Form.scss';
import InputText from '../../../../../utils/Form/InputText/InputText.jsx';
import InputDate from '../../../../../utils/Form/InputDate/InputDate.jsx';
import SelectItems from '../../../../../utils/Form/SelectItems/SelectItems.jsx';
import {
  addOrder,
  addProductToOrder,
} from '../../../../../utils/RequestsAPI/Workshop/Orders.jsx';
import Button from '../../../../../utils/Form/Button/Button.jsx';
import { workshops } from '../../workshopVariables';
import useForm from '../../../../../utils/hooks/useForm';
import { getWorkshopOrdersDefaultInputs } from '../../functions';

const NewWorkshopOrder = (props) => {
  const {
    handleInputChange,
    formInputs,
    formErrors,
    setFormErrors,
    formIsValid,
    errorWindow,
  } = useForm(getWorkshopOrdersDefaultInputs(workshops[props.type].fullName));
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = () => {
    if (!formIsValid()) return;
    setIsLoading(true);
    let orderId = 0;
    addOrder({
      ...formInputs,
      date: formInputs.date.getTime() / 1000,
      deliverBy: formInputs.deliverBy.getTime() / 1000,
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res.id);
        orderId = res.id;
        Promise.all(
          formInputs.products.map((product) => {
            return addProductToOrder({
              ...product,
              equipmentId: orderId,
            });
          }),
        ).then(() => {
          setIsLoading(false);
          props.history.push(workshops[props.type].ordersRedirectURL);
        });
      });
  };

  useEffect(() => {
    document.title = `Создание заказа ${workshops[props.type].name}`;
  }, []);

  return (
    <div className="new-workshop-order">
      <div className="main-form">
        <div className="main-form__form">
          <div className="main-form__header main-form__header--full">
            <div className="main-form__title">Создание заказа</div>
          </div>
          {errorWindow}
          <InputDate
            inputName="Дата создания"
            required
            error={formErrors.date}
            name="date"
            selected={Date.parse(formInputs.date)}
            handleDateChange={(date) => handleInputChange('date', date)}
            errorsArr={formErrors}
            setErrorsArr={setFormErrors}
          />
          <InputText
            inputName="Наименование"
            required
            error={formErrors.name}
            name="name"
            handleInputChange={({ target }) =>
              handleInputChange('name', target.value)
            }
            errorsArr={formErrors}
            setErrorsArr={setFormErrors}
          />
          <InputText
            inputName="Комплектация"
            name="assembly"
            handleInputChange={({ target }) =>
              handleInputChange('assembly', target.value)
            }
          />
          <InputDate
            inputName="Дата поставки"
            required
            error={formErrors.deliverBy}
            name="deliverBy"
            selected={Date.parse(formInputs.deliverBy)}
            handleDateChange={(date) => handleInputChange('deliverBy', date)}
            errorsArr={formErrors}
            setErrorsArr={setFormErrors}
          />
          <SelectItems
            inputName="Продукция"
            userHasAccess={props.userHasAccess}
            defaultValue={formInputs.products}
            required
            onChange={(value) => handleInputChange('products', value)}
            error={formErrors.products}
            errorsArr={formErrors}
            setErrorsArr={setFormErrors}
          />
          <div className="main-form__item">
            <div className="main-form__input_name">Статус</div>
            <div className="main-form__input_field">
              <select
                name="status"
                onChange={({ target }) =>
                  handleInputChange('status', target.value)
                }
                value={formInputs.status}
              >
                <option value="ordered">Заказано</option>
                <option value="sent">Отправлено</option>
                <option value="problem">Проблема</option>
                <option value="completed">Завершено</option>
              </select>
            </div>
          </div>
          <div className="main-form__input_hint">
            * - поля, обязательные для заполнения
          </div>
          <div className="main-form__buttons main-form__buttons--full">
            <Button
              className="main-form__submit main-form__submit--inverted"
              inverted
              onClick={() =>
                props.history.push(workshops[props.type].ordersRedirectURL)
              }
              text="Вернуться назад"
            />
            <Button
              text="Добавить запись"
              isLoading={isLoading}
              className="main-form__submit"
              onClick={handleSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewWorkshopOrder;
