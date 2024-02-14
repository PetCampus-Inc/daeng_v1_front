import { ReactNode, useEffect, useRef } from "react";
import ReactDOM from "react-dom";

const Portal = ({ children }: { children: ReactNode }) => {
  const modalRootRef = useRef(document.createElement("div"));

  useEffect(() => {
    const modalRoot = modalRootRef.current;
    document.body.style.overflow = "hidden";

    if (!modalRoot.parentElement) {
      document.body.appendChild(modalRoot);
    }

    return () => {
      if (modalRoot.parentElement) {
        document.body.removeChild(modalRoot);
      }
      document.body.style.overflow = "unset";
    };
  }, [modalRootRef]);

  return ReactDOM.createPortal(children, modalRootRef.current);
};

export default Portal;
