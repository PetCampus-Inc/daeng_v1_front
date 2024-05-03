import BottomSheet, { type IBottomSheetProps } from "components/common/BottomSheet";
import { useCreateCareDogs } from "hooks/api/admin/care";
import { useOverlay } from "hooks/common/useOverlay";
import { useRecoilValue } from "recoil";
import { adminLoginInfoAtom } from "store/admin";
import { styled } from "styled-components";

import AlertAlreadySelectedModal from "./AlertAlreadySelectedModal";
import { useSelectedDogs } from "../hooks/useSelectedDogs";
import AddDogList from "../list/AddDogList";

const AddCaredogBottomSheet = ({ isOpen, close }: IBottomSheetProps) => {
  const overlay = useOverlay();

  const openPopup = () =>
    overlay.open(({ isOpen, close }) => (
      <AlertAlreadySelectedModal isOpen={isOpen} close={close} />
    ));

  const { mutateCreateCareDogs } = useCreateCareDogs(openPopup);
  const [selectedDogs, _] = useSelectedDogs();

  const { adminId } = useRecoilValue(adminLoginInfoAtom);
  const selectedDogId = selectedDogs.map((dog) => dog.attendanceId);

  // TODO: 명확한 네이밍, useCreateCareDogs 내부의 onSuccess 분리하기!
  const handleSubmit = () => {
    mutateCreateCareDogs(
      { adminId, selectedDogId },
      {
        onSuccess: () => close()
      }
    );
  };

  return (
    <BottomSheet isOpen={isOpen} close={close}>
      <BottomSheet.Content>
        <BottomSheet.Control />
        <BottomSheet.Title align="left">오늘 관리할 강아지</BottomSheet.Title>
        <BottomSheet.Subtitle align="left">
          관리할 강아지 목록에 추가할 강아지를 선택해 주세요
        </BottomSheet.Subtitle>
        <ListWrapper>
          <AddDogList adminId={adminId} />
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

const ListWrapper = styled.div`
  padding-block: 0.75rem;
`;

export default AddCaredogBottomSheet;
