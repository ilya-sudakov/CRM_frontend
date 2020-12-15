import { getRequests } from "../../../utils/RequestsAPI/Requests.jsx";

export const pages = {
  open: {
    name: "Открытые",
    getRequests: (signal) => getRequests(signal),
  },
  shipped: {
    name: "Отгружено",
    getRequests: (signal) => getRequests(signal),
  },
  completed: {
    name: "Завершено",
    getRequests: (signal) => getRequests(signal),
  },
};
