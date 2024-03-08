import {
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  createContext,
  useMemo,
  useState
} from "react";

import { ModalButtonVariant } from "../type";

interface ModalContextProps {
  onClose: () => void;
  variant: ModalButtonVariant;
  setVariant: Dispatch<SetStateAction<ModalButtonVariant>>;
}
export const ModalContext = createContext<ModalContextProps | null>(null);

interface ModalProviderProps {
  children: ReactNode;
  onClose: () => void;
}

export const ModalProvider = ({ children, onClose }: ModalProviderProps) => {
  const [variant, setVariant] = useState<ModalButtonVariant>("one");

  const ContextValue = useMemo(() => ({ variant, setVariant, onClose }), [variant, onClose]);

  return <ModalContext.Provider value={ContextValue}>{children}</ModalContext.Provider>;
};
