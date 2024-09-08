import { NativeAction, NativeActionPayload, NativeActionResponse } from "types/native/action.types";
import { z } from "zod";

type ResponsePayloadSchemaType = {
  [K in NativeAction]: z.ZodType<NativeActionPayload<K>["response"]>;
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

const NATIVE_ACTION_RESPONSE = Object.keys(responsePayloadSchema);

/**
 * 메세지가 `ActionResponse` 타입인지 확인합니다.
 * @param message - unknown
 * @return boolean
 */
export function isNativeActionResponse<T extends NativeAction>(
  message: unknown
): message is NativeActionResponse<T> {
  if (typeof message !== "object" || message === null) return false;
  const { id, status, action, payload } = message as NativeActionResponse<T>;

  const isAction =
    typeof action === "string" && NATIVE_ACTION_RESPONSE.includes(action as NativeAction);
  const isStatus = status === "SUCCESS" || status === "ERROR";

  const schema = responsePayloadSchema[action];
  const isActionResponsePayload = schema ? schema.safeParse(payload).success : false;

  return typeof id === "string" && isAction && isStatus && isActionResponsePayload;
}
