import { useLocation } from "react-router-dom";

const usePathParams = (): string => {
  const { pathname }: { pathname: string } = useLocation();
  return pathname;
};

export default usePathParams;
