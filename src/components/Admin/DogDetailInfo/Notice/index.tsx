import { InnerContainer } from "../styles";
import { DogDetailInfoText } from "../DogInfo/styles";
import SendAlermButton from "../Ticket/SendAlermButton";
import * as S from "./styles";
import { IPrecautionInfo } from "types/Attendance.type";
import AlertSmallIcon from "assets/svg/alert-small-icon";
import { DOG_NOTICE_LIST } from "constants/notice";

interface NoticeProps {
  data: IPrecautionInfo;
}
const Notice = ({ data }: NoticeProps) => {
  console.log(data);
  return (
    <InnerContainer style={{ gap: "12px" }}>
      <S.FlexWrapper>
        <DogDetailInfoText className="big">유의사항 동의</DogDetailInfoText>
        <SendAlermButton />
      </S.FlexWrapper>

      <S.ListContainer>
        {DOG_NOTICE_LIST.map((item) => (
          <S.List key={item.id}>
            <S.FlexText className="title">
              {item.icon}
              {item.title}
            </S.FlexText>
            <S.InnerFlexWrapper>
              <S.FlexText className="re-agree">
                <AlertSmallIcon color="orange" />
                재동의 필요
              </S.FlexText>

              <S.FlexText className="date">2020.10.10 동의</S.FlexText>
            </S.InnerFlexWrapper>
          </S.List>
        ))}
      </S.ListContainer>
    </InnerContainer>
  );
};

export default Notice;
