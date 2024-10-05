import { format, parse } from "date-fns";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getClosestValidDate } from "utils/date";

import type { OnArgs, Value } from "react-calendar/dist/esm/shared/types";

interface UseCalendarProps {
  /** 캘린더 활성 범위의 최소 날짜 */
  minDate: Date;
}

export function useCalendar({ minDate }: UseCalendarProps) {
  const today = new Date();
  const [searchParams, setSearchParams] = useSearchParams();

  const currentDateParam = searchParams.get("date");
  const currentDate = currentDateParam ? parse(currentDateParam, "yyyy-MM-dd", new Date()) : today;

  const [value, setValue] = useState<Date | null>(currentDate);
  const [activeStartDate, setActiveStartDate] = useState<Date | undefined>(currentDate);

  /** 캘린더 선택 날짜 변경 함수 */
  const handleDateChange = (date: Value) => {
    if (date instanceof Date) {
      setValue(date);
      setActiveStartDate(date);

      const formattedDate = format(date, "yyyy-MM-dd");
      searchParams.set("date", formattedDate);
      setSearchParams(searchParams, { replace: true });
    }
  };
  /** 캘린더 활성 날짜 변경 함수 */
  const handleActiveStartDateChange = ({ activeStartDate, action, view }: OnArgs) => {
    if (!activeStartDate || action === "drillUp") {
      return;
    }
    setActiveStartDate(activeStartDate);
    // 'month' 뷰에서만 date 업데이트
    if (view === "month") {
      // 가입일 이후, 오늘 이전의 가장 가까운 날짜로 date 변경
      const selectableDate = getClosestValidDate({
        date: activeStartDate,
        maxDate: today,
        minDate
      });
      setValue(selectableDate);
      const formattedDate = format(selectableDate, "yyyy-MM-dd");
      searchParams.set("date", formattedDate);
      setSearchParams(searchParams, { replace: true });
    }
  };

  /** 선택 날짜를 오늘로 변경하는 함수 */
  const handleTodayClick = () => {
    handleDateChange(today);
  };

  return {
    value,
    activeStartDate,
    today,
    handleDateChange,
    handleActiveStartDateChange,
    handleTodayClick
  };
}
