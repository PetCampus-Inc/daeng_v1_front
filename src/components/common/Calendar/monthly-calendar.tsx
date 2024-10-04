import { format } from "date-fns";
import { ReactNode } from "react";
import Calendar, { type CalendarProps } from "react-calendar";
import { OnArgs } from "react-calendar/dist/esm";

import type { Value } from "react-calendar/dist/cjs/shared/types";

export interface MonthlyCalendarProps extends CalendarProps {
  /** 선택한 날짜 */
  value: Date | null;
  /** 캘린더 활성 날짜 */
  activeStartDate?: Date;
  /** 오늘 날짜 */
  today: Date;
  /** 캘린더 타일에 표시될 날짜 */
  tileDate?: Date[];
  /** 캘린더 활성 범위의 최소 날짜 */
  minDate: Date;
  /** 캘린더 선택 날짜 변경 콜백 */
  onDateChange: (newDate: Value) => void;
  /** 캘린더 활성 날짜 변경 콜백 */
  onActiveStartDateChange: (arg: OnArgs) => void;
  /** MonthPicker 열기 */
  onOpenMonthPicker: () => void;
  /** 캘린더 ref (readOnly) */
  calendarRef: React.RefObject<HTMLDivElement>;
  /** 커스텀 타일 요소 */
  renderTileContent?: (props: TileContentProps) => React.ReactNode;
  renderTodayButton?: ReactNode;
  /** 스타일 적용을 위한 className */
  className?: string;
}

export interface TileContentProps {
  tileDate?: Date[];
  date: Date;
  view: string;
  today: Date;
}

export function MonthlyCalendar(props: MonthlyCalendarProps) {
  const {
    value,
    activeStartDate,
    today,
    tileDate,
    minDate,
    onDateChange,
    onActiveStartDateChange,
    onOpenMonthPicker,
    calendarRef,
    renderTileContent,
    renderTodayButton,
    className,
    ...rest
  } = props;
  return (
    <div className={className}>
      <Calendar
        inputRef={calendarRef}
        value={value}
        onChange={onDateChange}
        activeStartDate={activeStartDate || undefined}
        onActiveStartDateChange={(args: OnArgs) => onActiveStartDateChange(args)}
        formatDay={(locale, date: Date) => format(date, "d")}
        formatWeekday={(locale, date) => format(date, "E")}
        formatYear={(locale, date: Date) => format(date, "yyyy")}
        formatMonthYear={(locale, date: Date) => format(date, "yyyy. MM")}
        minDate={minDate}
        maxDate={new Date()}
        calendarType="gregory"
        showNeighboringMonth={false}
        next2Label={null}
        prev2Label={null}
        minDetail="year"
        view="month"
        onDrillUp={onOpenMonthPicker}
        tileContent={({ date, view }) =>
          renderTileContent ? renderTileContent({ tileDate, date, view, today }) : null
        }
        {...rest}
      />
      {renderTodayButton && renderTodayButton}
    </div>
  );
}
