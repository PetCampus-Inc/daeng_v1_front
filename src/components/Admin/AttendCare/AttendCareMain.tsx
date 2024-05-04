import { useOverlay } from "hooks/common/useOverlay";
import { useNavigate } from "react-router-dom";
import { ICareDogInfo } from "types/admin/care.types";

import AddDogButton from "./AddDogButton";
import MainSendCard from "./button/MainSendCard";
import CareOptionDropdown from "./CareOptionDropdown";
import MainDogList from "./list/MainDogList";
import PreviousInfoGuideBottomSheet from "./modal/PreviousInfoGuideBottomSheet";
import { ButtonWrapper } from "./styles";
import { PATH } from "../../../constants/path";

interface AttendCareMainProps {
  data: ICareDogInfo[];
}

const AttendCareMain = ({ data }: AttendCareMainProps) => {
  const overlay = useOverlay();
  const navigate = useNavigate();

  const openGuidePopup = () =>
    overlay.open(({ isOpen, close }) => (
      <PreviousInfoGuideBottomSheet isOpen={isOpen} close={close} />
    ));

  return (
    <>
      <MainSendCard
        text="견주에게 바로 사진을 보낼 수 있어요"
        onClick={() => navigate(PATH.ADMIN_CARE_GALLERY)}
      />
      <ButtonWrapper>
        <AddDogButton handleNextPopup={openGuidePopup} />
        <CareOptionDropdown />
      </ButtonWrapper>
      <MainDogList data={data} />
    </>
  );
};

export default AttendCareMain;
