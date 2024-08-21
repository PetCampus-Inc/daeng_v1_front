import { PATH } from "constants/path";

import RegisterSchoolIcon from "assets/svg/register-school-icon";
import { Box, Text, Button } from "components/common";
import { useNavigate } from "react-router-dom";

import { StyledImgWrapper } from "./styles";

export default function RegisterSuccess({ schoolName }: { schoolName?: string }) {
  const navigate = useNavigate();

  const handleConfirm = () => navigate(PATH.ADMIN_ATTENDANCE, { replace: true });

  return (
    <>
      <Text as="h2" typo="title1_24_B" color="darkBlack">
        <Text as="em" typo="inherit" color="primaryColor">
          {schoolName} 유치원 <br />
          등록
        </Text>
        이 완료되었습니다
      </Text>

      <StyledImgWrapper>
        <RegisterSchoolIcon />
      </StyledImgWrapper>

      <Box position="absolute" left={16} right={16} bottom={24}>
        <Button onClick={handleConfirm} width="full">
          시작
        </Button>
      </Box>
    </>
  );
}
