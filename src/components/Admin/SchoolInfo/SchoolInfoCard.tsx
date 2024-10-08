import Calendar from "assets/svg/calendar";
import Map from "assets/svg/map-pin-icon";
import Phone from "assets/svg/phone-basic";
import PhoneIcon from "assets/svg/phone-icon";
import { Box, Flex } from "components/common";
import { WideButton, XSmallButton } from "components/common/Button/Templates";
import { useSchoolResigned } from "hooks/api/admin/mypage";
import useGetTeacherInfo from "hooks/api/useGetTeacherInfo";
import { useOverlay } from "hooks/common/useOverlay";

import CallSchoolBottomSheet from "./Modal/CallSchoolBottomSheet";
import DisconnectModal from "./Modal/DisconnectModal";
import * as S from "./styles";

interface Props {
  isPrevSchool?: boolean;
}

const SchoolInfoCard = ({ isPrevSchool }: Props) => {
  const { data } = useGetTeacherInfo();
  const { mutateSchoolResigned } = useSchoolResigned();

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
      <DisconnectModal isOpen={isOpen} close={close} action={mutateSchoolResigned} />
    ));

  return (
    <>
      <S.CardContainer isPrevSchool={isPrevSchool}>
        <S.CardTitle isPrevSchool={isPrevSchool}>
          {data && data.schoolName ? `${data.schoolName} 유치원` : ""}
        </S.CardTitle>
        <S.InfoContainer>
          <S.InfoList>
            <Flex justify="space-between" width="100%">
              <Box display="flex" gap={4} align="center">
                <S.IconWrapper>
                  <Phone isGray={isPrevSchool} />
                </S.IconWrapper>
                <S.ListTitle isPrevSchool={isPrevSchool}>
                  {data && data.schoolNumber ? data.schoolNumber : ""}
                </S.ListTitle>
              </Box>
              {!isPrevSchool && (
                <XSmallButton
                  size="sm"
                  typo="caption1_12_B"
                  colorScheme="yellow_3"
                  onClick={openCallPopup}
                  leftAddon={<PhoneIcon />}
                >
                  전화 걸기
                </XSmallButton>
              )}
            </Flex>
          </S.InfoList>
          <S.InfoList>
            <S.IconWrapper>
              <Map isGray={isPrevSchool} />
            </S.IconWrapper>
            <S.ListTitle isPrevSchool={isPrevSchool}>
              {data && data.schoolAddress
                ? data.schoolAddress +
                  (data.schoolAddressDetail ? " " + data.schoolAddressDetail : "")
                : ""}
            </S.ListTitle>
          </S.InfoList>
          <S.InfoList>
            <S.IconWrapper>
              <Calendar w={24} h={24} colorScheme={isPrevSchool ? "gray" : "primary"} rx={14} />
            </S.IconWrapper>
            <S.ListTitle isPrevSchool={isPrevSchool}>
              {data.registeredDate
                ? data.registeredDate.map((num) => num.toString().padStart(2, "0"))?.join(".")
                : ""}{" "}
              등록
            </S.ListTitle>
          </S.InfoList>
          {!isPrevSchool && (
            <WideButton
              bgColor="gray_4"
              color="gray_3"
              typo="body2_16_B"
              onClick={openDisconnectPopup}
            >
              유치원 연결 끊기
            </WideButton>
          )}
        </S.InfoContainer>
      </S.CardContainer>
    </>
  );
};

export default SchoolInfoCard;
