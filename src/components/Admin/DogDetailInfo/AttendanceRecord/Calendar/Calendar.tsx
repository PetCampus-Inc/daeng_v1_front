import { MonthPicker } from "components/Agenda/Calendar/MonthPicker";
import { CalendarSection } from "components/Agenda/Calendar/styles";
import { Box } from "components/common";
import { format, parse, parseISO } from "date-fns";
import { DogInfoRecordType, useGetDogInfoRecord } from "hooks/api/admin/dogs";
import { useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { AgendaStatus } from "types/common/status.types";
import { getClosestValidDate } from "utils/date";

import { MonthlyCalendar } from "./MonthlyCalendar";

import type { Value } from "react-calendar/dist/cjs/shared/types";
import type { OnArgs } from "react-calendar/dist/esm";

export function Calendar({ dogId }: { dogId: number }) {
  const today = new Date();
  const [searchParams, setSearchParams] = useSearchParams();

  const currentDateParam = searchParams.get("date");
  const currentDate = currentDateParam ? parse(currentDateParam, "yyyy-MM-dd", new Date()) : today;
  const [date, setDate] = useState<Date | null>(currentDate);
  const [activeStartDate, setActiveStartDate] = useState<Date | null>(currentDate);

  // const { data: attendData } = useGetDogInfoRecord(dogId);

  const [showMonthPicker, setShowMonthPicker] = useState(false);
  const calendarHeaderRef = useRef<HTMLDivElement>(null);

  const handleDateChange = (date: Value) => {
    if (date instanceof Date) {
      setDate(date);
      setActiveStartDate(date);
      const formattedDate = format(date, "yyyy-MM-dd");
      searchParams.set("date", formattedDate);
      setSearchParams(searchParams);
    }
  };

  // month가 변경될 때 activeStartDate를 변경해 표시범위를 조정합니다
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
      <Box bgColor="white" pt={28} overflow="hidden">
        <MonthlyCalendar attendData={mock} {...calendarProps} />
        <MonthPicker
          isOpen={showMonthPicker}
          onClose={handleCloseMonthPicker}
          onMonthClick={handleMonthClick}
          date={date}
          anchorRef={calendarHeaderRef}
        />
      </Box>
    </CalendarSection>
  );
}

const mock: DogInfoRecordType[] = [
  {
    date: "2024-06-28",
    status: AgendaStatus.NOT_YET,
    registeredDate: "2024-06-28"
  },
  {
    date: "2024-06-29",
    status: AgendaStatus.NOT_YET,
    registeredDate: "2024-06-28"
  },
  {
    date: "2024-06-30",
    status: AgendaStatus.NOT_YET,
    registeredDate: "2024-06-28"
  }
];
