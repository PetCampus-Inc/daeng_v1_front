import ArrowDownIcon from "assets/svg/arrow-down-icon";
import FootIcon from "assets/svg/foot-icon";
import { Box, Text } from "components/common";
import { isSameDay, isBefore, format, isToday, parseISO } from "date-fns";
import { ko } from "date-fns/locale";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useRef } from "react";

import {
  DayTile,
  DayContent,
  GoToTodayButton,
  NavigationButton,
  StyledWeeklyCalendar,
  StyledWeeklyTitle,
  WeekContainer
} from "./styles";
import { useWeekSwipe } from "./useWeekSwipe";

import type { Value } from "react-calendar/dist/cjs/shared/types";

const RECORD_DATE = ["2024-06-30", "2024-07-17", "2024-07-21", "2024-07-24", "2024-07-25"].map(
  (d) => parseISO(d)
);
const USER_JOIN_DATE = parseISO("2024-02-15");

interface WeeklyCalendarProps {
  data: {
    today: Date;
    onDateClick: (newDate: Value) => void;
    onTodayClick: () => void;
    activeStartDate: Date | null;
    onActiveStartDateChange: React.Dispatch<React.SetStateAction<Date | null>>;
    onShowMonthSelectChange: React.Dispatch<React.SetStateAction<boolean>>;
    headerRef: React.RefObject<HTMLDivElement>;
  };
}

interface WeekViewProps {
  week: Date[];
  activeStartDate: Date;
  isDateDisabled: (date: Date) => boolean;
  onDateClick: (date: Date) => void;
  weekDays: string[];
  isActive: boolean;
}

/* -------------------------------------------------------------------------------------------------
 * WeekView
 * -----------------------------------------------------------------------------------------------*/

const WeekView = ({
  week,
  activeStartDate,
  isDateDisabled,
  onDateClick,
  weekDays,
  isActive
}: WeekViewProps) => (
  <WeekContainer active={isActive}>
    {week.map((day) => (
      <DayTile
        key={day.toISOString()}
        type="button"
        aria-label={format(day, "yyyy년 M월 d일", { locale: ko })}
        className={`
          ${isSameDay(day, activeStartDate) ? "active" : ""}
          ${isDateDisabled(day) ? "disabled" : ""}
          ${!isActive ? "neighboring-week" : ""}
        `.trim()}
        onClick={() => onDateClick(day)}
        disabled={isDateDisabled(day)}
      >
        <Text
          as="abbr"
          title={`${weekDays[day.getDay()]}`}
          typo="label2_14_M"
          color="inherit"
          textDecoration="none"
          className={day.getDay() === 0 ? "weekday sunday" : "weekday"}
        >
          {weekDays[day.getDay()]}
        </Text>
        <DayContent>
          <abbr title={format(day, "yyyy년 M월 d일", { locale: ko })} className="day">
            {format(day, "d")}
          </abbr>
          {isToday(day) && <p className="today">오늘</p>}
          {RECORD_DATE.some((date) => isSameDay(date, day)) && (
            <Box as="span" color="br_3" key="footIcon">
              <FootIcon w={15} h={12} />
            </Box>
          )}
        </DayContent>
      </DayTile>
    ))}
  </WeekContainer>
);

/* -------------------------------------------------------------------------------------------------
 * WeeklyCalendar
 * -----------------------------------------------------------------------------------------------*/

export const WeeklyCalendar = ({ data }: WeeklyCalendarProps) => {
  const {
    today,
    onDateClick,
    onTodayClick,
    activeStartDate,
    onActiveStartDateChange,
    onShowMonthSelectChange,
    headerRef
  } = data;

  const containerRef = useRef<HTMLDivElement>(null);
  const containerWidth = containerRef.current?.offsetWidth || 0;

  const isDateDisabled = (date: Date) => {
    return isBefore(date, USER_JOIN_DATE);
  };

  const { weeks, controls, handleDragEnd, generateWeeks, setWeeks, isDateSelectable } =
    useWeekSwipe(containerWidth, activeStartDate, onActiveStartDateChange, isDateDisabled, today);

  useEffect(() => {
    if (activeStartDate) {
      setWeeks(generateWeeks(activeStartDate));
      controls.set({ x: -containerWidth });
    }
  }, [activeStartDate, generateWeeks, controls, setWeeks, containerWidth]);

  const weekDays = ["일", "월", "화", "수", "목", "금", "토"];

  if (!activeStartDate) return null;

  return (
    <>
      <StyledWeeklyTitle ref={headerRef}>
        <Text typo="label1_16_B" color="primaryColor">
          {format(activeStartDate, "yyyy. MM", { locale: ko })}
        </Text>
        <NavigationButton type="button" onClick={() => onShowMonthSelectChange(true)}>
          <ArrowDownIcon w={20} h={20} />
        </NavigationButton>
        <GoToTodayButton type="button" onClick={onTodayClick}>
          오늘
        </GoToTodayButton>
      </StyledWeeklyTitle>
      <StyledWeeklyCalendar ref={containerRef}>
        <AnimatePresence>
          <motion.div
            drag="x"
            dragConstraints={{ left: -containerWidth * 2, right: 0 }}
            onDragEnd={handleDragEnd}
            animate={controls}
            initial={{ x: -containerWidth }}
            dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
            style={{ display: "flex" }}
          >
            {weeks.map((week, weekIndex) => (
              <WeekView
                key={weekIndex}
                week={week}
                activeStartDate={activeStartDate}
                isDateDisabled={(date) => !isDateSelectable(date)}
                onDateClick={onDateClick}
                weekDays={weekDays}
                isActive={weekIndex === 1}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </StyledWeeklyCalendar>
    </>
  );
};
