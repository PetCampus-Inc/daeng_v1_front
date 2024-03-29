import { Suspense } from "react";

import DailyNotice from "./DailyNotice";
import * as S from "./styles";
import Calendar from "../DogInfo/Calendar";

const AttendanceRecord = () => {
  return (
    <>
      <S.TopContainer>
        <S.Image src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
      </S.TopContainer>
      <Suspense>
        <Calendar />
        <DailyNotice />
      </Suspense>
    </>
  );
};

export default AttendanceRecord;
