import ArrowLeftIcon from "assets/svg/arrow-left-icon";
import ArrowRightIcon from "assets/svg/arrow-right-icon";
import FootIcon from "assets/svg/foot-icon";
import { Box, Text } from "components/common";
import { format, isSameDay, parseISO } from "date-fns";
import React, { useCallback, useEffect, useRef } from "react";
import Calendar, { type OnArgs } from "react-calendar";

import { StyledMonthlyCalendar, GoToTodayButton } from "./styles";

import type { DogInfoRecordType } from "hooks/api/admin/dogs";
import type { Value } from "react-calendar/dist/cjs/shared/types";
interface MonthlyCalendarProps {
  attendData: DogInfoRecordType[];
  today: Date;
  onDateChange: (newDate: Value) => void;
  onTodayClick: () => void;
  date: Date | null;
  activeStartDate: Date | null;
  onActiveStartDateChange: (arg: OnArgs) => void;
  onOpenMonthPicker: () => void;
  headerRef: React.RefObject<HTMLDivElement>;
}

/* -------------------------------------------------------------------------------------------------
 * Monthly Calendar
 * -----------------------------------------------------------------------------------------------*/

// FIXME: api 수정이 안돼서 하드코딩함 지워주세요~
const USER_REGISTRATION_DATE = parseISO("2024-06-28");

export function MonthlyCalendar(props: MonthlyCalendarProps) {
  const {
    attendData,
    today,
    date,
    onDateChange,
    activeStartDate,
    onActiveStartDateChange,
    onTodayClick,
    onOpenMonthPicker,
    headerRef: calendarRef
  } = props;

  const todayButtonRef = useRef<HTMLButtonElement>(null);

  /** "오늘" 버튼을 캘린더 타이틀 위치에 정확히 위치하도록 설정 */
  const adjustTodayButtonPosition = useCallback(() => {
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
        value={date}
        onChange={onDateChange}
        activeStartDate={activeStartDate || undefined}
        onActiveStartDateChange={(args: OnArgs) => onActiveStartDateChange(args)}
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
        tileContent={({ date, view }) => (
          <TileContent attendData={attendData} date={date} view={view} today={today} />
        )}
      />
      <GoToTodayButton type="button" ref={todayButtonRef} onClick={onTodayClick}>
        오늘
      </GoToTodayButton>
    </StyledMonthlyCalendar>
  );
}

/* -------------------------------------------------------------------------------------------------
 * MonthTile
 * -----------------------------------------------------------------------------------------------*/

const TileContent = ({
  attendData,
  date,
  view,
  today
}: {
  attendData: DogInfoRecordType[];
  date: Date;
  view: string;
  today: Date;
}) => {
  if (view !== "month") return null;

  return (
    <>
      {isSameDay(date, today) && (
        <Text typo="caption1_12_R" color="primaryColor">
          오늘
        </Text>
      )}
      {attendData.some((day) => isSameDay(parseISO(day.date), date)) && (
        <Box as="span" color="br_3">
          <FootIcon w={15} h={12} />
        </Box>
      )}
    </>
  );
};
