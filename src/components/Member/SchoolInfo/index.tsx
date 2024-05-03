import Calendar from "assets/svg/calendar";
import List from "assets/svg/list-normal-school-icon";
import Map from "assets/svg/map-pin-icon";
import Phone from "assets/svg/phone-basic";
import PhoneIcon from "assets/svg/phone-icon";
import AlertBottomSheet from "components/common/BottomSheet/AlertBottomSheet";
import CallSchoolBottomSheet from "components/common/BottomSheet/CallBottomSheet/CallSchoolBottomSheet";
import BackgroundButton from "components/common/Button/BackgroundButton";
import BasicModal from "components/common/Modal/BasicModal";
import { useOverlay } from "hooks/common/useOverlay";
import { useNavigate } from "react-router-dom";
import showToast from "utils/showToast";

import * as S from "./styles";

const SchoolInfo = () => {
  const navigate = useNavigate();
  const overlay = useOverlay();

  const schoolCallInfo = {
    schoolName: "똑독",
    schoolNumber: "02-0909-000"
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
          handleDeleteSchool();
        }}
        title="유치원과 연결을 끊으시겠습니까?"
        subtitle="지금까지 주고 받은 채팅내역, 알림장, 사진앨범 등의 모든 기록은 유지되지만, 유치원과 연결이 끊겨 더 이상 해당 유치원의 소식을 받을 수 없어요"
        closeText="취소"
        actionText="연결 끊기"
        colorScheme="red"
      />
    ));

  const openAlertPopup = () =>
    overlay.open(({ isOpen, close }) => (
      <AlertBottomSheet
        title="이용권의 사용기한이 남아 있어요"
        subtitle="유치원과의 연결을 끊으면 서비스 이용이 불가능해요 아직 이용권의 사용기한이 남아 있어요 그래도 연결을 끊으시겠습니까?"
        isOpen={isOpen}
        close={close}
        actionText={"연결 끊기"}
        actionFn={() => {
          console.log("유치원 연결 끊기");
          close();
          handleDeleteSchool();
        }}
      />
    ));

  const handleDeleteSchool = () => {
    //TODO 유치원 연결끊기
    console.log("삭제");
    navigate("/mypage");
    showToast("유치원과 연결이 끊어졌습니다", "bottom");
  };

  return (
    <S.CardContainer>
      <S.CardTitle>{schoolCallInfo ? schoolCallInfo.schoolName : ""} 유치원</S.CardTitle>
      <S.InfoContainer>
        <S.InfoList>
          <S.IconWrapper>
            <Phone />
          </S.IconWrapper>
          <S.ListTitle>{schoolCallInfo ? schoolCallInfo.schoolNumber : ""}</S.ListTitle>
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
          <S.ListTitle>서울시 광진구 이라동 780-3</S.ListTitle>
        </S.InfoList>
        <S.InfoList>
          <S.IconWrapper>
            <Calendar />
          </S.IconWrapper>
          <S.ListTitle>2023.12.13 등록</S.ListTitle>
        </S.InfoList>
      </S.InfoContainer>
      <BackgroundButton backgroundColor={"white"} onClick={openAlertPopup} className="disconnect">
        유치원 연결 끊기
      </BackgroundButton>
    </S.CardContainer>
  );
};

export default SchoolInfo;
