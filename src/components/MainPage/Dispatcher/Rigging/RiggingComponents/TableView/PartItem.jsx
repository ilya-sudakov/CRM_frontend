import editIcon from 'Assets/tableview/edit.svg';
import './TableView.scss';
import { addSpaceDelimiter } from 'Utils/functions.jsx';
import { rigStatuses, rigTypes, workshopsLocations } from '../rigsVariables';
import { editStampPartColor } from 'API/rigging';
import TableActions from 'Components/TableView/TableActions/TableActions.jsx';

const PartItem = ({ part, refItem, loadData, type, stampId }) => {
  return (
    <div
      key={part.id}
      className={
        'main-window__list-item main-window__list-item--' +
        (part.color || 'production') +
        (workshopsLocations[part.location]
          ? ''
          : ' main-window__list-item--message main-window__list-item--warning')
      }
      data-msg="Предупреждение! Введите корректное местоположение"
      ref={refItem}
    >
      <span
        className="main-window__list-item--border-checked"
        title={part.number}
      >
        <div className="main-window__mobile-text">Артикул:</div>
        {part.number}
      </span>
      <span
        className="main-window__list-item--border-checked"
        title={part.name}
      >
        <div className="main-window__mobile-text">Название:</div> {part.name}
      </span>
      <span
        className="main-window__list-item--border-checked"
        title={addSpaceDelimiter(part.amount)}
      >
        <div className="main-window__mobile-text">Кол-во:</div>
        {addSpaceDelimiter(part.amount)}
      </span>
      <span
        title={
          workshopsLocations[part.location]
            ? workshopsLocations[part.location].name
            : ''
        }
        className="main-window__list-item--border-checked"
      >
        <div className="main-window__mobile-text">Местоположение:</div>
        {workshopsLocations[part.location]
          ? workshopsLocations[part.location].name
          : ''}
      </span>
      <span title={part.comment}>
        <div className="main-window__mobile-text">Комментарий:</div>
        {part.comment}
      </span>
      <span
        className={
          'main-window__list-item--' +
          rigStatuses[part.color || 'production'].className +
          'main-window__list-item--border-checked'
        }
      >
        <div className="main-window__mobile-text">Статус:</div>
        <select
          id={part.id}
          className="main-window__status_select"
          value={part.color}
          onChange={({ target }) =>
            editStampPartColor(
              {
                color: target.value,
              },
              part.id,
            ).then(() => loadData())
          }
        >
          {Object.values(rigStatuses).map((status, index) => (
            <option key={index} value={status.className}>
              {status.name}
            </option>
          ))}
        </select>
      </span>
      <span
        className="main-window__list-item--border-checked"
        title={part.cuttingDimensions}
      >
        <div className="main-window__mobile-text">Распил/габариты:</div>
        {part.cuttingDimensions}
      </span>
      <span
        className="main-window__list-item--border-checked"
        title={part.milling}
      >
        <div className="main-window__mobile-text">Фрезеровка/точение:</div>
        {part.milling}
      </span>
      <span
        className="main-window__list-item--border-checked"
        title={part.harding}
      >
        <div className="main-window__mobile-text">Закалка:</div>
        {part.harding}
      </span>
      <span
        className="main-window__list-item--border-checked"
        title={part.grinding}
      >
        <div className="main-window__mobile-text">Шлифовка:</div>
        {part.grinding}
      </span>
      <span
        title={part.erosion}
        className="main-window__list-item--border-checked"
      >
        <div className="main-window__mobile-text">Эрозия:</div>
        {part.erosion}
      </span>
      <TableActions
        actionsList={[
          {
            link: `${rigTypes[type].redirectURL}/edit/${stampId}?part=${part.id}`,
            imgSrc: editIcon,
            title: 'Редактировать',
          },
        ]}
      />
    </div>
  );
};

export default PartItem;
