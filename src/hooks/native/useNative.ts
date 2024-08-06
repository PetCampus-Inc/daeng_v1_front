import nativeReceiver from "libs/nativeReceiver";
import { useCallback, useMemo } from "react";
import { MessageData, MessageType, NativeMessage } from "types/native/message.types";
import { v4 as uuidv4 } from "uuid";

const useNative = () => {
  const postMessage = useCallback(
    <T extends MessageType["Request"]>(
      type: T,
      data: MessageData["Request"][T],
      requestId: string
    ) => {
      if (!window.ReactNativeWebView) return;

      const message = JSON.stringify({ type, data, requestId });
      window.ReactNativeWebView.postMessage(message);
    },
    []
  );

  const nativeRequest = useCallback(
    async <T extends MessageType["Request"]>(
      type: T,
      data: MessageData["Request"][T],
      timeout?: number
    ): Promise<NativeMessage<T>["data"]> => {
      return new Promise((resolve, reject) => {
        const requestId = uuidv4();
        let timer: NodeJS.Timeout | null = null;

        if (typeof timeout === "number" && timeout > 0) {
          timer = setTimeout(() => {
            nativeReceiver.unregisterCallback(requestId);
            reject(new Error("Native 응답 시간 초과"));
          }, timeout);
        }

        const handler = (message: NativeMessage) => {
          const { type: resType, data: resData, requestId: resRequestId } = message;

          if (resRequestId === requestId) {
            if (resType === type) resolve(resData);
            else if (resType === "ERROR") reject(resData);
            cleanup();
          }
        };

        const cleanup = () => {
          nativeReceiver.unregisterCallback(requestId);
          if (timer) clearTimeout(timer);
        };

        postMessage(type, data, requestId);
        nativeReceiver.registerCallback(requestId, handler);
      });
    },
    [postMessage]
  );

  const native = useMemo(
    () => ({
      call: (number: string) => nativeRequest("CALL", number),
      goBack: () => nativeRequest("GO_BACK", null, 2000),
      saveImage: (uri: string | string[]) => nativeRequest("SAVE_IMAGE", uri),
      selectImage: () => nativeRequest("SELECT_IMAGE", null),
      launchCamera: () => nativeRequest("LAUNCH_CAMERA", null)
    }),
    [nativeRequest]
  );

  return { postMessage, nativeRequest, native };
};

export default useNative;
