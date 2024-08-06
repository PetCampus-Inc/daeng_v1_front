import { AdminRole } from "types/common/role.types";
import { FirebaseAuthData } from "types/member/auth.types";
import { MessageType, NativeMessage } from "types/native/message.types";

export function isAdmin(role: unknown): role is AdminRole {
  return role === AdminRole.ROLE_TEACHER || role === AdminRole.ROLE_OWNER;
}

export function isNumber(value: unknown): value is number {
  return typeof value === "number";
}

/* @description Check if the object is empty
 * @param obj
 * @returns {boolean}
 */
export const isEmpty = (obj: object) => {
  return Object.keys(obj).length === 0;
};

interface CustomError {
  status: number;
  data: {
    status: number;
    message: string;
    code: string;
  };
}

export function isCustomError(error: any): error is CustomError {
  return (
    typeof error === "object" &&
    error !== null &&
    typeof error.status === "number" &&
    typeof error.data === "object" &&
    error.data !== null &&
    typeof error.data.status === "number" &&
    typeof error.data.message === "string" &&
    typeof error.data.code === "string"
  );
}

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
  return type in validators && validators[type](data);
};

type ValidatorFunction<T> = (v: unknown) => v is T;

const isNull: ValidatorFunction<null> = (v): v is null => v === null;
const isBoolean: ValidatorFunction<boolean> = (v): v is boolean => v === "boolean";
const isString: ValidatorFunction<string> = (v): v is string => typeof v === "string";
const isStringOrBoolean: ValidatorFunction<boolean | string[]> = (v): v is boolean | string[] =>
  isString(v) || isBoolean(v);
const isFirebaseAuthData = (v: any): v is FirebaseAuthData => {
  return (
    typeof v === "object" &&
    v !== null &&
    typeof v.idToken === "string" &&
    typeof v.deviceId === "string"
  );
};

const validators: Record<MessageType["Response"], (v: unknown) => boolean> = {
  /** CORE */
  ERROR: isString,
  FIREBASE_AUTH: isFirebaseAuthData,

  /** DEVICE ACTION */
  CALL: isNull,
  GO_BACK: isNull,
  SAVE_IMAGE: isBoolean,
  LAUNCH_CAMERA: isString,
  SELECT_IMAGE: isStringOrBoolean
};
