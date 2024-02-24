import * as S from "./styles";
import AlertSmallIcon from "assets/svg/alert-small-icon";
import { DOG_NOTICE_LIST } from "constants/notice";

const AgreeList = () => {
  return (
    <S.ListContainer>
      {DOG_NOTICE_LIST.map((item) => (
        <S.List>
          <S.FlexText className="title">
            {item.icon}
            {item.title}
          </S.FlexText>
          <S.FlexWrapper>
            <S.FlexText className="re-agree">
              <AlertSmallIcon color="orange" />
              재동의 필요
            </S.FlexText>

            <S.FlexText className="date">2020.10.10 동의</S.FlexText>
          </S.FlexWrapper>
        </S.List>
      ))}
    </S.ListContainer>
  );
};

export default AgreeList;
