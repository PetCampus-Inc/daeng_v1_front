import { StyledImgWrapper } from "./styles";
import DogRejectedBgIcon from "../../../assets/svg/dog-rejected-bg-icon";
import { Box, Flex, Text } from "../../common";
import Button from "../button/Button";

const ApprovalFailed = () => {
  return (
    <>
      <Flex direction="column" gap={3}>
        <Text as="h2" typo="title1_24_B" color="darkBlack">
          <em color="primaryColor">
            뿅뿅애견 유치원 <br />
            가입 승인
          </em>
          이 실패했습니다
        </Text>
        <Text typo="body2_16_R" color="gray_3">
          확인 버튼을 누르면 유치원 검색 화면으로 이동합니다
        </Text>
      </Flex>

      <StyledImgWrapper>
        <DogRejectedBgIcon />
      </StyledImgWrapper>

      <Box position="absolute" left={16} right={16} bottom={24}>
        <Button>확인</Button>
      </Box>
    </>
  );
};

export default ApprovalFailed;
