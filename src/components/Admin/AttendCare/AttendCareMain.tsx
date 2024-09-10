import { routes } from "constants/path";

import { useNavigate } from "react-router-dom";
import { ICareDogInfo } from "types/admin/care.types";

import AddDogButton from "./AttendCareMain/AddDogButton";
import CareOptionDropdown from "./AttendCareMain/CareOptionDropdown";
import MainSendCard from "./button/MainSendCard";
import MainDogList from "./list/MainDogList";
import { ButtonWrapper } from "./styles";

interface AttendCareMainProps {
  data: ICareDogInfo[];
}

const AttendCareMain = ({ data }: AttendCareMainProps) => {
  const navigate = useNavigate();

  return (
    <>
      <MainSendCard
        text="견주에게 바로 사진을 보낼 수 있어요"
        onClick={() => navigate(routes.admin.care.gallery.root)}
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
