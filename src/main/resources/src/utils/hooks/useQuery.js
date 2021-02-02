import { useHistory, useLocation } from "react-router-dom";

const useQuery = () => {
  const unparsedQuery = useLocation().search;
  const query = new URLSearchParams(unparsedQuery);
  const history = useHistory();

  const pushParamToURL = (name, value, ignoreURL = false) => {
    if (ignoreURL) return;
    const oldQuery = history.location.search;
    let query = new URLSearchParams(oldQuery);
    query.set(name, value);
    history.push({
      search: `?${query.toString()}`,
    });
  };

  return { query, unparsedQuery, pushParamToURL };
};

export default useQuery;
