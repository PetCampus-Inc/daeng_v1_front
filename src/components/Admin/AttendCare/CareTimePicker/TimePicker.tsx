import { forwardRef, useImperativeHandle } from "react";

import { StyledTimeButton, StyledTimePickerWrapper, StyledTimeWrapper } from "./styles";
import useTimePicker, { type TimeState } from "../hooks/useTimePicker";

export interface TimePickerHandles {
  getTime: () => TimeState;
}

const TimePicker = forwardRef<TimePickerHandles, { disabled?: boolean }>(
  ({ disabled = false }, ref) => {
    const { state, togglePeriod, incrementHours, incrementMinutes } = useTimePicker({
      period: "오후",
      hours: "12",
      minutes: "00"
    });

    useImperativeHandle(ref, () => ({
      getTime: () => state
    }));

    return (
      <form>
        <StyledTimePickerWrapper role="group" aria-label="전송 시간 예약">
          <StyledTimeButton
            type="button"
            onClick={togglePeriod}
            disabled={disabled}
            aria-live="polite"
          >
            {state.period}
          </StyledTimeButton>
          <StyledTimeWrapper>
            <StyledTimeButton
              type="button"
              onClick={incrementHours}
              disabled={disabled}
              aria-live="polite"
            >
              {state.hours}
            </StyledTimeButton>
            <span className="text">:</span>
            <StyledTimeButton
              type="button"
              onClick={incrementMinutes}
              disabled={disabled}
              aria-live="polite"
            >
              {state.minutes}
            </StyledTimeButton>
          </StyledTimeWrapper>
        </StyledTimePickerWrapper>
      </form>
    );
  }
);

export default TimePicker;
