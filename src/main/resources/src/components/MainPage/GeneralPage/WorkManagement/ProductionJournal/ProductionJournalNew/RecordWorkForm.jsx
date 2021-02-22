import React, { useState, useEffect } from "react";
import "./RecordWorkForm.scss";
import "../../../../../../utils/Form/Form.scss";
import ErrorMessage from "../../../../../../utils/Form/ErrorMessage/ErrorMessage.jsx";
import InputDate from "../../../../../../utils/Form/InputDate/InputDate.jsx";
import SelectEmployee from "../../../../Dispatcher/Employees/SelectEmployee/SelectEmployee.jsx";
import {
  getRecordedWorkById,
  editRecordedWork,
  deleteProductFromRecordedWork,
  addProductToRecordedWork,
  addRecordedWork,
  deleteDraftFromRecordedWork,
  addDraftToRecordedWork,
  deleteRecordedWork,
} from "../../../../../../utils/RequestsAPI/WorkManaging/WorkControl.jsx";
import Button from "../../../../../../utils/Form/Button/Button.jsx";
import useProductsList from "../../../../../../utils/hooks/useProductsList/useProductsList.js";
import SelectWork from "../../SelectWork/SelectWork.jsx";

const RecordWorkForm = ({ inputs, handleCloseWindow, showWindow }) => {
  const [worktimeInputs, setWorkTimeInputs] = useState({
    date: new Date(),
    employee: null,
    works: [],
    originalWorks: [],
  });
  const [workTimeErrors, setWorkTimeErrors] = useState({
    date: false,
    employee: false,
    works: false,
  });
  const [validInputs, setValidInputs] = useState({
    date: true,
    employee: true,
    works: true,
  });
  const [showError, setShowError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const { products, categories, isLoadingProducts } = useProductsList();
  const [totalHours, setTotalHours] = useState(0);
  const [itemId, setItemId] = useState(0);

  const validateField = (fieldName, value) => {
    switch (fieldName) {
      case "date":
        setValidInputs({
          ...validInputs,
          date: value !== null,
        });
        break;
      case "works":
        setValidInputs({
          ...validInputs,
          works: value !== null,
        });
        break;
      default:
        if (validInputs[fieldName] !== undefined) {
          setValidInputs({
            ...validInputs,
            [fieldName]: value !== "",
          });
        }
        break;
    }
  };

  const formIsValid = () => {
    let check = true;
    let newErrors = Object.assign({
      date: false,
      employee: false,
      works: false,
    });
    for (let item in validInputs) {
      if (validInputs[item] === false) {
        check = false;
        newErrors = Object.assign({
          ...newErrors,
          [item]: true,
        });
      }
    }
    setWorkTimeErrors(newErrors);
    if (check === true) {
      return true;
    } else {
      setShowError(true);
      return false;
    }
  };

  const handleSubmit = () => {
    console.log(worktimeInputs);
    setIsSaved(true);
  };

  const handleDelete = () => {
    console.log(worktimeInputs);
    setIsSaved(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    validateField(name, value);
    setWorkTimeInputs({
      ...worktimeInputs,
      [name]: value,
    });
    setWorkTimeErrors({
      ...workTimeErrors,
      [name]: false,
    });
  };

  const isNewDate = (date) => {
    return (
      Math.abs(dateDiffInDays(date, new Date())) <= 3 && date <= new Date()
    );
  };

  useEffect(() => {
    if (
      (inputs?.employee?.lastName && worktimeInputs.employee === null) ||
      inputs.employee?.id !== worktimeInputs.employee?.id ||
      inputs.date !== worktimeInputs.date ||
      inputs.type !== worktimeInputs.type
    ) {
      setWorkTimeInputs({ ...inputs, originalWorks: inputs.works });
    }
  }, [inputs, handleCloseWindow]);

  useEffect(() => {
    if (!isSaved) return;
    handleCloseWindow();
    setIsSaved(false);
  }, [isSaved]);

  return (
    <div className="record-work-form">
      <div className="main-form">
        <form className="main-form__form">
          <ErrorMessage
            message="Не заполнены все обязательные поля!"
            showError={showError}
            setShowError={setShowError}
          />
          <InputDate
            inputName="Дата"
            name="date"
            selected={worktimeInputs.date}
            readOnly
          />
          <SelectEmployee
            inputName="Выбор сотрудника"
            defaultValue={worktimeInputs.employee}
            userHasAccess={() => {}}
            readOnly
          />
          {/* Создание работы */}
          <SelectWork
            handleWorkChange={(value) => {
              validateField("works", value);
              setWorkTimeInputs({
                ...worktimeInputs,
                works: value,
              });
              setWorkTimeErrors({
                ...workTimeErrors,
                works: false,
              });
            }}
            totalHours={totalHours}
            setTotalHours={setTotalHours}
            categories={categories}
            products={products}
            defaultValue={worktimeInputs.works}
          />
          <div className="main-form__item">
            <div class="main-form__input_name">{`Всего: ${totalHours} ч`}</div>
          </div>
          <div className="main-form__input_hint">
            * - поля, обязательные для заполнения
          </div>
          <div className="main-form__buttons main-form__buttons--full">
            <button
              inverted
              className="main-form__submit main-form__submit--inverted"
              onClick={() => setIsSaved(true)}
            >
              Закрыть
            </button>
            {worktimeInputs.type === "edit" ? (
              <Button
                text="Удалить запись"
                isLoading={isLoading}
                className="main-form__submit"
                onClick={handleDelete}
              />
            ) : null}
            <Button
              text="Сохранить данные"
              isLoading={isLoading}
              className="main-form__submit"
              onClick={handleSubmit}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default RecordWorkForm;
