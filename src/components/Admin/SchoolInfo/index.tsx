import Calendar from "assets/svg/calendar";
import Map from "assets/svg/map-pin-icon";
import Phone from "assets/svg/phone-basic";
import PhoneIcon from "assets/svg/phone-icon";
import BackgroundButton from "components/common/Button/BackgroundButton";
import useGetTeacherInfo from "hooks/api/useGetTeacherInfo";
import useOverlay from "hooks/common/useOverlay/useOverlay";
import { useRecoilValue } from "recoil";
import { adminLoginInfoAtom } from "store/admin";

import CallSchoolBottomSheet from "./Modal/CallSchoolBottomSheet";
import DisconnectModal from "./Modal/DisconnectModal";
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
      <DisconnectModal
        isOpen={isOpen}
        close={close}
        action={() => {
          console.log("유치원 연결 끊기");
          close();
        }}
      />
    ));

  return (
    <>
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
              <Map />
            </S.IconWrapper>
            <S.ListTitle>{data && data.schoolAddress ? data.schoolAddress : ""}</S.ListTitle>
          </S.InfoList>
          <S.InfoList>
            <S.IconWrapper>
              <Calendar />
            </S.IconWrapper>
            <S.ListTitle>{data && data.enrollDate ? data.enrollDate : ""}</S.ListTitle>
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
    </>
  );
};

export default SchoolInfo;
