import { useState, useEffect } from 'react';
import './EditRig.scss';
import 'Utils/Form/Form.scss';
import SelectParts from '../../../SelectParts/SelectParts.jsx';
import {
  getStampById,
  editStamp,
  editPartsOfStamp,
  addPartsToStamp,
  deletePartsFromStamp,
} from 'Utils/RequestsAPI/Rigging/Stamp.jsx';
import InputText from 'Utils/Form/InputText/InputText.jsx';
import Button from 'Utils/Form/Button/Button.jsx';
import { formatDateString } from 'Utils/functions.jsx';
import { rigTypes } from '../../rigsVariables.js';
import useQuery from 'Utils/hooks/useQuery.js';
import { getRigsDefaultInputs } from '../../TableView/functions';
import useForm from 'Utils/hooks/useForm.js';

const EditRig = (props) => {
  const { query } = useQuery();
  const {
    handleInputChange,
    formInputs,
    formErrors,
    setFormErrors,
    updateFormInputs,
    formIsValid,
    errorWindow,
  } = useForm([
    ...getRigsDefaultInputs(props.type),
    { name: 'stampParts', defaultValue: [] },
  ]);
  const [stampId, setStampId] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = () => {
    console.log(props.type, formInputs);
    if (!formIsValid()) return;
    setIsLoading(true);
    editStamp({ ...formInputs, lastEdited: new Date() }, stampId)
      .then(() => {
        //PUT if edited, POST if part is new
        const partsArr = formInputs.parts.map((selected) => {
          let edited = false;
          let oldItem = null;
          formInputs.stampParts.map((item) => {
            if (item.id === selected.id) {
              edited = true;
              oldItem = item;
              return;
            }
          });
          if (oldItem === selected) return;
          return edited
            ? editPartsOfStamp(
                {
                  ...selected,
                  riggingId: stampId,
                },
                selected.id,
              )
            : addPartsToStamp({
                ...selected,
                riggingId: stampId,
              });
        });
        Promise.all(partsArr).then(() => {
          //DELETE parts removed by user
          const partsArr = formInputs.stampParts.map((item) => {
            let deleted = true;
            formInputs.parts.map((selected) => {
              if (selected.id === item.id) {
                deleted = false;
                return;
              }
            });
            return deleted === true && deletePartsFromStamp(item.id);
          });
          Promise.all(partsArr).then(() => {
            props.history.push(
              `${rigTypes[props.type].redirectURL}#${stampId}`,
            );
          });
        });
      })
      .catch((error) => {
        setIsLoading(false);
        alert('Ошибка при добавлении записи');
        console.log(error);
      });
  };

  useEffect(() => {
    document.title = 'Редактирование записи';
    const id = props.history.location.pathname.split('/edit/')[1];
    setStampId(id);
    if (isNaN(Number.parseInt(id))) {
      alert('Неправильный индекс!');
      props.history.push(rigTypes[props.type].redirectURL);
    } else {
      getStampById(id)
        .then((res) => res.json())
        .then((res) =>
          updateFormInputs({
            comment: res.comment,
            name: res.name,
            color: res.color,
            number: res.number,
            status: res.status,
            parts: res.stampParts,
            stampParts: res.stampParts,
            lastEdited: res.lastEdited ? res.lastEdited : new Date(),
          }),
        )
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  return (
    <div className="edit-rig">
      <div className="main-form">
        <form className="main-form__form">
          <div className="main-form__header main-form__header--full">
            <div className="main-form__title">Редактирование записи</div>
          </div>
          {errorWindow}
          <InputText
            inputName="Название оснастки(оборудования)"
            required
            error={formErrors.name}
            name="name"
            defaultValue={formInputs.name}
            handleInputChange={({ target }) =>
              handleInputChange('name', target.value)
            }
            errorsArr={formErrors}
            setErrorsArr={setFormErrors}
          />
          <InputText
            inputName="Артикул оснастки(оборудования)"
            required
            error={formErrors.number}
            name="number"
            defaultValue={formInputs.number}
            handleInputChange={({ target }) =>
              handleInputChange('number', target.value)
            }
            errorsArr={formErrors}
            setErrorsArr={setFormErrors}
          />
          <InputText
            inputName="Комментарий"
            name="comment"
            defaultValue={formInputs.comment}
            handleInputChange={({ target }) =>
              handleInputChange('comment', target.value)
            }
          />
          <SelectParts
            handlePartsChange={(parts) => handleInputChange('parts', parts)}
            defaultValue={formInputs.parts}
            scrollToId={query.get('part')}
            isMinimizedDefault={true}
            error={formErrors.parts}
            hideError={() => setFormErrors({ ...formErrors, parts: false })}
            searchPlaceholder="Введите название продукта для поиска..."
          />
          <InputText
            inputName="Дата последнего изменения"
            name="lastEdited"
            readOnly
            defaultValue={formatDateString(formInputs.lastEdited)}
          />
          <div className="main-form__input_hint">
            * - поля, обязательные для заполнения
          </div>
          <div className="main-form__buttons main-form__buttons--full">
            <Button
              className="main-form__submit main-form__submit--inverted"
              inverted
              onClick={() => {
                const part = query.get('part')
                  ? `&part=${query.get('part')}`
                  : '';
                props.history.push(
                  `${rigTypes[props.type].redirectURL}?rig=${
                    formInputs.id
                  }${part}`,
                );
              }}
              text="Вернуться назад"
            />
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

export default EditRig;
