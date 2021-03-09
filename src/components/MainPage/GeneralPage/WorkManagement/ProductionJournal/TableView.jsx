import { useState } from 'react';
import PlaceholderLoading from 'Utils/TableView/PlaceholderLoading/PlaceholderLoading.jsx';
import ChevronSVG from 'Assets/tableview/chevron-down.inline.svg';
import EditSVG from 'Assets/tableview/edit.inline.svg';
import ShareSVG from 'Assets/tableview/bx-window-open.inline.svg';
import AddToButton from 'Utils/Form/AddToButton/AddToButton.jsx';
import { dateDiffInDays, formatDateStringNoYear } from 'Utils/functions.jsx';
import { Link } from 'react-router-dom';
import { sortByField } from 'Utils/sorting/sorting.js';
import { defaultJournalWorkshops } from './objects.js';

const TableView = ({
  isLoading,
  employees,
  searchQuery,
  curDay,
  todaysWork,
  yesterdaysWork,
  handleOpenWorkForm,
}) => {
  const [workshops, setWorkshops] = useState(defaultJournalWorkshops);
  const filterEmployees = (employees, searchQuery) => {
    const query = searchQuery.toLowerCase();
    return employees.filter(
      (employee) =>
        employee?.relevance !== 'Уволен' &&
        employee?.workshop !== 'Уволенные' &&
        (employee?.lastName?.toLowerCase()?.includes(query) ||
          employee?.name?.toLowerCase()?.includes(query) ||
          employee?.middleName?.toLowerCase()?.includes(query)),
    );
  };

  return (
    <div className="notes-journal__list">
      {Object.values(workshops).map((workshop, index) => {
        const filteredEmployees = sortByField(
          filterEmployees(employees, searchQuery).filter(
            (employee) => employee.workshop === workshop.name,
          ),
          {
            fieldName: 'lastName',
            direction: 'asc',
          },
        );
        if (filteredEmployees.length === 0) return null;
        return (
          <div className="notes-journal__list-item" key={index}>
            <span
              onClick={() =>
                setWorkshops({
                  ...workshops,
                  [workshop.engName]: {
                    ...workshop,
                    active: !workshop.active,
                  },
                })
              }
            >
              {workshop.name}
              <ChevronSVG
                className={`main-window__img ${
                  !workshop.active ? 'main-window__img--rotated' : ''
                }`}
              />
            </span>
            <div className="notes-journal__employees">
              {isLoading ? (
                <PlaceholderLoading itemClassName="employees__row" />
              ) : workshop.active ? (
                filteredEmployees.map((employee) => {
                  const prevDay = new Date(
                    new Date(curDay).setDate(curDay.getDate() - 1),
                  );
                  const isWeekend =
                    prevDay.getDay() === 0 || prevDay.getDay() === 6;
                  const screenIsMobile =
                    (window.innerWidth ||
                      document.documentElement.clientWidth ||
                      document.body.clientWidth) <= 768;
                  return (
                    <div className="employees__row" key={employee.id}>
                      <span>
                        <Link
                          to={`/dispatcher/employees/edit/${employee.id}`}
                          target="_blank"
                        >
                          <div>
                            {`${employee.lastName} ${employee.name} ${employee.middleName}`}
                            <ShareSVG className="main-window__img" />
                          </div>
                          <div>{employee.position}</div>
                        </Link>
                      </span>
                      <div className="employees__days-wrapper">
                        {screenIsMobile ? null : (
                          <DayItem
                            isWeekend={isWeekend}
                            handleOpenWorkForm={handleOpenWorkForm}
                            dayType="yesterday"
                            employee={employee}
                            workshopName={workshop.engName}
                            curDay={curDay}
                            works={
                              yesterdaysWork[workshop.engName][employee.id]
                                ?.works
                            }
                          />
                        )}
                        <DayItem
                          isWeekend={isWeekend}
                          handleOpenWorkForm={handleOpenWorkForm}
                          dayType="today"
                          employee={employee}
                          workshopName={workshop.engName}
                          curDay={curDay}
                          works={
                            todaysWork[workshop.engName][employee.id]?.works
                          }
                        />
                      </div>
                    </div>
                  );
                })
              ) : null}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TableView;

const DayItem = ({
  isWeekend,
  handleOpenWorkForm,
  dayType = 'yesterday',
  employee,
  workshopName,
  works,
  curDay,
}) => {
  const isOldData = Math.abs(dateDiffInDays(curDay, new Date())) >= 1;
  const prevDay = new Date(new Date(curDay).setDate(curDay.getDate() - 1));
  const dayTypes = {
    yesterday: 'Вчера',
    today: 'Сегодня',
  };
  return (
    <span className={`employees__day ${isWeekend ? 'employees__weekend' : ''}`}>
      <div className="employees__day-header">
        <AddToButton
          text="Добавить работу"
          onClick={() =>
            handleOpenWorkForm(dayType, 'new', workshopName, employee, works)
          }
        />
        <span>
          {isOldData
            ? formatDateStringNoYear(dayType === 'yesterday' ? prevDay : curDay)
            : dayTypes[dayType]}
        </span>
        {works?.length > 0 ? (
          <span>{`${works?.reduce((sum, cur) => cur.hours + sum, 0)} ч`}</span>
        ) : null}
      </div>
      {sortByField(works, { fieldName: 'hours', direction: 'desc' })?.map(
        (work) => (
          <WorkItem
            work={work}
            key={work.id}
            onClick={() =>
              handleOpenWorkForm(
                dayType,
                'edit',
                workshopName,
                employee,
                works,
                work.id,
              )
            }
          />
        ),
      )}
    </span>
  );
};

const WorkItem = ({ work, onClick }) => {
  const noProductError =
    work.product.length === 0 && work.workType === 'Продукция';
  const noDraftError = work.draft.length === 0 && work.workType === 'Чертеж';
  return (
    <div
      className={`employees__work-item ${
        noProductError || noDraftError ? 'employees__work-item--no-product' : ''
      }`}
      onClick={onClick}
    >
      <EditSVG className="employees__img" />
      <div className="employees__work-header">
        <span>{work.workName}</span>
        <span>{`${work.hours} ч`}</span>
      </div>
      <ProductList work={work} name="product" />
      <ProductList work={work} name="draft" />
      {work.comment !== '' ? (
        <div className="employees__comment">
          <span>Комментарий:</span>
          <span>{work.comment}</span>
        </div>
      ) : null}
      {noProductError ? (
        <div className="employees__error">Не указана продукция</div>
      ) : null}
      {noDraftError ? (
        <div className="employees__error">Не указан чертеж</div>
      ) : null}
    </div>
  );
};

const ProductList = ({ work = {}, name = '' }) => {
  if (work[name].length === 0) return null;
  return (
    <div className="employees__item-list">
      {work[name]?.map((product) => (
        <span
          key={product.id}
        >{`${product.name} - ${product.quantity} шт`}</span>
      ))}
    </div>
  );
};
