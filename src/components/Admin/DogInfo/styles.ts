import Calendar from "react-calendar";
import styled from "styled-components";
import "react-calendar/dist/Calendar.css";

export const Container = styled.div`
  height: 85vh;
  width: 100%;
  margin-top: 5vh;
  padding-left: 4%;
  padding-right: 4%;
  overflow-y: auto;
`;

export const MainTopWrapper = styled.div`
  height: 25%;
  width: 100%;
  padding-top: 8%;
`;

export const CardWrapper = styled.div`
  height: 70%;
  background-color: white;
  margin-top: 2%;
  border-radius: 0.5rem;
  padding-left: 6%;
  padding-right: 6%;
  display: flex;
  align-items: center;
  box-shadow: 4px 2px 10px 0px rgba(0, 0, 0, 0.13);
`;

export const StyledImage = styled.img<{
  src: string;
  alt: string;
  width?: string;
  height?: string;
  marginright?: string;
  position?: string;
  right?: string;
  top?: string;
  radius?: string;
}>`
  width: ${(props) => (props.width ? props.width : "2.8rem")};
  height: ${(props) => (props.height ? props.height : "2.8rem")};
  border-radius: ${(props) => (props.radius ? props.radius : "50%")};
  position: ${(props) => (props.position ? props.position : "static")};
  right: ${(props) => (props.right ? props.right : "")};
  top: ${(props) => (props.top ? props.top : "")};
  margin-right: ${(props) =>
    props.marginright ? props.marginright : "0.3rem"};
`;

export const InfoWrapper = styled.div`
  width: 100%;
`;

export const InfoTop = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const InfoIcons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 3%;
  margin-bottom: 5%;
`;

export const IconWrapper = styled.div`
  display: flex;
`;

export const PayTextWrapper = styled.div`
  width: 95%;
  padding-top: 1%;
  padding-bottom: 1%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.yellow_2};
  border-radius: 1rem;
`;

export const StyledCalendarWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  position: relative;
  .react-calendar {
    width: 100%;
    border: none;
    border-radius: 0.5rem;
    box-shadow: 4px 2px 10px 0px rgba(0, 0, 0, 0.13);
    padding: 3% 5%;
    background-color: white;
  }

  .react-calendar__month-view {
    abbr {
      color: ${(props) => props.theme.gray_1};
    }
  }

  .react-calendar__navigation {
    justify-content: center;
  }

  .react-calendar__navigation button {
    font-weight: 800;
    font-size: 1rem;
  }

  .react-calendar__navigation button:focus {
    background-color: white;
  }

  .react-calendar__navigation button:disabled {
    background-color: white;
    color: ${(props) => props.theme.darkBlack};
  }

  .react-calendar__navigation__label {
    flex-grow: 0 !important;
  }

  .react-calendar__month-view__weekdays abbr {
    text-decoration: none;
    font-weight: 800;
  }

  .react-calendar__month-view__weekdays__weekday--weekend abbr[title="일요일"] {
    color: ${(props) => props.theme.red_1};
  }

  .react-calendar__tile--now {
    background: none;
    abbr {
      color: ${(props) => props.theme.primary_2};
    }
  }

  .react-calendar__year-view__months__month {
    border-radius: 0.8rem;
    background-color: ${(props) => props.theme.gray_5};
    padding: 0;
  }

  .react-calendar__tile--hasActive {
    background-color: ${(props) => props.theme.primary_2};
    abbr {
      color: white;
    }
  }

  .react-calendar__tile {
    padding: 5px 0px 18px;
    position: relative;
  }

  .react-calendar__year-view__months__month {
    flex: 0 0 calc(33.3333% - 10px) !important;
    margin-inline-start: 5px !important;
    margin-inline-end: 5px !important;
    margin-block-end: 10px;
    padding: 20px 6.6667px;
    font-size: 0.9rem;
    font-weight: 600;
    color: ${(props) => props.theme.gray_1};
  }

  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus,
  .react-calendar__tile--active {
    background-color: ${(props) => props.theme.yellow_2};
    border-radius: 0.3rem;
  }
`;

export const StyledCalendar = styled(Calendar)``;

export const StyledDate = styled.div`
  position: absolute;
  right: 7%;
  top: 6%;
  background-color: ${(props) => props.theme.primary_3};
  color: ${(props) => props.theme.yellow_2};
  width: 18%;
  min-width: fit-content;
  height: 1.5rem;
  text-align: center;
  margin: 0 auto;
  line-height: 1.6rem;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 800;
`;

export const StyledToday = styled.div`
  font-size: x-small;
  color: ${(props) => props.theme.br_2};
  font-weight: 600;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%);
`;

export const StyledDot = styled.div`
  background-color: ${(props) => props.theme.br_2};
  border-radius: 50%;
  width: 0.3rem;
  height: 0.3rem;
  position: absolute;
  top: 60%;
  left: 50%;
  transform: translateX(-50%);
`;

export const StyledAlbumWrapper = styled.div`
  padding-top: 10%;
`;

export const StyledAlbums = styled.div`
  padding: 5% 0;
  height: 15rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;
