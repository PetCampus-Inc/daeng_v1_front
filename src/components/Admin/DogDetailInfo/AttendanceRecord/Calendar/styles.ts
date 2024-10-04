import styled from "styled-components";
import { remCalc } from "utils/calculator";

export const StyledMonthlyCalendar = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  width: 100%;

  padding-inline: 16px;

  .react-calendar {
    width: 100%;
  }

  /* 네비 영역 */
  .react-calendar__navigation {
    display: flex;
    justify-content: center;
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
    margin-bottom: ${remCalc(24)};
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
        grid-row: 3;
        margin-top: -0.7em;
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
`;

export const TileText = styled.p`
  ${({ theme }) => theme.typo.caption1_10_R};
  line-height: 1.2;
  color: ${({ theme }) => theme.colors.br_2};
`;

export const GoToTodayButton = styled.button``;

export const Dot = styled.div`
  background-color: ${(props) => props.theme.colors.br_2};
  border-radius: 50%;
  width: 0.3rem;
  height: 0.3rem;
  position: absolute;
  top: 60%;
  left: 50%;
  transform: translateX(-50%);
`;
