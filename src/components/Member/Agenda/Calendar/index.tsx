import DogFootPrintIcon from "assets/svg/\bdog-footprint-icon";
import { format } from "date-fns";
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
  // const data = useGetDogInfoRecord(Number(dogId));

  // TODO: 주석 풀고 하단(사용중이었던) attendDay 및 useGetDogInfoRecordTEST 삭제
  // const attendDay = data.map((item) => format(item.date.join("-"), "yyyy-MM-dd"));
  const useGetDogInfoRecordTEST = [
    {
      date: [2024, 6, 18],
      status: "ATTENDED"
    },
    { date: [2024, 6, 20], status: "ATTENDED" }
  ];
  const attendDay = useGetDogInfoRecordTEST.map((item) =>
    format(item.date.join("-"), "yyyy-MM-dd")
  );

  // TODO: 달력에 표시할 알림장 존재하는 날짜들 배열이 필요한데 swagger상으로는 배열로 오는 api가 없음. 확인 필요. (아래는 등원날짜 기록 불러주는 api로 추측..)
  //  const { data } = useGetAgendaSaved(dogId);

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
            html.push(
              <S.IconWrapper>
                <DogFootPrintIcon key={moment(date).format("YYYY-MM-DD")} />
              </S.IconWrapper>
            );
          }
          return <>{html}</>;
        }}
      />
      <S.Date onClick={handleTodayClick}>오늘</S.Date>
    </S.CalendarWrapper>
  );
};

export default Calendar;
