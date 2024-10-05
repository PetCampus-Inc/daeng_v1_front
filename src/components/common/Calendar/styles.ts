import styled, { css, RuleSet } from "styled-components";
import { remCalc } from "utils/calculator";

import type { CalendarVariants } from "./types";

const sharedStyles = {
  admin: {
    tileText: css`
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translateX(-50%);
      ${({ theme }) => theme.typo.caption1_10_R};
      color: ${({ theme }) => theme.colors.br_2};
      line-height: 1.2;
    `,
    dot: css`
      background-color: ${({ theme }) => theme.colors.br_2};
      border-radius: 50%;
      width: 0.3rem;
      height: 0.3rem;
      position: absolute;
      top: 60%;
      left: 50%;
      transform: translateX(-50%);
    `,
    todayButton: css`
      display: flex;
      align-items: center;
      justify-content: center;

      max-width: 52px;
      width: 100%;
      height: 24px;

      position: absolute;
      right: 36px;

      font-size: 0.8rem;
      letter-spacing: 0.015rem;
      line-height: 1.25rem;
      font-weight: 800;
      font-family: "Pretendard Variable";

      background-color: ${({ theme }) => theme.colors.yellow_3};
      color: ${({ theme }) => theme.colors.primaryColor};
      border-radius: 15px;
    `
  },
  member: {
    tileText: css`
      ${({ theme }) => theme.typo.caption1_12_R};
      color: ${({ theme }) => theme.colors.br_2};
      line-height: 1.2;
    `,
    dot: css`
      color: ${({ theme }) => theme.colors.br_3};
    `,
    todayButton: css`
      display: flex;
      align-items: center;
      justify-content: center;

      max-width: 52px;
      width: 100%;
      height: 24px;

      position: absolute;
      right: 36px;

      font-size: 0.8rem;
      letter-spacing: 0.015rem;
      line-height: 1.25rem;
      font-weight: 800;
      font-family: "Pretendard Variable";

      background-color: ${({ theme }) => theme.colors.primary_2};
      color: ${({ theme }) => theme.colors.yellow_3};
      border-radius: 15px;
    `
  }
};

