import React from "react";
import * as S from "./styles";
import RightArrow from "assets/svg/right-arrow";
import YellowApplication from "assets/svg/yellow-application";
import BrownApplication from "assets/svg/brown-application";

interface ISimpleMembershipApplicationProps {
  isUsed?: boolean;
}

const SimpleMembershipApplication = ({ isUsed = false }: ISimpleMembershipApplicationProps) => {
  return (
    <S.Container>
      <S.LeftBox>
        <S.Image>{isUsed ? <YellowApplication /> : <BrownApplication />}</S.Image>
        <S.TextWrapper>
          <S.Title>소현경용 신청서 ver1</S.Title>
          <S.MiddleText>신청일: 2021.08.30</S.MiddleText>
          <S.Date>2023.12.21 작성됨</S.Date>
        </S.TextWrapper>
      </S.LeftBox>
      <RightArrow />
    </S.Container>
  );
};

export default SimpleMembershipApplication;
