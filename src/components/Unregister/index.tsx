import ExclamationMarkIcon from "assets/svg/exclamationMark-icon";
import { BackgroundButton } from "components/common/Button";
import { Checkbox } from "components/common/Checkbox";

import * as S from "./styles";

const UnregisterInfo = () => {
  return (
    <S.UnregisterContainer>
      <S.TopWrapper>
        <S.Title>똑독 탈퇴를 원하시나요?</S.Title>
        <S.SubText>탈퇴 전, 아래 내용을 확인해 주세요</S.SubText>
      </S.TopWrapper>
      <S.CheckBoxWrapper>
        <S.CheckBoxItem isChecked>
          <Checkbox isChecked />
          <S.CautionText>
            지금까지 주고받은 채팅내역, 알림장, 사진앨범 등의 모든 기록이
            <S.AccentText>영구 삭제</S.AccentText>되며 복구할 수 없어요
          </S.CautionText>
        </S.CheckBoxItem>
        <S.CheckBoxItem>
          <Checkbox />
          <S.CautionText>
            탈퇴 후 사용했던 소셜 아이디로 <S.AccentText>재가입 시 신규 회원으로 가입</S.AccentText>
            돼요
          </S.CautionText>
        </S.CheckBoxItem>
      </S.CheckBoxWrapper>
      <S.AllCheckBoxItem isChecked>
        <Checkbox isChecked />
        <S.CautionText>위 안내사항에 모두 동의해요</S.CautionText>
      </S.AllCheckBoxItem>
      <S.BackgroundButtonWrapper>
        <BackgroundButton>탈퇴하기</BackgroundButton>
      </S.BackgroundButtonWrapper>
      <S.ExclamationMark>
        <ExclamationMarkIcon />
      </S.ExclamationMark>
    </S.UnregisterContainer>
  );
};

export default UnregisterInfo;
