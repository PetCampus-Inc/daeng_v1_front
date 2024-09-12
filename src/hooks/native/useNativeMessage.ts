import { useCallback } from "react";
import { NativeMessageType, NativeMessagePayload } from "types/native/message.types";

export const postMessage = <T extends NativeMessageType<"Request">>(
  type: T,
  data: NativeMessagePayload<"Request", T>
) => {
  if (!window.ReactNativeWebView) return;
  const message = JSON.stringify({ type, data });
  window.ReactNativeWebView.postMessage(message);
};

const usePostMessage = () => {
  return useCallback(postMessage, []);
};

export default usePostMessage;
