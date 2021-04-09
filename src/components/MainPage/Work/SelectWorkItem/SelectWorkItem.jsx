import { useState, useEffect } from 'react';
import './SelectWorkItem.scss';
import SearchBar from '../../SearchBar/SearchBar.jsx';
import { getWork } from 'API/WorkManaging/work_list';
import TableView from '../TableView.jsx';
import SelectFromButton from 'Utils/Form/SelectFromButton/SelectFromButton.jsx';
import { useFormWindow } from 'Utils/hooks';

const SelectWorkItem = (props) => {
  const [works, setWorks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [fullName, setFullName] = useState('');

  useEffect(() => {
    works.length === 0 && loadWorks();
  }, []);

  const loadWorks = () => {
    setIsLoading(true);
    getWork()
      .then((res) => res.json())
      .then((res) => {
        setWorks(res);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  const clickWork = (employeeName, employeeId, newWorkType) => {
    setFullName(employeeName);
    props.handleWorkItemChange(employeeName, employeeId, newWorkType);
    toggleFormWindow();
  };

  const { formWindow, toggleFormWindow } = useFormWindow(
    'Выбор работы',
    <>
      <SearchBar
        fullSize
        setSearchQuery={setSearchQuery}
        placeholder="Введите название работы для поиска..."
      />
      <TableView
        data={works}
        searchQuery={searchQuery}
        selectWork={clickWork}
        isLoading={isLoading}
      />
    </>,
  );

  return (
    <div className="select-work-item">
      <div className="select-work-item__input">
        <div className="select-work-item__input_name main-form__input_name--header">
          {props.inputName + (props.required ? '*' : '')}
          {(props.readOnly === undefined || !props.readOnly) && (
            <SelectFromButton
              text="Выбрать тип работы"
              onClick={() => toggleFormWindow()}
            />
          )}
        </div>
        {(props.defaultValue || fullName) && (
          <div className="select-work-item__input_field">
            <div className="select-work-item__searchbar">
              <input
                type="text"
                className={
                  props.error === true
                    ? 'select-work-item__input select-work-item__input--error'
                    : 'select-work-item__input'
                }
                value={props.defaultValue ? props.defaultValue : fullName}
                placeholder="Выберите работу, нажав на кнопку 'Выбрать тип работы'"
                disabled
              />
            </div>
          </div>
        )}
      </div>
      {props.error === true && (
        <div
          className="select-work-item__error"
          onClick={
            props.setErrorsArr
              ? () =>
                  props.setErrorsArr({
                    ...props.errorsArr,
                    [props.name]: false,
                  })
              : null
          }
        >
          Поле не заполнено!
        </div>
      )}
      {formWindow}
    </div>
  );
};

export default SelectWorkItem;
