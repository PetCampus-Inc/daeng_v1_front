import { createContext, useState, useCallback, type PropsWithChildren, useContext } from "react";

interface SelectedImageContextProps {
  selectedImgIds: Set<number>; // 선택된 이미지의 ID만 저장
  toggleImg: (id: number, uri?: string) => void; // ID를 사용해 토글
  imageMap: Map<number, string>; // ID와 URI의 매핑
  clearSelections: () => void; // 선택된 이미지 초기화
}

export const SelectedImageContext = createContext<SelectedImageContextProps | null>(null);

export const SelectedImageProvider = ({ children }: PropsWithChildren) => {
  const [selectedImgIds, setSelectedImgIds] = useState<Set<number>>(new Set());
  const [imageMap, setImageMap] = useState<Map<number, string>>(new Map());

  const toggleImg = useCallback((id: number, uri?: string) => {
    setSelectedImgIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
        setImageMap((prevMap) => {
          const newMap = new Map(prevMap);
          newMap.delete(id);
          return newMap;
        });
      } else {
        newSet.add(id);
        if (uri) {
          setImageMap((prevMap) => {
            const newMap = new Map(prevMap);
            newMap.set(id, uri);
            return newMap;
          });
        }
      }
      return newSet;
    });
  }, []);

  const clearSelections = useCallback(() => {
    setSelectedImgIds(new Set());
    setImageMap(new Map());
  }, []);

  return (
    <SelectedImageContext.Provider value={{ selectedImgIds, toggleImg, imageMap, clearSelections }}>
      {children}
    </SelectedImageContext.Provider>
  );
};

export const useSelectedImages = () => {
  const context = useContext(SelectedImageContext);
  if (!context) {
    throw new Error("useSelectedImages must be used within a SelectedImageProvider");
  }
  return context;
};
