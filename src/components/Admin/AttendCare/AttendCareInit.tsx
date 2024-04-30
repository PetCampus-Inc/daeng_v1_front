import { useRecoilValue } from "recoil";
import { adminLoginInfoAtom } from "store/admin";

import AddDogSubmitButton from "./button/AddDogSubmitButton";
import { SelectedDogsProvider } from "./context/SelectedDogsProvider";
import AddDogAvatar from "./list/AddDogAvatar";
import AddDogList from "./list/AddDogList";
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
      <AddDogSubmitButton adminId={adminId} />
    </SelectedDogsProvider>
  );
};

export default AttendCareInit;
