import React, { useLayoutEffect, useState } from "react";
import { Button } from "./styles";

const FloatingButton = ({ isVisible }: { isVisible: boolean }) => {
  const [buttonBottom, setButtonBottom] = useState(0);

  useLayoutEffect(() => {
    const handleResize = () => {
      const screenHeight = window.innerHeight;
      const keyboardHeight = initialScreenHeight - screenHeight;
      if (keyboardHeight > 0) {
        setButtonBottom(keyboardHeight);
      } else {
        setButtonBottom(0);
      }
    };

    const initialScreenHeight = window.innerHeight;

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return isVisible ? <Button style={{ bottom: `${buttonBottom}px` }}>완료</Button> : null;
};

export default FloatingButton;
