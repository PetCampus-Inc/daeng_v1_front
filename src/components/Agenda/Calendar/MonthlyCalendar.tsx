import ArrowLeftIcon from "assets/svg/arrow-left-icon";
import ArrowRightIcon from "assets/svg/arrow-right-icon";
import FootIcon from "assets/svg/foot-icon";
import { Box, Text } from "components/common";
import { format, isSameDay, parseISO } from "date-fns";
import React, { useCallback, useEffect, useRef } from "react";
import Calendar, { type OnArgs } from "react-calendar";
import { getClosestValidDate } from "utils/date";

import { StyledMonthlyCalendar, GoToTodayButton } from "./styles";

import type { Value } from "react-calendar/dist/cjs/shared/types";
import type { DogInfoRecord } from "types/member/dogs";

const ATTEND_DAYS = ["2024-07-17", "2024-07-17", "2024-07-21", "2024-07-23"];

interface MonthlyCalendarProps {
  data: DogInfoRecord[];
  today: Date;
  onDateChange: (newDate: Value) => void;
  onTodayClick: () => void;
  activeDate: Date | null;
  onOpenMonthPicker: () => void;
  headerRef: React.RefObject<HTMLDivElement>;
}

/* -------------------------------------------------------------------------------------------------
 * MonthTile
 * -----------------------------------------------------------------------------------------------*/

const TileContent = ({ date, view, today }: { date: Date; view: string; today: Date }) => {
  if (view !== "month") return null;

  return (
    <>
      {isSameDay(date, today) && (
        <Text typo="caption1_12_R" color="primaryColor">
          오늘
        </Text>
      )}
      {ATTEND_DAYS.some((day) => isSameDay(new Date(day), date)) && (
        <Box as="span" color="br_3">
          <FootIcon w={15} h={12} />
        </Box>
      )}
    </>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Monthly Calendar
 * -----------------------------------------------------------------------------------------------*/

const USER_REGISTRATION_DATE = parseISO("2024-06-28");

export const MonthlyCalendar = (props: MonthlyCalendarProps) => {
  const {
    data,
    today,
    activeDate,
    onDateChange,
    onTodayClick,
    onOpenMonthPicker,
    headerRef: calendarRef
  } = props;

  const todayButtonRef = useRef<HTMLButtonElement>(null);

  const handleActiveDateChange = ({ view, activeStartDate }: OnArgs) => {
    // month가 변경될 때 activeDate를 변경해 표시범위를 조정
    if (view === "month" && activeStartDate) {
      // 가입일 이후, 오늘 이전의 가장 가까운 날짜로 activeDate를 변경
      const selectableDate = getClosestValidDate({
        date: activeStartDate,
        maxDate: today,
        minDate: USER_REGISTRATION_DATE
      });
      onDateChange(selectableDate);
    }
  };

  const adjustTodayButtonPosition = useCallback(() => {
    // "오늘" 버튼을 캘린더 타이틀 위치에 정확히 위치하도록 설정
    if (calendarRef.current && todayButtonRef.current) {
      const calendarNavigation = calendarRef.current.querySelector(".react-calendar__navigation");
      const todayButton = todayButtonRef.current;

      if (calendarNavigation) {
        const navRect = calendarNavigation.getBoundingClientRect();
        const calendarRect = calendarRef.current.getBoundingClientRect();

        const topOffset =
          navRect.top - calendarRect.top + (navRect.height - todayButton.offsetHeight) / 2;
        todayButton.style.top = `${topOffset}px`;
      }
    }
  }, []);

  useEffect(() => {
    adjustTodayButtonPosition();
    window.addEventListener("resize", adjustTodayButtonPosition);

    return () => {
      window.removeEventListener("resize", adjustTodayButtonPosition);
    };
  }, [adjustTodayButtonPosition]);

  return (
    <StyledMonthlyCalendar ref={calendarRef}>
      <Calendar
        value={activeDate}
        onChange={onDateChange}
        activeStartDate={activeDate || undefined}
        onActiveStartDateChange={handleActiveDateChange}
        formatDay={(locale, date) => format(date, "d")}
        formatWeekday={(locale, date) => format(date, "E")}
        formatMonthYear={(locale, date) => format(date, "yyyy. MM")}
        formatYear={(locale, date) => format(date, "yyyy")}
        minDate={USER_REGISTRATION_DATE}
        maxDate={new Date()}
        calendarType="gregory"
        showNeighboringMonth={true}
        prevLabel={<ArrowLeftIcon w={24} />}
        nextLabel={<ArrowRightIcon w={24} />}
        next2Label={null}
        prev2Label={null}
        minDetail="year"
        view="month"
        onDrillUp={onOpenMonthPicker}
        tileContent={({ date, view }) => <TileContent date={date} view={view} today={today} />}
      />
      <GoToTodayButton type="button" ref={todayButtonRef} onClick={onTodayClick}>
        오늘
      </GoToTodayButton>
    </StyledMonthlyCalendar>
  );
};
