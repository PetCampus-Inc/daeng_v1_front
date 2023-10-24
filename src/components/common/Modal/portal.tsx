import reactDom from "react-dom";
import { memo, ReactNode, useEffect } from "react";

const Portal = ({ children }: { children: ReactNode }) => {
  // React Portal을 사용한 Modal
  useEffect(() => {
    // 스크롤 막기
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const el = document.getElementById("modal");
  return el && reactDom.createPortal(children, el);
};

export default memo(Portal);
