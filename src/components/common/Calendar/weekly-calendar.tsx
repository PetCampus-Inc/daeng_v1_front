import ArrowDownIcon from "assets/svg/arrow-down-icon";
import FootIcon from "assets/svg/foot-icon";
import { Box, Text } from "components/common";
import { isSameDay, format, isToday } from "date-fns";
import { ko } from "date-fns/locale";
import { motion } from "framer-motion";
import React, { type ReactNode, useEffect, useRef } from "react";

import {
  DayContent,
  DayTile,
  NavigationButton,
  StyledWeeklyHeader,
  StyledWeeklyTitle,
  WeekContainer
} from "./styles";
import { useWeekSwipe } from "./useWeekSwipe";

import type { Value } from "react-calendar/dist/cjs/shared/types";
import type { OnArgs } from "react-calendar/dist/esm";

export interface WeeklyCalendarProps {
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
  /** 커스텀 버튼 요소 */
  renderTodayButton?: ReactNode;
}

interface WeekViewProps {
  /** 주간 날짜 */
  week: Date[];
  /** 선택한 날짜 */
  date: Date;
  /** 캘린더 타일에 표시될 날짜 */
  tileDate?: Date[];
  /** 선택 불가능한 범위 내에 있는지 확인 */
  isDateDisabled: (date: Date) => boolean;
  /** 캘린더 선택 날짜 변경 콜백 */
  onDateChange: (date: Date) => void;
  /** 활성화된 주간인지 여부 */
  isActive: boolean;
}

const WEEK_DAYS = ["일", "월", "화", "수", "목", "금", "토"];

export const WeeklyCalendar = (props: WeeklyCalendarProps) => {
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
    renderTodayButton
  } = props;

  const containerRef = useRef<HTMLDivElement>(null);
  const containerWidth = containerRef.current?.offsetWidth || 0;

  const { weeks, controls, handleDragEnd, generateWeeks, setWeeks, isDateSelectable } =
    useWeekSwipe({
      containerWidth,
      activeDate: value,
      onDateChange,
      maxDate: today,
      minDate
    });

  useEffect(() => {
    if (value) {
      setWeeks(generateWeeks(value));
      controls.set({ x: -containerWidth });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, containerWidth]);

  if (!value || !activeStartDate) return null;

  return (
    <Box as="div" px={16}>
      <StyledWeeklyHeader ref={calendarRef}>
        <StyledWeeklyTitle onClick={onOpenMonthPicker}>
          <Text typo="label1_16_B" color="primaryColor">
            {format(activeStartDate, "yyyy. MM", { locale: ko })}
          </Text>
          <NavigationButton>
            <ArrowDownIcon w={20} h={20} />
          </NavigationButton>
        </StyledWeeklyTitle>
        {renderTodayButton && renderTodayButton}
      </StyledWeeklyHeader>
      <div ref={containerRef}>
        <motion.div
          drag="x"
          dragConstraints={{ left: -containerWidth * 2, right: 0 }}
          onDragEnd={handleDragEnd}
          animate={controls}
          initial={{ x: -containerWidth }}
          dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
          style={{ display: "flex" }}
          dragElastic={0.2}
          dragMomentum={false}
        >
          {weeks.map((week, weekIndex) => (
            <WeekView
              key={weekIndex}
              week={week}
              tileDate={tileDate}
              date={value}
              isDateDisabled={(date) => !isDateSelectable(date)}
              onDateChange={onDateChange}
              isActive={weekIndex === 1}
            />
          ))}
        </motion.div>
      </div>
    </Box>
  );
};

const WeekView = ({
  week,
  date,
  tileDate,
  isDateDisabled,
  onDateChange,
  isActive
}: WeekViewProps) => {
  return (
    <WeekContainer active={isActive}>
      {week.map((day) => (
        <DayTile
          key={day.toISOString()}
          type="button"
          className={`
          ${isSameDay(day, date) ? "active" : ""}
          ${isDateDisabled(day) ? "disabled" : ""}
          ${!isActive ? "neighboring-week" : ""}
        `.trim()}
          onClick={() => onDateChange(day)}
          disabled={isDateDisabled(day)}
        >
          <Text
            as="abbr"
            title={`${WEEK_DAYS[day.getDay()]}`}
            typo="label2_14_M"
            color="inherit"
            textDecoration="none"
            className={day.getDay() === 0 ? "weekday sunday" : "weekday"}
          >
            {WEEK_DAYS[day.getDay()]}
          </Text>
          <DayContent>
            <abbr title={format(day, "yyyy년 M월 d일", { locale: ko })} className="day">
              {format(day, "d")}
            </abbr>
            {isToday(day) ? (
              <p className="today">오늘</p>
            ) : (
              tileDate?.some((date) => isSameDay(date, day)) && (
                <Box as="span" color="br_3" key="footIcon">
                  <FootIcon w={15} h={12} />
                </Box>
              )
            )}
          </DayContent>
        </DayTile>
      ))}
    </WeekContainer>
  );
};
