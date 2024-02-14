import { useState } from "react";

const useBottomSheet = (initialState = false) => {
  const [isVisible, setIsVisible] = useState(initialState);

  const open = () => setIsVisible(true);
  const close = () => setIsVisible(false);

  return { isVisible, open, close };
};

export default useBottomSheet;
