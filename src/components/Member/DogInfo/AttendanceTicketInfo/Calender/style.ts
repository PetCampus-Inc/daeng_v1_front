import Calendar from "react-calendar";
import styled from "styled-components";

export const CalendarWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  position: relative;

  .footIcon {
    width: 15.5px;
    height: 12.75px;
    position: absolute;
    top: 60%;
    left: 50%;
    transform: translateX(-50%);
    color: ${(props) => props.theme.colors.br_4};
  }

  .react-calendar__month-view__days__day--weekend {
    color: ${(props) => props.theme.colors.br_4};
  }

  .react-calendar {
    width: 100%;
    border: none;
    border-radius: 0.5rem;
    padding: 1vh 5% 1vh;
    background-color: white;
    box-shadow: ${(props) => props.theme.shadows.card};
  }

  .react-calendar__month-view {
    abbr {
      color: ${(props) => props.theme.colors.gray_1};
    }
  }

  .react-calendar__navigation {
    justify-content: center;
    gap: 8px;
  }

  .react-calendar__navigation button {
    font-weight: 800;
    font-size: 1rem;
    min-width: 20px;
    height: 20px;
    border-radius: 50px;
  }

  .react-calendar__navigation button:focus {
    background-color: white;
  }

  .react-calendar__navigation button:disabled {
    background-color: white;
    color: ${(props) => props.theme.colors.darkBlack};
  }

  .react-calendar__navigation__label {
    flex-grow: 0 !important;
  }

  .react-calendar__navigation__label__labelText--from {
    color: ${(props) => props.theme.colors.primaryColor};
  }

  .react-calendar__month-view__weekdays {
    border-bottom: 1px solid ${(props) => props.theme.colors.gray_5};
    margin-bottom: 5px;
  }

  .react-calendar__month-view__weekdays abbr {
    text-decoration: none;
    font-weight: 800;
  }

  .react-calendar__navigation__arrow {
    background-color: ${(props) => props.theme.colors.yellow_3};
    color: ${(props) => props.theme.colors.primaryColor};
  }

  .react-calendar__month-view__weekdays__weekday--weekend abbr[title="일요일"] {
    color: ${(props) => props.theme.colors.red_1};
  }

  .react-calendar__tile--now {
    background: none;
    abbr {
      color: ${(props) => props.theme.colors.gray_1};
    }
  }

  .react-calendar__year-view__months__month {
    border-radius: 0.8rem;
    background-color: ${(props) => props.theme.colors.gray_5};
    padding: 0;
  }

  .react-calendar__tile--hasActive {
    background-color: ${(props) => props.theme.colors.primary_2};
    abbr {
      color: white;
    }
  }

  .react-calendar__tile {
    padding: 5px 0px 18px;
    position: relative;
  }

  .react-calendar__year-view__months__month {
    flex: 0 0 calc(25% - 10px) !important;
    margin-inline-start: 5px !important;
    margin-inline-end: 5px !important;
    margin-block-end: 10px;
    padding: 10px 6.6667px;
    font-size: 0.9rem;
    font-weight: 600;
    color: ${(props) => props.theme.colors.gray_1};
  }

  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus,
  .react-calendar__tile--active {
    background-color: ${(props) => props.theme.colors.yellow_2};
    color: ${(props) => props.theme.colors.primaryColor};
    border-radius: 0.3rem;
  }
  .react-calendar__tile--active abbr {
    color: ${(props) => props.theme.colors.primaryColor};
  }
`;

export const StyledCalendar = styled(Calendar)``;

export const Date = styled.div`
  position: absolute;
  right: 7%;
  top: 18px;
  background-color: ${(props) => props.theme.colors.br_4};
  color: ${(props) => props.theme.colors.primaryColor};
  width: 15%;
  min-width: fit-content;
  height: 1.5rem;
  text-align: center;
  margin: 0 auto;
  line-height: 1.6rem;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 800;
`;

export const Today = styled.div`
  font-size: x-small;
  color: ${(props) => props.theme.colors.primaryColor};
  font-weight: 600;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%);
`;

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
