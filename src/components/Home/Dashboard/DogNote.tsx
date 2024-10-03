import { routes } from "constants/path";

import ArrowRightIcon from "assets/svg/arrow-right-icon";
import FootIcon from "assets/svg/foot-icon";
import { Box, Flex, Text } from "components/common";
import { useNavigate } from "react-router-dom";
import { AttendanceStatus } from "types/common/status.types";
import { getDaysAgo } from "utils/date";

import { CardContainer, FootButton, Img, NoteContainer, NoteContent, SpringBound } from "./styles";

import type { HomeDataType } from "types/member/main.types";

interface DogNoteProps {
  data: HomeDataType;
}

const getAttendanceClass = (status?: AttendanceStatus) => {
  switch (status) {
    case "ATTENDED":
      return "active";
    case "NOT_ATTENDED":
      return "blur";
    default:
      return undefined;
  }
};

const getAttendanceText = (status?: AttendanceStatus, attendanceDate?: number[]) => {
  switch (status) {
    case "ATTENDED":
      return "출석완료";
    case "NOT_ATTENDED":
      if (!attendanceDate) {
        return "등원기록 없음";
      }
      return `${getDaysAgo(attendanceDate)} 출석`;
    default:
      return "등원기록 없음";
  }
};

const DogNote = ({ data }: DogNoteProps) => {
  const navigate = useNavigate();
  const { dogId, dogName, attendanceDate, attendanceStatus } = data;

  const attendanceClass = getAttendanceClass(attendanceStatus);
  const attendanceText = getAttendanceText(attendanceStatus, attendanceDate);

  return (
    <NoteContainer className="grid-left">
      <SpringBound />
      <NoteContent>
        <Flex gap="8" role="button" onClick={() => navigate(routes.member.dogInfo.dynamic(dogId))}>
          <Box
            display="inline-block"
            width="44px"
            height="44px"
            radius="16px"
            bgColor="gray_4"
            overflow="hidden"
          >
            <Img
              src={process.env.REACT_APP_CLIENT_BASE_URL + "images/placeholder-image.png"}
              alt={`${data?.dogName}의 프로필`}
            />
          </Box>
          <Flex direction="column" grow="1">
            <Text typo="title2_20_B" color="darkBlack">
              {dogName}
            </Text>
            <Text typo="label2_14_R" color="gray_1">
              자세히 보기
            </Text>
          </Flex>
          <ArrowRightIcon w="24" colorScheme="gray_1" />
        </Flex>
        <CardContainer>
          <FootButton type="button" className={attendanceClass}>
            <FootIcon w="25" h="21" />
          </FootButton>
          <Flex direction="column" align="flex-end">
            <Text typo="body2_16_B" color={attendanceStatus ? "gray_1" : "gray_3"}>
              {attendanceText}
            </Text>
            {attendanceStatus && attendanceDate && (
              <Text typo="label2_14_R" color="gray_2">
                {attendanceDate.join(".")}
              </Text>
            )}
          </Flex>
        </CardContainer>
      </NoteContent>
    </NoteContainer>
  );
};

export default DogNote;
