import { useState } from "react";
import { IWaitingOwnerInfo } from "types/Admin.type";
import { AnimatePresence } from "framer-motion";
import * as S from "./styles";
import { TextWrapper, Name, Contour, PhoneNum } from "../TeacherInfo/styles";
import ApproveDenyButton from "../ApproveDenyButton";
import ListIconSmallRound from "assets/svg/list-icon-small-round";
import RightArrow from "assets/svg/right-arrow";

interface IOwnerWaitingCard {
  data: IWaitingOwnerInfo;
}

const OwnerWaitingCard = ({ data }: IOwnerWaitingCard) => {
  const { dogName, memberName } = data;
  const [isShow, setIsShow] = useState(true);

  return (
    <AnimatePresence>
      {isShow && (
        <S.CardContainer
          initial={{ opacity: 1, scale: 1 }}
          exit={{ x: -500, opacity: 0 }}
          transition={{ ease: "easeInOut", duration: 1 }}
        >
          <S.UpperWrapper>
            <TextWrapper>
              <Name>{memberName}</Name>
              <Contour>|</Contour>
              <PhoneNum>{dogName}</PhoneNum>
            </TextWrapper>
            <ApproveDenyButton setIsShow={setIsShow} />
          </S.UpperWrapper>
          <S.LowerWrapper>
            <S.TextWrapper>
              <ListIconSmallRound />
              <p>가입신청서 보기</p>
            </S.TextWrapper>
            <RightArrow />
          </S.LowerWrapper>
        </S.CardContainer>
      )}
    </AnimatePresence>
  );
};

export default OwnerWaitingCard;
