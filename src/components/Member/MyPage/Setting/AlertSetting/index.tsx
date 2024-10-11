import DogIcon from "assets/svg/dog-icon";
import FootRoundIcon from "assets/svg/foot-round-icon";
import { Box } from "components/common";
import Header from "components/common/Header";
import Toggle from "components/common/Toggle/Toggle";
import { Role } from "types/common/role.types";

import { useAlertSetting } from "./context/AlertSettingProvider";
import * as S from "./styles";

interface AlertSettingProps {
  setStep: (step: number) => void;
  role: Role;
}

type AlertSettings = {
  careDog: boolean;
  activity: boolean;
};

const AlertSetting = ({ setStep, role }: AlertSettingProps) => {
  const { alertSettings, isAllOn, toggleAll, toggleIndividual } = useAlertSetting();

  const alretItem = (icon: any, text: string, subText: string, stateKey: keyof AlertSettings) => (
    <S.SettingItem type="notification" margintop="0.5rem">
      <S.TextWrapper>
        <S.TextBox>
          <S.StyledIconBox>{icon}</S.StyledIconBox>
          <S.Text>{text}</S.Text>
        </S.TextBox>
        <S.SubTextPL>{subText}</S.SubTextPL>
      </S.TextWrapper>
      <Toggle isOn={alertSettings[stateKey]} onToggle={() => toggleIndividual(stateKey)} />
    </S.SettingItem>
  );

  return (
    <>
      <Header type="text" text="설정" handleClick={() => setStep(0)} />
      <Box mt={5} bg={"white"} height={"100%"}>
        <S.TopWrapper>
          <div>
            <S.Title>서비스 알림</S.Title>
            <S.SubTitle>서비스 전체 알림</S.SubTitle>
          </div>
          <Toggle isOn={isAllOn} onToggle={toggleAll} />
        </S.TopWrapper>
        <S.SettingList>
          {alretItem(<DogIcon />, "등록 알림", "강아지 등록 정보, 이용권, 유의사항 등", "careDog")}
          {alretItem(<FootRoundIcon />, "활동 알림", "알림장, 채팅, 사진", "activity")}
        </S.SettingList>
      </Box>
    </>
  );
};

export default AlertSetting;
