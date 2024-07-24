import { Box } from "components/common";
import { format } from "date-fns";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

import { MonthlyCalendar } from "./MonthlyCalendar";
import { WeeklyCalendar } from "./WeeklyCalendar";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

export const Calendar = () => {
  const today = new Date();
  const [view, setView] = useState<"week" | "month">("week");
  // 월이 바뀔때 view가 변경되려면 activeStartDate를 업데이트 시켜줘야함

  const [activeStartDate, setActiveStartDate] = useState<Date | null>(new Date());
  const [searchParams, setSearchParams] = useSearchParams();

  const handleDateChange = (newDate: Value) => {
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

  const handleExpand = () => {
    setView("month");
  };

  const handleCollapse = () => {
    setView("week");
  };

  const monthlyData = {
    today,
    handleDateChange,
    handleTodayClick,
    activeStartDate,
    setActiveStartDate
  };

  return (
    <Box bgColor="white" pt={28} radius="0px 0px 20px 20px">
      {view === "week" ? (
        <>
          <WeeklyCalendar />
          <button onClick={handleExpand}>펼치기</button>
        </>
      ) : (
        <>
          <MonthlyCalendar data={monthlyData} />
          <button onClick={handleCollapse}>접기</button>
        </>
      )}
    </Box>
  );
};
