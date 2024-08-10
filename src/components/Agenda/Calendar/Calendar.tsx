import ArrowDownIcon from "assets/svg/arrow-down-icon";
import { Box } from "components/common";
import { format, parse } from "date-fns";
import { useDogInfoRecord } from "hooks/api/member/dogs";
import { useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { AGENDA_STATUS, DogInfoRecord } from "types/member/dogs";

import { MonthlyCalendar } from "./MonthlyCalendar";
import { MonthPicker } from "./MonthPicker";
import { CalendarSection, ToggleViewButton } from "./styles";
import { WeeklyCalendar } from "./WeeklyCalendar";

import type { Value } from "react-calendar/dist/cjs/shared/types";

export const Calendar = ({ id }: { id: number }) => {
  const today = new Date();
  const [searchParams, setSearchParams] = useSearchParams();

  const currentDateParam = searchParams.get("date");
  const currentDate = currentDateParam ? parse(currentDateParam, "yyyy-MM-dd", new Date()) : today;
  const [activeDate, setActiveDate] = useState<Date | null>(currentDate);

  // const { data } = useDogInfoRecord(id);

  const data: DogInfoRecord[] = [
    {
      date: [2024, 8, 8],
      status: AGENDA_STATUS.COMPLETE,
      registeredDate: [2024, 1, 11]
    }
  ];

  const [expanded, setExpanded] = useState(false);
  const [showMonthPicker, setShowMonthPicker] = useState(false);
  const calendarHeaderRef = useRef<HTMLDivElement>(null);

  const handleDateClick = (date: Value) => {
    if (date instanceof Date) {
      setActiveDate(date);
      const formattedDate = format(date as Date, "yyyy-MM-dd");
      searchParams.set("date", formattedDate);
      setSearchParams(searchParams);
    }
  };

  const handleTodayClick = () => {
    const today = new Date();
    handleDateClick(today);
  };

  const toggleExpanded = () => setExpanded((prev) => !prev);

  const handleMonthClick = (date: Value) => {
    handleDateClick(date);
    setShowMonthPicker(false);
  };

  const handleOpenMonthPicker = () => {
    setShowMonthPicker(true);
  };

  const handleCloseMonthPicker = () => {
    setShowMonthPicker(false);
  };

  const calendarProps = {
    today,
    onDateChange: handleDateClick,
    onTodayClick: handleTodayClick,
    activeDate,
    onOpenMonthPicker: handleOpenMonthPicker,
    headerRef: calendarHeaderRef
  };

  return (
    <CalendarSection>
      <Box bgColor="white" pt={28} radius="0px 0px 20px 20px" overflow="hidden">
        {expanded ? (
          <MonthlyCalendar data={data} {...calendarProps} />
        ) : (
          <WeeklyCalendar data={data} {...calendarProps} />
        )}
        <ToggleViewButton type="button" onClick={toggleExpanded} expand={expanded}>
          {expanded ? "닫기" : "펼쳐보기"}
          <span>
            <ArrowDownIcon w={20} h={20} />
          </span>
        </ToggleViewButton>
        <MonthPicker
          data={data}
          isOpen={showMonthPicker}
          onClose={handleCloseMonthPicker}
          onMonthClick={handleMonthClick}
          activeDate={activeDate}
          anchorRef={calendarHeaderRef}
        />
      </Box>
    </CalendarSection>
  );
};
