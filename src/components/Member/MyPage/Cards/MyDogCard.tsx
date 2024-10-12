import { DOG_STATUS } from "constants/memberDogStatus";
import { routes } from "constants/path";
import { QUERY_KEY } from "constants/queryKey";

import { useQueryClient } from "@tanstack/react-query";
import DogNotfoundIcon from "assets/svg/dog-notfound-icon";
import AlertBottomSheet from "components/common/BottomSheet/AlertBottomSheet";
import { BasicModal } from "components/common/Modal";
import { usePostMemberDogDelete } from "hooks/api/member/member";
import { useOverlay } from "hooks/common/useOverlay";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { dogEnrollmentStatus, dogIdState } from "store/member";
import { IDoglist, IMemberInfo } from "types/member/main.types";
import { formatDate } from "utils/formatter";

import * as S from "./styles";
import DogDeleteButton from "../Buttons/DogDeleteButton";
import GotoSchoolInfoButton from "../Buttons/GotoSchoolInfoButton";

interface IMyDogCardProps {
  dogData: IDoglist;
  isOpen: boolean;
  schoolInfo: string;
  profileUri: string | null;
  dogLength: number;
  onCardFocus: (dogId: string) => void;
}

const MyDogCard = ({
  dogData,
  isOpen,
  schoolInfo,
  profileUri,
  dogLength,
  onCardFocus
}: IMyDogCardProps) => {
  const navigate = useNavigate();
  const overlay = useOverlay();
  const queryClient = useQueryClient();
  const divRef = useRef<HTMLDivElement>(null);
  const [selectedDogId, setDogId] = useRecoilState(dogIdState);
  const setDogEnrollmentStatus = useSetRecoilState(dogEnrollmentStatus);
  const mutateMemberDogDelete = usePostMemberDogDelete();

  const cacheMemberData = queryClient.getQueryData(
    QUERY_KEY.MEMBER_MYPAGE_MAIN_INFO
  ) as IMemberInfo;
  const { doglist } = cacheMemberData;
  const enrolledDogs = doglist.filter((el) => el.status === "ENROLLED");

  const { dogId, dogName, registeredDate, status } = dogData;
  const [year, month, day] = registeredDate.map(String);
  const registeredTime = registeredDate && formatDate(year, month, day, "dot");
  const isProfile = profileUri === null;

  // 한 마리만 있을 때 삭제할 경우
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

  // 강아지 삭제할 경우
  const openDeleteDogPopup = () =>
    overlay.open(({ isOpen, close }) => (
      <BasicModal
        isOpen={isOpen}
        close={close}
        title={`${dogName}를 삭제 하시겠습니까?`}
        subtitle={"해당 강아지의 모든 정보가 초기화 됩니다"}
        closeText={"취소"}
        actionText={"삭제"}
        actionFn={() => {
          close();
          handleDeleteDog();
        }}
      />
    ));

  // 유치원 끊긴 강아지 유치원 정보를 보려고 할 떄
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
          setDogEnrollmentStatus({ status: "RE_SCHOOL" });
          setDogId(Number(dogId));
        }}
      />
    ));

  const handleDeleteDog = () => {
    mutateMemberDogDelete(dogId, {
      onSuccess: () => {
        // 삭제 성공 시 첫번째 강아지로 select
        setDogId(Number(doglist[0].dogId));
      }
    });
  };

  const handleFocus = () => {
    setDogId(Number(dogId));
    onCardFocus(dogId);
  };

  useEffect(() => {
    if (selectedDogId) {
      onCardFocus(String(selectedDogId));
    }
  }, [selectedDogId]);

  return (
    <S.MyDogCard
      id={dogId}
      ref={divRef}
      tabIndex={dogLength}
      className={`${selectedDogId === Number(dogId) ? "active" : ""} ${isProfile ? "notProfile" : ""}`}
      onFocus={handleFocus}
    >
      <DogDeleteButton
        isOpen={isOpen}
        onClick={
          dogLength <= 1 || enrolledDogs.length <= 1 ? openInvalidInputPopup : openDeleteDogPopup
        }
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
        <S.MyDogImg src={profileUri ?? ""} alt="my-dog" />
      )}
    </S.MyDogCard>
  );
};

export default MyDogCard;
