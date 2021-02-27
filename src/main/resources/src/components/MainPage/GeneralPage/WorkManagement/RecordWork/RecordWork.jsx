import React, { useState, useEffect, useContext } from "react";
import "./RecordWork.scss";
import "../../../../../utils/Form/Form.scss";
import ErrorMessage from "../../../../../utils/Form/ErrorMessage/ErrorMessage.jsx";
import InputDate from "../../../../../utils/Form/InputDate/InputDate.jsx";
import SelectEmployee from "../../../Dispatcher/Employees/SelectEmployee/SelectEmployee.jsx";
import SelectWork from "../SelectWork/SelectWork.jsx";
import SelectWorkHours from "../SelectWorkHours/SelectWorkHours.jsx";
import Button from "../../../../../utils/Form/Button/Button.jsx";
import useProductsList from "../../../../../utils/hooks/useProductsList/useProductsList.js";
import { submitWorkData } from "./functions.js";
import useQuery from "../../../../../utils/hooks/useQuery";
import { getWorkReportByDateAndEmployee } from "../../../../../utils/RequestsAPI/WorkManaging/WorkControl.jsx";
import UserContext from "../../../../../App.js";
import { getEmployeeById } from "../../../../../utils/RequestsAPI/Employees.jsx";

const NewRecordWork = (props) => {
  const [worktimeInputs, setWorkTimeInputs] = useState({
    works: [],
  });
  const [workTimeErrors, setWorkTimeErrors] = useState({
    works: false,
  });
  const [validInputs, setValidInputs] = useState({
    works: false,
  });
  const userContext = useContext(UserContext);
  const [showError, setShowError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [curEmployee, setCurEmployee] = useState(null);
  const { query } = useQuery();
  const [curDate, setCurDate] = useState(
    query.get("date") ? new Date(query.get("date")) : new Date()
  );
  const { products, categories, isLoadingProducts } = useProductsList();
  const [totalHours, setTotalHours] = useState(0);
  const [curPage, setCurPage] = useState(0);
  const [wrapperHeight, setWrapperHeight] = useState("0px");

  const validateField = (fieldName, value) => {
    switch (fieldName) {
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
    if (curPage !== 1) {
      return setCurPage(1);
    } else {
      if (!formIsValid) return;
      setIsLoading(true);
      return submitWorkData(
        worktimeInputs,
        curDate,
        curEmployee,
        setIsLoading
      ).then(() => props.history.push("/work-management"));
    }
  };

  useEffect(() => {
    document.title = "Запись о работе";
    const abortController = new AbortController();
    const employeeId = query.get("employee")
      ? Number.parseInt(query.get("employee")) !== curEmployee?.id &&
        curEmployee !== null
        ? curEmployee?.id
        : query.get("employee")
      : curEmployee?.id;
    // console.log(query.get("employee"), query.get("date"), curEmployee, curDate);
    if (!employeeId || !curDate) return;
    if (query.get("employee") && curEmployee === null) {
      setIsLoading(true);
      getEmployeeById(query.get("employee"))
        .then((res) => res.json())
        .then((res) => setCurEmployee(res))
        .then(() => setIsLoading(false));
    }
    if (
      isLoading ||
      (worktimeInputs.date === curDate &&
        worktimeInputs.employeeId === curEmployee?.id)
    )
      return;
    console.log(isLoading, curEmployee, curDate, worktimeInputs);
    setIsLoading(true);
    getWorkReportByDateAndEmployee(
      employeeId,
      curDate.getFullYear(),
      curDate.getMonth() + 1,
      curDate.getDate()
    )
      .then(({ data }) => {
        const works = data.map((item) => ({
          id: item.id,
          workName: item.workList.work,
          workId: item.workList.id,
          workType: item.workList.typeOfWork,
          hours: item.hours,
          comment: item.comment,
          isOld: true,
          product: [
            ...item.workControlProduct.map((item) => ({
              id: item.product.id,
              name: item.product.name,
              quantity: item.quantity,
            })),
          ],
          draft: [
            ...item.partsWorks.map((item) => ({
              id: item.id,
              partId: item.partId,
              name: item.name,
              type: item.partType,
              quantity: item.quantity,
            })),
          ],
        }));
        console.log(data, works);
        setWorkTimeInputs({
          ...worktimeInputs,
          date: curDate,
          employeeId: Number.parseInt(employeeId),
          works: [...works],
          originalWorks: [...works],
        });
        return setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        alert("Ошибка при загрузке работы!");
        props.history.push("/");
      });
    return function cancel() {
      abortController.abort();
    };
  }, [curEmployee, curDate]);

  useEffect(() => {
    setWrapperHeight(
      document.getElementById(`${curPage}page`)?.clientHeight + "px"
    );
  });

  const handleClickPrevPage = () => {
    if (curPage !== 0) {
      let temp = curPage - 1;
      setCurPage(temp);
    } else {
      props.history.push("/");
    }
  };

  return (
    <div className="record-work">
      <div className="main-form">
        <ErrorMessage
          message="Не заполнены все обязательные поля!"
          showError={showError}
          setShowError={setShowError}
        />
        <form
          className="main-form__form"
          style={{
            minHeight: `calc(${wrapperHeight} + 45px)`,
          }}
        >
          <div className="main-form__header main-form__header--full">
            <div className="main-form__title">Запись о работе</div>
          </div>
          <div
            className="main-form__wrapper"
            style={{
              left: `calc(-100% * ${curPage} + (${
                (window.innerWidth ||
                  document.documentElement.clientWidth ||
                  document.body.clientWidth) >= 768
                  ? "35px"
                  : "20px"
              } + 15px * ${curPage}))`,
              height: `calc(${wrapperHeight})`,
            }}
          >
            <div className="main-form__wrapper-item" id="0page">
              <InputDate
                inputName="Дата"
                required
                name="date"
                selected={curDate}
                handleDateChange={(date) => {
                  setCurDate(date);
                }}
              />
              {/* Список сотрудников */}
              <SelectEmployee
                inputName="Выбор сотрудника"
                required
                userHasAccess={userContext.userHasAccess}
                defaultValue={curEmployee}
                handleEmployeeChange={(id, name, employee) =>
                  setCurEmployee(employee)
                }
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
                userHasAccess={userContext.userHasAccess}
                defaultValue={worktimeInputs.works}
                totalHours={totalHours}
                setTotalHours={setTotalHours}
                categories={categories}
                products={products}
                noTime
                noNewItems={!curDate || !curEmployee}
              />
              <div className="main-form__input_hint">
                * - поля, обязательные для заполнения
              </div>
              <div className="main-form__buttons">
                <Button
                  text="Вернуться назад"
                  isLoading={isLoading}
                  className="main-form__submit main-form__submit--inverted"
                  inverted
                  onClick={handleClickPrevPage}
                />
                {worktimeInputs.works.length > 0 &&
                worktimeInputs.works.reduce((sum, cur) => {
                  if (cur.workType === "Без продукции/чертежа") {
                    return sum + 1;
                  } else if (cur.workType === "Чертеж") {
                    return sum + 1;
                  } else return cur?.product.length;
                }, 0) > 0 ? (
                  <Button
                    text="Указать часы"
                    isLoading={isLoading}
                    className="main-form__submit"
                    onClick={handleSubmit}
                  />
                ) : null}
              </div>
            </div>
            <div className="main-form__wrapper-item" id="1page">
              <SelectWorkHours
                workArray={worktimeInputs.works}
                date={curDate}
                onChange={(value) => {
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
              />
              <div className="main-form__input_hint">
                * - поля, обязательные для заполнения
              </div>
              <div className="main-form__buttons">
                <Button
                  text="Вернуться назад"
                  isLoading={isLoading}
                  className="main-form__submit main-form__submit--inverted"
                  inverted
                  onClick={handleClickPrevPage}
                />
                <Button
                  text="Создать запись"
                  isLoading={isLoading}
                  className="main-form__submit"
                  onClick={handleSubmit}
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewRecordWork;
