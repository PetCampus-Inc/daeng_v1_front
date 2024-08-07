import ArrowLeftIcon from "assets/svg/arrow-left-icon";
import ArrowRightIcon from "assets/svg/arrow-right-icon";
import XIcon from "assets/svg/x-icon";
import { FloatingOverlay } from "components/common/FloatingOverlay";
import { format } from "date-fns";
import { useClickOutSide } from "hooks/common/useClickOutSide";
import React, { useEffect, useRef } from "react";
import Calendar from "react-calendar";

import {
  PopupContainer,
  PopupWrapper,
  StyledYearView,
  ControlWrapper,
  ControlButton
} from "./styles";

import type { Value } from "react-calendar/dist/cjs/shared/types";

interface MonthSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  activeStartDate: Date | null;
  onSelect: (value: Value) => void;
  anchorRef: React.RefObject<HTMLDivElement>;
}

export const MonthSelector: React.FC<MonthSelectorProps> = ({
  isOpen,
  onClose,
  activeStartDate,
  onSelect,
  anchorRef
}) => {
  const popupRef = useRef<HTMLDivElement>(null);

  useClickOutSide({
    enabled: isOpen,
    targetRef: popupRef,
    onClickOutside: onClose
  });

  useEffect(() => {
    if (isOpen && popupRef.current && anchorRef.current) {
      const calendarNavigation = anchorRef.current;
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
  }, [isOpen, anchorRef]);

  if (!isOpen) return null;

  return (
    <>
      <FloatingOverlay type="none" />
      <PopupContainer>
        <PopupWrapper ref={popupRef}>
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
            <ControlButton type="button" onClick={onClose}>
              <XIcon />
            </ControlButton>
          </ControlWrapper>
        </PopupWrapper>
      </PopupContainer>
    </>
  );
};
