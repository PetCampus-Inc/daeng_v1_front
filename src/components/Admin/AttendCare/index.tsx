import { useNavigate } from "react-router-dom";

import MainSendCard from "./CareButton/MainSendCard";
import MainDogList from "./CareList/MainDogList";
import * as S from "./styles";

const data = [
  {
    attendanceId: 47,
    dogId: 1,
    dogName: "쥐빵이",
    adminName: "김민수",
    lastPhotoTime: "1시간 전 사진 전송",
    agendaWriting: "NOT_YET"
  },
  {
    attendanceId: 57,
    dogId: 2,
    dogName: "꽃개",
    adminName: "김민수",
    lastPhotoTime: null,
    agendaWriting: "COMPLETE"
  },
  {
    attendanceId: 67,
    dogId: 3,
    dogName: "냠냠이",
    adminName: "김민수",
    lastPhotoTime: "13분 전 사진 전송",
    agendaWriting: "NOT_YET"
  },
  {
    attendanceId: 49,
    dogId: 4,
    dogName: "호빵맨",
    adminName: "김민수",
    lastPhotoTime: null,
    agendaWriting: "WRITING"
  }
];

const AttendCare = () => {
  const navigate = useNavigate();
  return (
    <>
      <MainSendCard
        text="견주에게 바로 사진을 보낼 수 있어요"
        onClick={() => navigate("강아지관리 상세정보")}
      />
      <MainDogList data={data} />
    </>
  );
};

export default AttendCare;
