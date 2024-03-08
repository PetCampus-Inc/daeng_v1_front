import { useToggle } from "hooks/common/useToggle";
import { ReactNode, createContext, useMemo, useState } from "react";

interface DropdownContextValue {
  isOpen: boolean;
  toggle: () => void;
  current: number;
  changeCurrent: (value: number) => void;
  defaultOpen?: boolean;
  changeIsOpen: (value: boolean) => void;
  onSelect?: (index: number) => void;
}

export const DropdownContext = createContext<DropdownContextValue | null>(null);

interface DropdownProviderProps {
  children: ReactNode;
  defaultOpen?: boolean;
  onSelect?: (index: number) => void;
}

export const DropdownProvider = ({ children, defaultOpen, onSelect }: DropdownProviderProps) => {
  const { isOpen, toggle, changeIsOpen } = useToggle(defaultOpen || false);

  const [current, changeCurrent] = useState<number>(0);

  const ContextValue = useMemo(
    () => ({
      isOpen,
      toggle,
      changeIsOpen,
      current,
      changeCurrent,
      defaultOpen,
      onSelect
    }),
    [isOpen, current, defaultOpen]
  );

  return <DropdownContext.Provider value={ContextValue}>{children}</DropdownContext.Provider>;
};
