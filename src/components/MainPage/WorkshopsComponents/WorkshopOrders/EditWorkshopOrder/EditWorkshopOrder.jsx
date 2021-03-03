import React, { useState, useEffect, useContext } from "react";
import "./EditWorkshopOrder.scss";
import "../../../../../utils/Form/Form.scss";
import InputText from "../../../../../utils/Form/InputText/InputText.jsx";
import InputDate from "../../../../../utils/Form/InputDate/InputDate.jsx";
import SelectItems from "../../../../../utils/Form/SelectItems/SelectItems.jsx";
import {
  getOrderById,
  editOrder,
  editProductInOrder,
  addProductToOrder,
  deleteProductFromOrder,
} from "../../../../../utils/RequestsAPI/Workshop/Orders.jsx";
import Button from "../../../../../utils/Form/Button/Button.jsx";
import { workshops } from "../../workshopVariables";
import UserContext from "../../../../../App.js";
import { getWorkshopOrdersDefaultInputs } from "../../functions";
import useForm from "../../../../../utils/hooks/useForm";

const EditWorkshopOrder = (props) => {
  const {
    handleInputChange,
    formInputs,
    formErrors,
    setFormErrors,
    updateFormInputs,
    formIsValid,
    errorWindow,
  } = useForm([
    ...getWorkshopOrdersDefaultInputs(workshops[props.type].fullName),
    { name: "oldProducts", defaultValue: [] },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [id, setId] = useState(0);
  const userContext = useContext(UserContext);

  const handleSubmit = () => {
    if (!formIsValid()) return;
    setIsLoading(true);
    editOrder(
      {
        ...formInputs,
        date: new Date(formInputs.date).getTime() / 1000,
        deliverBy: new Date(formInputs.deliverBy).getTime() / 1000,
      },
      id
    ).then(() => {
      //PUT if edited, POST if product is new
      Promise.all(
        formInputs.products.map((selected) => {
          let edited = false;
          formInputs.oldProducts.map((item) => {
            if (item.id === selected.id) {
              edited = true;
              return;
            }
          });
          return edited
            ? editProductInOrder(
                {
                  ...selected,
                  equipmentId: id,
                },
                selected.id
              )
            : addProductToOrder({
                equipmentId: id,
                ...selected,
              });
        })
      ).then(() => {
        //DELETE products removed by user
        Promise.all(
          formInputs.oldProducts.map((item) => {
            let deleted = true;
            formInputs.products.map((selected) => {
              if (selected.id === item.id) {
                deleted = false;
                return;
              }
            });
            return deleted && deleteProductFromOrder(item.id);
          })
        ).then(() => {
          setIsLoading(false);
          props.history.push("/lemz/workshop-orders");
        });
      });
    });
  };

  useEffect(() => {
    document.title = "Редактирование заказа";
    const id = props.history.location.pathname.split(
      `${workshops[props.type].ordersRedirectURL}/edit/`
    )[1];
    if (isNaN(Number.parseInt(id))) {
      alert("Неправильный индекс заказа!");
      props.history.push(workshops[props.type].ordersRedirectURL);
    } else {
      setId(id);
      getOrderById(id)
        .then((res) => res.json())
        .then((res) => {
          updateFormInputs({
            ...formInputs,
            oldProducts: res.products,
            ...res,
          });
        });
    }
  }, []);

  return (
    <div className="new-workshop-order">
      <div className="main-form">
        <div className="main-form__form">
          <div className="main-form__header main-form__header--full">
            <div className="main-form__title">Редактирование заказа</div>
          </div>
          {errorWindow}
          <InputDate
            inputName="Дата создания"
            required
            error={formErrors.date}
            name="date"
            selected={Date.parse(formInputs.date)}
            handleDateChange={(date) => handleInputChange("date", date)}
            errorsArr={formErrors}
            setErrorsArr={setFormErrors}
            readOnly={!userContext.userHasAccess(["ROLE_ADMIN"])}
          />
          <InputText
            inputName="Наименование"
            required
            error={formErrors.name}
            defaultValue={formInputs.name}
            name="name"
            handleInputChange={({ target }) =>
              handleInputChange("name", target.value)
            }
            errorsArr={formErrors}
            setErrorsArr={setFormErrors}
            readOnly={!userContext.userHasAccess(["ROLE_ADMIN"])}
          />
          <InputText
            inputName="Комплектация"
            name="assembly"
            handleInputChange={({ target }) =>
              handleInputChange("assembly", target.value)
            }
            handleInputChange={handleInputChange}
            readOnly={!userContext.userHasAccess(["ROLE_ADMIN"])}
          />
          <InputDate
            inputName="Дата поставки"
            required
            error={formErrors.deliverBy}
            name="deliverBy"
            selected={Date.parse(formInputs.deliverBy)}
            handleDateChange={(date) => handleInputChange("deliverBy", date)}
            errorsArr={formErrors}
            setErrorsArr={setFormErrors}
          />
          <SelectItems
            inputName="Продукция"
            userHasAccess={props.userHasAccess}
            defaultValue={formInputs.products}
            readOnly={!userContext.userHasAccess(["ROLE_ADMIN"])}
            required
            onChange={(value) => handleInputChange("products", value)}
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
                  handleInputChange("status", target.value)
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
              text="Редактировать запись"
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

export default EditWorkshopOrder;
