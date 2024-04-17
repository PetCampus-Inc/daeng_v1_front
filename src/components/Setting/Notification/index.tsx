import AttendanceIcon from "assets/svg/attendance-icon";
import CheckBoard from "assets/svg/check-board";
import DogIcon from "assets/svg/dog-icon";
import FootRoundIcon from "assets/svg/foot-round-icon";
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
        {/* 어드민 내용 */}
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

        {/* 유저 내용 */}
        <S.SettingItem type="notification">
          <S.TextWrapper>
            <S.TextBox>
              <S.StyledIconBox>
                <DogIcon />
              </S.StyledIconBox>
              <S.Text>등록 알림</S.Text>
            </S.TextBox>
            <S.SubTextPL>유치원 가입, 강아지 정보</S.SubTextPL>
          </S.TextWrapper>
          <Toggle />
        </S.SettingItem>
        <S.SettingItem type="notification">
          <S.TextWrapper>
            <S.TextBox>
              <S.StyledIconBox>
                <FootRoundIcon />
              </S.StyledIconBox>
              <S.Text>활동 알림</S.Text>
            </S.TextBox>
            <S.SubTextPL>알림장, 채팅, 사진</S.SubTextPL>
          </S.TextWrapper>
          <Toggle />
        </S.SettingItem>

      </S.SettingList>
    </>
  );
};

export default NotificationInfo;
