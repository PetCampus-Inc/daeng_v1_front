import AlertBottomSheet from "components/common/BottomSheet/AlertBottomSheet";
import { BottomButton } from "components/common/Button";
import { useCreateCareDogs } from "hooks/api/admin/care";
import { useOverlay } from "hooks/common/useOverlay";

import { useSelectedDogs } from "../hooks/useSelectedDogs";

const AddDogSubmitButton = () => {
  const overlay = useOverlay();

  const openBlockingPopup = () =>
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
  const { mutateCreateCareDogs } = useCreateCareDogs({ openBlockingPopup });

  const [selectedDogs, _] = useSelectedDogs();

  const selectedDogId = selectedDogs.map((dog) => dog.attendanceId);

  const handleSubmit = () => {
    mutateCreateCareDogs({ selectedDogId });
  };

  return (
    <BottomButton disabled={selectedDogs.length === 0} onClick={() => handleSubmit()}>
      선택완료
    </BottomButton>
  );
};

export default AddDogSubmitButton;
