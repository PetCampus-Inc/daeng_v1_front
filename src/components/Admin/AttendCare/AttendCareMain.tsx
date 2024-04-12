import { PATH } from "constants/path";

import AddIcon from "assets/svg/add-icon";
import RightArrow from "assets/svg/right-arrow";
import SimpleButton from "components/common/Button/SimpleButton";
import useOverlay from "hooks/common/useOverlay/useOverlay";
import { useNavigate } from "react-router-dom";
import { ICareDogInfo } from "types/admin.caredog.type";

import CareOptionDropdown from "./CareButton/CareOptionDropdown";
import MainSendCard from "./CareButton/MainSendCard";
import MainDogList from "./CareList/MainDogList";
import AddCaredogBottomSheet from "./CareModal/AddCaredogBottomSheet";
import AgendaSchedulerBottomSheet from "./CareModal/AgendaSchedulerBottomSheet";
import { SelectedDogsProvider } from "./context/SelectedDogsProvider";
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
          rightAddon={<RightArrow w={"20"} h={"20"} />}
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
