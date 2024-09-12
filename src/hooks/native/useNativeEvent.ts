import nativeReceiver from "libs/nativeReceiver";
import { useCallback, useMemo } from "react";
import { SocialProvider } from "types/member/auth.types";
import {
  NativeEventPayload,
  NativeEventRequest,
  NativeEventResponse,
  NativeEventType
} from "types/native/event.types";
import { isNativeEventResponse } from "utils/is/nativeEvent";
import { v4 as uuidv4 } from "uuid";

const useNativeEvent = () => {
  const postEventMessage = useCallback(
    <T extends NativeEventType>({ id, type, payload }: NativeEventRequest<T>) => {
      if (!window.ReactNativeWebView) return;
      const message = JSON.stringify({ id, type, payload });
      window.ReactNativeWebView.postMessage(message);
    },
    []
  );

  const nativeRequest = useCallback(
    async <T extends NativeEventType>(
      type: T,
      payload: NativeEventPayload<T>["request"] = null,
      timeout?: number
    ): Promise<NativeEventResponse<T>["payload"]> => {
      return new Promise((resolve, reject) => {
        const requestId = uuidv4();
        let timer: NodeJS.Timeout | null = null;

        if (typeof timeout === "number" && timeout > 0) {
          timer = setTimeout(() => {
            nativeReceiver.unregisterEventCallback(requestId);
            reject(new Error("Native 응답 시간 초과"));
          }, timeout);
        }

        const handler = (message: NativeEventResponse<NativeEventType>) => {
          if (isNativeEventResponse(message) && message.id === requestId) {
            const { status, payload: resPayload } = message;

            if (message.type === type) {
              if (status === "SUCCESS") resolve(resPayload);
              else if (status === "ERROR") reject(new Error(resPayload as string));
              cleanup();
            }
          }
        };

        const cleanup = () => {
          nativeReceiver.unregisterEventCallback(requestId);
          if (timer) clearTimeout(timer);
        };

        postEventMessage({ id: requestId, type, payload });
        nativeReceiver.registerEventCallback(requestId, handler);
      });
    },
    [postEventMessage]
  );

  return useMemo(
    () => ({
      call: (number: string) => nativeRequest("CALL", number),
      saveImage: (uri: string) => nativeRequest("SAVE_IMAGE", uri),
      selectImage: () => nativeRequest("SELECT_IMAGE"),
      launchCamera: () => nativeRequest("LAUNCH_CAMERA"),
      getFcmToken: () => nativeRequest("FCM_TOKEN"),
      socialLogin: (data: SocialProvider) => nativeRequest("SOCIAL_LOGIN", data),
      getSecurityStorage: (key: string) => nativeRequest("GET_SECURITY_STORAGE", key),
      setSecurityStorage: (data: { key: string; value: string }) =>
        nativeRequest("SET_SECURITY_STORAGE", data),
      removeSecurityStorage: (key: string) => nativeRequest("REMOVE_SECURITY_STORAGE", key)
    }),
    [nativeRequest]
  );
};

export default useNativeEvent;
