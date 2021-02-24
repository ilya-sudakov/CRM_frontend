import React, { useState, useEffect } from "react";
import "./EditRecordWork.scss";
import "../../../../../utils/Form/Form.scss";
import ErrorMessage from "../../../../../utils/Form/ErrorMessage/ErrorMessage.jsx";
import InputDate from "../../../../../utils/Form/InputDate/InputDate.jsx";
import SelectEmployee from "../../../Dispatcher/Employees/SelectEmployee/SelectEmployee.jsx";
import SelectWork from "../SelectWork/SelectWork.jsx";
import InputText from "../../../../../utils/Form/InputText/InputText.jsx";
import {
  getRecordedWorkById,
  editRecordedWork,
  deleteProductFromRecordedWork,
  addProductToRecordedWork,
  addRecordedWork,
  deleteDraftFromRecordedWork,
  addDraftToRecordedWork,
  deleteRecordedWork,
} from "../../../../../utils/RequestsAPI/WorkManaging/WorkControl.jsx";
import Button from "../../../../../utils/Form/Button/Button.jsx";
import useProductsList from "../../../../../utils/hooks/useProductsList/useProductsList.js";
import { useHistory } from "react-router-dom";

const EditRecordWork = (props) => {
  const [worktimeInputs, setWorkTimeInputs] = useState({
    date: new Date(),
    employee: '',
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
  const { products, categories, isLoadingProducts } = useProductsList();
  const [totalHours, setTotalHours] = useState(0);
  const [itemId, setItemId] = useState(0);
  const history = useHistory();

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

  const handleSubmit = (event) => {
    // event.preventDefault();
    setIsLoading(true);
    // console.log(worktimeInputs);
    const editedInputs = worktimeInputs.works.map((item, index) => {
      // console.log('works');
      const temp = Object.assign({
        day: worktimeInputs.date.getDate(),
        month: worktimeInputs.date.getMonth() + 1,
        year: worktimeInputs.date.getFullYear(),
        employeeId: worktimeInputs.employeeId,
        comment: item.comment,
        workListId: item.workId,
        hours: item.hours,
      });
      console.log(temp);
      if (formIsValid()) {
        if (index === 0) {
          if (temp.hours === 0)
            return deleteRecordedWork(itemId)
              .then(() => {
                history.push("/work-management");
              })
              .catch((error) => {
                alert("Ошибка при добавлении записи");
                setIsLoading(false);
                // setShowError(true);
                console.log(error);
              });
          return editRecordedWork(temp, itemId)
            .then(() => {
              // console.log(res);
              const oldProductsArr = worktimeInputs.originalWorks[0].product.map(
                (product) => {
                  console.log(product.id);
                  deleteProductFromRecordedWork(itemId, product.id);
                }
              );
              return Promise.all(oldProductsArr).then(() => {
                const productsArr = item.product.map((product) => {
                  addProductToRecordedWork(
                    itemId,
                    product.id,
                    product.quantity,
                    {
                      name: product.name,
                    }
                  );
                });
                Promise.all(productsArr);
              });
            })
            .then(() => {
              // console.log(res);
              const oldProductsArr = worktimeInputs.originalWorks[0].draft.map(
                (draft) => {
                  deleteDraftFromRecordedWork(itemId, draft.partId, draft.type);
                }
              );
              Promise.all(oldProductsArr).then(() => {
                return Promise.all(
                  item.draft.map((draft) => {
                    addDraftToRecordedWork(
                      itemId,
                      draft.partId,
                      draft.type,
                      draft.quantity,
                      draft.name
                    );
                  })
                );
              });
            })
            .then(() => {
              history.push("/work-management");
            })
            .catch((error) => {
              alert("Ошибка при добавлении записи");
              setIsLoading(false);
              // setShowError(true);
              console.log(error);
            });
        } else {
          return addRecordedWork(temp)
            .then((res) => res.json())
            .then((res) => {
              const productsArr = item.product.map((product) => {
                addProductToRecordedWork(res.id, product.id, product.quantity, {
                  name: product.name,
                });
              });
              Promise.all(productsArr)
                .then(() => {
                  const productsArr = item.draft.map((draft) => {
                    addDraftToRecordedWork(
                      itemId,
                      draft.partId,
                      draft.type,
                      draft.quantity
                    );
                  });
                })
                .then(() => {
                  history.push("/");
                });
            })
            .catch((error) => {
              alert("Ошибка при добавлении записи");
              setIsLoading(false);
              // setShowError(true);
              console.log(error);
            });
        }
      }
      Promise.all(editedInputs).then(() => {});
    });
  };

  useEffect(() => {
    document.title = "Редактирование записи о работе";
    const abortController = new AbortController();
    const id = history.location.pathname.split(
      "/work-management/record-time/edit/"
    )[1];
    if (isNaN(Number.parseInt(id))) {
      alert("Неправильный индекс работы!");
      history.push("/");
    } else {
      setItemId(id);
      getRecordedWorkById(id)
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          setWorkTimeInputs({
            date: new Date(res.year, res.month - 1, res.day),
            employeeId: res.employee.id,
            employee: res.employee,
            employeeName:
              res.employee.lastName +
              " " +
              res.employee.name +
              " " +
              res.employee.middleName,
            works: [
              {
                workName: res.workList.work,
                workId: res.workList.id,
                workType: res.workList.typeOfWork,
                hours: res.hours,
                comment: res.comment,
                product: [
                  ...res.workControlProduct.map((item) =>
                    Object.assign({
                      id: item.product.id,
                      name: item.product.name,
                      quantity: item.quantity,
                    })
                  ),
                ],
                draft: [
                  ...res.partsWorks.map((item) =>
                    Object.assign({
                      id: item.id,
                      partId: item.partId,
                      name: item.name,
                      type: item.partType,
                      quantity: item.quantity,
                    })
                  ),
                ],
              },
            ],
            originalWorks: [
              {
                workName: res.workList.work,
                workId: res.workList.id,
                hours: res.hours,
                comment: res.comment,
                product: [
                  ...res.workControlProduct.map((item) =>
                    Object.assign({
                      id: item.product.id,
                      name: item.product.name,
                      quantity: item.quantity,
                    })
                  ),
                ],
                draft: [
                  ...res.partsWorks.map((item) =>
                    Object.assign({
                      id: item.id,
                      partId: item.partId,
                      name: item.name,
                      type: item.partType,
                      quantity: item.quantity,
                    })
                  ),
                ],
              },
            ],
          });
        })
        .catch((error) => {
          console.log(error);
          alert("Ошибка при загрузке работы!");
          history.push("/");
        });
    }
    return function cancel() {
      abortController.abort();
    };
  }, []);

  return (
    <div className="edit-record-work">
      <div className="main-form">
        <form className="main-form__form">
          <div className="main-form__header main-form__header--full">
            <div className="main-form__title">
              Редактирование записи о работе
            </div>
          </div>
          <ErrorMessage
            message="Не заполнены все обязательные поля!"
            showError={showError}
            setShowError={setShowError}
          />
          <InputDate
            inputName="Дата"
            required
            error={Date.parse(workTimeErrors.date)}
            name="date"
            selected={worktimeInputs.date}
            // filterDate={isNewDate}
            handleDateChange={(date) => {
              validateField("date", date);
              setWorkTimeInputs({
                ...worktimeInputs,
                date: date,
              });
              setWorkTimeErrors({
                ...workTimeErrors,
                date: false,
              });
            }}
            errorsArr={workTimeErrors}
            setErrorsArr={setWorkTimeErrors}
          />
          {/* Список сотрудников */}
          <SelectEmployee
            inputName="Выбор сотрудника"
            required
            error={workTimeErrors.employee}
            userHasAccess={props.userHasAccess}
            defaultValue={worktimeInputs.employee}
            name="employee"
            handleEmployeeChange={(value) => {
              validateField("employee", value);
              setWorkTimeInputs({
                ...worktimeInputs,
                employeeId: value,
              });
              setWorkTimeErrors({
                ...workTimeErrors,
                employee: false,
              });
            }}
            errorsArr={workTimeErrors}
            setErrorsArr={setWorkTimeErrors}
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
            userHasAccess={props.userHasAccess}
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
            <input
              className="main-form__submit main-form__submit--inverted"
              type="submit"
              onClick={() => history.push("/work-management")}
              value="Вернуться назад"
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
                text="Редактировать запись"
                isLoading={isLoading}
                className="main-form__submit"
                onClick={handleSubmit}
              />
            ) : null}
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditRecordWork;
