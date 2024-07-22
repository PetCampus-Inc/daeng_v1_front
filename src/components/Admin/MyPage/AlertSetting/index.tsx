import AttendanceIcon from "assets/svg/attendance-icon";
import CheckBoard from "assets/svg/check-board";
import DogIcon from "assets/svg/dog-icon";
import FootRoundIcon from "assets/svg/foot-round-icon";
import SchoolIcon from "assets/svg/school-icon";
import { Box } from "components/common";
import Header from "components/common/Header";
import Toggle from "components/common/Toggle/Toggle";

import * as S from "./styles";

interface AlertSettingProps {
  setStep: (step: number) => void;
}

const AlertSetting = ({ setStep }: AlertSettingProps) => {
  return (
    <>
      <Header type="text" text="설정" handleClick={() => setStep(0)} />
      <Box mt={5} bg={"white"} height={"100%"}>
        <S.TopWrapper>
          <div>
            <S.Title>서비스 알림</S.Title>
            <S.SubTitle>서비스 전체 알림</S.SubTitle>
          </div>
          <Toggle />
        </S.TopWrapper>
        <S.SettingList>
          {/* 어드민 내용 */}
          <S.SettingItem type="notification" marginTop="0.5rem">
            <S.TextWrapper>
              <S.TextBox>
                <S.StyledIconBox>
                  <AttendanceIcon />
                </S.StyledIconBox>
                <S.Text>출석부 알림</S.Text>
              </S.TextBox>
              <S.SubTextPL>강아지 등록 정보, 이용권, 유의사항 등</S.SubTextPL>
            </S.TextWrapper>
            <Toggle />
          </S.SettingItem>
          <S.SettingItem type="notification">
            <S.TextWrapper>
              <S.TextBox>
                <S.StyledIconBox>
                  <CheckBoard />
                </S.StyledIconBox>
                <S.Text>강아지 관리 알림</S.Text>
              </S.TextBox>
              <S.SubTextPL>알림장 전송, 사진 전송 등</S.SubTextPL>
            </S.TextWrapper>
            <Toggle />
          </S.SettingItem>
          <S.SettingItem type="notification">
            <S.TextWrapper>
              <S.TextBox>
                <S.StyledIconBox>
                  <SchoolIcon />
                </S.StyledIconBox>
                <S.Text>유치원 운영 알림</S.Text>
              </S.TextBox>
              <S.SubTextPL>신규 가입, 교사 관리 등</S.SubTextPL>
            </S.TextWrapper>
            <Toggle />
          </S.SettingItem>
        </S.SettingList>
      </Box>
    </>
  );
};

export default AlertSetting;
