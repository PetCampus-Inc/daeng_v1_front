import { format, parseISO } from "date-fns";
import useGetDogInfoAgenda from "hooks/api/useGetDogInfoAgenda";
import { useSearchParams, useLocation } from "react-router-dom";

import DailyNotice from "./DailyNotice";
import * as S from "./styles";
import Calendar from "../DogInfo/Calendar";
import { DogDetailInfoText } from "../DogInfo/styles";

const AttendanceRecord = () => {
  const [searchParams] = useSearchParams();
  const dogId = useLocation().pathname.split("/").pop();
  const date = searchParams.get("date") || format(new Date(), "yyyy-MM-dd");
  const formattedDate = format(parseISO(date), "M월 d일");
  const data = useGetDogInfoAgenda(Number(dogId), date);

  return (
    <>
      <S.TopContainer>
        <S.Image src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
      </S.TopContainer>
      <Calendar />
      <S.NoticeContainer>
        <DogDetailInfoText className="big header">{formattedDate} 알림장</DogDetailInfoText>
        <DailyNotice data={data} />
      </S.NoticeContainer>
    </>
  );
};

export default AttendanceRecord;
