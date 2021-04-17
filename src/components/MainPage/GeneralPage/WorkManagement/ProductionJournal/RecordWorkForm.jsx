import { useState, useEffect } from 'react';
import './RecordWorkForm.scss';
import 'Utils/Form/Form.scss';
import InputDate from 'Utils/Form/InputDate/InputDate.jsx';
import SelectEmployee from '../../../Dispatcher/Employees/SelectEmployee/SelectEmployee.jsx';
import {
  deleteProductFromRecordedWork,
  deleteDraftFromRecordedWork,
  deleteRecordedWork,
} from 'API/WorkManaging/work_control';
import Button from 'Utils/Form/Button/Button.jsx';
import useProductsList from 'Utils/hooks/useProductsList/useProductsList.js';
import SelectWork from '../SelectWork/SelectWork.jsx';
import MessageForUser from 'Utils/Form/MessageForUser/MessageForUser.jsx';
import { submitWorkData } from '../RecordWork/functions.js';
import { useForm } from 'Utils/hooks';
import { productionJournalDefaultInputs } from './objects';

const RecordWorkForm = ({ inputs, handleCloseWindow }) => {
  const {
    handleInputChange,
    formInputs,
    updateFormInputs,
    errorWindow,
  } = useForm(productionJournalDefaultInputs);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const { products, categories } = useProductsList();
  const [totalHours, setTotalHours] = useState(0);
  const [showMessage, setShowMessage] = useState(false);

  const handleSubmit = () => {
    console.log(formInputs);
    return submitWorkData(
      formInputs,
      formInputs.date,
      formInputs.employee,
      setIsLoading,
      inputs,
    ).then(() => setIsSaved(true));
  };

  const handleDelete = () => {
    setIsLoading(true);
    console.log('deleting element', formInputs);
    const originalWork = formInputs.originalWorks[0];
    const id = originalWork.id;
    return Promise.all(
      originalWork.product.map((product) =>
        deleteProductFromRecordedWork(id, product.id),
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
      inputs?.employee?.lastName && formInputs.employee === null;
    if (
      isEmployeeNew ||
      inputs.employee?.id !== formInputs.employee?.id ||
      inputs.date !== formInputs.date ||
      inputs.type !== formInputs.type ||
      inputs.works !== formInputs.works
    ) {
      console.log({ ...inputs, originalWorks: inputs.works });
      updateFormInputs({ ...inputs, originalWorks: inputs.works });
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
          {errorWindow}
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
            selected={formInputs.date}
            readOnly
          />
          <SelectEmployee
            inputName="Выбор сотрудника"
            defaultValue={formInputs.employee}
            userHasAccess={() => {}}
            readOnly
          />
          <SelectWork
            handleWorkChange={(value) => handleInputChange('works', value)}
            totalHours={totalHours}
            setTotalHours={setTotalHours}
            categories={categories}
            products={products}
            defaultValue={formInputs.works}
            noNewItems
          />
          <div className="main-form__item">
            <div className="main-form__input_name">{`Всего: ${totalHours} ч`}</div>
          </div>
          <div className="main-form__input_hint">
            * - поля, обязательные для заполнения
          </div>
          <div className="main-form__buttons main-form__buttons--full">
            <Button
              inverted
              text="Закрыть"
              className="main-form__submit main-form__submit--inverted"
              onClick={() => setIsSaved(true)}
            />
            {formInputs.type === 'edit' ? (
              <Button
                text="Удалить запись"
                isLoading={isLoading}
                className="main-form__submit"
                onClick={() => setShowMessage(true)}
              />
            ) : null}
            {formInputs.works?.length > 0 &&
            formInputs.works?.reduce((sum, cur) => {
              if (cur.workType === 'Без продукции/чертежа') return sum + 1;
              if (cur.workType === 'Чертеж') return sum + 1;
              return cur?.product.length;
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
