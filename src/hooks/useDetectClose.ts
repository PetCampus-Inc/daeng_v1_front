import { useState, useEffect, RefObject, Dispatch, SetStateAction } from "react";

const useDetectClose = (
  ref: RefObject<HTMLElement>,
  initialState: boolean
): [boolean, Dispatch<SetStateAction<boolean>>] => {
  const [isOpen, setIsOpen] = useState<boolean>(initialState);

  useEffect(() => {
    const pageTouchEvent = (e: TouchEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(!isOpen);
      }
    };

    if (isOpen) {
      window.addEventListener("touchstart", pageTouchEvent);
    }

    return () => {
      window.removeEventListener("touchstart", pageTouchEvent);
    };
  }, [isOpen, ref]);
  return [isOpen, setIsOpen];
};

export default useDetectClose;
