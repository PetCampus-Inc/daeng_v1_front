import { useRecoilValue } from "recoil";
import { adminLoginInfoAtom } from "store/admin";

import AddDogButton from "./CareButton/AddDogButton";
import AddDogAvatar from "./CareList/AddDogAvatar";
import AddDogList from "./CareList/AddDogList";
import { SelectedDogsProvider } from "./context/SelectedDogsProvider";
import { ListWrapper, SubTitle, Title } from "./styles";

const AttendCareInit = () => {
  const { adminId } = useRecoilValue(adminLoginInfoAtom);

  return (
    <SelectedDogsProvider>
      <Title>오늘 관리할 강아지</Title>
      <SubTitle>관리할 강아지를 먼저 선택해 주세요</SubTitle>
      <AddDogAvatar />
      <ListWrapper>
        <AddDogList adminId={adminId} />
      </ListWrapper>
      <AddDogButton adminId={adminId} />
    </SelectedDogsProvider>
  );
};

export default AttendCareInit;
