import Calendar from "assets/svg/calendar";
import Map from "assets/svg/map-pin-icon";
import PhoneIcon from "assets/svg/phone";
import Phone from "assets/svg/phone-basic";
import CallSchoolBottomSheet from "components/Admin/MyPage/MyPageModal/CallSchoolBottomSheet";
import DisconnectModal from "components/Admin/MyPage/MyPageModal/DisconnectModal";
import BackgroundGrayButton from "components/common/Button/BackgroundGrayButton";
import useGetTeacherInfo from "hooks/api/useGetTeacherInfo";
import useBottomSheet from "hooks/common/useBottomSheet";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { adminLoginInfoAtom } from "store/admin";

import * as S from "./styles";

const SchoolInfo = () => {
  const { adminId } = useRecoilValue(adminLoginInfoAtom);
  const { data } = useGetTeacherInfo(adminId);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState<boolean>(false);

  const { isVisible: isBsOpen, open: bsOpen, close: bsClose } = useBottomSheet();

  const handleDisconnet = () => {
    console.log("Disconnected"); // TODO: 유치원 연결 끊기 추가
    setIsCancelModalOpen(true);
  };

  // FIXME: 실제 전화번호 앱 열리는 로직 추가 필요
  const handleGetCallInfo = async () => {
    bsOpen();
  };
  const schoolCallInfo = {
    schoolName: data?.schoolName,
    schoolNumber: data?.schoolNumber
  };

  return (
    <>
      <CallSchoolBottomSheet info={schoolCallInfo} isOpen={isBsOpen} close={bsClose} />
      <S.CardContainer>
        <S.CardTitle>{data && data.schoolName ? `${data.schoolName} 유치원` : ""}</S.CardTitle>
        <S.InfoContainer>
          <S.InfoList>
            <S.IconWrapper>
              <Phone />
            </S.IconWrapper>
            <S.ListTitle>{data && data.schoolNumber ? data.schoolNumber : ""}</S.ListTitle>
            <S.YellowThickButton onClick={handleGetCallInfo}>
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

        <BackgroundGrayButton
          backgroundColor={"white"}
          onClick={handleDisconnet}
          className="disconnect"
        >
          유치원 연결 끊기
        </BackgroundGrayButton>
      </S.CardContainer>

      <DisconnectModal
        isOpen={isCancelModalOpen}
        close={() => setIsCancelModalOpen(false)}
        action={() => {
          setIsCancelModalOpen(false);
        }}
      />
    </>
  );
};

export default SchoolInfo;
