import { NativeMessage } from "types/native/message.types";
import { isNativeMessage, isValidMessageData } from "utils/is";

type EventCallback = (event: NativeMessage) => void;

class NativeReceiver {
  private static instance: NativeReceiver | null = null;
  private callbacks: Map<string, EventCallback> = new Map();

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

  public registerCallback(requestId: string, callback: EventCallback): void {
    this.callbacks.set(requestId, callback);
  }

  public unregisterCallback(requestId: string): void {
    this.callbacks.delete(requestId);
  }

  private handleMessage = (event: MessageEvent): void => {
    if (typeof event.data !== "string" || event.data.includes("webpackHotUpdate")) return;

    try {
      const message = JSON.parse(event.data);

      if (!isNativeMessage(message)) {
        throw new Error("[Native 통신 오류]: 메시지 타입 오류");
      }

      if (!isValidMessageData(message)) {
        throw new Error(`[Native 통신 오류]: 데이터 타입 오류 (${message})`);
      }

      const callback = this.callbacks.get(message.requestId);
      if (callback) callback(message);
    } catch (error) {
      console.error("[Native 통신 오류]:", error);
    }
  };
}

export default NativeReceiver.getInstance();
