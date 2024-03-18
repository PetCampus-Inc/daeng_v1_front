import { RefObject, useEffect } from "react";

interface UseClickContainsProps {
  targetRef: RefObject<HTMLElement>;
  parentRef?: RefObject<HTMLElement>;
  onClickOutside: () => void;
  enabled?: boolean;
}

export const useClickOutSide = ({
  parentRef,
  targetRef,
  onClickOutside,
  enabled
}: UseClickContainsProps) => {
  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (enabled && targetRef.current && !targetRef.current.contains(event.target as Node)) {
        onClickOutside();
      }
    };

    const eventTarget = parentRef?.current ?? document;
    eventTarget.addEventListener("click", handleClickOutside);

    return () => {
      eventTarget.removeEventListener("click", handleClickOutside);
    };
  }, [parentRef, targetRef, enabled]);
};
