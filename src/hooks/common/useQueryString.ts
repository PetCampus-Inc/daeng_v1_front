import queryString from "query-string";
import { useLocation } from "react-router-dom";

const useQueryString = (): queryString.ParsedQuery<string> => {
  const { search }: { search: string } = useLocation();
  const query: queryString.ParsedQuery<string> = queryString.parse(search);

  return query;
};

export default useQueryString;