const calendarVariants = {
  admin: css`
    display: flex;
    position: relative;
    justify-content: center;
    width: 100%;

    .react-calendar {
      width: 100%;
    }

    /* 네비 영역 */
    .react-calendar__navigation {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: ${remCalc(14)};
      height: 44px;

      button {
        display: flex;
        justify-content: center;
        align-content: center;
      }

      button:enabled:hover,
      button:enabled:focus {
        background-color: ${({ theme }) => theme.colors.white};
      }

      button:disabled {
        background-color: ${({ theme }) => theme.colors.white};
        color: ${({ theme }) => theme.colors.gray_4};
      }

      .react-calendar__navigation__label {
        flex-grow: 0.1 !important;
        font-family: "Pretendard Variable";
        ${({ theme }) => theme.typo.label1_16_B};
        color: ${({ theme }) => theme.colors.darkBlack};
      }
    }

    /* 날짜 영역 컨테이너 */
    .react-calendar__viewContainer {
      padding-inline: 8px;
    }

    /* WeekDays 영역 */
    .react-calendar__month-view__weekdays {
      margin-bottom: ${remCalc(18)};
      text-transform: uppercase;
      text-align: center;

      .react-calendar__month-view__weekdays__weekday {
        flex: 1 !important;
      }

      .react-calendar__month-view__weekdays__weekday abbr {
        color: ${({ theme }) => theme.colors.gray_1};
        ${({ theme }) => theme.typo.label2_14_B};
      }

      .react-calendar__month-view__weekdays__weekday--weekend abbr[title="Sun"] {
        color: ${({ theme }) => theme.colors.red_1};
      }
    }

    /* days 영역 */
    .react-calendar__month-view__days {
      .react-calendar__tile {
        position: relative;
        display: grid;
        grid-template-rows: 0.7fr auto 1.3fr;
        align-items: center;
        justify-items: center;
        flex-basis: calc(100% / 7) !important;
        max-width: calc(100% / 7);
        aspect-ratio: 1 / 1;

        /* 날짜 텍스트를 위한 스타일 */
        abbr {
          margin-top: -0.2em;
          grid-row: 2;
          ${({ theme }) => theme.typo.label2_14_M};
          font-family: "Pretendard Variable";
          font-size: small;
          line-height: 1;
          color: ${({ theme }) => theme.colors.gray_1};
          z-index: 1;
        }

        /* 추가 콘텐츠를 위한 스타일 */
        > *:not(abbr) {
          z-index: 1;
        }

        /* 배경색과 간격을 위한 가상 요소 */
        &::after {
          content: "";
          position: absolute;
          width: 65%;
          height: 65%;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          border-radius: 4px;
          aspect-ratio: 1 / 1;
        }

        /* 오늘 날짜 스타일 */
        &--now {
          abbr {
            color: ${({ theme }) => theme.colors.primary_2};
          }
        }
        &--now::after {
          background-color: transparent;
        }

        /* 선택된 날짜 스타일 */
        &--active::after,
        &--hasActive::after {
          background-color: ${({ theme }) => theme.colors.yellow_2};
        }

        &:disabled {
          background-color: ${({ theme }) => theme.colors.white};
          abbr {
            color: ${({ theme }) => theme.colors.gray_3};
          }
        }
      }
    }
  `,
  member: css`
    display: flex;
    position: relative;
    justify-content: center;
    width: 100%;

    .react-calendar {
      width: 100%;
      border: none;
    }

    /* 네비 영역 */
    .react-calendar__navigation {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: ${remCalc(14)};
      height: 44px;

      button {
        display: flex;
        justify-content: center;
        align-content: center;
      }

      button:enabled:hover,
      button:enabled:focus {
        background-color: ${({ theme }) => theme.colors.white};
      }

      button:disabled {
        background-color: ${({ theme }) => theme.colors.white};
        color: ${({ theme }) => theme.colors.gray_4};
      }

      .react-calendar__navigation__label {
        flex-grow: 0.1 !important;
        min-width: 70px;
        font-family: "Pretendard Variable";
        ${({ theme }) => theme.typo.label1_16_B};
        color: ${({ theme }) => theme.colors.primaryColor};
      }
    }

    /* WeekDays 영역 */
    .react-calendar__month-view__weekdays {
      padding-inline: 16px;
      padding-block-end: 8px;
      border-bottom: 1px solid ${({ theme }) => theme.colors.gray_5};
      text-transform: uppercase;
      text-align: center;

      .react-calendar__month-view__weekdays__weekday abbr {
        color: ${({ theme }) => theme.colors.gray_1};
        ${({ theme }) => theme.typo.label2_14_M};
      }

      .react-calendar__month-view__weekdays__weekday--weekend abbr[title="Sun"] {
        color: ${({ theme }) => theme.colors.red_1};
      }
    }

    /* days 영역 */
    .react-calendar__month-view__days {
      gap: 12px 0;
      margin-block: 14px;
      padding-inline: 16px;

      .react-calendar__tile {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        min-height: 50.5px;
        max-height: 50.5px;
        height: 100%;
        padding: 4px 0 6px;

        /* 날짜 텍스트를 위한 스타일 */
        abbr {
          ${({ theme }) => theme.typo.label2_14_M};
          font-family: "Pretendard Variable";
          color: ${({ theme }) => theme.colors.gray_1};
        }
        span {
          line-height: 1.1;
        }

        /* 이웃 날짜를 위한스타일 */
        &.react-calendar__month-view__days__day--neighboringMonth {
          abbr {
            color: ${({ theme }) => theme.colors.gray_3};
          }
        }

        /* 오늘 날짜 스타일 */
        &--now {
          background-color: transparent;
        }

        /* 선택된 날짜 스타일 */
        &--active,
        &--hasActive {
          background-color: ${({ theme }) => theme.colors.yellow_3};
          border-radius: 12px;
        }

        &:disabled {
          background-color: ${({ theme }) => theme.colors.white};
          abbr {
            color: ${({ theme }) => theme.colors.gray_4};
          }
        }
      }
    }
  `
};

type StyleProps = {
  variant?: CalendarVariants;
};

type StyleObject = {
  [key in CalendarVariants]?: RuleSet<object>;
};

const createStyledComponent = <T extends StyleObject>(component: string, styles: T) => styled(
  component
).withConfig({
  shouldForwardProp: (prop) => !["variant"].includes(prop)
})<StyleProps>`
  ${({ variant }) => variant && styles[variant]}
`;

export const MonthlyCalendar = createStyledComponent("div", calendarVariants);
export const GoToTodayButton = styled.button<{ variant: "admin" | "member" }>`
  ${({ variant }) => variant && sharedStyles[variant].todayButton}
`;
export const TileText = styled.span<{ variant: "admin" | "member" }>`
  ${({ variant }) => variant && sharedStyles[variant].tileText}
`;
export const Dot = styled.span<{ variant: "admin" | "member" }>`
  ${({ variant }) => variant && sharedStyles[variant].dot}
`;

export const WeeklyCalendar = styled.div`
  width: calc(100% - 16px);
  overflow: hidden;
  margin: 0 auto;
  margin-block-end: 12px;
`;

