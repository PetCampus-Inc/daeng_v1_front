import { PATH } from "constants/path";

import RegisterSchoolIcon from "assets/svg/register-school-icon";
import { Box, Text } from "components/common";
import { useNavigate } from "react-router-dom";

import { StyledImgWrapper } from "./styles";
import Button from "../button/Button";

const RegisterSuccess = ({ schoolName }: { schoolName?: string }) => {
  const navigate = useNavigate();

  const handleConfirm = () => {
    // MEMO: 출석 페이지로 이동 (원장홈)
    navigate(PATH.ADMIN_ATTENDANCE);
  };

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
        <Button handleClick={handleConfirm}>시작</Button>
      </Box>
    </>
  );
};

export default RegisterSuccess;
