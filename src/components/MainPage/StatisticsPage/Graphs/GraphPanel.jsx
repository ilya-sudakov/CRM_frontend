import { useEffect, useState } from 'react';
import FormWindow from '../../../../utils/Form/FormWindow/FormWindow.jsx';

const GraphPanel = ({
  isLoaded,
  isLoading,
  category,
  renderIcon,
  chartName,
  timePeriod,
  windowContent,
}) => {
  const [showWindow, setShowWindow] = useState(false);

  useEffect(() => {}, [showWindow, setShowWindow, windowContent]);

  return (
    <div
      className={`panel panel--chart ${
        isLoaded && !isLoading ? '' : 'panel--placeholder'
      }`}
    >
      <div className="panel__category" onClick={() => setShowWindow(true)}>
        <span>{category || 'Категория'}</span>
        {renderIcon ? <div className="panel__icon">{renderIcon()}</div> : null}
      </div>
      {windowContent ? (
        <FormWindow
          title={category}
          content={windowContent}
          showWindow={showWindow}
          setShowWindow={setShowWindow}
        />
      ) : null}
      <div
        className={`panel__chart-wrapper panel__chart-wrapper--${chartName}`}
      ></div>
      <div className={`panel__difference`}>
        <div className="panel__time-period">{isLoaded ? timePeriod : ''}</div>
      </div>
    </div>
  );
};

export default GraphPanel;
