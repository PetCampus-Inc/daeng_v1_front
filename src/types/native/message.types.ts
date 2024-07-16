interface ServiceData {
  GET: {
    IS_APP: string;
    ID_TOKEN: string;
  };
  POST: {
    GO_BACK: null;
    GET_ID_TOKEN: null;
  };
}

interface NativeData {
  GET: {
    SAVE_IMAGE_SUCCESS: boolean;
    SAVE_IMAGE_PROGRESS: number;
    SELECT_IMAGE_SUCCESS: string[] | boolean;
  };
  POST: {
    SAVE_IMAGE: string | string[];
    SELECT_IMAGE: null;
  };
}

export interface MessageData {
  GET: NativeData["GET"] & ServiceData["GET"];
  POST: NativeData["POST"] & ServiceData["POST"];
}

export interface MessageType {
  GET: keyof MessageData["GET"];
  POST: keyof MessageData["POST"];
}

export type MessageDataType = MessageData["GET"][MessageType["GET"]];

// export type WebViewGetMessage<T extends MessageType["GET"] = MessageType["GET"]> = T extends any
//   ? { type: T; data: MessageData["GET"][T] }
//   : never;

export type WebViewGetMessage = {
  [K in MessageType["GET"]]: { type: K; data: MessageData["GET"][K] };
}[MessageType["GET"]];

/**
 * 오브젝트가 WebViewGetMessage 타입인지 확인합니다.
 * @param obj - unknown
 * @returns boolean
 */
export const isWebViewMessage = (obj: unknown): obj is WebViewGetMessage => {
  return obj !== null && typeof obj === "object" && "type" in obj && "data" in obj;
};

/**
 * WebViewGetMessage의 data 타입이 올바른지 확인합니다.
 * @param message - WebViewGetMessage
 * @returns boolean
 */
export const validMessageData = (message: WebViewGetMessage): message is WebViewGetMessage => {
  const { type, data } = message as WebViewGetMessage;

  const validators: Record<MessageType["GET"], (data: unknown) => boolean> = {
    IS_APP: (data): data is string => typeof data === "string",
    ID_TOKEN: (data): data is string => typeof data === "string",
    SAVE_IMAGE_SUCCESS: (data): data is boolean => typeof data === "boolean",
    SAVE_IMAGE_PROGRESS: (data): data is number => typeof data === "number",
    SELECT_IMAGE_SUCCESS: (data): data is string[] | boolean =>
      typeof data === "boolean" ||
      (Array.isArray(data) && data.every((item) => typeof item === "string"))
  };

  return type in validators && validators[type](data);
};
