import ArrowRightIcon from "assets/svg/arrow-right-icon";
import AlertBottomSheet from "components/common/BottomSheet/AlertBottomSheet";
import BasicModal from "components/common/ButtonModal/BasicModal";
import * as useOverlay from "hooks/common/useOverlay";
import { useRef } from "react";
import { formatDate } from "utils/formatter";
import showToast from "utils/showToast";

import * as S from "./styles";

interface IMyDogCardProps {
  isOpen: boolean;
  dogName: string;
  schoolInfo: string;
  registeredDate: string[];
  profileUri: string;
  dogLength: number;
  id: string;
}

const MyDogCard = ({
  isOpen,
  dogName,
  schoolInfo,
  registeredDate,
  profileUri,
  dogLength,
  id
}: IMyDogCardProps) => {
  //TODO 기능 추가에 따른 컴포넌트 분리 및 리팩토링 필요
  const registeredTime = formatDate(registeredDate[0], registeredDate[1], registeredDate[2], "dot");

  const overlay = useOverlay.useOverlay();
  const divRef = useRef<HTMLDivElement>(null);

  const openInvalidInputPopup = () =>
    overlay.open(({ isOpen, close }) => (
      <AlertBottomSheet
        isOpen={isOpen}
        close={close}
        title="강아지를 전부 삭제할 수 없어요"
        subtitle="최소 한 마리의 강아지를 남겨주세요"
        actionText="닫기"
        actionFn={close}
      />
    ));

  const openDeleteDogPopup = () =>
    overlay.open(({ isOpen, close }) => (
      <BasicModal
        isOpen={isOpen}
        close={close}
        action={() => {
          close();
          handleDeleteDog();
        }}
        title={`${dogName}를 삭제 하시겠습니까?`}
        subtitle={"해당 강아지의 모든 정보가 초기화 됩니다"}
        closeText={"취소"}
        actionText={"삭제"}
      />
    ));

  const handleDeleteDog = () => {
    //TODO 강아지 리스트에서 삭제하기
    console.log("삭제");
    showToast("강아지가 삭제되었습니다", "bottom");
  };

  const handleCardFocus = () => {
    divRef.current?.focus();
  };

  return (
    <S.MyDogCard tabIndex={dogLength} ref={divRef} onClick={handleCardFocus}>
      {isOpen && (
        <S.DeleteButton onClick={dogLength <= 1 ? openInvalidInputPopup : openDeleteDogPopup}>
          삭제
        </S.DeleteButton>
      )}
      <S.InfoTextBox>
        <S.DogName>{dogName}</S.DogName>
        <S.GotoSchoolInfoButton>
          <span>{schoolInfo}</span>
          {!isOpen && <ArrowRightIcon />}
        </S.GotoSchoolInfoButton>
        <S.DateText>{registeredTime} 등록</S.DateText>
      </S.InfoTextBox>
      <S.MyDogImg src={profileUri} alt="my-dog" />
    </S.MyDogCard>
  );
};

export default MyDogCard;
