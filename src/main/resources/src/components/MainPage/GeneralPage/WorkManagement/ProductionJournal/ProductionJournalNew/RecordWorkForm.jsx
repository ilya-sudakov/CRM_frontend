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
    setIsLoading(true);
    return Promise.all(
      worktimeInputs.works.map(async (item, index) => {
        console.log(item);
        const temp = Object.assign({
          day: worktimeInputs.date.getDate(),
          month: worktimeInputs.date.getMonth() + 1,
          year: worktimeInputs.date.getFullYear(),
          employeeId: worktimeInputs.employee.id,
          comment: item.comment,
          workListId: item.workId,
          hours: item.hours,
        });

        //Удаление элементов
        await Promise.all(
          worktimeInputs.originalWorks.map((originalWork) => {
            const item = worktimeInputs.works.find(
              (workItem) => workItem.id === originalWork.id
            );
            if (originalWork.id && item === undefined) {
              console.log("deleting element", worktimeInputs);
              return Promise.all(
                originalWork.product.map((product) => {
                  return deleteProductFromRecordedWork(
                    originalWork.id,
                    product.product.id
                  );
                })
              )
                .then(() => {
                  return Promise.all(
                    originalWork.draft.map((draft) => {
                      return deleteDraftFromRecordedWork(
                        originalWork.id,
                        draft.partId,
                        draft.partType
                      );
                    })
                  );
                })
                .then(() => deleteRecordedWork(originalWork.id));
            }
          })
        );

        if (item.isOld) {
          //если часы/комментарий не совпадают, то редактируем
          const originalItem = worktimeInputs.originalWorks.find(
            (originalWork) => item.id === originalWork.id
          );

          if (
            originalItem &&
            (item.hours !== originalItem.hours ||
              item.comment !== originalItem.comment)
          ) {
            await editRecordedWork(temp, item.id);
          }

          //Продукция
          //delete removed products
          Promise.all(
            originalItem.product.map((originalProduct) => {
              if (
                item.product.find(
                  (product) => product.id === originalProduct.id
                ) === undefined
              ) {
                console.log("delete product", originalProduct);
                return deleteProductFromRecordedWork(
                  item.id,
                  originalProduct.id
                );
              }
            })
          );

          //add new products
          Promise.all(
            item.product.map((product) => {
              if (
                originalItem.product.find(
                  (originalProduct) => product.id === originalProduct.id
                ) === undefined
              ) {
                console.log("add product", product);
                return addProductToRecordedWork(
                  item.id,
                  product.id,
                  product.quantity,
                  {
                    name: product.name,
                  }
                );
              }
            })
          );

          //update edited products
          Promise.all(
            originalItem.product.map((originalProduct) => {
              const product = item.product.find(
                (product) => product.id === originalProduct.id
              );
              if (
                product !== undefined &&
                originalProduct.quantity !== Number.parseFloat(product.quantity)
              ) {
                console.log("edit product", product);
                return deleteProductFromRecordedWork(
                  item.id,
                  originalProduct.product.id
                ).then(() =>
                  addProductToRecordedWork(
                    item.id,
                    product.product.id,
                    product.quantity,
                    {
                      name: product.name,
                    }
                  )
                );
              }
            })
          );

          //Чертежи
          //delete removed drafts
          Promise.all(
            originalItem.draft.map((originalDraft) => {
              if (
                item.draft.find((draft) => draft.id === originalDraft.id) ===
                undefined
              ) {
                console.log("delete draft", originalDraft, originalItem);
                return deleteDraftFromRecordedWork(
                  item.id,
                  originalDraft.partId,
                  originalDraft.partType
                );
              }
            })
          );

          //add new drafts
          Promise.all(
            item.draft.map((draft) => {
              if (
                originalItem.draft.find(
                  (originalDraft) => draft.id === originalDraft.id
                ) === undefined
              ) {
                console.log("add draft", draft);
                return addDraftToRecordedWork(
                  item.id,
                  draft.partId,
                  draft.type,
                  draft.quantity,
                  draft.name
                );
              }
            })
          );

          //update edited drafts
          Promise.all(
            originalItem.draft.map((originalDraft) => {
              const draft = item.draft.find(
                (draft) => draft.id === originalDraft.id
              );
              console.log("edit draft opportunity", originalDraft, draft);
              if (
                draft !== undefined &&
                originalDraft.quantity !== Number.parseFloat(draft.quantity)
              ) {
                console.log("edit draft success", draft);
                return deleteDraftFromRecordedWork(
                  item.id,
                  originalDraft.partId,
                  originalDraft.partType ??
                    drafts.find((item) => draft.partId === item.id)?.type
                ).then(() =>
                  addDraftToRecordedWork(
                    item.id,
                    draft.partId,
                    draft.partType,
                    draft.quantity,
                    draft.name
                  )
                );
              }
            })
          );
        }

        //if item is new, then just add it
        if (!item.isOld && item.workId !== null && item.isOld !== undefined) {
          console.log("adding item", item);
          return addRecordedWork(temp)
            .then((res) => res.json())
            .then((res) => {
              Promise.all(
                item.product.map((product) => {
                  return addProductToRecordedWork(
                    res.id,
                    product.id,
                    product.quantity,
                    {
                      name: product.name,
                    }
                  );
                })
              );
              return res.id;
            })
            .then((id) => {
              return Promise.all(
                item.draft.map((draft) => {
                  return addDraftToRecordedWork(
                    id,
                    draft.partId,
                    draft.type,
                    draft.quantity,
                    draft.name
                  );
                })
              );
            })
            .catch((error) => {
              alert("Ошибка при добавлении записи");
              setIsLoading(false);
              console.log(error);
            });
        }
      })
    ).then(() => {
      setIsLoading(false);
      setIsSaved(true);
    });
  };

  const handleDelete = () => {
    setIsLoading(true);
    console.log("deleting element", worktimeInputs);
    const originalWork = worktimeInputs.originalWorks[0];
    return Promise.all(
      originalWork.product.map((product) => {
        return deleteProductFromRecordedWork(
          originalWork.id,
          product.product.id
        );
      })
    )
      .then(() => {
        return Promise.all(
          originalWork.draft.map((draft) => {
            return deleteDraftFromRecordedWork(
              originalWork.id,
              draft.partId,
              draft.partType
            );
          })
        );
      })
      .then(() => deleteRecordedWork(originalWork.id))
      .then(() => {
        setIsSaved(true);
        setIsLoading(false);
      });
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
