import nativeReceiver from "libs/nativeReceiver";
import { useCallback, useMemo } from "react";
import { SocialProvider } from "types/member/auth.types";
import {
  NativeAction,
  NativeActionResponse,
  NativeActionRequest,
  NativeActionPayload
} from "types/native/action.types";
import { isNativeActionResponse } from "utils/is/nativeAction";
import showToast from "utils/showToast";
import { v4 as uuidv4 } from "uuid";

const useNativeAction = () => {
  const postAction = useCallback(
    <T extends NativeAction>({ id, action, payload }: NativeActionRequest<T>) => {
      if (!window.ReactNativeWebView) {
        showToast("앱에서만 사용할 수 있는 기능입니다.", "bottom", 1000);
        return;
      }
      const message = JSON.stringify({ id, action, payload });
      window.ReactNativeWebView.postMessage(message);
    },
    []
  );

  const nativeRequest = useCallback(
    async <T extends NativeAction>(
      action: T,
      payload: NativeActionPayload<T>["request"] = null,
      timeout?: number
    ): Promise<NativeActionResponse<T>["payload"]> => {
      return new Promise((resolve, reject) => {
        const requestId = uuidv4();
        let timer: NodeJS.Timeout | null = null;

        if (typeof timeout === "number" && timeout > 0) {
          timer = setTimeout(() => {
            nativeReceiver.unregisterActionCallback(requestId);
            reject(new Error("Native 응답 시간 초과"));
          }, timeout);
        }

        const handler = (message: NativeActionResponse<NativeAction>) => {
          if (isNativeActionResponse(message) && message.id === requestId) {
            const { status, payload: resPayload } = message;

            if (message.action === action) {
              if (status === "SUCCESS") resolve(resPayload);
              else if (status === "ERROR") reject(new Error(resPayload as string));
              cleanup();
            }
          }
        };

        const cleanup = () => {
          nativeReceiver.unregisterActionCallback(requestId);
          if (timer) clearTimeout(timer);
        };

        postAction({ id: requestId, action, payload });
        nativeReceiver.registerActionCallback(requestId, handler);
      });
    },
    [postAction]
  );

  return useMemo(
    () => ({
      call: (number: string) => nativeRequest("CALL", number),
      saveMedia: (uri: string) => nativeRequest("SAVE_MEDIA", uri),
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

export default useNativeAction;
