import { DOG_STATUS } from "constants/memebrDogStatus";
import { PATH } from "constants/path";

import ArrowRightIcon from "assets/svg/arrow-right-icon";
import DogNotfoundIcon from "assets/svg/dog-notfound-icon";
import AlertBottomSheet from "components/common/BottomSheet/AlertBottomSheet";
import { useGetMemberDogDetailInfo, usePostMemberDogDelete } from "hooks/api/member/member";
import { useOverlay } from "hooks/common/useOverlay";
import { useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { memberEnrollmentDogDetailAtom } from "store/member";
import { formatDate } from "utils/formatter";
import showToast from "utils/showToast";

import * as S from "./styles";
import BasicModal from "../../../common/Modal/BasicModal";
import DogDeleteButton from "../Buttons/DogDeleteButton";

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
  //TODO 기능 추가에 따른 컴포넌트 분리 및 리팩토링 필요
  const registeredTime =
    registeredDate && formatDate(registeredDate[0], registeredDate[1], registeredDate[2], "dot");
  const setdogDetailinfo = useSetRecoilState(memberEnrollmentDogDetailAtom);
  const { memberId } = useParams();
  const navigate = useNavigate();
  const overlay = useOverlay();
  const divRef = useRef<HTMLDivElement>(null);
  const mutateMemberDogDelete = usePostMemberDogDelete(String(memberId));
  const { data: MemeberDogInfo } = useGetMemberDogDetailInfo(Number(dogId));
  const isProfileString = profileUri === null ? "true" : "false";

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
          navigate(PATH.MEMBER_MY_SCHOOL_SEARCH(String(memberId)));
          setdogDetailinfo(MemeberDogInfo);
        }}
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
    mutateMemberDogDelete(dogId);
    showToast("강아지가 삭제되었습니다", "bottom");
  };

  const handleCardFocus = () => {
    divRef.current?.focus();
  };

  return (
    <S.MyDogCard
      isprofilestring={isProfileString}
      tabIndex={dogLength}
      ref={divRef}
      onClick={handleCardFocus}
    >
      <DogDeleteButton
        isOpen={isOpen}
        onClick={dogLength <= 1 ? openInvalidInputPopup : openDeleteDogPopup}
      />

      <S.InfoTextBox>
        <S.DogName className={isProfileString === "true" ? "colorGray1" : ""}>{dogName}</S.DogName>
        {status === DOG_STATUS.DROP_OUT ? (
          <S.GotoSchoolInfoButton pr="0" onClick={openAlertPopup}>
            <span>등록된 유치원 없음</span>
          </S.GotoSchoolInfoButton>
        ) : (
          <S.GotoSchoolInfoButton onClick={() => navigate(PATH.MEMBER_MY_SCHOOL_INFO(dogId))}>
            <span>{schoolInfo} 유치원</span>
            {!isOpen && <ArrowRightIcon />}
          </S.GotoSchoolInfoButton>
        )}
        <S.DateText className={isProfileString === "true" ? "colorGray1" : ""}>
          {registeredTime} 등록
        </S.DateText>
      </S.InfoTextBox>
      {profileUri === null ? (
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
