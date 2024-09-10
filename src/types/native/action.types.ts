import { SocialAuthData, SocialProvider } from "types/member/auth.types";

export interface NativeActionMap {
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

export type NativeAction = keyof NativeActionMap;

export type NativeActionPayload<T extends NativeAction> = NativeActionMap[T];

export type NativeActionRequest<T extends NativeAction> = {
  id: string;
  action: T;
  payload: NativeActionPayload<T>["request"];
};

export type NativeActionResponse<T extends NativeAction> = {
  id: string;
  status: "SUCCESS" | "ERROR";
  action: T;
  payload: NativeActionPayload<T>["response"];
};
