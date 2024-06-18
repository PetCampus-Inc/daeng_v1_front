import { type ReactNode, createContext, useMemo } from "react";

interface ModalContextProps {
  onClose: () => void;
}
export const ModalContext = createContext<ModalContextProps | null>(null);

interface ModalProviderProps {
  children: ReactNode;
  onClose: () => void;
}

export const ModalProvider = ({ children, onClose }: ModalProviderProps) => {
  const ContextValue = useMemo(() => ({ onClose }), [onClose]);

  return <ModalContext.Provider value={ContextValue}>{children}</ModalContext.Provider>;
};
