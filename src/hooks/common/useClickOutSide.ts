import { RefObject, useEffect } from "react";

interface UseClickContainsProps {
  targetRef: RefObject<HTMLElement>;
  onClickOutside: () => void;
  enabled?: boolean;
}

export const useClickOutSide = ({ targetRef, onClickOutside, enabled }: UseClickContainsProps) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (enabled && targetRef.current && !targetRef.current.contains(event.target as Node)) {
        onClickOutside();
      }
    };

    document.addEventListener("mouseup", handleClickOutside);

    return () => {
      document.removeEventListener("mouseup", handleClickOutside);
    };
  }, [targetRef, enabled]);
};
