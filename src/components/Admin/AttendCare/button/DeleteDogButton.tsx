import BackgroundButton from "components/common/Button/BackgroundButton";
import { useDeleteCareDogs } from "hooks/api/admin/care";
import { useOverlay } from "hooks/common/useOverlay";
import { useContext } from "react";

import { BackgroundButtonWrapper } from "./styles";
import { SelectedIdsContext } from "../context/SelectedIdsProvider";
import DeleteCareDogModal from "../modal/DeleteCareDogModal";

const DeleteDogButton = ({ adminId }: { adminId?: number }) => {
  const overlay = useOverlay();
  const { mutateDeleteCareDogs } = useDeleteCareDogs();

  const selectIdsContext = useContext(SelectedIdsContext);
  const selectedDogId = Array.from(selectIdsContext?.selectedIds ?? []);

  if (!adminId) throw new Error("adminId가 없습니다!");

  const handleSubmit = () => {
    console.log({ adminId, selectedDogId });
    mutateDeleteCareDogs({ adminId, selectedDogId });
  };

  const openPopup = () =>
    overlay.open(({ isOpen, close }) => (
      <DeleteCareDogModal isOpen={isOpen} close={close} action={handleSubmit} />
    ));

  return (
    <BackgroundButtonWrapper $isBottom>
      <BackgroundButton
        backgroundColor="white"
        disabled={selectedDogId.length === 0}
        onClick={openPopup}
      >
        삭제
      </BackgroundButton>
    </BackgroundButtonWrapper>
  );
};

export default DeleteDogButton;
