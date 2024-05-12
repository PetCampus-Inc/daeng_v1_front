import { OverlayProvider } from "hooks/common/useOverlay";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

const App = () => {
  const [msg, setMsg] = useState<{ type: string; data: string } | null>(null);
  const [isApp, setIsApp] = useState(false);

  useEffect(() => {
    const receiver = navigator.userAgent.includes("Android") ? document : window;
    receiver.addEventListener("message", listener, { capture: true });

    //postMessage("title", "상단 타이틀에 올 값입니다.");
    //postMessage("share", "전송완료");

    return () => window.removeEventListener("message", listener);
  }, []);

  // rn에서 Webview로 보낸 값을 수신하는 함수
  const listener = (event: any) => {
    console.log("webview listener", event);
    alert(event.data);
    // if (event.data !== undefined) {
    //   const appData: any = JSON.parse(event.data);
    //   if (appData.type === "LOADING") {
    //     setMsg(JSON.parse(event.data));
    //   } else if (appData.type === "IS_APP") {
    //     setIsApp(true);
    //   }
    // }
  };

  // webview에서 rn으로 값을 송신하는 함수
  const postMessage = (type: string, data: any) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    if (!window.ReactNativeWebView) {
      return;
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    window.ReactNativeWebView?.postMessage(JSON.stringify({ type, data }));
  };

  return (
    <OverlayProvider>
      <Outlet />
    </OverlayProvider>
  );
};

export default App;
