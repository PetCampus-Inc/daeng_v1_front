import { Bridge, BridgeStore, linkBridge } from "@webview-bridge/web";
import showToast from "utils/showToast";

import { CameraOptions, SelectImageOptions, SocialProvider } from "./options.type";

export interface BridgeState extends Bridge {
  connectCall: (tel: string) => Promise<void>;
  saveMedia: (media: string[]) => Promise<void>;
  selectImage: (options?: SelectImageOptions) => Promise<string[]>;
  runCamera: (options?: CameraOptions) => Promise<string[]>;
  socialLogin: (provider: SocialProvider) => Promise<string>;
  getFcmToken: () => Promise<string>;
}

export type AppBridge = BridgeStore<BridgeState>;

export const nativeBridge = linkBridge<AppBridge>({
  timeout: 1000 * 60 * 10,
  throwOnError: true,
  onFallback: () => {
    showToast("앱에서만 사용할 수 있는 기능입니다.", "bottom", 1000);
  }
});
