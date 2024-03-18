import BottomSheet from "components/common/BottomSheet";
import { useCreateCareDogs } from "hooks/api/caredogQuery";
import useModal from "hooks/common/useModal";
import { useRecoilValue } from "recoil";
import { adminLoginInfoAtom } from "store/admin";

import AlertAlreadySelectedModal from "./AlertAlreadySelectedModal";
import AddDogList from "../CareList/AddDogList";
import { useSelectedDogs } from "../context/SelectedDogsProvider";

interface AddCaredogBottomSheetProps {
  isVisible: boolean;
  close: () => void;
}

const AddCaredogBottomSheet = ({ isVisible, close }: AddCaredogBottomSheetProps) => {
  const { adminId } = useRecoilValue(adminLoginInfoAtom);
  const [selectedDogs, _] = useSelectedDogs();
  const { isVisible: isModalOpen, open, close: modalClose } = useModal();
  const { MutateCreateCareDogs } = useCreateCareDogs(open);
  const selectedDogId = selectedDogs.map((dog) => dog.attendanceId);

  // TODO: 명확한 네이밍, useCreateCareDogs 내부의 onSuccess 분리하기!
  const handleSubmit = () => {
    MutateCreateCareDogs(
      { adminId, selectedDogId },
      {
        onSuccess: () => close()
      }
    );
    // open();
  };

  return (
    <>
      <AlertAlreadySelectedModal isOpen={isModalOpen} close={modalClose} />
      <BottomSheet isOpen={isVisible} onClose={() => close()}>
        <BottomSheet.Content>
          <BottomSheet.Control />
          <AddDogList adminId={adminId} />
          <BottomSheet.Button
            actionText="선택 완료"
            actionFn={handleSubmit}
            disabled={selectedDogs.length === 0}
          />
        </BottomSheet.Content>
      </BottomSheet>
    </>
  );
};

export default AddCaredogBottomSheet;
