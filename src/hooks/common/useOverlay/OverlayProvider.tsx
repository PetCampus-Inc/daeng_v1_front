import React, {
  type PropsWithChildren,
  type ReactNode,
  createContext,
  useCallback,
  useState,
  useMemo
} from "react";

export const OverlayContext = createContext<{
  mount(id: string, element: ReactNode): void;
  unmount(id: string): void;
} | null>(null);

const OverlayProvider = ({ children }: PropsWithChildren) => {
  const [overlayById, setOverlayById] = useState<Map<string, ReactNode>>(new Map());

  const mount = useCallback((id: string, element: ReactNode) => {
    setOverlayById((overlays) => {
      const cloned = new Map(overlays);
      cloned.set(id, element);
      return cloned;
    });
  }, []);

  const unmount = useCallback((id: string) => {
    setOverlayById((overlays) => {
      const cloned = new Map(overlays);
      cloned.delete(id);
      return cloned;
    });
  }, []);

  const context = useMemo(() => ({ mount, unmount }), [mount, unmount]);

  return (
    <OverlayContext.Provider value={context}>
      {children}
      {[...overlayById.entries()].map(([id, element]) => {
        return <React.Fragment key={id}>{element}</React.Fragment>;
      })}
    </OverlayContext.Provider>
  );
};
export default OverlayProvider;
