import { DOG_STATUS } from "constants/memberDogStatus";
import { routes } from "constants/path";

import DogNotfoundIcon from "assets/svg/dog-notfound-icon";
import AlertBottomSheet from "components/common/BottomSheet/AlertBottomSheet";
import { BasicModal } from "components/common/Modal";
import { usePostMemberDogDelete } from "hooks/api/member/member";
import { useOverlay } from "hooks/common/useOverlay";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { dogIdState } from "store/member";
import { formatDate } from "utils/formatter";
import showToast from "utils/showToast";

import * as S from "./styles";
import DogDeleteButton from "../Buttons/DogDeleteButton";
import GotoSchoolInfoButton from "../Buttons/GotoSchoolInfoButton";

interface IMyDogCardProps {
  dogId: string;
  isOpen: boolean;
  dogName: string;
  schoolInfo: string;
  registeredDate: string[];
  profileUri: string | null;
  status: string;
  dogLength: number;
}

const MyDogCard = ({
  dogId,
  isOpen,
  dogName,
  schoolInfo,
  registeredDate,
  profileUri,
  status,
  dogLength
}: IMyDogCardProps) => {
  const registeredTime =
    registeredDate && formatDate(registeredDate[0], registeredDate[1], registeredDate[2], "dot");
  const setDogId = useSetRecoilState(dogIdState);
  const navigate = useNavigate();
  const overlay = useOverlay();
  const divRef = useRef<HTMLDivElement>(null);
  const mutateMemberDogDelete = usePostMemberDogDelete();
  const isProfile = profileUri === null;

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

  const openAlertPopup = () =>
    overlay.open(({ isOpen, close }) => (
      <AlertBottomSheet
        isOpen={isOpen}
        close={close}
        title="등록된 유치원이 없어요"
        subtitle="새로운 유치원 가입을 원하시면 가입을 진행해 주세요"
        actionText="가입하기"
        actionFn={() => {
          navigate(routes.member.mypage.enrollment.root);
          setDogId(Number(dogId));
        }}
      />
    ));

  const openDeleteDogPopup = () =>
    overlay.open(({ isOpen, close }) => (
      <BasicModal
        isOpen={isOpen}
        close={close}
        actionFn={() => {
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
    mutateMemberDogDelete(dogId);
    showToast("강아지가 삭제되었습니다", "bottom");
  };

  const handleCardFocus = () => {
    divRef.current?.focus();
  };

  return (
    <S.MyDogCard
      isprofilestring={isProfile ? "true" : "false"}
      tabIndex={dogLength}
      ref={divRef}
      onClick={handleCardFocus}
    >
      <DogDeleteButton
        isOpen={isOpen}
        onClick={dogLength <= 1 ? openInvalidInputPopup : openDeleteDogPopup}
      />

      <S.InfoTextBox>
        <S.DogName className={isProfile ? "colorGray1" : ""}>{dogName}</S.DogName>
        {status === DOG_STATUS.DROP_OUT || status === DOG_STATUS.APPROVAL_CANCEL ? (
          <GotoSchoolInfoButton pr="0" onClick={openAlertPopup} />
        ) : (
          <GotoSchoolInfoButton
            schoolInfo={schoolInfo}
            onClick={() => navigate(routes.member.mypage.dog.school.dynamic(dogId))}
          />
        )}
        <S.DateText className={isProfile ? "colorGray1" : ""}>{registeredTime} 등록</S.DateText>
      </S.InfoTextBox>
      {isProfile ? (
        <S.BgIconBox>
          <DogNotfoundIcon />
        </S.BgIconBox>
      ) : (
        <S.MyDogImg src={profileUri} alt="my-dog" />
      )}
    </S.MyDogCard>
  );
};

export default MyDogCard;
