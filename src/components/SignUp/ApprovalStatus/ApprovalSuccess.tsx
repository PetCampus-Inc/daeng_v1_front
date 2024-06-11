import { StyledImgWrapper } from "./styles";
import DogApprovalBgIcon from "../../../assets/svg/dog-approval-bg-icon";
import { Box, Text } from "../../common";
import Button from "../button/Button";

const ApprovalSuccess = () => {
  return (
    <>
      <Text as="h2" typo="title1_24_B" color="darkBlack">
        <em color="primaryColor">
          뿅뿅 애견 유치원 <br />
          가입 승인
        </em>
        이 완료되었습니다
      </Text>

      <StyledImgWrapper>
        <DogApprovalBgIcon />
      </StyledImgWrapper>

      <Box position="absolute" left={16} right={16} bottom={24}>
        <Button>시작</Button>
      </Box>
    </>
  );
};

export default ApprovalSuccess;
