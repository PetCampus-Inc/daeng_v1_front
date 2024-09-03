import { SocialAuthData, SocialProvider } from "types/member/auth.types";

export interface NativeEventMap {
  CALL: {
    request: string;
    response: null;
  };
  SAVE_IMAGE: {
    request: string;
    response: null;
  };
  SELECT_IMAGE: {
    request: null;
    response: string[];
  };
  LAUNCH_CAMERA: {
    request: null;
    response: string;
  };
  FCM_TOKEN: {
    request: null;
    response: string;
  };
  SOCIAL_LOGIN: {
    request: SocialProvider;
    response: SocialAuthData;
  };
  GET_SECURITY_STORAGE: {
    request: string;
    response: string;
  };
  SET_SECURITY_STORAGE: {
    request: { key: string; value: string };
    response: null;
  };
  REMOVE_SECURITY_STORAGE: {
    request: string;
    response: null;
  };
}

export type NativeEventType = keyof NativeEventMap;

export type NativeEventPayload<T extends NativeEventType> = NativeEventMap[T];

export type NativeEventRequest<T extends NativeEventType> = {
  id: string;
  type: T;
  payload: NativeEventPayload<T>["request"];
};

export type NativeEventResponse<T extends NativeEventType> = {
  id: string;
  status: "SUCCESS" | "ERROR";
  type: T;
  payload: NativeEventPayload<T>["response"];
};
