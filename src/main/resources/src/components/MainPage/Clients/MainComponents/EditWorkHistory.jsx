import React, { useState, useEffect } from "react";
import SelectWorkHistory from "../SelectWorkHistory/SelectWorkHistory.jsx";
import Button from "../../../../utils/Form/Button/Button.jsx";

const EditWorkHistory = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [workHistory, setWorkHistory] = useState([]);
  const [workHistoryNew, setWorkHistoryNew] = useState([]);
  const [clientId, setClientId] = useState(0);

  const handleSubmit = () => {
    setIsLoading(true);
    //PUT if edited, POST if item is new
    const itemsArr = workHistoryNew.map((selected) => {
      let edited = false;
      workHistory.map((item) => {
        if (item.id === selected.id) {
          edited = true;
          return;
        }
      });
      return edited === true
        ? props.editWorkHistory(
            {
              date: selected.date,
              action: selected.action,
              result: selected.result,
              comment: selected.comment,
              clientId: clientId,
            },
            selected.id
          )
        : props.addWorkHistory({
            date: selected.date,
            action: selected.action,
            result: selected.result,
            comment: selected.comment,
            clientId: clientId,
          });
    });
    Promise.all(itemsArr).then(() => {
      //DELETE items removed by user
      const itemsArr = workHistory.map((item) => {
        let deleted = true;
        workHistoryNew.map((selected) => {
          if (selected.id === item.id) {
            deleted = false;
            return;
          }
        });
        return deleted === true && props.deleteWorkHistory(item.id);
      });
      Promise.all(itemsArr).then(() => {
        setIsLoading(false);
        props.setCloseWindow(!props.closeWindow);
      });
    });
  };

  useEffect(() => {
    if (
      props.selectedItem &&
      props.setShowWindow &&
      props.closeWindow === true
    ) {
      props.setShowWindow(false);
    } else {
      setClientId(props.selectedItem.id);
      setWorkHistory(props.selectedItem.histories);
      setWorkHistoryNew(props.selectedItem.histories);
    }
  }, [props.selectedItem, props.closeWindow]);

  return (
    <div className="main-form">
      <div className="main-form__title">История работы</div>
      <form className="main-form__form">
        <div className="main-form__item">
          <SelectWorkHistory
            defaultValue={workHistory}
            userHasAccess={props.userHasAccess}
            handleWorkHistoryChange={(value) => {
              setWorkHistoryNew(value);
            }}
          />
        </div>
        <div className="main-form__buttons main-form__buttons--full">
          <input
            className="main-form__submit main-form__submit--inverted"
            type="submit"
            onClick={() => {
              props.setCloseWindow(!props.closeWindow);
            }}
            value="Закрыть"
          />
          <Button
            text="Сохранить"
            isLoading={isLoading}
            className="main-form__submit"
            onClick={handleSubmit}
          />
        </div>
      </form>
    </div>
  );
};

export default EditWorkHistory;
