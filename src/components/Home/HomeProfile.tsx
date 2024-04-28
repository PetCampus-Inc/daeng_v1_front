import AgendaIcon from "assets/svg/agenda-icon";
import ArrowRightIcon from "assets/svg/arrow-right-icon";
import FootIcon from "assets/svg/foot-icon";
import SpeakerIcon from "assets/svg/speaker-icon";
import { Flex, Text, Box } from "components/common";

import {
  AttendanceCard,
  FootButton,
  Img,
  ImgWrapper,
  StyledNote,
  ProfileWrapper,
  StyledBorder,
  StyledNoteContainer,
  StyledBox,
  StyledHeading
} from "./styles";

import type { IHome } from "types/member/home.types";

const HomeProfile = ({ data }: { data: IHome }) => {
  function getAttendanceClass(status?: string) {
    switch (status) {
      case "ATTENDED":
        return "active";
      case "NOT_ATTENDED":
        return "blur";
      default:
        return;
    }
  }

  return (
    <>
      <StyledHeading>
        <Flex align="center" gap="4">
          <ImgWrapper>
            <Img src="https://github.githubassets.com/assets/pair-extraordinaire-default-579438a20e01.png" />
          </ImgWrapper>
          <Text typo="title2_20_B" color="darkBlack">
            {data.dogName} {data.relation}님
          </Text>
        </Flex>
        <Text typo="body2_16_R" color="gray_2">
          아래에서 {data.dogName} 유치원 일지를 확인할 수 있어요
        </Text>
      </StyledHeading>

      <Flex gap="14">
        <StyledNote>
          <StyledBorder />
          <StyledNoteContainer>
            <Flex gap="8">
              <ProfileWrapper>
                <Img src="https://images.unsplash.com/photo-1591160690555-5debfba289f0?q=80&w=2864&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
              </ProfileWrapper>
              <Flex direction="column" grow="1">
                <Text typo="title2_20_B" color="darkBlack">
                  {data.dogName}
                </Text>
                <Text typo="label2_14_R" color="gray_1">
                  자세히 보기
                </Text>
              </Flex>
              <ArrowRightIcon w="24" colorScheme="gray_1" />
            </Flex>

            <AttendanceCard>
              <FootButton type="button" className={getAttendanceClass(data.attendanceStatus)}>
                <FootIcon w="25" h="21" />
              </FootButton>
              <Flex direction="column" align="flex-end">
                <Text typo="body2_16_B" color="gray_1">
                  1일 전 출석
                </Text>
                <Text typo="label2_14_R" color="gray_2">
                  {data?.attendanceDate?.replace(/-/g, ".")}
                </Text>
              </Flex>
            </AttendanceCard>
          </StyledNoteContainer>
        </StyledNote>

        <Flex direction="column" gap="14">
          <StyledBox>
            <Flex display="inline-flex" direction="column" gap="14">
              <AgendaIcon bg />
              <Text typo="body2_16_R" color="gray_1">
                <Text typo="body2_16_B" color="gray_1">
                  알림장
                </Text>
                을
                <br />
                작성중이에요
              </Text>
            </Flex>
          </StyledBox>

          <StyledBox className="collapse">
            <Flex justify="space-between" align="center">
              <Flex gap="8" align="center">
                <SpeakerIcon bg />
                <Text typo="body2_16_B" color="gray_1">
                  공지
                </Text>
              </Flex>
              <ArrowRightIcon w="24" colorScheme="gray_2" />
            </Flex>
          </StyledBox>
        </Flex>
      </Flex>
    </>
  );
};

export default HomeProfile;
