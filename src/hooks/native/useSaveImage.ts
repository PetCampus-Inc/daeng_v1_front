import usePostMessage from "hooks/native/usePostMessage";
import NativeReceiver from "libs/nativeReceiver";
import { useCallback, useEffect, useState } from "react";
import { SaveImageProgress, WebViewMessage } from "types/native/message.types";

interface NativeOptions {
  onProgress?: (progress: SaveImageProgress) => void;
  onComplete?: (success: boolean) => void;
}

const useSaveImage = ({ onProgress, onComplete }: NativeOptions = {}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [progress, setProgress] = useState<SaveImageProgress | null>(null);

  const { post } = usePostMessage();

  const save = useCallback(
    (imageUrls: string[]) => {
      setLoading(true);
      post("SAVE_IMAGE", imageUrls);
    },
    [post]
  );

  const reset = useCallback(() => {
    setLoading(false);
    setProgress(null);
  }, []);

  const updateProgress = useCallback(
    (progress: SaveImageProgress) => {
      setProgress(progress);
      onProgress?.(progress);
    },
    [onProgress]
  );

  const completeImageSave = useCallback(
    (data: boolean) => {
      reset();
      onComplete?.(data);
    },
    [onComplete, reset]
  );

  useEffect(() => {
    const handleMessage = ({ type, data }: WebViewMessage) => {
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
  }, [updateProgress, completeImageSave, reset]);

  return { loading, progress, save };
};

export default useSaveImage;
