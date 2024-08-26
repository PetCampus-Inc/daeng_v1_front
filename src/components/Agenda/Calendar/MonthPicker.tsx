import ArrowLeftIcon from "assets/svg/arrow-left-icon";
import ArrowRightIcon from "assets/svg/arrow-right-icon";
import XIcon from "assets/svg/x-icon";
import { FloatingOverlay } from "components/common/FloatingOverlay";
import { format, parseISO } from "date-fns";
import { useClickOutSide } from "hooks/common/useClickOutSide";
import React, { useEffect, useRef } from "react";
import Calendar from "react-calendar";

import {
  MonthPickerContainer,
  MonthPickerWrapper,
  ControlWrapper,
  ControlButton,
  MonthPickerCalendar
} from "./styles";

import type { DogInfoRecordType } from "hooks/api/member/dogs";
import type { Value } from "react-calendar/dist/cjs/shared/types";

interface MonthPickerProps {
  data?: DogInfoRecordType[];
  isOpen: boolean;
  onClose: () => void;
  date: Date | null;
  onMonthClick: (value: Value) => void;
  anchorRef: React.RefObject<HTMLDivElement>;
}

const minDate = parseISO("2024-06-30");
const maxDate = new Date();

export const MonthPicker = ({
  data,
  isOpen,
  onClose,
  date,
  onMonthClick,
  anchorRef
}: MonthPickerProps) => {
  const popupRef = useRef<HTMLDivElement>(null);

  useClickOutSide({
    enabled: isOpen,
    targetRef: popupRef,
    onClickOutside: onClose
  });

  useEffect(() => {
    // MonthPicker가 캘린더 타이틀 위치에 정확히 위치하도록 설정
    if (isOpen && popupRef.current && anchorRef.current) {
      const calendarNavigation = anchorRef.current;
      const popupNavigation = popupRef.current.querySelector(".react-calendar__navigation");
      console.log(popupNavigation);
      console.log(calendarNavigation);

      if (calendarNavigation && popupNavigation) {
        const calendarRect = calendarNavigation.getBoundingClientRect();
        const popupRect = popupRef.current.getBoundingClientRect();

        const topOffset = calendarRect.top - popupRect.top;

        const popupStyle = getComputedStyle(popupRef.current);
        const paddingTop = parseFloat(popupStyle.paddingTop);

        popupRef.current.style.transform = `translateY(${topOffset - paddingTop}px)`;
      }
    }
  }, [isOpen, anchorRef]);

  if (!isOpen) return null;

  return (
    <>
      <FloatingOverlay type="none" />
      <MonthPickerContainer>
        <MonthPickerWrapper ref={popupRef}>
          <MonthPickerCalendar>
            <Calendar
              value={date}
              onChange={onMonthClick}
              view="year"
              maxDetail="year"
              minDetail="month"
              formatYear={(locale, date) => format(date, "yyyy")}
              minDate={minDate}
              maxDate={maxDate}
              prevLabel={<ArrowLeftIcon w={20} />}
              nextLabel={<ArrowRightIcon w={20} />}
              prev2Label={null}
              next2Label={null}
            />
          </MonthPickerCalendar>
          <ControlWrapper>
            <ControlButton type="button" onClick={onClose}>
              <XIcon />
            </ControlButton>
          </ControlWrapper>
        </MonthPickerWrapper>
      </MonthPickerContainer>
    </>
  );
};
