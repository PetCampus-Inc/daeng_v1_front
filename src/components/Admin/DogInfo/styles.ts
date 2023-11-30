import Calendar from "react-calendar";
import styled from "styled-components";
import "react-calendar/dist/Calendar.css";

export const Container = styled.div`
  height: 100vh;
  width: 100%;
  margin-top: 5vh;
  padding-left: 4%;
  padding-right: 4%;
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
  .react-calendar {
    width: 100%;
    border: none;
    border-radius: 0.5rem;
    padding: 5%;
  }
`;

export const StyledCalendar = styled(Calendar)``;
