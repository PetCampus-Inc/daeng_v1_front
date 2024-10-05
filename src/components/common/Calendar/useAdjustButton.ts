/**
 * useAdjustButton - 캘린더 내 "오늘" 버튼의 위치를 조정하는 훅입니다.
 *
 * @param calendarRef - 캘린더 컨테이너 요소에 대한 Ref입니다.
 * @returns "오늘" 버튼에 할당할 콜백 ref를 반환합니다.
 */
import { RefObject, useCallback, useEffect } from "react";

export function useAdjustButton(calendarRef: RefObject<HTMLDivElement>) {
  /**
   * "오늘" 버튼의 위치를 캘린더 내비게이션에 맞춰 조정합니다.
   *
   * @param todayButton - "오늘" 버튼 요소에 대한 참조입니다.
   */
  const adjustTodayButtonPosition = useCallback(
    (todayButton: HTMLButtonElement | null) => {
      if (calendarRef.current && todayButton) {
        const calendarNavigation = calendarRef.current.querySelector(".react-calendar__navigation");

        if (!calendarNavigation) {
          return;
        }

        const navRect = calendarNavigation.getBoundingClientRect();
        const calendarRect = calendarRef.current.getBoundingClientRect();

        const topOffset =
          navRect.top - calendarRect.top + (navRect.height - todayButton.offsetHeight) / 2;
        todayButton.style.top = `${topOffset}px`;
      }
    },
    [calendarRef]
  );

  useEffect(() => {
    const handleResize = () => {
      if (calendarRef.current) {
        const todayButton = calendarRef.current.querySelector("button");
        if (todayButton) {
          adjustTodayButtonPosition(todayButton as HTMLButtonElement);
        }
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [adjustTodayButtonPosition]);

  // 콜백 ref 반환
  const setTodayButtonRef = useCallback(
    (element: HTMLButtonElement | null) => {
      if (element) {
        adjustTodayButtonPosition(element);
      }
    },
    [adjustTodayButtonPosition]
  );

  return setTodayButtonRef;
}
