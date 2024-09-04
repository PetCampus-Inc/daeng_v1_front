import { BottomButton } from "components/common/Button";
import { useDeleteCareDogs } from "hooks/api/admin/care";
import { useOverlay } from "hooks/common/useOverlay";
import { useContext } from "react";

import { SelectedIdsContext } from "../context/SelectedIdsProvider";
import DeleteCareDogModal from "../modal/DeleteCareDogModal";

const DeleteDogButton = () => {
  const overlay = useOverlay();
  const { mutateDeleteCareDogs } = useDeleteCareDogs();

  const selectIdsContext = useContext(SelectedIdsContext);
  const selectedDogId = Array.from(selectIdsContext?.selectedIds ?? []);

  const handleSubmit = () => {
    console.log({ selectedDogId });
    mutateDeleteCareDogs({ selectedDogId });
  };

  const openPopup = () =>
    overlay.open(({ isOpen, close }) => (
      <DeleteCareDogModal isOpen={isOpen} close={close} action={handleSubmit} />
    ));

  return (
    <BottomButton disabled={selectedDogId.length === 0} onClick={openPopup}>
      삭제
    </BottomButton>
  );
};

export default DeleteDogButton;
