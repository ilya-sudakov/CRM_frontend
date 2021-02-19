import { getAuthHeaders } from "../../utilsAPI.jsx";
import axios from "axios";

export function getNotesJournalList(date = new Date()) {
  const headers = getAuthHeaders();
  return axios.get(
    `${process.env.API_BASE_URL}/api/v1/notes_journal?day=${date.getDate()}`,
    headers
  );
}
