import nativeReceiver from "libs/nativeReceiver";
import { useCallback } from "react";
import { MessageData, MessageType, NativeMessage } from "types/native/message.types";

const useNative = () => {
  const postMessage = useCallback(
    <T extends MessageType["Request"]>(type: T, data: MessageData["Request"][T]) => {
      if (!window.ReactNativeWebView) return;

      const message = JSON.stringify({ type, data });
      window.ReactNativeWebView.postMessage(message);
    },
    []
  );

  const nativeRequest = async <T extends MessageType["Request"]>(
    type: T,
    data: MessageData["Request"][T],
    timeout?: number
  ): Promise<NativeMessage<T>["data"]> => {
    return new Promise((resolve, reject) => {
      let timer: NodeJS.Timeout | null = null;

      if (typeof timeout === "number" && timeout > 0) {
        timer = setTimeout(() => {
          nativeReceiver.unregisterCallback(handler);
          reject(new Error("Native 응답 시간 초과"));
        }, timeout);
      }

      const handler = (message: NativeMessage) => {
        const { type: resType, data: resData } = message;

        if (resType === type) {
          resolve(resData);
          cleanup();
        } else if (resType === "ERROR") {
          reject(resData);
          cleanup();
        }
      };

      const cleanup = () => {
        nativeReceiver.unregisterCallback(handler);
        if (timer) clearTimeout(timer);
      };

      postMessage(type, data);
      nativeReceiver.registerCallback(handler);
    });
  };

  const nativeEvent = {
    goBack: () => nativeRequest("GO_BACK", null, 2000),
    getIdToken: () => nativeRequest("GET_ID_TOKEN", null, 2000),
    getDeviceId: () => nativeRequest("GET_DEVICE_ID", null, 2000),
    saveImage: (uri: string | string[]) => nativeRequest("SAVE_IMAGE", uri),
    selectImage: () => nativeRequest("SELECT_IMAGE", null),
    launchCamera: () => nativeRequest("LAUNCH_CAMERA", null)
  };

  return { postMessage, nativeRequest, nativeEvent };
};

export default useNative;
