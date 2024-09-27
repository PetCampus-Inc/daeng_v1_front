import { routes } from "constants/path";

import ArrowRightRound from "assets/svg/arrow-right-round-icon";

import * as S from "./styles";

const SettingInfo = () => {
  return (
    <S.SettingList>
      <S.SettingItem>
        <S.GotoPageButton to={routes.setting.notification.root}>
          <S.Text>알림 설정</S.Text>
          <ArrowRightRound />
        </S.GotoPageButton>
      </S.SettingItem>
      <S.SettingItem>
        <S.GotoPageButton to={routes.policy.service.root}>
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
          <S.SubText type="verUpdate">업데이트가 필요합니다.</S.SubText>
          <S.SubText>똑독 2.0</S.SubText>
        </S.ButtomBox>
      </S.SettingItem>
      <S.SettingItem>
        <S.GotoPageButton to={routes.unregister.root}>
          <S.Text>탈퇴하기</S.Text>
          <ArrowRightRound />
        </S.GotoPageButton>
      </S.SettingItem>
    </S.SettingList>
  );
};

export default SettingInfo;
