import DeleteDogList from "./CareList/DeleteDogList";
import { SelectedIdsProvider } from "./provider/SelectedIdsProvider";
import { DescTitle, ListWrapper } from "./styles";

const data = [
  {
    attendanceId: 47,
    dogId: 1,
    dogName: "쥐빵이",
    adminName: null,
    lastPhotoTime: null,
    agendaWriting: "NOT_YET" as const
  },
  {
    attendanceId: 57,
    dogId: 2,
    dogName: "꽃개",
    adminName: null,
    lastPhotoTime: null,
    agendaWriting: "NOT_YET" as const
  },
  {
    attendanceId: 67,
    dogId: 3,
    dogName: "냠냠이",
    adminName: null,
    lastPhotoTime: null,
    agendaWriting: "NOT_YET" as const
  },
  {
    attendanceId: 49,
    dogId: 4,
    dogName: "호빵맨",
    adminName: null,
    lastPhotoTime: null,
    agendaWriting: "NOT_YET" as const
  }
];

const AttendCareDelete = () => {
  return (
    <div>
      <DescTitle>삭제할 강아지 선택</DescTitle>
      <ListWrapper>
        <SelectedIdsProvider>
          <DeleteDogList data={data} />
        </SelectedIdsProvider>
      </ListWrapper>
    </div>
  );
};

export default AttendCareDelete;
