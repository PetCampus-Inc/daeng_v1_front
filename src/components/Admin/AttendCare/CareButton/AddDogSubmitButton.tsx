import AlertBottomSheet from "components/common/BottomSheet/AlertBottomSheet";
import BackgroundButton from "components/common/Button/BackgroundButton";
import { useCreateCareDogs } from "hooks/api/admin/care";
import { useOverlay } from "hooks/common/useOverlay";

import { BackgroundButtonWrapper } from "./styles";
import { useSelectedDogs } from "../hooks/useSelectedDogs";

type AddDogSubmitButtonProps = {
  adminId?: number;
};

const AddDogSubmitButton = ({ adminId }: AddDogSubmitButtonProps) => {
  const overlay = useOverlay();

  const openPopup = () =>
    overlay.open(({ isOpen, close }) => (
      <AlertBottomSheet
        title="다시 선택해 주세요"
        subtitle="다른 선생님이 이미 추가한 강아지가 있어요"
        isOpen={isOpen}
        actionText="닫기"
        actionFn={close}
        close={close}
      />
    ));

  // FIXME: 고려해야할 점) mutation 후 onSuccess가 실행되지 않았을 때 adminName으로 본인일 시에 핸들링 필요..!!
  const { mutateCreateCareDogs } = useCreateCareDogs(openPopup);

  if (!adminId) throw new Error("adminId가 없습니다!");
  const [selectedDogs, _] = useSelectedDogs();

  const selectedDogId = selectedDogs.map((dog) => dog.attendanceId);

  const handleSubmit = () => {
    mutateCreateCareDogs({ adminId, selectedDogId });
  };

  return (
    <BackgroundButtonWrapper>
      <BackgroundButton disabled={selectedDogs.length === 0} onClick={() => handleSubmit()}>
        선택완료
      </BackgroundButton>
    </BackgroundButtonWrapper>
  );
};

export default AddDogSubmitButton;
