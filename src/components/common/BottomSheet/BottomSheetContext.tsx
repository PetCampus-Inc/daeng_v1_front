import { ReactNode, createContext, useMemo, useContext } from "react";

import { ModalContext } from "../Modal/ModalContext";

interface BottomSheetContextProps {
  onClose: () => void;
}
export const BottomSheetContext = createContext<BottomSheetContextProps | null>(null);

interface BottomSheetProviderProps {
  children: ReactNode;
  onClose: () => void;
}

export const BottomSheetProvider = ({ children, onClose }: BottomSheetProviderProps) => {
  const ContextValue = useMemo(() => ({ onClose }), [onClose]);

  return <BottomSheetContext.Provider value={ContextValue}>{children}</BottomSheetContext.Provider>;
};

export const useModal = () => {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error("useModalContext must be used within a ModalProvider");
  }

  return context;
};
