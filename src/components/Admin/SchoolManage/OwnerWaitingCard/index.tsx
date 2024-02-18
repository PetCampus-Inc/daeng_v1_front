import ListIconSmallRound from "assets/svg/list-icon-small-round";
import { TextWrapper, Name, Contour, PhoneNum } from "../TeacherInfo/styles";
import * as S from "./styles";
import RightArrow from "assets/svg/right-arrow";
import { AnimatePresence } from "framer-motion";
import { IWaitingOwnerInfo } from "types/Admin.type";
import ApproveDenyButton from "../ApproveDenyButton";

interface IOwnerWaitingCard {
  data: IWaitingOwnerInfo;
}

const OwnerWaitingCard = ({ data }: IOwnerWaitingCard) => {
  const { dogName, memberName } = data;

  return (
    <AnimatePresence>
      <S.CardContainer>
        <S.UpperWrapper>
          <TextWrapper>
            <Name>{memberName}</Name>
            <Contour>|</Contour>
            <PhoneNum>{dogName}</PhoneNum>
          </TextWrapper>
          <ApproveDenyButton />
        </S.UpperWrapper>
        <S.LowerWrapper>
          <S.TextWrapper>
            <ListIconSmallRound />
            <p>가입신청서 보기</p>
          </S.TextWrapper>
          <RightArrow />
        </S.LowerWrapper>
      </S.CardContainer>
    </AnimatePresence>
  );
};

export default OwnerWaitingCard;
