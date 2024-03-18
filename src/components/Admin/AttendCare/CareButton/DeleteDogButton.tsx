import BackgroundButton from "components/common/Button/BackgroundButton";
import { useDeleteCareDogs } from "hooks/api/caredogQuery";
import useModal from "hooks/common/useModal";
import { useContext } from "react";

import { BackgroundButtonWrapper } from "./styles";
import DeleteCareDogModal from "../CareModal/DeleteCareDogModal";
import { SelectedIdsContext } from "../context/SelectedIdsProvider";

const DeleteDogButton = ({ adminId }: { adminId?: number }) => {
  if (!adminId) throw new Error("adminId가 없습니다!");
  const modal = useModal();
  const { MutateDeleteCareDogs } = useDeleteCareDogs();
  const selectIdsContext = useContext(SelectedIdsContext);
  const selectedDogId = Array.from(selectIdsContext?.selectedIds ?? []);

  const handleSubmit = () => {
    console.log({ adminId, selectedDogId });
    MutateDeleteCareDogs({ adminId, selectedDogId });
  };

  return (
    <>
      <DeleteCareDogModal isOpen={modal.isVisible} close={modal.close} action={handleSubmit} />
      <BackgroundButtonWrapper $isBottom>
        <BackgroundButton
          backgroundColor="white"
          disabled={selectedDogId.length === 0}
          onClick={modal.open}
        >
          삭제
        </BackgroundButton>
      </BackgroundButtonWrapper>
    </>
  );
};

export default DeleteDogButton;
