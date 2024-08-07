type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const getWeekRange = (date: string | number | Date) => {
  const start = new Date(date);
  start.setDate(start.getDate() - start.getDay());
  const end = new Date(start);
  end.setDate(end.getDate() + 6);

  const days = [];
  for (let day = new Date(start); day <= end; day.setDate(day.getDate() + 1)) {
    days.push(new Date(day));
  }
  return days;
};

export const WeeklyCalendar = () => {
  const today = new Date();
  const weekRange = getWeekRange(today);
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="weekly-calendar">
      <div className="week-header">
        {weekDays.map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>
      <div className="week-days">
        {weekRange.map((day) => (
          <div key={day.toISOString()} className="day-tile">
            {day.getDate()}
          </div>
        ))}
      </div>
    </div>
  );
};
