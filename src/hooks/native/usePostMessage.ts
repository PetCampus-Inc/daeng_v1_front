import { useCallback } from "react";
import { MessageData, MessageType } from "types/native/message.types";

const usePostMessage = () => {
  const post = useCallback(
    <T extends MessageType["POST"]>(type: T, data: MessageData["POST"][T]) => {
      if (!window.ReactNativeWebView) return;

      const message = JSON.stringify({ type, data });
      window.ReactNativeWebView.postMessage(message);
    },
    []
  );

  return { post };
};

export default usePostMessage;