export const WeekContainer = styled.div.withConfig({
  shouldForwardProp: (prop) => !["active"].includes(prop)
})<{ active: boolean }>`
  display: flex;
  width: 100%;
  flex-shrink: 0;
  opacity: ${(props) => (props.active ? 1 : 0.3)};
  transition: opacity 0.3s ease;
`;

export const StyledWeeklyHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  margin-bottom: ${remCalc(14)};
  height: 44px;
`;

export const StyledWeeklyTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const NavigationButton = styled.button`
  width: 20px;
  height: 20px;
  color: ${({ theme }) => theme.colors.primaryColor};
  background-color: ${({ theme }) => theme.colors.yellow_3};
  border-radius: 50%;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const DayTile = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 0 0 calc(100% / 7);
  scroll-snap-align: start;

  min-height: 64px;
  max-height: 64px;
  height: 100%;

  padding-inline: 13px;
  border-radius: 12px;
  color: ${({ theme }) => theme.colors.gray_3};
  font-family: inherit;

  &.active {
    background-color: ${({ theme }) => theme.colors.yellow_3};
    scroll-snap-align: center;
  }

  &.active .day {
    color: ${({ theme }) => theme.colors.primaryColor};
  }

  &.active .weekday {
    color: ${({ theme }) => theme.colors.br_2};
  }

  &.active .weekday.sunday {
    color: ${({ theme }) => theme.colors.red_1};
  }

  &.disabled {
    color: ${({ theme }) => theme.colors.gray_4};
  }

  &.neighboring-week {
    pointer-events: none;
  }
`;

export const DayContent = styled.span`
  white-space: nowrap;
  display: flex;
  flex-direction: column;

  & > abbr.day {
    ${({ theme }) => theme.typo.body2_16_B};
    color: inherit;
    text-decoration: none;
    line-height: normal;
  }

  & > .today {
    color: ${({ theme }) => theme.colors.br_2};
    ${({ theme }) => theme.typo.caption1_12_R};
    line-height: normal;
  }
`;

export const ToggleViewButton = styled.button.withConfig({
  shouldForwardProp: (prop) => !["expand"].includes(prop)
})<{ expand?: boolean }>`
  padding-block: ${remCalc(14)};
  color: ${({ theme }) => theme.colors.gray_1};
  ${({ theme }) => theme.typo.label2_14_M};

  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;

  & > span {
    display: flex;
    align-items: center;
  }

  & > span > svg {
    transform: ${({ expand }) => (expand ? "rotate(180deg)" : "rotate(0deg)")};
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 0.15s;
  }
`;

// Month Picker Container
export const MonthPickerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

// Month Picker Wrapper
export const MonthPickerWrapper = styled.div`
  position: absolute;
  background-color: white;
  border-radius: 8px;
  padding: 20px 18px 30px;
  box-shadow: ${({ theme }) => theme.shadows.smallMenu};
  z-index: 10;
`;

export const MonthPickerCalendar = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  width: 100%;

  .react-calendar {
    width: 100%;
    // padding-bottom: ${remCalc(14)};
  }

  /* 네비 영역 */
  .react-calendar__navigation {
    display: flex;
    justify-content: center;
    margin-bottom: ${remCalc(20)};

    button {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .react-calendar__navigation__label {
      flex-grow: 0.3 !important;
      font-family: "Pretendard Variable";
      ${({ theme }) => theme.typo.label1_16_B};
      color: ${({ theme }) => theme.colors.darkBlack};
    }
  }

  /* Months 영역 */
  .react-calendar__year-view__months {
    display: grid !important;
    grid-template-columns: repeat(4, 1fr);
    gap: 12px 8px;
  }

  .react-calendar__year-view__months__month {
    flex: 0 1 auto !important;
    width: 48px;
    padding: 10px;
    border-radius: 12px;
    background-color: ${({ theme }) => theme.colors.gray_5};

    abbr {
      ${({ theme }) => theme.typo.label2_14_B};
      color: ${({ theme }) => theme.colors.gray_1};
      letter-spacing: 0;
      font-family: "Pretendard Variable";
    }

    &.react-calendar__tile--active {
      background-color: ${({ theme }) => theme.colors.primary_3};

      abbr {
        color: ${({ theme }) => theme.colors.white};
      }
    }

    &:disabled {
      abbr {
        color: ${({ theme }) => theme.colors.gray_4};
      }
    }
  }
`;

// Control Button Wrapper
export const ControlWrapper = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
`;

// Control Button
export const ControlButton = styled.button`
  color: ${({ theme }) => theme.colors.gray_2};
`;
