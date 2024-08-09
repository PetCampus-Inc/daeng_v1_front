import ArrowDownIcon from "assets/svg/arrow-down-icon";
import { Box } from "components/common";
import { format } from "date-fns";
import React, { useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";

import { MonthlyCalendar } from "./MonthlyCalendar";
import { MonthPicker } from "./MonthPicker";
import { ToggleViewButton } from "./styles";
import { WeeklyCalendar } from "./WeeklyCalendar";

import type { Value } from "react-calendar/dist/cjs/shared/types";

export const Calendar: React.FC = () => {
  const today = new Date();
  const [expanded, setExpanded] = useState(false);
  const [activeDate, setActiveDate] = useState<Date | null>(new Date());
  const [searchParams, setSearchParams] = useSearchParams();
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
    onDateClick: handleDateClick,
    onTodayClick: handleTodayClick,
    activeDate,
    onActiveDateChange: setActiveDate,
    onOpenMonthPicker: handleOpenMonthPicker,
    headerRef: calendarHeaderRef
  };

  return (
    <Box bgColor="white" pt={28} radius="0px 0px 20px 20px">
      {expanded ? <MonthlyCalendar {...calendarProps} /> : <WeeklyCalendar {...calendarProps} />}
      <ToggleViewButton type="button" onClick={toggleExpanded} expand={expanded}>
        {expanded ? "닫기" : "펼쳐보기"}
        <span>
          <ArrowDownIcon w={20} h={20} />
        </span>
      </ToggleViewButton>
      <MonthPicker
        isOpen={showMonthPicker}
        onClose={handleCloseMonthPicker}
        onMonthClick={handleMonthClick}
        activeDate={activeDate}
        anchorRef={calendarHeaderRef}
      />
    </Box>
  );
};
