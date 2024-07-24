import styled from "styled-components";
import { remCalc } from "utils/calculator";

// Styled Monthly Calendar Container
export const StyledMonthlyCalendar = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  position: relative;

  /* React Calendar Custom Styling */
  .react-calendar {
    width: 100%;
    border: none;
    padding-bottom: ${remCalc(14)};
  }

  /* Navigation Styling */
  .react-calendar__navigation {
    justify-content: center;
    gap: 10px;

    button:enabled:hover,
    button:enabled:focus,
    button:disabled {
      background-color: ${({ theme }) => theme.colors.white};
    }

    .react-calendar__navigation__label {
      flex-grow: 0 !important;
      min-width: 70px;

      ${({ theme }) => theme.typo.label1_16_B};
      color: ${({ theme }) => theme.colors.primaryColor};
      font-family: "Pretendard Variable";
    }
  }

  /* Weekday Headers Styling */
  .react-calendar__month-view__weekdays {
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray_5};
    padding-inline: 16px;

    .react-calendar__month-view__weekdays__weekday {
      abbr {
        color: ${({ theme }) => theme.colors.gray_1};
        ${({ theme }) => theme.typo.label2_14_M};
        font-weight: 600;
        font-family: "Pretendard Variable";
        text-decoration: none;
      }

      &--weekend {
        abbr[title="Sun"] {
          color: ${({ theme }) => theme.colors.red_1};
        }
      }
    }
  }

  /* Day Tiles Styling */
  .react-calendar__month-view__days {
    gap: 12px 0;
    margin-block: 14px;
    padding-inline: 16px;

    .react-calendar__tile.react-calendar__month-view__days__day {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      min-height: 50.5px;
      max-height: 50.5px;
      height: 100%;
      padding: 4px 0 6px;

      abbr {
        color: ${({ theme }) => theme.colors.gray_1};
        ${({ theme }) => theme.typo.label1_16_R};
        font-weight: 500;
        font-size: 0.9rem;
        font-family: "Pretendard Variable";
      }

      &.react-calendar__tile:enabled:hover,
      &.react-calendar__tile:enabled:focus,
      &.react-calendar__tile--now {
        background: none;
      }

      &.react-calendar__tile--active,
      &.react-calendar__tile--range,
      &.react-calendar__tile--rangeStart,
      &.react-calendar__tile--rangeEnd,
      &.react-calendar__tile--rangeBothEnds {
        // 이 부분임
        background-color: ${({ theme }) => theme.colors.yellow_3} !important;
        border-radius: 12px;

        abbr {
          color: ${({ theme }) => theme.colors.primaryColor};
        }
      }

      &.react-calendar__month-view__days__day--neighboringMonth {
        abbr {
          color: ${({ theme }) => theme.colors.gray_3};
        }
      }
    }
  }
`;

// Styled Date Button
export const StyledDate = styled.button`
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
`;

// Popup Container
export const PopupContainer = styled.div`
  display: grid;
  place-items: center;
`;

// Popup Wrapper
export const PopupWrapper = styled.div`
  position: absolute;
  background-color: white;
  border-radius: 8px;
  padding: 20px 18px 30px;
  box-shadow: ${({ theme }) => theme.shadows.smallMenu};
  z-index: 10;
`;

// Styled Year View Container
export const StyledYearView = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  position: relative;

  /* React Calendar Custom Styling */
  .react-calendar {
    width: 100%;
    border: none;
    padding-bottom: ${remCalc(14)};
  }

  /* Navigation Styling */
  .react-calendar__navigation {
    justify-content: center;
    gap: 10px;
    margin: 0;

    button:enabled:hover,
    button:enabled:focus,
    button:disabled {
      background-color: ${({ theme }) => theme.colors.white};
    }

    .react-calendar__navigation__label {
      ${({ theme }) => theme.typo.label1_16_B};
      color: ${({ theme }) => theme.colors.primaryColor};
      font-family: "Pretendard Variable";
      flex-grow: 0 !important;
    }
  }

  /* Year View Container Styling */
  .react-calendar__viewContainer {
    margin-top: ${remCalc(24)};
  }

  /* Year View Months Styling */
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

    &.react-calendar__tile--active,
    &.react-calendar__tile--range,
    &.react-calendar__tile--rangeStart,
    &.react-calendar__tile--rangeEnd,
    &.react-calendar__tile--rangeBothEnds {
      background-color: ${({ theme }) => theme.colors.primary_3};

      abbr {
        color: ${({ theme }) => theme.colors.white};
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
