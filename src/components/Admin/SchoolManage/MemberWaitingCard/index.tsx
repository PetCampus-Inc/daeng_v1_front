import { PATH } from "constants/path";

import ListIconSmallRound from "assets/svg/list-icon-small-round";
import RightArrow from "assets/svg/right-arrow";
import { AnimatePresence } from "framer-motion";
import { useApproveFormMutation, useDenyFormMutation } from "hooks/api/useApproveDenyMutation";
import { useState } from "react";
import { IWaitingOwnerInfo } from "types/Admin.type";
import showToast from "utils/showToast";

import * as S from "./styles";
import ApproveDenyButton from "../ApproveDenyButton";
import { TextWrapper, Name, Contour, PhoneNum } from "../TeacherInfo/styles";

interface IOwnerWaitingCard {
  data: IWaitingOwnerInfo;
}

const MemberWaitingCard = ({ data }: IOwnerWaitingCard) => {
  const { dogName, memberName, enrollmentFormId } = data;
  const [isShow, setIsShow] = useState(true);
  const mutateApproveForm = useApproveFormMutation();
  const mutateDenyForm = useDenyFormMutation();

  const approveFunc = () => {
    mutateApproveForm(enrollmentFormId, {
      onError: () => {
        showToast("승인에 실패했습니다. 다시 시도해주세요.", "bottom");
        return;
      }
    });
  };

  const denyFunc = () => {
    mutateDenyForm(enrollmentFormId, {
      onError: () => {
        showToast("거절에 실패했습니다. 다시 시도해주세요.", "bottom");
        return;
      }
    });
  };

  const params = new URLSearchParams();
  params.append("member_name", memberName);

  return (
    <AnimatePresence>
      {isShow && (
        <S.CardContainer
          initial={{ opacity: 1, scale: 1 }}
          exit={{
            x: -150,
            opacity: 0,
            transition: { delay: 0.5, duration: 0.3 }
          }}
          transition={{ duration: 0.8, type: "spring", delay: 0.3 }}
          layout
          key={enrollmentFormId}
        >
          <S.UpperWrapper>
            <TextWrapper>
              <Name>{memberName}</Name>
              <Contour>|</Contour>
              <PhoneNum>{dogName}</PhoneNum>
            </TextWrapper>
            <ApproveDenyButton
              setIsShow={setIsShow}
              approveFunc={approveFunc}
              denyFunc={denyFunc}
            />
          </S.UpperWrapper>
          <S.LinkToEnrollment to={PATH.ADMIN_MEMBER_FORM(`${enrollmentFormId}?${params}`)}>
            <S.TextWrapper>
              <ListIconSmallRound />
              <p>가입신청서 보기</p>
            </S.TextWrapper>
            <RightArrow />
          </S.LinkToEnrollment>
        </S.CardContainer>
      )}
    </AnimatePresence>
  );
};

export default MemberWaitingCard;
