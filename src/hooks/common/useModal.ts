import { useState } from "react";

const useModal = (initialState = false) => {
  const [isVisible, setIsVisible] = useState(initialState);

  const open = () => setIsVisible(true);
  const close = () => setIsVisible(false);

  return { isVisible, open, close };
};

export default useModal;
