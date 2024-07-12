import { isValidGetMessage, WebViewMessage } from "types/native/message.types";

type EventCallback = (event: WebViewMessage) => void;

class NativeReceiver {
  private static instance: NativeReceiver;
  private callbacks: EventCallback[] = [];

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

  public registerCallback(callback: EventCallback) {
    this.callbacks.push(callback);
  }

  public unregisterCallback(callback: EventCallback) {
    this.callbacks = this.callbacks.filter((cb) => cb !== callback);
  }

  private handleMessage = (event: Event) => {
    if (event instanceof MessageEvent) {
      try {
        const message = JSON.parse(event.data);
        if (isValidGetMessage(message)) {
          this.callbacks.forEach((callback) => callback(message));
        } else {
          throw new Error("메시지 타입 또는 데이터 오류");
        }
      } catch (error) {
        console.error("[Native 통신 오류]:", error);
      }
    }
  };
}

export default NativeReceiver.getInstance();
