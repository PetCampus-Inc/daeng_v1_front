import { addDays, addWeeks, startOfWeek, subWeeks, endOfWeek, isAfter, isBefore } from "date-fns";
import { type PanInfo, useAnimation } from "framer-motion";
import { useCallback, useState } from "react";

interface UseWeekSwipeProps {
  containerWidth: number;
  activeDate: Date | null;
  onActiveDateChange: (date: Date) => void;
  today: Date;
  maxDate: Date;
}

export const useWeekSwipe = ({
  containerWidth,
  activeDate,
  onActiveDateChange,
  today,
  maxDate
}: UseWeekSwipeProps) => {
  const [weeks, setWeeks] = useState<Date[][]>([]);
  const controls = useAnimation();

  // 주어진 날짜를 기준으로 이전 주, 현재 주, 다음 주의 날짜들을 생성
  const generateWeeks = useCallback((date: Date) => {
    const currentWeekStart = startOfWeek(date, { weekStartsOn: 0 });
    const prevWeekStart = subWeeks(currentWeekStart, 1);
    const nextWeekStart = addWeeks(currentWeekStart, 1);

    const generateWeek = (start: Date) => {
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

  // 다음 주가 선택 가능한지 확인
  // 오늘 날짜 이후의 주는 선택할 수 없습니다.
  const isNextWeekDisabled = (date: Date) => {
    const endOfCurrentWeek = endOfWeek(today, { weekStartsOn: 0 });
    return isAfter(date, endOfCurrentWeek);
  };

  // 개별 날짜가 선택 가능한지 확인
  // 최대 날짜 이전의 날짜만 선택 가능합니다.
  const isDateDisabled = (date: Date) => isBefore(date, maxDate);

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
      const newActiveDate = direction > 0 ? addWeeks(activeDate, 1) : subWeeks(activeDate, 1);

      if (!isNextWeekDisabled(newActiveDate) && !isDateDisabled(newActiveDate)) {
        await animateSwipe(direction, info);
        onActiveDateChange(newActiveDate);
        setWeeks(generateWeeks(newActiveDate));
        await controls.set({ x: -containerWidth });
      } else {
        await resetPosition();
      }
    } else {
      await resetPosition();
    }
  };

  const isDateSelectable = (date: Date) => {
    const endOfCurrentWeek = endOfWeek(today, { weekStartsOn: 0 });
    return !isDateDisabled(date) && !isAfter(date, endOfCurrentWeek);
  };

  return { weeks, controls, handleDragEnd, generateWeeks, setWeeks, isDateSelectable };
};
