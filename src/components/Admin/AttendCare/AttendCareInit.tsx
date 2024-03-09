import { useRecoilState } from "recoil";
import { attendCareDogListAtom } from "store/admin";

import AddDogAvatar from "./CareList/AddDogAvatar";
import AddDogList from "./CareList/AddDogList";
import { ListWrapper, SubTitle, Title } from "./styles";

const data = [
  {
    attendanceId: 47,
    dogId: 1,
    dogName: "쥐빵이",
    adminName: "김민수",
    lastPhotoTime: null,
    agendaWriting: null
  },
  {
    attendanceId: 57,
    dogId: 2,
    dogName: "꽃개",
    adminName: null,
    lastPhotoTime: null,
    agendaWriting: null
  },
  {
    attendanceId: 67,
    dogId: 3,
    dogName: "냠냠이",
    adminName: null,
    lastPhotoTime: null,
    agendaWriting: null
  },
  {
    attendanceId: 49,
    dogId: 4,
    dogName: "호빵맨",
    adminName: null,
    lastPhotoTime: null,
    agendaWriting: null
  }
];

const AttendCareInit = () => {
  const [dogList, setDogList] = useRecoilState(attendCareDogListAtom);
  const handleItemRemove = (dogId: number) => {
    setDogList((prev) => prev.filter((dog) => dog.dogId !== dogId));
  };

  return (
    <>
      <Title>오늘 관리할 강아지</Title>
      <SubTitle>관리할 강아지를 먼저 선택해 주세요</SubTitle>
      {dogList.length > 0 && <AddDogAvatar selectedDogs={dogList} onRemove={handleItemRemove} />}
      <ListWrapper>
        <AddDogList data={data} />
      </ListWrapper>
    </>
  );
};

export default AttendCareInit;
