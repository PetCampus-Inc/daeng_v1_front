import { BottomSheet, type BottomSheetProps } from "components/common/BottomSheet";
import { useCreateCareDogs } from "hooks/api/admin/care";
import { useOverlay } from "hooks/common/useOverlay";
import { styled } from "styled-components";

import AlertAlreadySelectedModal from "./AlertAlreadySelectedModal";
import { useSelectedDogs } from "../hooks/useSelectedDogs";
import AddDogList from "../list/AddDogList";

interface AddCaredogBottomSheetProps extends BottomSheetProps {
  openGuide: () => void;
}

const AddCaredogBottomSheet = ({
  isOpen,
  close: closeAddCareDogPopup,
  openGuide
}: AddCaredogBottomSheetProps) => {
  const overlay = useOverlay();

  const openBlocking = () =>
    overlay.open(({ isOpen, close }) => (
      <AlertAlreadySelectedModal isOpen={isOpen} close={close} />
    ));

  const { mutateCreateCareDogs } = useCreateCareDogs({
    openBlockingPopup: openBlocking,
    openGuidePopup: openGuide,
    closeRootPopup: closeAddCareDogPopup
  });
  const [selectedDogs, _] = useSelectedDogs();

  const selectedDogId = selectedDogs.map((dog) => dog.attendanceId);

  const handleSubmit = () => {
    mutateCreateCareDogs({ selectedDogId });
  };

  return (
    <BottomSheet isOpen={isOpen} close={closeAddCareDogPopup}>
      <BottomSheet.Content>
        <BottomSheet.Control />
        <BottomSheet.Title align="left">오늘 관리할 강아지</BottomSheet.Title>
        <BottomSheet.Subtitle align="left">
          관리할 강아지 목록에 추가할 강아지를 선택해 주세요
        </BottomSheet.Subtitle>
        <ListWrapper>
          <AddDogList />
        </ListWrapper>
        <BottomSheet.Button
          actionText="선택 완료"
          actionFn={handleSubmit}
          disabled={selectedDogs.length === 0}
        />
      </BottomSheet.Content>
    </BottomSheet>
  );
};

export default AddCaredogBottomSheet;

const ListWrapper = styled.div`
  padding-block: 0.75rem;
`;
