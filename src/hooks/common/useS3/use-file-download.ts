import axios, { CancelTokenSource } from "axios";
import { useState, useCallback, useRef, useMemo } from "react";
import { throttle } from "utils/helper";
import showToast from "utils/showToast";

interface DownloadOptions<TData, TError, TVariables> {
  onSuccess?: (data: TData, variables: TVariables) => void;
  onError?: (error: TError, variables: TVariables) => void;
  onSettled?: (data: TData | undefined, error: TError | null, variables: TVariables) => void;
}

interface DownloadProps {
  urls: string | string[];
}

interface UseFileDownloadReturn<TData, TError, TVariables> {
  downloadFile: (
    variables: TVariables,
    options?: DownloadOptions<TData, TError, TVariables>
  ) => Promise<void>;
  isSuccess: boolean;
  isLoading: boolean;
  progress: number;
  downloaded: number;
}

export const useFileDownload = <
  TData = void,
  TError = Error,
  TVariables extends DownloadProps = DownloadProps
>(): UseFileDownloadReturn<TData, TError, TVariables> => {
  const [progress, setProgress] = useState(0);
  const [downloaded, setDownloaded] = useState(0);
  const [isSuccess, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const cancelTokenSourceRef = useRef<CancelTokenSource | null>(null);
  const lastClickTimeRef = useRef(0);

  const throttledUpdateProgress = useMemo(
    () =>
      throttle((progress) => {
        setProgress(progress);
      }, 700),
    []
  );

  const extractFileName = (url: string) => {
    const urlSegments = url.split("/");
    return urlSegments[urlSegments.length - 1];
  };

  const downloadFile = useCallback(
    async (variables: TVariables, options?: DownloadOptions<TData, TError, TVariables>) => {
      const now = Date.now();
      if (now - lastClickTimeRef.current < 2000) {
        return; // Throttle requests to once every 2 seconds
      }
      lastClickTimeRef.current = now;

      if (cancelTokenSourceRef.current) {
        cancelTokenSourceRef.current.cancel("Operation canceled due to new request.");
      }
      cancelTokenSourceRef.current = axios.CancelToken.source();

      setSuccess(false);
      setProgress(0);
      setDownloaded(0);
      setIsLoading(true);

      const urlsArray = Array.isArray(variables.urls) ? variables.urls : [variables.urls];
      const totalFiles = urlsArray.length;
      let completedFiles = 0;

      for (const [index, url] of urlsArray.entries()) {
        try {
          setDownloaded(index);

          const response = await axios.get(url, {
            responseType: "blob",
            onDownloadProgress: (progressEvent) => {
              const percentCompleted = Math.round(
                (progressEvent.loaded * 100) / (progressEvent?.total ?? 0)
              );
              throttledUpdateProgress(percentCompleted);
            },
            cancelToken: cancelTokenSourceRef.current.token
          });

          const blob = new Blob([response.data]);
          const blobUrl = window.URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = blobUrl;
          link.download = extractFileName(url);
          link.click();

          completedFiles += 1;
        } catch (error) {
          if (axios.isCancel(error)) {
            console.log("Request canceled:", error.message);
          } else {
            console.error("Error downloading file:", error);
            options?.onError?.(error as TError, variables);
            showToast("사진 다운로드 중 오류가 발생했습니다. 다시 시도해주세요.", "bottom");
          }
        }
      }

      setTimeout(() => {
        setIsLoading(false);
      }, 300);

      if (completedFiles === totalFiles) {
        setProgress(100);

        options?.onSuccess
          ? options.onSuccess(undefined as TData, variables)
          : showToast("사진이 저장되었습니다", "bottom");
        options?.onSettled?.(undefined as TData, null, variables);

        setSuccess(true);
      } else {
        options?.onSettled?.(undefined as TData, null, variables);
      }
    },
    [throttledUpdateProgress]
  );

  return {
    isSuccess,
    isLoading,
    progress,
    downloaded,
    downloadFile
  };
};
