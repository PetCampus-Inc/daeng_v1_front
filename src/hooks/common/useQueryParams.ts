import { useLocation } from "react-router-dom";

interface Options<T> {
  parser?: (val: string) => T;
  required?: boolean;
}

export function useQueryParam<T = string>(name: string): T | undefined;
export function useQueryParam<T = string>(
  name: string,
  options: Options<T> & { required: true }
): T;
export function useQueryParam<T = string>(name: string, options?: Options<T>) {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const value = queryParams.get(name);

  if (options?.required && value === null) {
    `${name} is required`;
  }

  if (options?.parser && value !== null) {
    return options.parser(value);
  }

  return value as T | undefined;
}
