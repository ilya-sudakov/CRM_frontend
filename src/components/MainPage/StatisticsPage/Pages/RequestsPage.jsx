import React, { useEffect, useState } from 'react';
import RequestsQuantityPanel from '../Panels/RequestsQuantityPanel.jsx';
import AverageSumStatsPanel from '../Panels/AverageSumStatsPanel.jsx';
import NewClientsStatsPanel from '../Panels/NewClientsStatsPanel.jsx';
import NewOldClientsStatsPanel from '../Panels/NewOldClientsStatsPanel.jsx';
import ManagerEfficiencyGraphPanel from '../Graphs/ManagerEfficiencyGraphPanel.jsx';
import ManagerMoneyGraphPanel from '../Graphs/ManagerMoneyGraphPanel.jsx';
import RequestsAverageTimeCompletion from '../Panels/RequestsAverageTimeCompletionPanel.jsx';
import ProductQuantityInRequest from '../Panels/ProductQuantityInRequest.jsx';
import ClientTypeDistributionInRequests from '../Graphs/ClientTypeDistributionInRequests.jsx';
import OnTimeRequestsDistribution from '../Panels/OnTimeRequestsDistribution.jsx';
import IncomeStatsBigPanel from '../BigPanels/IncomeStatsBigPanel.jsx';
import { getRequests } from '../../../../utils/RequestsAPI/Requests.jsx';

const RequestsPage = ({ currDate, timePeriod }) => {
  const [requests, setRequests] = useState([]);
  const [requestsLoaded, setRequestsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const loadRequests = (signal) => {
    if (!requestsLoaded && !isLoading) {
      setIsLoading(true);
      getRequests(signal)
        .then((res) => res.json())
        .then((res) => {
          setRequestsLoaded(true);
          setRequests([...res]);
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
          setRequestsLoaded(true);
          console.log(error);
        });
    }
  };

  useEffect(() => {
    const abortController = new AbortController();
    loadRequests(abortController.signal);
    return function cancel() {
      abortController.abort();
    };
  }, []);

  return (
    <div className="statistics__page-wrapper">
      <div className="statistics__row">
        <div className="statistics__column" style={{ maxWidth: '700px' }}>
          <IncomeStatsBigPanel
            currDate={currDate}
            requests={requests}
            timeText={timePeriod.timeTextSmallPanel}
            getPrevData={timePeriod.getPrevData}
            loadData={loadRequests}
            curPeriod={timePeriod}
          />
        </div>
        <div className="statistics__column">
          <RequestsQuantityPanel
            currDate={currDate}
            requests={requests}
            timeText={timePeriod.timeTextSmallPanel}
            getPrevData={timePeriod.getPrevData}
          />
          <OnTimeRequestsDistribution
            currDate={currDate}
            requests={requests}
            timeText={timePeriod.timeTextSmallPanel}
            getPrevData={timePeriod.getPrevData}
          />
          <div className="statistics__row statistics__row--full">
            <NewClientsStatsPanel
              currDate={currDate}
              requests={requests}
              timeText={timePeriod.timeTextSmallPanel}
              getPrevData={timePeriod.getPrevData}
            />
            <NewOldClientsStatsPanel
              currDate={currDate}
              requests={requests}
              timeText={timePeriod.timeTextSmallPanel}
              getPrevData={timePeriod.getPrevData}
            />
          </div>
        </div>
      </div>
      <div className="statistics__row">
        <ManagerEfficiencyGraphPanel
          currDate={currDate}
          data={requests}
          timeText={timePeriod.timeTextGraphPanel}
        />
        <ManagerMoneyGraphPanel
          currDate={currDate}
          data={requests}
          timeText={timePeriod.timeTextGraphPanel}
        />
      </div>
      <div className="statistics__row statistics__row--full">
        <ProductQuantityInRequest
          currDate={currDate}
          requests={requests}
          timeText={timePeriod.timeTextSmallPanel}
          getPrevData={timePeriod.getPrevData}
        />
        <AverageSumStatsPanel
          currDate={currDate}
          requests={requests}
          timeText={timePeriod.timeTextSmallPanel}
          getPrevData={timePeriod.getPrevData}
        />
        <RequestsAverageTimeCompletion
          currDate={currDate}
          requests={requests}
          timeText={timePeriod.timeTextSmallPanel}
          getPrevData={timePeriod.getPrevData}
        />
      </div>
      <div className="statistics__row">
        <ClientTypeDistributionInRequests
          currDate={currDate}
          data={requests}
          timeText={timePeriod.timeTextGraphPanel}
        />
      </div>
    </div>
  );
};

export default RequestsPage;
