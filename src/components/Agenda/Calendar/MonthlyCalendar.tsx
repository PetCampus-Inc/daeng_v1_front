import ArrowLeftIcon from "assets/svg/arrow-left-icon";
import ArrowRightIcon from "assets/svg/arrow-right-icon";
import FootIcon from "assets/svg/foot-icon";
import XIcon from "assets/svg/x-icon";
import { Box, Text } from "components/common";
import { FloatingOverlay } from "components/common/FloatingOverlay";
import { format, isSameDay } from "date-fns";
import { useClickOutSide } from "hooks/common/useClickOutSide";
import React, {
  type ForwardedRef,
  type RefObject,
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState
} from "react";
import Calendar, { type OnArgs } from "react-calendar";

import {
  StyledMonthlyCalendar,
  StyledDate,
  StyledYearView,
  PopupContainer,
  ControlWrapper,
  ControlButton,
  PopupWrapper
} from "./styles";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

interface YearPopupProps {
  isOpen: boolean;
  close: () => void;
  activeStartDate: Date | null;
  onSelect: (value: Value) => void;
}

const YearPopup = forwardRef(function YearPopup(
  { isOpen, close, activeStartDate, onSelect }: YearPopupProps,
  ref: ForwardedRef<HTMLDivElement>
) {
  const popupRef = ref as RefObject<HTMLDivElement>;

  useClickOutSide({
    enabled: isOpen,
    targetRef: popupRef,
    onClickOutside: close
  });

  if (!isOpen) return null;

  return (
    <>
      <FloatingOverlay type="none" />
      <PopupContainer>
        <PopupWrapper ref={ref}>
          <StyledYearView>
            <Calendar
              value={activeStartDate}
              onChange={onSelect}
              view="year"
              maxDetail="year"
              minDetail="month"
              formatYear={(locale, date) => format(date, "yyyy")}
              prevLabel={<ArrowLeftIcon w={20} colorScheme="darkBlack" />}
              nextLabel={<ArrowRightIcon w={20} colorScheme="darkBlack" />}
              prev2Label={null}
              next2Label={null}
            />
          </StyledYearView>
          <ControlWrapper>
            <ControlButton type="button" onClick={close}>
              <XIcon />
            </ControlButton>
          </ControlWrapper>
        </PopupWrapper>
      </PopupContainer>
    </>
  );
});

interface MonthlyCalendarProps {
  data: {
    today: Date;
    activeStartDate: Date | null;
    handleDateChange: (newDate: Value) => void;
    handleTodayClick: () => void;
    setActiveStartDate: React.Dispatch<React.SetStateAction<Date | null>>;
  };
}

export const MonthlyCalendar = ({ data }: MonthlyCalendarProps) => {
  const [showYearPopup, setShowYearPopup] = useState(false);
  const calendarRef = useRef<HTMLDivElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const todayRef = useRef<HTMLButtonElement>(null);

  const { today, activeStartDate, handleDateChange, handleTodayClick, setActiveStartDate } = data;

  const ATTEND_DAYS = ["2024-07-17", "2024-07-17", "2024-07-21", "2024-07-23"];

  const handleDrillUp = useCallback(() => {
    setShowYearPopup(true);
  }, []);

  const handleActiveStartDateChange = useCallback(
    ({ view, activeStartDate }: OnArgs) => {
      if (view === "month") {
        setActiveStartDate(activeStartDate);
      }
    },
    [setActiveStartDate]
  );

  const handleYearSelect = useCallback(
    (value: Value) => {
      if (value instanceof Date) {
        setActiveStartDate(value);
        setShowYearPopup(false);
      }
    },
    [setActiveStartDate]
  );

  const renderTileContent = useCallback(
    ({ date, view }: { date: Date; view: string }) => {
      const contents = [];

      if (view === "month" && isSameDay(date, today)) {
        contents.push(
          <Text typo="caption1_12_R" color="primaryColor" key="today">
            오늘
          </Text>
        );
      }

      if (ATTEND_DAYS.some((day) => isSameDay(new Date(day), date))) {
        contents.push(
          <Box as="span" color="br_3" key="footIcon">
            <FootIcon w={15} h={12} />
          </Box>
        );
      }

      return contents;
    },
    [today]
  );

  const adjustTodayButtonPosition = useCallback(() => {
    if (calendarRef.current && todayRef.current) {
      const calendarNavigation = calendarRef.current.querySelector(".react-calendar__navigation");
      const todayButton = todayRef.current;

      if (calendarNavigation) {
        const navRect = calendarNavigation.getBoundingClientRect();
        const calendarRect = calendarRef.current.getBoundingClientRect();

        const topOffset =
          navRect.top - calendarRect.top + (navRect.height - todayButton.offsetHeight) / 2;
        todayButton.style.top = `${topOffset}px`;
      }
    }
  }, []);

  useEffect(() => {
    adjustTodayButtonPosition();
    window.addEventListener("resize", adjustTodayButtonPosition);

    return () => {
      window.removeEventListener("resize", adjustTodayButtonPosition);
    };
  }, [adjustTodayButtonPosition]);

  useEffect(() => {
    if (showYearPopup && calendarRef.current && popupRef.current) {
      const calendarNavigation = calendarRef.current.querySelector(".react-calendar__navigation");
      const popupNavigation = popupRef.current.querySelector(".react-calendar__navigation");

      if (calendarNavigation && popupNavigation) {
        const calendarRect = calendarNavigation.getBoundingClientRect();
        const popupRect = popupRef.current.getBoundingClientRect();

        const topOffset = calendarRect.top - popupRect.top;

        const popupStyle = getComputedStyle(popupRef.current);
        const paddingTop = parseFloat(popupStyle.paddingTop);

        popupRef.current.style.transform = `translateY(${topOffset - paddingTop}px)`;
      }
    }
  }, [showYearPopup]);

  return (
    <>
      <StyledMonthlyCalendar ref={calendarRef}>
        <Calendar
          value={activeStartDate}
          onChange={handleDateChange}
          activeStartDate={activeStartDate || undefined}
          onActiveStartDateChange={handleActiveStartDateChange}
          formatDay={(locale, date) => format(date, "d")}
          formatWeekday={(locale, date) => format(date, "E")}
          formatMonthYear={(locale, date) => format(date, "yyyy. MM")}
          formatYear={(locale, date) => format(date, "yyyy")}
          calendarType="gregory"
          showNeighboringMonth={true}
          prevLabel={<ArrowLeftIcon w={24} colorScheme="darkBlack" />}
          nextLabel={<ArrowRightIcon w={24} colorScheme="darkBlack" />}
          next2Label={null}
          prev2Label={null}
          minDetail="year"
          view="month"
          onDrillUp={handleDrillUp}
          tileContent={renderTileContent}
        />
        <StyledDate type="button" ref={todayRef} onClick={handleTodayClick}>
          오늘
        </StyledDate>
      </StyledMonthlyCalendar>
      {showYearPopup && (
        <YearPopup
          ref={popupRef}
          isOpen={showYearPopup}
          close={() => setShowYearPopup(false)}
          activeStartDate={activeStartDate}
          onSelect={handleYearSelect}
        />
      )}
    </>
  );
};
