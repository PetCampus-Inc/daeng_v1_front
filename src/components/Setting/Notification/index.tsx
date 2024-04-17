import AttendanceIcon from "assets/svg/attendance-icon";
import CheckBoard from "assets/svg/check-board";
import SchoolIcon from "assets/svg/school-icon";
import Toggle from "components/common/Toggle/Toggle";

import * as S from "../styles";

// TODO 기능 추가 할 때 컴포넌트 분리 작업 필요합니다. (리팩토링)
const NotificationInfo = () => {
  return (
    <>
      <S.TopWrapper>
        <div>
          <S.Title>서비스 알림</S.Title>
          <S.SubTitle>서비스 전체 알림</S.SubTitle>
        </div>
        <Toggle />
      </S.TopWrapper>
      <S.SettingList>
        <S.SettingItem type="notification">
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
    </>
  );
};

export default NotificationInfo;
