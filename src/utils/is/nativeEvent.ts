import { NativeEventType, NativeEventPayload, NativeEventResponse } from "types/native/event.types";
import { z } from "zod";

type ResponsePayloadSchemaType = {
  [K in NativeEventType]: z.ZodType<NativeEventPayload<K>["response"]>;
};

const responsePayloadSchema: ResponsePayloadSchemaType = {
  CALL: z.null(),
  SELECT_IMAGE: z.array(z.string()),
  LAUNCH_CAMERA: z.string(),
  SAVE_IMAGE: z.null(),
  FCM_TOKEN: z.string(),
  SOCIAL_LOGIN: z.object({ idToken: z.string(), deviceId: z.string(), fcmToken: z.string() }),
  GET_SECURITY_STORAGE: z.string(),
  SET_SECURITY_STORAGE: z.null(),
  REMOVE_SECURITY_STORAGE: z.null()
} as const;

const NATIVE_EVENT_RESPONSE = Object.keys(responsePayloadSchema);

/**
 * 메세지가 `EventResponse` 타입인지 확인합니다.
 * @param message - unknown
 * @return boolean
 */
export function isNativeEventResponse<T extends NativeEventType>(
  message: unknown
): message is NativeEventResponse<T> {
  if (typeof message !== "object" || message === null) return false;
  const { id, status, type, payload } = message as NativeEventResponse<T>;

  const isEvent =
    typeof type === "string" && NATIVE_EVENT_RESPONSE.includes(type as NativeEventType);
  const isStatus = status === "SUCCESS" || status === "ERROR";

  const schema = responsePayloadSchema[type];
  const isEventResponsePayload = schema ? schema.safeParse(payload).success : false;

  return typeof id === "string" && isEvent && isStatus && isEventResponsePayload;
}
