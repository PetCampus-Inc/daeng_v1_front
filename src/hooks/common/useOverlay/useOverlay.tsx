import { useContext, useEffect, useId, useMemo, useRef } from "react";

import { OverlayController, type OverlayControlRef } from "./OverlayController";
import { OverlayContext } from "./OverlayProvider";

import type { CreateOverlayElement } from "./type";

interface Options {
  exitOnUnmount?: boolean;
}

const useOverlay = ({ exitOnUnmount = true }: Options = {}) => {
  const context = useContext(OverlayContext);

  if (context === null) {
    throw new Error("useOverlay is only available within OverlayProvider.");
  }

  const [id] = useId();

  const { mount, unmount } = context;

  const overlayRef = useRef<OverlayControlRef | null>(null);

  useEffect(() => {
    return () => {
      if (exitOnUnmount) {
        unmount(id);
      }
    };
  }, [exitOnUnmount, id, unmount]);

  return useMemo(
    () => ({
      open: (overlayElement: CreateOverlayElement) => {
        mount(
          id,
          <OverlayController
            key={Date.now()}
            ref={overlayRef}
            overlayElement={overlayElement}
            onExit={() => {
              unmount(id);
            }}
          />
        );
      },
      close: () => {
        overlayRef.current?.close();
      },
      exit: () => {
        unmount(id);
      }
    }),
    [id, mount, unmount]
  );
};

export default useOverlay;
