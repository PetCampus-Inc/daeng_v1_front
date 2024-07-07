import { PostMessage, PostMessageType } from "types/native/message.types";

const usePostMessage = () => {
  const post = <T extends PostMessageType>(type: T, data: PostMessage[T]) => {
    const message = JSON.stringify({ type, data });
    window.ReactNativeWebView.postMessage(message);
  };

  return { post };
};

export default usePostMessage;
