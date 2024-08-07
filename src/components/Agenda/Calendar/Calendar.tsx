import ArrowDownIcon from "assets/svg/arrow-down-icon";
import { Box } from "components/common";
import { format } from "date-fns";
import React, { useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";

import { MonthlyCalendar } from "./MonthlyCalendar";
import { MonthSelector } from "./MonthSelector";
import { ToggleViewButton } from "./styles";
import { WeeklyCalendar } from "./WeeklyCalendar";

import type { Value } from "react-calendar/dist/cjs/shared/types";

export const Calendar: React.FC = () => {
  const today = new Date();
  const [expanded, setExpanded] = useState(false);
  const [activeStartDate, setActiveStartDate] = useState<Date | null>(new Date());
  const [searchParams, setSearchParams] = useSearchParams();
  const [showMonthSelector, setShowMonthSelector] = useState(false);
  const calendarHeaderRef = useRef<HTMLDivElement>(null);

  const handleDateClick = (newDate: Value) => {
    if (newDate instanceof Date) {
      setActiveStartDate(newDate);
      const formattedDate = format(newDate as Date, "yyyy-MM-dd");
      searchParams.set("date", formattedDate);
      setSearchParams(searchParams);
    }
  };

  const handleTodayClick = () => {
    const today = new Date();
    setActiveStartDate(today);
  };

  const toggleExpanded = () => setExpanded((prev) => !prev);

  const handleMonthSelect = (value: Value) => {
    if (value instanceof Date) {
      setActiveStartDate(value);
      setShowMonthSelector(false);
    }
  };

  const handleCloseMonthSelector = () => {
    setShowMonthSelector(false);
  };

  const calendarData = {
    today,
    onDateClick: handleDateClick,
    onTodayClick: handleTodayClick,
    activeStartDate,
    onActiveStartDateChange: setActiveStartDate,
    onShowMonthSelectChange: setShowMonthSelector,
    headerRef: calendarHeaderRef
  };

  return (
    <Box bgColor="white" pt={28} radius="0px 0px 20px 20px">
      {expanded ? <MonthlyCalendar data={calendarData} /> : <WeeklyCalendar data={calendarData} />}
      <ToggleViewButton type="button" onClick={toggleExpanded} expand={expanded}>
        {expanded ? "닫기" : "펼쳐보기"}
        <span>
          <ArrowDownIcon w={20} h={20} />
        </span>
      </ToggleViewButton>
      <MonthSelector
        isOpen={showMonthSelector}
        onClose={handleCloseMonthSelector}
        activeStartDate={activeStartDate}
        onSelect={handleMonthSelect}
        anchorRef={calendarHeaderRef}
      />
    </Box>
  );
};
