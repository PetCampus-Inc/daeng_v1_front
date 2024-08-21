import ArrowDownIcon from "assets/svg/arrow-down-icon";
import FootIcon from "assets/svg/foot-icon";
import { Box, Text } from "components/common";
import { isSameDay, format, isToday, parseISO } from "date-fns";
import { ko } from "date-fns/locale";
import { motion } from "framer-motion";
import React, { useEffect, useRef } from "react";
import { convertArrayToDate } from "utils/date";

import {
  DayTile,
  DayContent,
  GoToTodayButton,
  NavigationButton,
  StyledWeeklyCalendar,
  StyledWeeklyTitle,
  WeekContainer,
  StyledWeeklyHeader
} from "./styles";
import { useWeekSwipe } from "./useWeekSwipe";

import type { Value } from "react-calendar/dist/cjs/shared/types";
import type { DogInfoRecord } from "types/member/dogs";

interface WeeklyCalendarProps {
  data: DogInfoRecord[];
  today: Date;
  onDateChange: (newDate: Value) => void;
  onTodayClick: () => void;
  activeDate: Date | null;
  onOpenMonthPicker: () => void;
  headerRef: React.RefObject<HTMLDivElement>;
}

interface WeekViewProps {
  week: Date[];
  activeStartDate: Date;
  isDateDisabled: (date: Date) => boolean;
  onDateChange: (date: Date) => void;
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
  onDateChange,
  weekDays,
  isActive
}: WeekViewProps) => (
  <WeekContainer active={isActive}>
    {week.map((day) => (
      <DayTile
        key={day.toISOString()}
        type="button"
        className={`
          ${isSameDay(day, activeStartDate) ? "active" : ""}
          ${isDateDisabled(day) ? "disabled" : ""}
          ${!isActive ? "neighboring-week" : ""}
        `.trim()}
        onClick={() => onDateChange(day)}
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
          {RECORD_DAYS.some((date) => isSameDay(date, day)) && (
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

const WEEK_DAYS = ["일", "월", "화", "수", "목", "금", "토"];

const RECORD_DAYS = ["2024-06-30", "2024-07-17", "2024-07-21", "2024-07-24", "2024-07-25"];

const USER_REGISTRATION_DATE = parseISO("2024-06-28");

export const WeeklyCalendar = (props: WeeklyCalendarProps) => {
  const { data, today, onDateChange, onTodayClick, activeDate, onOpenMonthPicker, headerRef } =
    props;

  const containerRef = useRef<HTMLDivElement>(null);
  const containerWidth = containerRef.current?.offsetWidth || 0;

  const { weeks, controls, handleDragEnd, generateWeeks, setWeeks, isDateSelectable } =
    useWeekSwipe({
      containerWidth,
      activeDate,
      onDateChange,
      maxDate: today,
      minDate: USER_REGISTRATION_DATE
    });

  useEffect(() => {
    if (activeDate) {
      setWeeks(generateWeeks(activeDate));
      controls.set({ x: -containerWidth });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeDate, containerWidth]);

  if (!activeDate) return null;

  return (
    <>
      <StyledWeeklyHeader ref={headerRef}>
        <StyledWeeklyTitle onClick={onOpenMonthPicker}>
          <Text typo="label1_16_B" color="primaryColor">
            {format(activeDate, "yyyy. MM", { locale: ko })}
          </Text>
          <NavigationButton>
            <ArrowDownIcon w={20} h={20} />
          </NavigationButton>
        </StyledWeeklyTitle>
        <GoToTodayButton type="button" onClick={onTodayClick}>
          오늘
        </GoToTodayButton>
      </StyledWeeklyHeader>
      <StyledWeeklyCalendar ref={containerRef}>
        <motion.div
          drag="x"
          dragConstraints={{ left: -containerWidth * 2, right: 0 }}
          onDragEnd={handleDragEnd}
          animate={controls}
          initial={{ x: -containerWidth }}
          dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
          style={{ display: "flex" }}
          dragElastic={0.2}
          dragMomentum={false}
        >
          {weeks.map((week, weekIndex) => (
            <WeekView
              key={weekIndex}
              week={week}
              activeStartDate={activeDate}
              isDateDisabled={(date) => !isDateSelectable(date)}
              onDateChange={onDateChange}
              weekDays={WEEK_DAYS}
              isActive={weekIndex === 1}
            />
          ))}
        </motion.div>
      </StyledWeeklyCalendar>
    </>
  );
};
