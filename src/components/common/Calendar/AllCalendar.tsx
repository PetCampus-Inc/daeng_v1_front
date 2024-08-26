import FootIcon from "assets/svg/foot-icon";
import { format } from "date-fns";
import { useGetDogInfoRecord } from "hooks/api/admin/attendance";
import moment from "moment";
import { useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";

import * as S from "./styles";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

// FIXME: API 수정 후 타입에러 해결나는거 해결하고 반영하겠습니다.
const Calendar = () => {
  const today = new Date();
  const [date, setDate] = useState<Value>(today);
  const [activeStartDate, setActiveStartDate] = useState<Date | null>(new Date());
  const [searchParams, setSearchParams] = useSearchParams();
  const { dogId } = useParams();
  const { data: attendDay } = useGetDogInfoRecord(Number(dogId));

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
      {/*<S.StyledCalendar*/}
      {/*  value={date}*/}
      {/*  onChange={handleDateChange}*/}
      {/*  activeStartDate={activeStartDate === null ? undefined : activeStartDate}*/}
      {/*  onActiveStartDateChange={({ activeStartDate }: { activeStartDate: Date | null }) =>*/}
      {/*    setActiveStartDate(activeStartDate)*/}
      {/*  }*/}
      {/*  formatDay={(locale: any, date: moment.MomentInput) => moment(date).format("D")}*/}
      {/*  formatYear={(locale: any, date: moment.MomentInput) => moment(date).format("YYYY")}*/}
      {/*  formatMonthYear={(locale: any, date: moment.MomentInput) => moment(date).format("YYYY. MM")}*/}
      {/*  calendarType="gregory"*/}
      {/*  showNeighboringMonth={false}*/}
      {/*  next2Label={null}*/}
      {/*  prev2Label={null}*/}
      {/*  minDetail="year"*/}
      {/*  tileContent={({ date, view }: { date: Date; view: string }) => {*/}
      {/*    const html = [];*/}
      {/*    if (*/}
      {/*      view === "month" &&*/}
      {/*      date.getMonth() === today.getMonth() &&*/}
      {/*      date.getDate() === today.getDate()*/}
      {/*    ) {*/}
      {/*      html.push(<S.Today key={"today"}>오늘</S.Today>);*/}
      {/*    }*/}
      {/*    if (attendDay.find((x) => x === moment(date).format("YYYY-MM-DD"))) {*/}
      {/*      html.push(<FootIcon className="footIcon" key={moment(date).format("YYYY-MM-DD")} />);*/}
      {/*    }*/}
      {/*    return <>{html}</>;*/}
      {/*  }}*/}
      {/*/>*/}
      <S.Date onClick={handleTodayClick}>오늘</S.Date>
    </S.CalendarWrapper>
  );
};

export default Calendar;
