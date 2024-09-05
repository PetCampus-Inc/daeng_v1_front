import { NativeEventResponse, NativeEventType } from "types/native/event.types";
import { NativeMessageResponse, NativeMessageType } from "types/native/message.types";
import { isNativeEventResponse } from "utils/is/nativeEvent";
import { isNativeMessageResponse } from "utils/is/nativeMessage";

type NativeMessageCallback = (event: NativeMessageResponse<NativeMessageType<"Response">>) => void;
type NativeEventCallback = (event: NativeEventResponse<NativeEventType>) => void;

class NativeReceiver {
  private static instance: NativeReceiver | null = null;
  private messageCallbacks: Set<NativeMessageCallback> = new Set();
  private eventCallbacks: Map<string, NativeEventCallback> = new Map();

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

  public registerEventCallback(requestId: string, callback: NativeEventCallback): void {
    this.eventCallbacks.set(requestId, callback);
  }

  public unregisterEventCallback(requestId: string): void {
    this.eventCallbacks.delete(requestId);
  }

  private handleMessage = (event: MessageEvent): void => {
    if (typeof event.data !== "string" || event.data.includes("webpackHotUpdate")) return;
    try {
      const message = JSON.parse(event.data);

      if (isNativeMessageResponse(message)) {
        this.messageCallbacks.forEach((callback) => callback(message));
      } else if (isNativeEventResponse(message)) {
        const callback = this.eventCallbacks.get(message.id);
        if (callback) callback(message);
      }
    } catch (error) {
      console.error("[Native 통신 오류]:", error);
    }
  };
}

export default NativeReceiver.getInstance();
