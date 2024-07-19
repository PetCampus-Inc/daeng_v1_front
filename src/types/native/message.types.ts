interface CoreMessage {
  Request: {
    GET_ID_TOKEN: null;
    GET_DEVICE_ID: null;
  };
  Response: {
    ERROR: string;
    GET_ID_TOKEN: string;
    GET_DEVICE_ID: string;
  };
}

interface DeviceActionMessage {
  Request: {
    GO_BACK: null;
    SAVE_IMAGE: string | string[];
    SELECT_IMAGE: null;
    LAUNCH_CAMERA: null;
  };
  Response: {
    GO_BACK: null;
    SAVE_IMAGE: boolean;
    SELECT_IMAGE: string[] | boolean;
    LAUNCH_CAMERA: string;
  };
}

export interface MessageData {
  Request: CoreMessage["Request"] & DeviceActionMessage["Request"];
  Response: CoreMessage["Response"] & DeviceActionMessage["Response"];
}

export interface MessageType {
  Request: keyof MessageData["Request"];
  Response: keyof MessageData["Response"];
}

export type MessageDataType = {
  Request: MessageData["Request"][MessageType["Request"]];
  Response: MessageData["Response"][MessageType["Response"]];
};

export type NativeMessage<T extends MessageType["Response"] = MessageType["Response"]> =
  T extends unknown ? { type: T; data: MessageData["Response"][T] } : never;

/**
 * 오브젝트가 WebViewGetMessage 타입인지 확인합니다.
 * @param obj - unknown
 * @returns boolean
 */
export const isNativeMessage = (obj: unknown): obj is NativeMessage => {
  return obj !== null && typeof obj === "object" && "type" in obj && "data" in obj;
};

/**
 * WebViewGetMessage의 data 타입이 올바른지 확인합니다.
 * @param message - WebViewGetMessage
 * @returns boolean
 */
export const isValidMessageData = (message: NativeMessage): message is NativeMessage => {
  const { type, data } = message;

  const validators: Record<MessageType["Response"], (data: unknown) => boolean> = {
    GO_BACK: (data): data is null => data === null,
    GET_ID_TOKEN: (data): data is string => typeof data === "string",
    GET_DEVICE_ID: (data): data is string => typeof data === "string",
    ERROR: (data): data is string => typeof data === "string",
    SAVE_IMAGE: (data): data is boolean => typeof data === "boolean",
    LAUNCH_CAMERA: (data): data is string => typeof data === "string",
    SELECT_IMAGE: (data): data is string[] | boolean =>
      typeof data === "boolean" ||
      (Array.isArray(data) && data.every((item) => typeof item === "string"))
  };

  return type in validators && validators[type](data);
};
