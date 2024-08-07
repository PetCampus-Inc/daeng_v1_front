interface CoreMessage {
  Request: {
    GO_BACK: null;
    GET_ID_TOKEN: null;
    GET_DEVICE_ID: null;
  };
  Response: {
    ERROR: string;
    GO_BACK: null;
    GET_ID_TOKEN: string;
    GET_DEVICE_ID: string;
  };
}

interface DeviceActionMessage {
  Request: {
    CALL: string;
    SAVE_IMAGE: string | string[];
    SELECT_IMAGE: null;
    LAUNCH_CAMERA: null;
  };
  Response: {
    CALL: null;
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
