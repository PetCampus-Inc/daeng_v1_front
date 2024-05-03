import Calendar from "assets/svg/calendar";
import List from "assets/svg/list-normal-school-icon";
import Map from "assets/svg/map-pin-icon";
import Phone from "assets/svg/phone-basic";
import PhoneIcon from "assets/svg/phone-icon";
import CallSchoolBottomSheet from "components/common/BottomSheet/CallBottomSheet/CallSchoolBottomSheet";
import BackgroundButton from "components/common/Button/BackgroundButton";
import BasicModal from "components/common/Modal/BasicModal";
import useGetTeacherInfo from "hooks/api/useGetTeacherInfo";
import { useOverlay } from "hooks/common/useOverlay";
import { useRecoilValue } from "recoil";
import { adminLoginInfoAtom } from "store/admin";

import * as S from "./styles";

const SchoolInfo = () => {
  const { adminId } = useRecoilValue(adminLoginInfoAtom);
  const { data } = useGetTeacherInfo(adminId);

  const overlay = useOverlay();

  const schoolCallInfo = {
    schoolName: data.schoolName,
    schoolNumber: data.schoolNumber
  };

  const openCallPopup = () =>
    overlay.open(({ isOpen, close }) => (
      <CallSchoolBottomSheet info={schoolCallInfo} isOpen={isOpen} close={close} />
    ));

  const openDisconnectPopup = () =>
    overlay.open(({ isOpen, close }) => (
      <BasicModal
        isOpen={isOpen}
        close={close}
        action={() => {
          console.log("유치원 연결 끊기");
          close();
        }}
        title="유치원과 연결을 끊으시겠습니까?"
        subtitle="유치원과 연결이 끊겨 채팅내역, 알림장, 사진앨범 등의 모든 기록에 접근할 수 없어요 모든 기록은 유치원에서는 유지되니 걱정마세요"
        closeText="취소"
        actionText="탈퇴하기"
        colorScheme="red"
      />
    ));

  return (
    <S.CardContainer>
      <S.CardTitle>{data && data.schoolName ? `${data.schoolName} 유치원` : ""}</S.CardTitle>
      <S.InfoContainer>
        <S.InfoList>
          <S.IconWrapper>
            <Phone />
          </S.IconWrapper>
          <S.ListTitle>{data && data.schoolNumber ? data.schoolNumber : ""}</S.ListTitle>
          <S.YellowThickButton onClick={openCallPopup}>
            <PhoneIcon />
            전화 걸기
          </S.YellowThickButton>
        </S.InfoList>
        <S.InfoList>
          <S.IconWrapper>
            <List />
          </S.IconWrapper>
          <S.ListTitle>이용권 : 정기권_12주 (만료 30일 전)</S.ListTitle>
        </S.InfoList>
        <S.InfoList>
          <S.IconWrapper>
            <Map />
          </S.IconWrapper>
          <S.ListTitle>{data && data.schoolAddress ? data.schoolAddress : ""}</S.ListTitle>
        </S.InfoList>
        <S.InfoList>
          <S.IconWrapper>
            <Calendar />
          </S.IconWrapper>
          <S.ListTitle>{data && data.enrollDate ? `${data.enrollDate}등록` : ""}</S.ListTitle>
        </S.InfoList>
      </S.InfoContainer>
      <BackgroundButton
        backgroundColor={"white"}
        onClick={openDisconnectPopup}
        className="disconnect"
      >
        유치원 연결 끊기
      </BackgroundButton>
    </S.CardContainer>
  );
};

export default SchoolInfo;
