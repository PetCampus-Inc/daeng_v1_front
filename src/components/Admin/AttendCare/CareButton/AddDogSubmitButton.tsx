import AlertBottomSheet from "components/common/BottomSheet/AlertBottomSheet";
import BackgroundButton from "components/common/Button/BackgroundButton";
import { useCreateCareDogs } from "hooks/api/caredogQuery";
import useBottomSheet from "hooks/common/useBottomSheet";

import { BackgroundButtonWrapper } from "./styles";
import { useSelectedDogs } from "../context/SelectedDogsProvider";

type AddDogSubmitButtonProps = {
  adminId?: number;
};

const AddDogSubmitButton = ({ adminId }: AddDogSubmitButtonProps) => {
  if (!adminId) throw new Error("adminId가 없습니다!");
  const [selectedDogs, _] = useSelectedDogs();
  const { isVisible, open, close } = useBottomSheet();

  const selectedDogId = selectedDogs.map((dog) => dog.attendanceId);

  // FIXME: 고려해야할 점) mutation 후 onSuccess가 실행되지 않았을 때 adminName으로 본인일 시에 핸들링 필요..!!
  const { MutateCreateCareDogs } = useCreateCareDogs(open);

  const handleSubmit = () => {
    MutateCreateCareDogs({ adminId, selectedDogId });
  };

  return (
    <>
      <AlertBottomSheet
        title="다시 선택해 주세요"
        subtitle="다른 선생님이 이미 추가한 강아지가 있어요"
        isOpen={isVisible}
        actionText="닫기"
        actionFn={close}
        onClose={close}
      />
      <BackgroundButtonWrapper>
        <BackgroundButton disabled={selectedDogs.length === 0} onClick={() => handleSubmit()}>
          선택완료
        </BackgroundButton>
      </BackgroundButtonWrapper>
    </>
  );
};

export default AddDogSubmitButton;
