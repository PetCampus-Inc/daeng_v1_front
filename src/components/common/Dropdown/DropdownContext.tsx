import { useToggle } from "hooks/common/useToggle";
import { type ReactNode, type RefObject, createContext, useMemo, useState } from "react";

interface IDropdownContext {
  isOpen: boolean;
  toggle: () => void;
  current: number;
  changeCurrent: (value: number) => void;
  defaultOpen?: boolean;
  changeIsOpen: (value: boolean) => void;
  onSelect?: (index: number) => void;
  parentRef?: RefObject<HTMLElement>;
}

export const DropdownContext = createContext<IDropdownContext | null>(null);

interface DropdownProviderProps {
  children: ReactNode;
  defaultOpen?: boolean;
  onSelect?: (index: number) => void;
}

export const DropdownProvider = ({ children, defaultOpen, onSelect }: DropdownProviderProps) => {
  const { isOpen, toggle, changeIsOpen } = useToggle(defaultOpen || false);

  const [current, changeCurrent] = useState<number>(0);

  const context = useMemo(
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

  return <DropdownContext.Provider value={context}>{children}</DropdownContext.Provider>;
};
