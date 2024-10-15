import ArrowDownIcon from "assets/svg/arrow-down-icon";
import ArrowLeftIcon from "assets/svg/arrow-left-icon";
import ArrowRightIcon from "assets/svg/arrow-right-icon";
import FootIcon from "assets/svg/foot-icon";
import { isSameDay } from "date-fns";
import { useRef, useState } from "react";

import { MonthPicker } from "./month-picker";
import * as MonthlyPrimitive from "./monthly-calendar";
import { ToggleViewButton } from "./styles";
import * as Styled from "./styles";
import { useAdjustButton } from "./useAdjustButton";
import { useCalendar } from "./useCalendar";
import * as WeeklyPrimitive from "./weekly-calendar";
import { Box } from "../Box";
import { Flex } from "../Flex";

import type { TileContentProps } from "./monthly-calendar";
import type { CalendarProps } from "./types";
import type { Value } from "react-calendar/dist/esm/shared/types";

/**
 * weekly & monthly view를 지원하는 캘린더
 */
export function AllCalendar({ minDate, tileDate }: CalendarProps) {
  const {
    value,
    activeStartDate,
    today,
    handleDateChange,
    handleActiveStartDateChange,
    handleTodayClick
  } = useCalendar({ minDate });

  const [expanded, setExpanded] = useState(false);
  const [showMonthPicker, setShowMonthPicker] = useState(false);
  const calendarRef = useRef<HTMLDivElement>(null);

  const setTodayButtonRef = useAdjustButton(calendarRef);

  const toggleExpanded = () => setExpanded((prev) => !prev);
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
    onTodayClick: handleTodayClick,
    onOpenMonthPicker: handleOpenMonthPicker,
    calendarRef
  };

  return (
    <Box bgColor="white" pt={28} radius="0px 0px 20px 20px" overflow="hidden">
      {expanded ? (
        <Styled.MonthlyCalendar
          as={MonthlyPrimitive.MonthlyCalendar}
          variant="member"
          prevLabel={
            <Box
              w={26}
              h={26}
              m={8}
              display="flex"
              align="center"
              justify="center"
              bgColor="yellow_3"
              color="primaryColor"
              radius="circle"
            >
              <ArrowLeftIcon size={24} />
            </Box>
          }
          nextLabel={
            <Box
              w={26}
              h={26}
              m={8}
              display="flex"
              align="center"
              justify="center"
              bgColor="yellow_3"
              color="primaryColor"
              radius="circle"
            >
              <ArrowRightIcon size={24} />
            </Box>
          }
          renderTileContent={TileContent}
          renderTodayButton={
            <Styled.GoToTodayButton
              ref={setTodayButtonRef}
              variant="member"
              type="button"
              onClick={handleTodayClick}
            >
              오늘
            </Styled.GoToTodayButton>
          }
          {...calendarProps}
        />
      ) : (
        <Styled.WeeklyCalendar
          as={WeeklyPrimitive.WeeklyCalendar}
          renderTodayButton={
            <Styled.GoToTodayButton variant="member" type="button" onClick={handleTodayClick}>
              오늘
            </Styled.GoToTodayButton>
          }
          {...calendarProps}
        />
      )}
      <ToggleViewButton type="button" onClick={toggleExpanded} expand={expanded}>
        {expanded ? "닫기" : "펼쳐보기"}
        <Flex align="center">
          <ArrowDownIcon size={20} />
        </Flex>
      </ToggleViewButton>
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

const TileContent = ({ tileDate, date, view, today }: TileContentProps) => {
  if (view !== "month" || !tileDate || tileDate.length === 0) return null;

  const isToday = isSameDay(date, today);
  const hasEvent = tileDate.some((day) => isSameDay(day, date));

  if (isToday) {
    return <Styled.TileText variant="member">오늘</Styled.TileText>;
  }

  if (hasEvent) {
    return (
      <Styled.Dot variant="member">
        <FootIcon w={15} h={12} />
      </Styled.Dot>
    );
  }

  return null;
};
