import { StyledImgWrapper } from "./styles";
import DogWaitingBgIcon from "../../../assets/svg/dog-waiting-bg-icon";
import { Box, Flex, Text } from "../../common";
import Button from "../button/Button";
import DirectionButton from "../button/DirectionButton";

const ApprovalPending = () => {
  return (
    <>
      <Flex direction="column" gap={3}>
        <Text as="h2" typo="title1_24_B" color="darkBlack">
          <em color="primaryColor">
            뿅뿅 애견 유치원 유치원 <br />
            가입 승인 신청{" "}
          </em>
          이 완료되었습니다
        </Text>
        <Text typo="body2_16_R" color="gray_3">
          승인 완료시 알림으로 알려드릴게요
        </Text>
      </Flex>

      <StyledImgWrapper>
        <DogWaitingBgIcon />
      </StyledImgWrapper>

      <Box position="absolute" left={16} right={16} bottom={24}>
        <Flex direction="column" justify="center" align="center" gap={24}>
          <DirectionButton type="submit">승인 신청 취소</DirectionButton>
          <Button>확인</Button>
        </Flex>
      </Box>
    </>
  );
};

export default ApprovalPending;
