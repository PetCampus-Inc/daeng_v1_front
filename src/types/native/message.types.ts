// ----------------------------------------------------------------------------------
//
// ----------------------------------------------------------------------------------

export interface SaveImageProgress {
  current: number;
  remaining: number;
  total: number;
}

// ----------------------------------------------------------------------------------
//
// ----------------------------------------------------------------------------------

export type PostMessage = {
  SAVE_IMAGE: string | string[];
  SELECT_IMAGE: null;
  RUN_CAMERA: null;
};

export type GetMessage = {
  IS_APP: boolean;
  SAVE_IMAGE_SUCCESS: boolean;
  SAVE_IMAGE_PROGRESS: SaveImageProgress;
  SELECT_IMAGE_SUCCESS: string[] | boolean;
};

export type PostMessageType = keyof PostMessage;
export type GetMessageType = keyof GetMessage;

// ----------------------------------------------------------------------------------
//
// ----------------------------------------------------------------------------------

export type WebViewMessage<T extends GetMessageType = GetMessageType> = T extends any
  ? { type: T; data: GetMessage[T] }
  : never;

export const isValidGetMessage = (message: any): message is WebViewMessage => {
  if (!message || typeof message !== "object") return false;

  const { type, data } = message as WebViewMessage;

  const validators: Record<GetMessageType, (data: any) => boolean> = {
    IS_APP: (data) => typeof data === "boolean",
    SAVE_IMAGE_SUCCESS: (data) => typeof data === "boolean",
    SAVE_IMAGE_PROGRESS: (data) =>
      typeof data === "object" &&
      data !== null &&
      "current" in data &&
      "remaining" in data &&
      "total" in data,
    SELECT_IMAGE_SUCCESS: (data) =>
      typeof data === "boolean" ||
      (Array.isArray(data) && data.every((item) => typeof item === "string"))
  };

  return type in validators && validators[type](data);
};
