import { routes } from "constants/path";
import { SCHOOL_NAME_KEY } from "constants/storage";

import DogApprovalBgIcon from "assets/svg/dog-approval-bg-icon";
import { Box, Button, Text } from "components/common";
import { useResetLocalStorage } from "hooks/common/useLocalStorage";
import { useNavigate } from "react-router-dom";
import { User } from "types/common/role.types";

import { StyledImgWrapper } from "./styles";

interface ApprovalSuccessProps {
  user: User;
  schoolName: string;
}

export default function ApprovalSuccess({ user, schoolName }: ApprovalSuccessProps) {
  const navigate = useNavigate();
  const removeSchoolName = useResetLocalStorage(SCHOOL_NAME_KEY);

  const handleConfirm = () => {
    removeSchoolName();
    if (user === User.ADMIN) navigate(routes.admin.attendance.root, { replace: true });
    else if (user === User.MEMBER) navigate(routes.root, { replace: true });
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
