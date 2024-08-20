import AttendanceIcon from "assets/svg/attendance-icon";
import CheckBoard from "assets/svg/check-board";
import SchoolIcon from "assets/svg/school-icon";
import { Box } from "components/common";
import Header from "components/common/Header";
import Toggle from "components/common/Toggle/Toggle";
import { useState } from "react";
import { Role } from "types/common/role.types";

import * as S from "./styles";

interface AlertSettingProps {
  setStep: (step: number) => void;
  role: Role;
}

type AlertSettings = {
  attendance: boolean;
  careDog: boolean;
  school: boolean;
};

const AlertSetting = ({ setStep, role }: AlertSettingProps) => {
  const [alertSettings, setAlertSettings] = useState({
    attendance: false,
    careDog: false,
    school: false
  });

  const isAllOn = Object.values(alertSettings).every(Boolean);

  const toggleAll = () => {
    const newState = !isAllOn;
    setAlertSettings({
      attendance: newState,
      careDog: newState,
      school: newState
    });
  };

  const toggleIndividual = (key: keyof AlertSettings) => {
    setAlertSettings((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

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
          {alretItem(
            <AttendanceIcon />,
            "출석부 알림",
            "강아지 등록 정보, 이용권, 유의사항 등",
            "attendance"
          )}
          {alretItem(<CheckBoard />, "강아지 관리 알림", "알림장 전송, 사진 전송 등", "careDog")}
          {role === Role.ROLE_OWNER &&
            alretItem(<SchoolIcon />, "유치원 운영 알림", "신규 가입, 교사 관리 등", "school")}
        </S.SettingList>
      </Box>
    </>
  );
};

export default AlertSetting;
