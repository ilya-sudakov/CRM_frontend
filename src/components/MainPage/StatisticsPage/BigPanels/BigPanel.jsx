import { useEffect, useState } from 'react';
import FormWindow from 'Utils/Form/FormWindow/FormWindow.jsx';

const BigPanel = ({
  isLoaded,
  isLoading,
  renderIcon,
  value,
  prevValue,
  category,
  invertedStats,
  percentage,
  timePeriod,
  // charts,
  windowCharts,
  windowContent,
  content,
  curPeriod,
  currDate,
}) => {
  const [showWindow, setShowWindow] = useState(false);

  useEffect(() => {}, [isLoaded]);

  useEffect(() => {
    console.log(currDate);
  }, [showWindow, setShowWindow, windowContent, content]);

  return (
    <div
      className={`panel panel--big ${
        isLoaded && !isLoading ? '' : 'panel--placeholder'
      }`}
      // to={linkTo || "/"}
    >
      <div className="panel__category" onClick={() => setShowWindow(true)}>
        <span>{category || 'Категория'}</span>
        {renderIcon ? <div className="panel__icon">{renderIcon}</div> : null}
      </div>
      {windowContent || windowCharts ? (
        <FormWindow
          title={category}
          content={
            <>
              {windowContent}
              {windowCharts ? (
                <>
                  <div className="main-window__title">Графики</div>
                  <div className="panel__charts-wrapper">{windowCharts}</div>
                </>
              ) : null}
            </>
          }
          showWindow={showWindow}
          setShowWindow={setShowWindow}
        />
      ) : null}
      <div className="panel__values">
        {curPeriod.name === 'Месяц' &&
        currDate.startDate.getMonth() === 0 ? null : (
          <PanelValue
            curPeriod={curPeriod}
            type="previous"
            value={prevValue}
            isLoaded={isLoaded}
          />
        )}
        <PanelValue
          curPeriod={curPeriod}
          type="current"
          value={value}
          isLoaded={isLoaded}
        />
      </div>
      {curPeriod.name === 'Месяц' &&
      currDate.startDate.getMonth() === 0 ? null : (
        <div
          className={`panel__difference panel__difference--${
            invertedStats === true
              ? percentage === 0 || !isLoaded
                ? 'equal'
                : percentage >= 0
                ? 'negative'
                : 'positive'
              : percentage === 0 || !isLoaded
              ? 'equal'
              : percentage < 0
              ? 'negative'
              : 'positive'
          }`}
        >
          <div className="panel__arrow"></div>
          <div className="panel__percentage">
            {isLoaded ? `${Math.abs(percentage)}%` : ''}
          </div>
          <div className="panel__time-period">{isLoaded ? timePeriod : ''}</div>
        </div>
      )}
      <div
        className={`panel__difference panel__difference--${
          percentage === 0 || !isLoaded
            ? 'equal'
            : percentage < 0
            ? 'negative'
            : 'positive'
        }`}
      ></div>
      {content}
    </div>
  );
};

export default BigPanel;

const PanelValue = ({ curPeriod, isLoaded, value, type = 'current' }) => {
  return (
    <div className={`panel__value panel__value--${type}`}>
      <span>{`${
        type === 'current' ? 'Текущ' : 'Пред'
      }. ${curPeriod.name.toLowerCase()}`}</span>
      <div>{isLoaded ? value || 0 : null}</div>
    </div>
  );
};
