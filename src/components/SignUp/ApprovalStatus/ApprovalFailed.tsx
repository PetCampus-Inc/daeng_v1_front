import { PATH } from "constants/path";

import DogRejectedBgIcon from "assets/svg/dog-rejected-bg-icon";
import { Box, Flex, Text, Button } from "components/common";
import { useNavigate } from "react-router-dom";
import { UserType } from "types/common/approval.types";

import { StyledImgWrapper } from "./styles";

interface ApprovalFailedProps {
  type?: UserType;
  schoolName?: string;
}

export default function ApprovalFailed({ type, schoolName }: ApprovalFailedProps) {
  const navigate = useNavigate();

  const handleConfirm = () => {
    if (type === "admin") navigate(PATH.ADMIN_SIGNUP, { replace: true });
    if (type === "member") navigate(PATH.SIGNUP, { replace: true });
  };

  return (
    <>
      <Flex direction="column" gap={3}>
        <Text as="h2" typo="title1_24_B" color="darkBlack">
          <Text as="em" color="primaryColor" typo="inherit">
            {schoolName} 유치원 <br />
            가입 승인
          </Text>
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
        <Button onClick={handleConfirm} width="full">
          확인
        </Button>
      </Box>
    </>
  );
}
