import { format, isSameDay } from "date-fns";
import { useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";

import * as S from "./styles";

import type { Value } from "react-calendar/dist/cjs/shared/types";
import { useGetDogInfoRecord } from "hooks/api/admin/dogs";

const Calendar = () => {
  const today = new Date();
  const [date, setDate] = useState<Value>(today);
  const [activeStartDate, setActiveStartDate] = useState<Date | null>(new Date());
  const [searchParams, setSearchParams] = useSearchParams();
  const dogId = useLocation().pathname.split("/").pop();
  const { data: attendDay } = useGetDogInfoRecord(Number(dogId));

  const handleDateChange = (newDate: Value) => {
    setDate(newDate);
    const formattedDate = format(newDate as Date, "yyyy-MM-dd");
    searchParams.set("date", formattedDate);
    setSearchParams(searchParams);
  };

  const handleTodayClick = () => {
    const today = new Date();
    setActiveStartDate(today);
    setDate(today);
  };

  return (
    <S.CalendarWrapper>
      <S.StyledCalendar
        value={date}
        onChange={handleDateChange}
        activeStartDate={activeStartDate === null ? undefined : activeStartDate}
        onActiveStartDateChange={({ activeStartDate }: { activeStartDate: Date | null }) =>
          setActiveStartDate(activeStartDate)
        }
        formatDay={(locale: any, date: Date) => format(date, "d")}
        formatYear={(locale: any, date: Date) => format(date, "yyyy")}
        formatMonthYear={(locale: any, date: Date) => format(date, "yyyy. MM")}
        calendarType="gregory"
        showNeighboringMonth={false}
        next2Label={null}
        prev2Label={null}
        minDetail="year"
        tileContent={({ date, view }: { date: Date; view: string }) => {
          const html = [];
          if (view === "month" && isSameDay(date, today)) {
            html.push(<S.Today key={"today"}>오늘</S.Today>);
          }
          if (attendDay.some((day) => isSameDay(new Date(day), date))) {
            html.push(<S.Dot key={format(date, "yyyy-MM-dd")} />);
          }
          return <>{html}</>;
        }}
      />
      <S.Date onClick={handleTodayClick}>오늘</S.Date>
    </S.CalendarWrapper>
  );
};

export default Calendar;
