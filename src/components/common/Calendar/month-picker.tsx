import ArrowLeftIcon from "assets/svg/arrow-left-icon";
import ArrowRightIcon from "assets/svg/arrow-right-icon";
import XIcon from "assets/svg/x-icon";
import { FloatingOverlay } from "components/common/FloatingOverlay";
import { format } from "date-fns";
import { useClickOutSide } from "hooks/common/useClickOutSide";
import React, { useEffect, useRef } from "react";
import Calendar from "react-calendar";

import {
  ControlButton,
  ControlWrapper,
  MonthPickerCalendar,
  MonthPickerContainer,
  MonthPickerWrapper
} from "./styles";

import type { Value } from "react-calendar/dist/cjs/shared/types";

interface MonthPickerProps {
  /** 팝업 가시성 여부 */
  isOpen: boolean;
  /** 팝업 닫기 콜백 */
  onClose: () => void;
  /** 선택한 날짜 */
  value: Date | null;
  /** 캘린더 활성 범위의 최소 날짜 */
  minDate: Date;
  /** 월 변경 콜백 */
  onMonthChange: (value: Value) => void;
  /** 캘린더의 ref */
  anchorRef: React.RefObject<HTMLDivElement>;
}

export const MonthPicker = ({
  isOpen,
  onClose,
  value,
  minDate,
  onMonthChange,
  anchorRef
}: MonthPickerProps) => {
  const popupRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef<{ topOffset: number } | null>(null);

  // 외부 클릭 감지 시 MonthPicker 닫기
  useClickOutSide({
    enabled: isOpen,
    targetRef: popupRef,
    onClickOutside: onClose
  });

  useEffect(() => {
    // MonthPicker가 캘린더 타이틀 위치에 정확히 위치하도록 설정
    if (isOpen && popupRef.current && anchorRef.current) {
      if (!positionRef.current) {
        const calendarNavigation = anchorRef.current.querySelector(".react-calendar__navigation");
        if (calendarNavigation) {
          const calendarRect = calendarNavigation.getBoundingClientRect();

          // 부모의 부모 요소의 paddingTop을 계산
          const grandParentElement = popupRef.current.parentElement?.parentElement;
          const grandParentStyle = grandParentElement ? getComputedStyle(grandParentElement) : null;
          const grandParentPaddingTop = grandParentStyle
            ? parseFloat(grandParentStyle.paddingTop) || 0
            : 0;

          // .react-calendar__navigation의 height를 가져옴 (44px로 설정된 height 값)
          const navigationHeight = parseFloat(getComputedStyle(calendarNavigation).height) || 44;

          // calendarRect.top - 캘린더 navigation의 높이 - 부모의 부모 요소의 paddingTop의 절반
          const topOffset = calendarRect.top - navigationHeight - grandParentPaddingTop / 2;
          positionRef.current = { topOffset };
        }
      }

      // 이미 계산된 위치를 사용
      if (positionRef.current && popupRef.current) {
        popupRef.current.style.top = `${positionRef.current.topOffset}px`;
      }
    }
  }, [isOpen, anchorRef]);

  if (!isOpen) return null;

  return (
    <>
      <FloatingOverlay type="none" />
      <MonthPickerContainer>
        <MonthPickerWrapper ref={popupRef}>
          {/* MonthPicker 캘린더 영역 */}
          <MonthPickerCalendar>
            <Calendar
              value={value}
              onChange={onMonthChange}
              view="year"
              maxDetail="year"
              minDetail="month"
              formatYear={(locale, value) => format(value, "yyyy")}
              minDate={minDate}
              maxDate={new Date()}
              prevLabel={<ArrowLeftIcon w={20} />}
              nextLabel={<ArrowRightIcon w={20} />}
              prev2Label={null}
              next2Label={null}
            />
          </MonthPickerCalendar>
          {/* 닫기 버튼 */}
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
