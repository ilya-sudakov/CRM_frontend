import { useLocation } from "react-router-dom";

const useQuery = () => {
  const unparsedQuery = useLocation().search;
  const query = new URLSearchParams(unparsedQuery);
  return { query, unparsedQuery };
};

export default useQuery;
