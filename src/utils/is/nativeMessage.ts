import {
  NativeMessageType,
  NativeMessagePayload,
  NativeMessageResponse
} from "types/native/message.types";
import { z } from "zod";

type ResponseDataSchemaType = {
  [K in NativeMessageType<"Response">]: z.ZodType<NativeMessagePayload<"Response", K>>;
};

const responseDataSchema: ResponseDataSchemaType = {
  NEW_NOTIFICATION: z.string(),
  PUSH_NOTIFICATION: z.string()
} as const;

const MESSAGE_RESPONSE_TYPES = Object.keys(responseDataSchema);

/**
 * 메세지가 `WebViewMessageResponse` 타입인지 확인합니다.
 * @param message - unknown
 * @returns boolean
 */
export function isNativeMessageResponse<T extends NativeMessageType<"Response">>(
  message: unknown
): message is NativeMessageResponse<T> {
  if (typeof message !== "object" || message === null) return false;

  const { type, payload } = message as NativeMessageResponse<T>;

  const isMessageType =
    typeof type === "string" &&
    MESSAGE_RESPONSE_TYPES.includes(type as NativeMessageType<"Response">);

  const schema = responseDataSchema[type];
  const isValidateData = schema ? schema.safeParse(payload).success : false;

  return isMessageType && isValidateData;
}
