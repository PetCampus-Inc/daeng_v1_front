import { addDays, addWeeks, startOfWeek, subWeeks, endOfWeek, isAfter } from "date-fns";
import { type PanInfo, useAnimation } from "framer-motion";
import { useCallback, useState } from "react";

export const useWeekSwipe = (
  containerWidth: number,
  activeStartDate: Date | null,
  onActiveStartDateChange: (date: Date) => void,
  isDateDisabled: (date: Date) => boolean,
  today: Date
) => {
  const [weeks, setWeeks] = useState<Date[][]>([]);
  const controls = useAnimation();

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

  const isNextWeekDisabled = useCallback(
    (date: Date) => {
      const endOfCurrentWeek = endOfWeek(today, { weekStartsOn: 0 });
      return isAfter(date, endOfCurrentWeek);
    },
    [today]
  );

  const handleDragEnd = useCallback(
    async (event: MouseEvent | TouchEvent, info: PanInfo) => {
      if (Math.abs(info.offset.x) > containerWidth / 7 && activeStartDate) {
        const direction = info.offset.x > 0 ? -1 : 1;
        const newActiveStartDate =
          direction > 0 ? addWeeks(activeStartDate, 1) : subWeeks(activeStartDate, 1);

        if (!isNextWeekDisabled(newActiveStartDate) && !isDateDisabled(newActiveStartDate)) {
          await controls.start({
            x: -containerWidth - direction * containerWidth,
            transition: {
              type: "spring",
              stiffness: 300,
              damping: 30,
              velocity: info.velocity.x
            }
          });

          onActiveStartDateChange(newActiveStartDate);
          setWeeks(generateWeeks(newActiveStartDate));
          await controls.set({ x: -containerWidth });
        } else {
          controls.start({
            x: -containerWidth,
            transition: {
              type: "spring",
              stiffness: 300,
              damping: 30,
              velocity: info.velocity.x
            }
          });
        }
      } else {
        controls.start({
          x: -containerWidth,
          transition: {
            type: "spring",
            stiffness: 300,
            damping: 30,
            velocity: info.velocity.x
          }
        });
      }
    },
    [
      activeStartDate,
      containerWidth,
      controls,
      generateWeeks,
      isDateDisabled,
      isNextWeekDisabled,
      onActiveStartDateChange
    ]
  );

  const isDateSelectable = useCallback(
    (date: Date) => {
      const endOfCurrentWeek = endOfWeek(today, { weekStartsOn: 0 });
      return !isDateDisabled(date) && !isAfter(date, endOfCurrentWeek);
    },
    [isDateDisabled, today]
  );

  return { weeks, controls, handleDragEnd, generateWeeks, setWeeks, isDateSelectable };
};
