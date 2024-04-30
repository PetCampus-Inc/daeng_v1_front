import { PATH } from "constants/path";

import AddIcon from "assets/svg/add-icon";
import ArrowRightIcon from "assets/svg/arrow-right-icon";
import SimpleButton from "components/common/Button/SimpleButton";
import { useOverlay } from "hooks/common/useOverlay";
import { useNavigate } from "react-router-dom";
import { ICareDogInfo } from "types/admin/care.types";

import CareOptionDropdown from "./button/CareOptionDropdown";
import MainSendCard from "./button/MainSendCard";
import { SelectedDogsProvider } from "./context/SelectedDogsProvider";
import MainDogList from "./list/MainDogList";
import AddCaredogBottomSheet from "./modal/AddCaredogBottomSheet";
import AgendaSchedulerBottomSheet from "./modal/AgendaSchedulerBottomSheet";
import { ButtonWrapper } from "./styles";

interface AttendCareMainProps {
  data: ICareDogInfo[];
}

const AttendCareMain = ({ data }: AttendCareMainProps) => {
  const navigate = useNavigate();
  const overlay = useOverlay();

  const openAddDogPopup = () =>
    overlay.open(({ isOpen, close }) => (
      <SelectedDogsProvider>
        <AddCaredogBottomSheet isOpen={isOpen} close={close} />
      </SelectedDogsProvider>
    ));

  const openSchedulerPopup = () =>
    overlay.open(({ isOpen, close }) => (
      <AgendaSchedulerBottomSheet isOpen={isOpen} close={close} />
    ));

  const CARE_OPTIONS: { [key: string]: () => void } = {
    "관리 강아지 삭제": () => navigate(PATH.ADMIN_CARE + "/delete"),
    "알림장 일괄 전송": openSchedulerPopup
  };

  const handleOptionClick = (option: string) => {
    const action = CARE_OPTIONS[option];
    if (action) action();
  };

  return (
    <>
      <MainSendCard
        text="견주에게 바로 사진을 보낼 수 있어요"
        onClick={() => navigate("강아지관리 상세정보")}
      />
      <ButtonWrapper>
        <SimpleButton
          onClick={openAddDogPopup}
          leftAddon={<AddIcon />}
          rightAddon={<ArrowRightIcon w={"20"} h={"20"} />}
        >
          강아지 추가하기
        </SimpleButton>
        <CareOptionDropdown
          options={Object.keys(CARE_OPTIONS)}
          handleOptionClick={handleOptionClick}
        />
      </ButtonWrapper>
      <MainDogList data={data} />
    </>
  );
};

export default AttendCareMain;
