import useNativeAction from "hooks/native/useNativeAction";
import { useCallback, useState } from "react";
import showToast from "utils/showToast";

interface SaveMediaOptions {
  onSuccess?: () => void;
  onError?: (message: string) => void;
  onSettled?: () => void;
}

/** `Native` 이미지 및 동영상 저장 훅 */
export const useSaveMedia = () => {
  const [progress, setProgress] = useState(0);
  const [total, setTotal] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const { saveMedia: saveNativeMedia } = useNativeAction();

  /**
   * 이미지 및 동영상 저장 함수
   * @param urls 저장할 미디어 `URL` 또는 `URL` 배열
   * @param options 성공 시 실행할 함수
   * @param options 실패 시 실행할 함수
   */
  const saveMedia = useCallback(
    async (urls: string | string[], options?: SaveMediaOptions) => {
      const urlList = Array.isArray(urls) ? urls : [urls];

      setIsLoading(true);
      setTotal(urlList.length);
      setCurrentIndex(0);
      setProgress(0);

      try {
        for (const [index, url] of urlList.entries()) {
          setCurrentIndex(index);
          await saveNativeMedia(url);

          const percentCompleted = Math.round(((index + 1) * 100) / urlList.length);
          setProgress(percentCompleted);
        }

        setProgress(100);
        showToast("사진이 저장되었습니다", "bottom");
        options?.onSuccess?.();
      } catch (error) {
        const message = error instanceof Error ? error.message : "알 수 없는 오류가 발생했습니다.";
        options?.onError?.(message);
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 300);
        options?.onSettled?.();
      }
    },
    [saveNativeMedia]
  );

  return { saveMedia, isLoading, progress, total, currentIndex };
};
