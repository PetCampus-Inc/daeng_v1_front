import Calendar from "../DogInfo/Calendar";
import DailyNotice from "./DailyNotice";
import * as S from "./styles";

const AttendanceRecord = () => {
  return (
    <>
      <S.TopContainer>
        <S.Image src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
      </S.TopContainer>
      <Calendar />
      <DailyNotice />
    </>
  );
};

export default AttendanceRecord;
