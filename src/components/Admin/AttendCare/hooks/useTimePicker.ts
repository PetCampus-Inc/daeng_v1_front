import { useReducer } from "react";

export interface TimeState {
  period: "오전" | "오후";
  hours: string;
  minutes: string;
}

enum ActionType {
  TOGGLE_PERIOD = "TOGGLE_PERIOD",
  INCREMENT_HOURS = "INCREMENT_HOURS",
  DECREMENT_HOURS = "DECREMENT_HOURS",
  INCREMENT_MINUTES = "INCREMENT_MINUTES",
  DECREMENT_MINUTES = "DECREMENT_MINUTES"
}

type TimeAction =
  | { type: ActionType.TOGGLE_PERIOD }
  | { type: ActionType.INCREMENT_HOURS }
  | { type: ActionType.DECREMENT_HOURS }
  | { type: ActionType.INCREMENT_MINUTES }
  | { type: ActionType.DECREMENT_MINUTES };

const timeReducer = (state: TimeState, action: TimeAction): TimeState => {
  switch (action.type) {
    case ActionType.TOGGLE_PERIOD:
      return { ...state, period: state.period === "오전" ? "오후" : "오전" };
    case ActionType.INCREMENT_HOURS: {
      const incrementedHour = (parseInt(state.hours) + 1) % 12 || 12;
      const newPeriodAfterHourIncrement =
        incrementedHour === 12 ? (state.period === "오전" ? "오후" : "오전") : state.period;
      return {
        ...state,
        hours: incrementedHour.toString().padStart(2, "0"),
        period: newPeriodAfterHourIncrement
      };
    }
    case ActionType.DECREMENT_HOURS: {
      const decrementedHour = parseInt(state.hours) - 1 || 12;
      const newPeriodAfterHourDecrement =
        decrementedHour === 11 ? (state.period === "오후" ? "오전" : state.period) : state.period;
      return {
        ...state,
        hours: decrementedHour.toString().padStart(2, "0"),
        period: newPeriodAfterHourDecrement
      };
    }
    case ActionType.INCREMENT_MINUTES: {
      const incrementedMinutes = (parseInt(state.minutes) + 10) % 60;
      const shouldIncrementHourDueToMinutes = incrementedMinutes === 0;
      const hoursAfterMinutesIncrement = shouldIncrementHourDueToMinutes
        ? ((parseInt(state.hours) % 12) + 1).toString().padStart(2, "0")
        : state.hours;
      const periodAfterMinutesIncrement =
        shouldIncrementHourDueToMinutes && state.hours === "11"
          ? state.period === "오전"
            ? "오후"
            : "오전"
          : state.period;
      return {
        ...state,
        hours: hoursAfterMinutesIncrement,
        minutes: incrementedMinutes.toString().padStart(2, "0"),
        period: periodAfterMinutesIncrement
      };
    }
    case ActionType.DECREMENT_MINUTES: {
      const decrementedMinutes = (parseInt(state.minutes) - 10 + 60) % 60;
      return {
        ...state,
        minutes: decrementedMinutes.toString().padStart(2, "0")
      };
    }
    default:
      throw new Error(`Unhandled action: ${action}`);
  }
};

const useTimePicker = (initialState: TimeState) => {
  const [state, dispatch] = useReducer(timeReducer, initialState);

  const togglePeriod = () => dispatch({ type: ActionType.TOGGLE_PERIOD });
  const incrementHours = () => dispatch({ type: ActionType.INCREMENT_HOURS });
  const decrementHours = () => dispatch({ type: ActionType.DECREMENT_HOURS });
  const incrementMinutes = () => dispatch({ type: ActionType.INCREMENT_MINUTES });
  const decrementMinutes = () => dispatch({ type: ActionType.DECREMENT_MINUTES });

  return {
    state,
    togglePeriod,
    incrementHours,
    decrementHours,
    incrementMinutes,
    decrementMinutes
  };
};

export default useTimePicker;
