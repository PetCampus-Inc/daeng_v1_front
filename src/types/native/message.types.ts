export interface NativeMessageMap {
  Request: {
    GO_BACK: null;
    LOGIN_SUCCESS: null;
    LOGOUT: null;
    REFRESH_TOKEN: null;
  };
  Response: {
    NEW_NOTIFICATION: string;
    PUSH_NOTIFICATION: string;
  };
}

export type NativeMessageType<T extends keyof NativeMessageMap> = keyof NativeMessageMap[T];

export type NativeMessageData<
  T extends keyof NativeMessageMap,
  K extends keyof NativeMessageMap[T]
> = NativeMessageMap[T][K];

export type NativeMessageRequest<T extends NativeMessageType<"Request">> = {
  type: T;
  data: NativeMessageData<"Request", T>;
};

export type NativeMessageResponse<T extends NativeMessageType<"Response">> = {
  type: T;
  data: NativeMessageData<"Response", T>;
};
