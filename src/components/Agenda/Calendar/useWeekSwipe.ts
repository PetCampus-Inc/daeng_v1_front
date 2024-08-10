import { addDays, addWeeks, startOfWeek, subWeeks, isAfter, isBefore } from "date-fns";
import { type PanInfo, useAnimation } from "framer-motion";
import { useCallback, useState } from "react";
import { getClosestValidDate } from "utils/date";

import type { Value } from "react-calendar/dist/cjs/shared/types";

interface UseWeekSwipeProps {
  containerWidth: number;
  activeDate: Date | null;
  onDateChange: (date: Value) => void;
  minDate: Date;
  maxDate: Date;
}

export const useWeekSwipe = ({
  containerWidth,
  activeDate,
  onDateChange,
  minDate,
  maxDate
}: UseWeekSwipeProps) => {
  const [weeks, setWeeks] = useState<Date[][]>([]);
  const controls = useAnimation();

  const generateWeeks = useCallback((date: Date) => {
    const currentWeekStart = startOfWeek(date, { weekStartsOn: 0 });
    const prevWeekStart = subWeeks(currentWeekStart, 1);
    const nextWeekStart = addWeeks(currentWeekStart, 1);

    const generateWeek = (start: Date) => {
      // 주어진 날짜를 기준으로 이전, 현재, 다음 주를 생성
      return Array(7)
        .fill(null)
        .map((_, i) => addDays(start, i));
    };

    return [
      generateWeek(prevWeekStart),
      generateWeek(currentWeekStart),
      generateWeek(nextWeekStart)
    ];
  }, []);

  const isDateSelectable = (date: Date) => {
    // 날짜가 선택 가능한 범위 내에 있는지 확인
    return !isBefore(date, minDate) && !isAfter(date, maxDate);
  };

  const isSwipeAllowed = (direction: number) => {
    // 스와이프 방향으로 이동 가능한지 확인
    if (!activeDate) return false;
    const targetWeekStart =
      direction > 0
        ? addWeeks(startOfWeek(activeDate, { weekStartsOn: 0 }), 1)
        : subWeeks(startOfWeek(activeDate, { weekStartsOn: 0 }), 1);

    // 타겟 주의 어떤 날짜라도 선택 가능한지 확인
    return Array(7)
      .fill(null)
      .some((_, i) => isDateSelectable(addDays(targetWeekStart, i)));
  };

  const animateSwipe = async (direction: number, info: PanInfo) => {
    await controls.start({
      x: -containerWidth - direction * containerWidth,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        velocity: info.velocity.x
      }
    });
  };

  const resetPosition = () =>
    controls.start({
      x: -containerWidth,
      transition: { type: "spring", stiffness: 300, damping: 30 }
    });

  const handleDragEnd = async (event: MouseEvent | TouchEvent, info: PanInfo) => {
    if (Math.abs(info.offset.x) > containerWidth / 7 && activeDate) {
      const direction = info.offset.x > 0 ? -1 : 1;

      if (!isSwipeAllowed(direction)) {
        await resetPosition();
        return;
      }

      const newActiveDate = direction > 0 ? addWeeks(activeDate, 1) : subWeeks(activeDate, 1);
      // 가입일 이후, 오늘 이전의 가장 가까운 날짜로 activeDate를 변경
      const selectableDate = getClosestValidDate({ date: newActiveDate, maxDate, minDate });

      await animateSwipe(direction, info);
      setWeeks(generateWeeks(selectableDate));
      // controls.set()이 먼저 수행된 후에 onDateChange가 호출되어야 함
      await controls.set({ x: -containerWidth });
      onDateChange(selectableDate);
    } else {
      await resetPosition();
    }
  };

  return {
    weeks,
    controls,
    handleDragEnd,
    generateWeeks,
    setWeeks,
    isDateSelectable,
    isSwipeAllowed
  };
};
