import { Ref, forwardRef, useCallback, useEffect, useImperativeHandle, useState } from "react";

import type { CreateOverlayElement } from "./type";

interface OverlayControllerProps {
  overlayElement: CreateOverlayElement;
  onExit: () => void;
}
export interface OverlayControlRef {
  close: () => void;
}
export const OverlayController = forwardRef(function OverlayController(
  { overlayElement: OverlayElement, onExit }: OverlayControllerProps,
  ref: Ref<OverlayControlRef>
) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = useCallback(() => setIsOpen(false), []);

  useImperativeHandle(
    ref,
    () => {
      return { close: handleClose };
    },
    [handleClose]
  );

  useEffect(() => {
    requestAnimationFrame(() => {
      setIsOpen(true);
    });
  }, []);

  return <OverlayElement isOpen={isOpen} close={handleClose} exit={onExit} />;
});