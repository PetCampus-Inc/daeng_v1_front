import { useNavigate } from "react-router-dom";
import { ICareDogInfo } from "types/admin/care.types";

import AddDogButton from "./AttendCareMain/AddDogButton";
import CareOptionDropdown from "./AttendCareMain/CareOptionDropdown";
import MainSendCard from "./button/MainSendCard";
import MainDogList from "./list/MainDogList";
import { ButtonWrapper } from "./styles";
import { PATH } from "../../../constants/path";

interface AttendCareMainProps {
  data: ICareDogInfo[];
}

const AttendCareMain = ({ data }: AttendCareMainProps) => {
  const navigate = useNavigate();

  return (
    <>
      <MainSendCard
        text="견주에게 바로 사진을 보낼 수 있어요"
        onClick={() => navigate(PATH.ADMIN_CARE_GALLERY)}
      />
      <ButtonWrapper>
        <AddDogButton />
        <CareOptionDropdown />
      </ButtonWrapper>
      <MainDogList data={data} />
    </>
  );
};

export default AttendCareMain;
