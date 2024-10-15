import { createContext, useState, useCallback, type PropsWithChildren } from "react";

import type { CareDogInfo } from "types/admin/care.types";

interface SelectedIdsContextProps {
  selectedIds: Set<number>;
  toggleId: (id: number) => void;
  selectAll: (data: CareDogInfo[]) => void;
}

interface SelectedIdsProviderProps {
  idKey: keyof CareDogInfo;
}

export const SelectedIdsContext = createContext<SelectedIdsContextProps | null>(null);

export const SelectedIdsProvider = ({
  children,
  idKey
}: PropsWithChildren<SelectedIdsProviderProps>) => {
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());

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

  const selectAll = useCallback(
    (data: CareDogInfo[]) => {
      setSelectedIds((prevSelectedIds) => {
        // 현재 선택된 항목이 없거나, 선택된 항목의 수가 전체 데이터보다 적은 경우 모든 항목을 선택
        if (prevSelectedIds.size === 0 || prevSelectedIds.size < data.length) {
          const newSet = new Set(data.map((item) => item[idKey] as number));
          return newSet;
        } else {
          // 이미 일부 또는 모든 항목이 선택된 상태라면 모든 선택을 해제
          return new Set();
        }
      });
    },
    [idKey]
  );

  return (
    <SelectedIdsContext.Provider value={{ selectedIds, toggleId, selectAll }}>
      {children}
    </SelectedIdsContext.Provider>
  );
};
