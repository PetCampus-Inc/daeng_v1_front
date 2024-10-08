import { SmallButton } from "components/common/Button/Templates";

import AddIcon from "../../../../assets/svg/add-icon";
import ArrowRightIcon from "../../../../assets/svg/arrow-right-icon";
import { useOverlay } from "../../../../hooks/common/useOverlay";
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
    <SmallButton
      colorScheme="br_4"
      gap={10}
      onClick={openAddDogPopup}
      leftAddon={<AddIcon />}
      rightAddon={<ArrowRightIcon size={20} />}
    >
      강아지 추가하기
    </SmallButton>
  );
};

export default AddDogButton;
