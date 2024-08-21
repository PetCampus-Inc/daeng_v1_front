import { PATH } from "constants/path";

import DogApprovalBgIcon from "assets/svg/dog-approval-bg-icon";
import { Box, Button, Text } from "components/common";
import { useNavigate } from "react-router-dom";
import { UserType } from "types/common/approval.types";

import { StyledImgWrapper } from "./styles";

interface ApprovalSuccessProps {
  type?: UserType;
  schoolName?: string;
}

export default function ApprovalSuccess({ type, schoolName }: ApprovalSuccessProps) {
  const navigate = useNavigate();

  const handleConfirm = () => {
    if (type === "admin") navigate(PATH.ADMIN_ATTENDANCE, { replace: true });
    else if (type === "member") navigate(PATH.ROOT, { replace: true });
  };

  return (
    <>
      <Text as="h2" typo="title1_24_B" color="darkBlack">
        <Text as="em" typo="inherit" color="primaryColor">
          {schoolName} 유치원 <br />
          승인
        </Text>
        이 완료되었습니다
      </Text>

      <StyledImgWrapper>
        <DogApprovalBgIcon />
      </StyledImgWrapper>

      <Box position="absolute" left={16} right={16} bottom={24}>
        <Button onClick={handleConfirm} width="full">
          시작
        </Button>
      </Box>
    </>
  );
}
