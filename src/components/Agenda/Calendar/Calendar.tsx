import ArrowDownIcon from "assets/svg/arrow-down-icon";
import { Box } from "components/common";
import { format, parse, parseISO } from "date-fns";
import { type DogInfoRecordType } from "hooks/api/member/dogs";
import { useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { AGENDA_STATUS } from "types/member/dogs";
import { getClosestValidDate } from "utils/date";

import { MonthlyCalendar } from "./MonthlyCalendar";
import { MonthPicker } from "./MonthPicker";
import { CalendarSection, ToggleViewButton } from "./styles";
import { WeeklyCalendar } from "./WeeklyCalendar";

import type { Value } from "react-calendar/dist/cjs/shared/types";
import type { OnArgs } from "react-calendar/dist/esm";

export const Calendar = ({ id }: { id: number }) => {
  const today = new Date();
  const [searchParams, setSearchParams] = useSearchParams();

  const currentDateParam = searchParams.get("date");
  const currentDate = currentDateParam ? parse(currentDateParam, "yyyy-MM-dd", new Date()) : today;
  const [date, setDate] = useState<Date | null>(currentDate);
  const [activeStartDate, setActiveStartDate] = useState<Date | null>(currentDate);

  // const { data } = useDogInfoRecord(id);

  const [expanded, setExpanded] = useState(false);
  const [showMonthPicker, setShowMonthPicker] = useState(false);
  const calendarHeaderRef = useRef<HTMLDivElement>(null);

  // TODO: 임시 데이터, API 수정 완료 후 제거해주세요
  const data: DogInfoRecordType[] = [
    {
      date: "2024-08-18",
      status: AGENDA_STATUS.COMPLETE,
      registeredDate: "2024-03-28"
    }
  ];

  const handleDateChange = (date: Value) => {
    if (date instanceof Date) {
      setDate(date);
      setActiveStartDate(date);
      const formattedDate = format(date, "yyyy-MM-dd");
      searchParams.set("date", formattedDate);
      setSearchParams(searchParams);
    }
  };

  const handleActiveStartDateChange = ({ activeStartDate, view }: OnArgs) => {
    if (activeStartDate) {
      setActiveStartDate(activeStartDate);
      // 'month' 뷰에서만 date 업데이트
      if (view === "month") {
        // 가입일 이후, 오늘 이전의 가장 가까운 날짜로 date 변경
        const selectableDate = getClosestValidDate({
          date: activeStartDate,
          maxDate: today,
          minDate: parseISO("2024-06-28") // FIXME: API 수정 후 지워주세요~~
        });
        setDate(selectableDate);
        const formattedDate = format(selectableDate, "yyyy-MM-dd");
        searchParams.set("date", formattedDate);
        setSearchParams(searchParams);
      }
    }
  };

  const handleTodayClick = () => {
    const today = new Date();
    handleDateChange(today);
  };

  const toggleExpanded = () => setExpanded((prev) => !prev);

  const handleMonthClick = (date: Value) => {
    handleDateChange(date);
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
    onDateChange: handleDateChange,
    onActiveStartDateChange: handleActiveStartDateChange,
    onTodayClick: handleTodayClick,
    date,
    activeStartDate,
    onOpenMonthPicker: handleOpenMonthPicker,
    headerRef: calendarHeaderRef
  };

  return (
    <CalendarSection>
      <Box bgColor="white" pt={28} radius="0px 0px 20px 20px" overflow="hidden">
        {expanded ? (
          <MonthlyCalendar attendData={data} {...calendarProps} />
        ) : (
          <WeeklyCalendar attendData={data} {...calendarProps} />
        )}
        <ToggleViewButton type="button" onClick={toggleExpanded} expand={expanded}>
          {expanded ? "닫기" : "펼쳐보기"}
          <span>
            <ArrowDownIcon w={20} h={20} />
          </span>
        </ToggleViewButton>
        <MonthPicker
          data={data}
          date={date}
          isOpen={showMonthPicker}
          onClose={handleCloseMonthPicker}
          onMonthClick={handleMonthClick}
          anchorRef={calendarHeaderRef}
        />
      </Box>
    </CalendarSection>
  );
};
