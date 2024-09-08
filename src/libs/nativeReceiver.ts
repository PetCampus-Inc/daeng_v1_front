import { NativeActionResponse, NativeAction } from "types/native/action.types";
import { NativeMessageResponse, NativeMessageType } from "types/native/message.types";
import { isNativeActionResponse } from "utils/is/nativeAction";
import { isNativeMessageResponse } from "utils/is/nativeMessage";

type NativeMessageCallback = (event: NativeMessageResponse<NativeMessageType<"Response">>) => void;
type NativeActionCallback = (event: NativeActionResponse<NativeAction>) => void;

class NativeReceiver {
  private static instance: NativeReceiver | null = null;
  private messageCallbacks: Set<NativeMessageCallback> = new Set();
  private actionCallbacks: Map<string, NativeActionCallback> = new Map();

  private constructor() {
    const receiver = navigator.userAgent.includes("Android") ? document : window;
    receiver.addEventListener("message", this.handleMessage as (event: Event) => void);
  }

  public static getInstance(): NativeReceiver {
    if (!NativeReceiver.instance) {
      NativeReceiver.instance = new NativeReceiver();
    }
    return NativeReceiver.instance;
  }

  public registerCallback(callback: NativeMessageCallback): void {
    this.messageCallbacks.add(callback);
  }

  public unregisterCallback(callback: NativeMessageCallback): void {
    this.messageCallbacks.delete(callback);
  }

  public registerActionCallback(requestId: string, callback: NativeActionCallback): void {
    this.actionCallbacks.set(requestId, callback);
  }

  public unregisterActionCallback(requestId: string): void {
    this.actionCallbacks.delete(requestId);
  }

  private handleMessage = (event: MessageEvent): void => {
    if (typeof event.data !== "string" || event.data.includes("webpackHotUpdate")) return;
    try {
      const message = JSON.parse(event.data);

      if (isNativeMessageResponse(message)) {
        this.messageCallbacks.forEach((callback) => callback(message));
      } else if (isNativeActionResponse(message)) {
        const callback = this.actionCallbacks.get(message.id);
        if (callback) callback(message);
      }
    } catch (error) {
      console.error("[Native 통신 오류]:", error);
    }
  };
}

export default NativeReceiver.getInstance();
