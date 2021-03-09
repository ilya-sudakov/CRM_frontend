import { checkIfDateIsInRange } from '../functions';

//find new clients from cur month
export const statisticsFindNewClients = (
  requests,
  clients,
  currDate,
  keepOld = true,
) => {
  let newClients = 0;
  const data = requests.filter((request) => {
    if (
      request.client !== null &&
      checkIfDateIsInRange(
        request.date,
        currDate.startDate,
        currDate.endDate,
      ) &&
      clients[request.client.id] === undefined
    ) {
      newClients++;
      clients = {
        ...clients,
        [request.client.id]: '',
      };
      return !keepOld;
    }
    if (request.client === null) {
      return false;
    }
    return keepOld;
  });
  return [data, newClients];
};
