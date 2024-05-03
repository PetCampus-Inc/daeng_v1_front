import Calendar from "assets/svg/calendar";
import List from "assets/svg/list-normal-school-icon";
import Map from "assets/svg/map-pin-icon";
import Phone from "assets/svg/phone-basic";
import PhoneIcon from "assets/svg/phone-icon";
import CallBottomSheet from "components/common/BottomSheet/CallBottomSheet";
import BackgroundButton from "components/common/Button/BackgroundButton";
import Modal from "components/common/ButtonModal";
import useGetTeacherInfo from "hooks/api/useGetTeacherInfo";
import { useOverlay } from "hooks/common/useOverlay";
import { useRecoilValue } from "recoil";
import { adminLoginInfoAtom } from "store/admin";

import * as S from "./styles";
// import CallSchoolBottomSheet from "../Admin/SchoolInfo/Modal/CallSchoolBottomSheet";
// import DisconnectModal from "../Admin/SchoolInfo/Modal/DisconnectModal";

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
      <CallBottomSheet
        isOpen={isOpen}
        close={close}
        phoneNumber=""
        handleCall={() => {
          console.log("dd");
        }}
      />
    ));

  const openDisconnectPopup = () =>
    overlay.open(({ isOpen, close }) => <Modal isOpen={isOpen} close={close} />);

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
    </>
  );
};

export default SchoolInfo;
