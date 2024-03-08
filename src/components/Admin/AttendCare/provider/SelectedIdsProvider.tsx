import { createContext, useState, useCallback, type PropsWithChildren } from "react";

interface SelectedIdsContextProps {
  selectedIds: Set<unknown>;
  toggleId: (id: number) => void;
}

export const SelectedIdsContext = createContext<SelectedIdsContextProps | null>(null);

export const SelectedIdsProvider = ({ children }: PropsWithChildren) => {
  const [selectedIds, setSelectedIds] = useState(new Set());

  const toggleId = useCallback((id: number) => {
    setSelectedIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  }, []);

  return (
    <SelectedIdsContext.Provider value={{ selectedIds, toggleId }}>
      {children}
    </SelectedIdsContext.Provider>
  );
};
