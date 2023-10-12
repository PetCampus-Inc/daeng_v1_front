import { useState } from "react";

const useShowPw = () => {
  const [showPw, setShowPw] = useState({
    type: "password",
    className: "password",
  });

  const handleToggle = () =>
    setShowPw(() => {
      if (showPw.type === "password") {
        return { type: "text", className: "text" };
      }
      return { type: "password", className: "password" };
    });
  return { showPw, setShowPw, handleToggle };
};

export default useShowPw;
