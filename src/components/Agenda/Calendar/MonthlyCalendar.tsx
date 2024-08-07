import ArrowLeftIcon from "assets/svg/arrow-left-icon";
import ArrowRightIcon from "assets/svg/arrow-right-icon";
import FootIcon from "assets/svg/foot-icon";
import { Box, Text } from "components/common";
import { format, isSameDay } from "date-fns";
import React, { useCallback, useEffect, useRef } from "react";
import Calendar, { type OnArgs } from "react-calendar";

import { StyledMonthlyCalendar, GoToTodayButton } from "./styles";

import type { Value } from "react-calendar/dist/cjs/shared/types";

const ATTEND_DAYS = ["2024-07-17", "2024-07-17", "2024-07-21", "2024-07-23"];

interface MonthlyCalendarProps {
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

export const MonthlyCalendar: React.FC<MonthlyCalendarProps> = ({ data }) => {
  const {
    today,
    activeStartDate,
    onDateClick,
    onTodayClick,
    onActiveStartDateChange,
    onShowMonthSelectChange,
    headerRef: calendarRef
  } = data;

  const todayButtonRef = useRef<HTMLButtonElement>(null);

  const handleDrillUp = useCallback(() => {
    onShowMonthSelectChange(true);
  }, [onShowMonthSelectChange]);

  const handleActiveStartDateChange = useCallback(
    ({ view, activeStartDate }: OnArgs) => {
      if (view === "month") {
        onActiveStartDateChange(activeStartDate);
      }
    },
    [onActiveStartDateChange]
  );

  const renderTileContent = useCallback(
    ({ date, view }: { date: Date; view: string }) => {
      const contents = [];

      if (view === "month" && isSameDay(date, today)) {
        contents.push(
          <Text key="today" typo="caption1_12_R" color="primaryColor">
            오늘
          </Text>
        );
      }

      if (ATTEND_DAYS.some((day) => isSameDay(new Date(day), date))) {
        contents.push(
          <Box key="footIcon" as="span" color="br_3">
            <FootIcon w={15} h={12} />
          </Box>
        );
      }

      return contents;
    },
    [today]
  );

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
        value={activeStartDate}
        onChange={onDateClick}
        activeStartDate={activeStartDate || undefined}
        onActiveStartDateChange={handleActiveStartDateChange}
        formatDay={(locale, date) => format(date, "d")}
        formatWeekday={(locale, date) => format(date, "E")}
        formatMonthYear={(locale, date) => format(date, "yyyy. MM")}
        formatYear={(locale, date) => format(date, "yyyy")}
        calendarType="gregory"
        showNeighboringMonth={true}
        prevLabel={<ArrowLeftIcon w={24} colorScheme="darkBlack" />}
        nextLabel={<ArrowRightIcon w={24} colorScheme="darkBlack" />}
        next2Label={null}
        prev2Label={null}
        minDetail="year"
        view="month"
        onDrillUp={handleDrillUp}
        tileContent={renderTileContent}
      />
      <GoToTodayButton type="button" ref={todayButtonRef} onClick={onTodayClick}>
        오늘
      </GoToTodayButton>
    </StyledMonthlyCalendar>
  );
};
