import React, { useCallback, useState } from "react";

import AddIcon from "../../../../assets/svg/add-icon";
import ArrowRightIcon from "../../../../assets/svg/arrow-right-icon";
import { useOverlay } from "../../../../hooks/common/useOverlay";
import SimpleButton from "../../../common/Button/SimpleButton";
import { SelectedDogsProvider } from "../context/SelectedDogsProvider";
import AddCaredogBottomSheet from "../modal/AddCaredogBottomSheet";

interface AddButtonProps {
  handleNextPopup: () => void;
}

const AddDogButton = ({ handleNextPopup }: AddButtonProps) => {
  const overlay = useOverlay();

  const handleSuccess = useCallback(() => {
    handleNextPopup();
  }, []);

  const openAddDogPopup = () =>
    overlay.open(({ isOpen, close }) => (
      <SelectedDogsProvider>
        <AddCaredogBottomSheet isOpen={isOpen} close={close} handleSuccess={handleSuccess} />
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
