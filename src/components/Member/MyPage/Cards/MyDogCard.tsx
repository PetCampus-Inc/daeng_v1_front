import RightArrow from "assets/svg/right-arrow";
import AlertBottomSheet from "components/common/BottomSheet/AlertBottomSheet";
import BasicModal from "components/common/ButtonModal/BasicModal";
import useOverlay from "hooks/common/useOverlay/useOverlay";

import * as S from "./styles";

interface IMyDogCardProps {
  isOpen: boolean;
  dogName: string;
  schoolInfo: string;
  createdTime: string;
  profileUri: string;
  DogLength: number;
}

const MyDogCard = ({
  isOpen,
  dogName,
  schoolInfo,
  createdTime,
  profileUri,
  DogLength
}: IMyDogCardProps) => {
  //TODO 기능 추가에 따른 컴포넌트 분리 및 리팩토링 필요
  const overlay = useOverlay();

  const openInvalidInputPopup = () =>
    overlay.open(({ isOpen, close }) => (
      <AlertBottomSheet
        isOpen={isOpen}
        close={() => {
          close();
        }}
        title="강아지를 전부 삭제할 수 없어요"
        subtitle="최소 한 마리의 강아지를 남겨주세요"
        actionText="닫기"
        actionFn={() => {
          close();
        }}
      />
    ));

  const openDeleteDogPopup = () =>
    overlay.open(({ isOpen, close }) => (
      <BasicModal
        isOpen={isOpen}
        close={close}
        action={handleDeleteDog}
        title={`${dogName}를 삭제 하시겠습니까?`}
        subtitle={"해당 강아지의 모든 정보가 초기화 됩니다"}
        closeText={"취소"}
        actionText={"삭제"}
      />
    ));

  const handleDeleteDog = () => {
    console.log("삭제");
  };

  return (
    <S.MyDogCard>
      {isOpen && (
        <S.DeleteButton onClick={DogLength <= 1 ? openInvalidInputPopup : openDeleteDogPopup}>
          삭제
        </S.DeleteButton>
      )}
      <S.InfoTextBox>
        <S.DogName>{dogName}</S.DogName>
        <S.GotoSchoolInfoButton>
          {schoolInfo}
          {!isOpen && <RightArrow />}
        </S.GotoSchoolInfoButton>
        <S.DateText>{createdTime} 등록</S.DateText>
      </S.InfoTextBox>
      <S.MyDogImg src={profileUri} alt="my-dog" />
    </S.MyDogCard>
  );
};

export default MyDogCard;
