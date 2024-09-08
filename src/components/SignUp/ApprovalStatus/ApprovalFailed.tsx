import { PATH } from "constants/path";
import { SCHOOL_NAME_KEY } from "constants/storage";

import DogRejectedBgIcon from "assets/svg/dog-rejected-bg-icon";
import { Box, Flex, Text, Button } from "components/common";
import { useResetLocalStorage } from "hooks/common/useLocalStorage";
import { useNavigate } from "react-router-dom";
import { User } from "types/common/role.types";

import { StyledImgWrapper } from "./styles";

interface ApprovalFailedProps {
  user: User;
  schoolName: string;
}

export default function ApprovalFailed({ user, schoolName }: ApprovalFailedProps) {
  const navigate = useNavigate();
  const removeSchoolName = useResetLocalStorage(SCHOOL_NAME_KEY);

  const handleConfirm = () => {
    removeSchoolName();
    if (user === User.ADMIN) navigate(PATH.ADMIN_SIGNUP, { replace: true });
    if (user === User.MEMBER) navigate(PATH.SIGNUP, { replace: true });
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
