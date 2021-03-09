import { useState, useEffect } from 'react';
import './RecordWorkForm.scss';
import 'Utils/Form/Form.scss';
import ErrorMessage from 'Utils/Form/ErrorMessage/ErrorMessage.jsx';
import InputDate from 'Utils/Form/InputDate/InputDate.jsx';
import SelectEmployee from '../../../Dispatcher/Employees/SelectEmployee/SelectEmployee.jsx';
import {
  deleteProductFromRecordedWork,
  deleteDraftFromRecordedWork,
  deleteRecordedWork,
} from 'Utils/RequestsAPI/WorkManaging/WorkControl.jsx';
import Button from 'Utils/Form/Button/Button.jsx';
import useProductsList from 'Utils/hooks/useProductsList/useProductsList.js';
import SelectWork from '../SelectWork/SelectWork.jsx';
import MessageForUser from 'Utils/Form/MessageForUser/MessageForUser.jsx';
import { submitWorkData } from '../RecordWork/functions.js';

const RecordWorkForm = ({ inputs, handleCloseWindow }) => {
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
  const { products, categories } = useProductsList();
  const [totalHours, setTotalHours] = useState(0);
  const [showMessage, setShowMessage] = useState(false);

  const validateField = (fieldName, value) => {
    switch (fieldName) {
      case 'date':
        setValidInputs({
          ...validInputs,
          date: value !== null,
        });
        break;
      case 'works':
        setValidInputs({
          ...validInputs,
          works: value !== null,
        });
        break;
      default:
        if (validInputs[fieldName] !== undefined) {
          setValidInputs({
            ...validInputs,
            [fieldName]: value !== '',
          });
        }
        break;
    }
  };

  const handleSubmit = () => {
    return submitWorkData(
      worktimeInputs,
      worktimeInputs.date,
      worktimeInputs.employee,
      setIsLoading,
      inputs,
    ).then(() => setIsSaved(true));
  };

  const handleDelete = () => {
    setIsLoading(true);
    console.log('deleting element', worktimeInputs);
    const originalWork = worktimeInputs.originalWorks[0];
    const id = originalWork.id;
    return Promise.all(
      originalWork.product.map((product) =>
        deleteProductFromRecordedWork(id, product.product.id),
      ),
    )
      .then(() =>
        Promise.all(
          originalWork.draft.map((draft) =>
            deleteDraftFromRecordedWork(id, draft.partId, draft.partType),
          ),
        ),
      )
      .then(() => deleteRecordedWork(id))
      .then(() => {
        inputs.deleteSelectedDaysWork();
        setIsSaved(true);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    const isEmployeeNew =
      inputs?.employee?.lastName && worktimeInputs.employee === null;
    if (
      isEmployeeNew ||
      inputs.employee?.id !== worktimeInputs.employee?.id ||
      inputs.date !== worktimeInputs.date ||
      inputs.type !== worktimeInputs.type ||
      inputs.works !== worktimeInputs.works
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
          <MessageForUser
            showMessage={showMessage}
            setShowMessage={setShowMessage}
            title="Подтверждение удаления"
            message="Вы уверены что хотите удалить этот элемент?"
            onClick={() => {
              handleDelete();
              setShowMessage(false);
            }}
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
              validateField('works', value);
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
            noNewItems
          />
          <div className="main-form__item">
            <div className="main-form__input_name">{`Всего: ${totalHours} ч`}</div>
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
            {worktimeInputs.type === 'edit' ? (
              <Button
                text="Удалить запись"
                isLoading={isLoading}
                className="main-form__submit"
                onClick={() => setShowMessage(true)}
              />
            ) : null}
            {worktimeInputs.works?.length > 0 &&
            worktimeInputs.works?.reduce((sum, cur) => {
              if (cur.workType === 'Без продукции/чертежа') {
                return sum + 1;
              } else if (cur.workType === 'Чертеж') {
                return sum + 1;
              } else return cur?.product.length;
            }, 0) > 0 ? (
              <Button
                text="Сохранить данные"
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

export default RecordWorkForm;
