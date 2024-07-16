import usePostMessage from "hooks/native/usePostMessage";
import NativeReceiver from "libs/nativeReceiver";
import { useCallback, useEffect, useState } from "react";
import { WebViewGetMessage } from "types/native/message.types";

interface NativeOptions {
  onProgress?: (progress: number) => void;
  onSuccess?: (success: boolean) => void;
}

const useSaveImage = ({ onProgress, onSuccess }: NativeOptions = {}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number | null>(null);

  const { post } = usePostMessage();

  const save = useCallback(
    (imageUrls: string | string[]) => {
      setLoading(true);
      post("SAVE_IMAGE", imageUrls);
    },
    [post]
  );

  const updateProgress = useCallback(
    (progress: number) => {
      setProgress(progress);
      onProgress?.(progress);
    },
    [onProgress]
  );

  const completeImageSave = useCallback(
    (data: boolean) => {
      onSuccess?.(data);

      setLoading(false);
      setProgress(null);
    },
    [onSuccess]
  );

  useEffect(() => {
    const handleMessage = ({ type, data }: WebViewGetMessage) => {
      switch (type) {
        case "SAVE_IMAGE_SUCCESS":
          completeImageSave(data);
          break;
        case "SAVE_IMAGE_PROGRESS":
          updateProgress(data);
          break;
      }
    };

    NativeReceiver.registerCallback(handleMessage);
    return () => {
      NativeReceiver.unregisterCallback(handleMessage);
    };
  }, [updateProgress, completeImageSave]);

  return { loading, progress, save };
};

export default useSaveImage;
