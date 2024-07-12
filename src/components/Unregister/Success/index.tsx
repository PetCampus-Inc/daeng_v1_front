import { BackgroundButton } from "components/common/Button";

import * as S from "../styles";

const UnregisterSuccess = () => {
  return (
    <>
      <S.TitleWrapper>
        <S.Title>
          <S.AccentText>탈퇴</S.AccentText>가 완료되었습니다.
        </S.Title>
        <S.SubText>똑독 유치원에서 다시 만날 날을 기다릴게요</S.SubText>
      </S.TitleWrapper>
      <div></div>
      <S.BackgroundButtonWrapper>
        <BackgroundButton backgroundColor="white">로그인 화면으로 이동</BackgroundButton>
      </S.BackgroundButtonWrapper>
    </>
  );
};

export default UnregisterSuccess;
