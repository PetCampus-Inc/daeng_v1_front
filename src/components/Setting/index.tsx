import ArrowRightRound from "assets/svg/arrow-right-round-icon";

import * as S from "./styles";
import { PATH } from "../../constants/path";

const SettingInfo = () => {
  return (
    <S.SettingList>
      <S.SettingItem>
        <S.GotoPageButton to={PATH.SETTING_NOTIFICATION}>
          <S.Text>알림 설정</S.Text>
          <ArrowRightRound />
        </S.GotoPageButton>
      </S.SettingItem>
      <S.SettingItem>
        <S.GotoPageButton to={PATH.POLICY}>
          <S.Text>정책</S.Text>
          <ArrowRightRound />
        </S.GotoPageButton>
      </S.SettingItem>
      <S.SettingItem type="verUpdate">
        <S.TopBox>
          <S.Text>버전정보 및 업데이트</S.Text>
          <S.GotoUpdateButton>업데이트 하기</S.GotoUpdateButton>
        </S.TopBox>
        <S.ButtomBox>
          <S.SubText>업데이트가 필요합니다.</S.SubText>
          <S.SubText>똑독 2.0</S.SubText>
        </S.ButtomBox>
      </S.SettingItem>
      <S.SettingItem>
        <S.GotoPageButton to={PATH.MEMBER_UNREGISTER}>
          <S.Text>탈퇴하기</S.Text>
          <ArrowRightRound />
        </S.GotoPageButton>
      </S.SettingItem>
    </S.SettingList>
  );
};

export default SettingInfo;