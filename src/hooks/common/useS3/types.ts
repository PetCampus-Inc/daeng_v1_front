export type TResult = {
  url: string;
  error: string | null;
};

export interface MutateOptions<TData, TError, TVariables> {
  onSuccess?: (data: TData, variables: TVariables) => void;
  onError?: (error: TError, variables: TVariables) => void;
  onSettled?: (data: TData | undefined, error: TError | null, variables: TVariables) => void;
}

export interface UploadToS3Function<TData, TError, TVariables> {
  (
    variables: TVariables,
    options?: MutateOptions<TData, TError, TVariables>
  ): Promise<TData | void>;
}
