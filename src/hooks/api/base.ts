import { MutationObserverOptions, useMutation } from "@tanstack/react-query";
import { ApiErrorResponse } from "types/Response.type";

export const useBaseMutation = <TData, TVariables, TContext>(
  options: MutationObserverOptions<TData, ApiErrorResponse, TVariables, TContext>
) => {
  return useMutation(options);
};
