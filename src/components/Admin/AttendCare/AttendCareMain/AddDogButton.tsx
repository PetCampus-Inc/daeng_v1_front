import AddIcon from "../../../../assets/svg/add-icon";
import ArrowRightIcon from "../../../../assets/svg/arrow-right-icon";
import { useOverlay } from "../../../../hooks/common/useOverlay";
import SimpleButton from "../../../common/Button/SimpleButton";
import { SelectedDogsProvider } from "../context/SelectedDogsProvider";
import AddCaredogBottomSheet from "../modal/AddCaredogBottomSheet";
import PreviousInfoGuideBottomSheet from "../modal/PreviousInfoGuideBottomSheet";

const AddDogButton = () => {
  const overlay = useOverlay();

  const openGuide = () =>
    overlay.open(({ isOpen, close }) => (
      <PreviousInfoGuideBottomSheet isOpen={isOpen} close={close} />
    ));

  const openAddDogPopup = () =>
    overlay.open(({ isOpen, close }) => (
      <SelectedDogsProvider>
        <AddCaredogBottomSheet isOpen={isOpen} close={close} openGuide={openGuide} />
      </SelectedDogsProvider>
    ));

  return (
    <SimpleButton
      onClick={openAddDogPopup}
      leftAddon={<AddIcon />}
      rightAddon={<ArrowRightIcon w={"20"} h={"20"} />}
    >
      강아지 추가하기
    </SimpleButton>
  );
};

export default AddDogButton;
