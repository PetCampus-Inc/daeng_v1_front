import ArrowRightIcon from "assets/svg/arrow-right-icon";
import FootIcon from "assets/svg/foot-icon";
import { Flex, Text } from "components/common";

import {
  CardContainer,
  FootButton,
  Img,
  NoteContainer,
  NoteContent,
  ProfileWrapper,
  SpringBound
} from "./styles";

import type { IHome } from "types/member/home.types";

interface DogNoteProps {
  data: Pick<IHome, "dogName" | "attendanceDate" | "attendanceStatus">;
}

const DogNote = ({ data }: DogNoteProps) => {
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
    <NoteContainer className="grid-left">
      <SpringBound />

      <NoteContent>
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

        <CardContainer>
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
        </CardContainer>
      </NoteContent>
    </NoteContainer>
  );
};

export default DogNote;
