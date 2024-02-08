import { useState } from "react";

const useFocus = () => {
  const [isFocusing, setIsFocusing] = useState(false);
  const handleFocus = () => setIsFocusing(true);
  const handleBlur = () => setIsFocusing(false);
  return { isFocusing, handleFocus, handleBlur };
};

export default useFocus;
