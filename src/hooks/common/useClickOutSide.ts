import { RefObject, useEffect } from "react";

interface UseClickContainsProps {
  targetRef: RefObject<HTMLElement>;
  onClickOutside: () => void;
  enabled?: boolean;
}

export const useClickOutSide = ({ targetRef, onClickOutside, enabled }: UseClickContainsProps) => {
  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (targetRef.current && !targetRef?.current?.contains(event.target as Node)) {
        onClickOutside();
      }
    };

    if (enabled) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [targetRef, enabled]);
};
