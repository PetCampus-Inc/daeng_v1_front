import ArrowLeftIcon from "assets/svg/arrow-left-icon";
import ArrowRightIcon from "assets/svg/arrow-right-icon";
import FootIcon from "assets/svg/foot-icon";
import { isSameDay } from "date-fns";
import { useRef, useState } from "react";

import { MonthPicker } from "./month-picker";
import * as MonthlyPrimitive from "./monthly-calendar";
import * as Styled from "./styles";
import { useAdjustButton } from "./useAdjustButton";
import { useCalendar } from "./useCalendar";
import { Box } from "../Box";

import type { TileContentProps } from "./monthly-calendar";
import type { CalendarProps, CalendarVariants } from "./types";
import type { Value } from "react-calendar/dist/esm/shared/types";

interface MonthCalendarProps extends CalendarProps {
  variant?: CalendarVariants;
}

/**
 * monthly view를 지원하는 캘린더
 */
export function MonthCalendar({ minDate, tileDate, variant = "member" }: MonthCalendarProps) {
  const {
    value,
    activeStartDate,
    today,
    handleDateChange,
    handleActiveStartDateChange,
    handleTodayClick
  } = useCalendar({ minDate });

  const [showMonthPicker, setShowMonthPicker] = useState(false);
  const calendarRef = useRef<HTMLDivElement>(null);

  const setTodayButtonRef = useAdjustButton(calendarRef);

  const handleOpenMonthPicker = () => setShowMonthPicker(true);
  const handleCloseMonthPicker = () => setShowMonthPicker(false);

  /** MonthPicker 월 변경 함수 */
  const handleMonthChange = (date: Value) => {
    handleDateChange(date);
    setShowMonthPicker(false);
  };

  const calendarProps = {
    value,
    activeStartDate,
    today,
    tileDate,
    minDate,
    onDateChange: handleDateChange,
    onActiveStartDateChange: handleActiveStartDateChange,
    onOpenMonthPicker: handleOpenMonthPicker,
    calendarRef
  };

  return (
    <Box bgColor="white" pt={14}>
      <Styled.MonthlyCalendar
        as={MonthlyPrimitive.MonthlyCalendar}
        variant={variant}
        prevLabel={
          variant === "admin" ? (
            <Styled.NavigationButton bgColor="white">
              <ArrowLeftIcon size={24} color="darkBlack" />
            </Styled.NavigationButton>
          ) : (
            <Styled.NavigationButton bgColor="yellow_3" color="primaryColor">
              <ArrowLeftIcon size={24} />
            </Styled.NavigationButton>
          )
        }
        nextLabel={
          variant === "admin" ? (
            <Styled.NavigationButton bgColor="white">
              <ArrowRightIcon size={24} />
            </Styled.NavigationButton>
          ) : (
            <Styled.NavigationButton bgColor="yellow_3" color="primaryColor">
              <ArrowRightIcon size={24} />
            </Styled.NavigationButton>
          )
        }
        renderTileContent={(props: TileContentProps) => TileContent({ ...props, variant })}
        renderTodayButton={
          <Styled.GoToTodayButton
            ref={setTodayButtonRef}
            type="button"
            onClick={handleTodayClick}
            variant={variant}
          >
            오늘
          </Styled.GoToTodayButton>
        }
        {...calendarProps}
      />
      <MonthPicker
        isOpen={showMonthPicker}
        onClose={handleCloseMonthPicker}
        value={value}
        minDate={minDate}
        onMonthChange={handleMonthChange}
        anchorRef={calendarRef}
      />
    </Box>
  );
}

interface TileProps extends TileContentProps {
  variant: CalendarVariants;
}

const TileContent = ({ tileDate, date, view, today, variant }: TileProps) => {
  if (view !== "month" || !tileDate || tileDate.length === 0) {
    return null;
  }

  const isToday = isSameDay(date, today);
  const hasEvent = tileDate.some((day) => isSameDay(day, date));

  if (isToday) {
    return <Styled.TileText variant={variant}>오늘</Styled.TileText>;
  }

  if (hasEvent) {
    return variant === "admin" ? (
      <Styled.Dot variant={variant} />
    ) : (
      <Box as="span" color="br_3">
        <FootIcon w={15} h={12} />
      </Box>
    );
  }

  return null;
};
