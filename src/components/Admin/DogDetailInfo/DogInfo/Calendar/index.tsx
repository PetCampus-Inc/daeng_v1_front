import { format } from "date-fns";
import useGetDogInfoRecord from "hooks/api/useGetDogInfoRecord";
import moment from "moment";
import { useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";

import * as S from "./styles";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const Calendar = () => {
  const today = new Date();
  const [date, setDate] = useState<Value>(today);
  const [activeStartDate, setActiveStartDate] = useState<Date | null>(new Date());
  const [searchParams, setSearchParams] = useSearchParams();
  const dogId = useLocation().pathname.split("/").pop();
  const data = useGetDogInfoRecord(Number(dogId));
  const attendDay = data.map((item) => format(item.date.join("-"), "yyyy-MM-dd"));

  const handleDateChange = (newDate: Value) => {
    setDate(newDate);
    const formattedDate = format(`${newDate}`, "yyyy-MM-dd");
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
        formatDay={(locale: any, date: moment.MomentInput) => moment(date).format("D")}
        formatYear={(locale: any, date: moment.MomentInput) => moment(date).format("YYYY")}
        formatMonthYear={(locale: any, date: moment.MomentInput) => moment(date).format("YYYY. MM")}
        calendarType="gregory"
        showNeighboringMonth={false}
        next2Label={null}
        prev2Label={null}
        minDetail="year"
        tileContent={({ date, view }: { date: Date; view: string }) => {
          const html = [];
          if (
            view === "month" &&
            date.getMonth() === today.getMonth() &&
            date.getDate() === today.getDate()
          ) {
            html.push(<S.Today key={"today"}>오늘</S.Today>);
          }
          if (attendDay.find((x) => x === moment(date).format("YYYY-MM-DD"))) {
            html.push(<S.Dot key={moment(date).format("YYYY-MM-DD")} />);
          }
          return <>{html}</>;
        }}
      />
      <S.Date onClick={handleTodayClick}>오늘</S.Date>
    </S.CalendarWrapper>
  );
};

export default Calendar;
