import Button from "components/SignUp/button/Button";
import { useNavigate } from "react-router-dom";

import { StyledImgWrapper } from "./styles";
import DogApprovalBgIcon from "../../../assets/svg/dog-approval-bg-icon";
import { PATH } from "../../../constants/path";
import { Box, Text } from "../../common";

interface ApprovalSuccessProps {
  schoolName?: string;
}

// TODO memberId params로 받아오도록 추후 수정 필요
const MemberApprovalSuccess = ({ schoolName }: ApprovalSuccessProps) => {
  const navigate = useNavigate();
  const memberId = 11;
  const handleConfirm = () => {
    // MEMO: 프로필 설정 페이지로 이동
    // navigate(PATH.MEMEBER_PROFILE_EDITE_PAGE(String(memberId)));
    navigate(PATH.MEMEBER_PROFILE_EDITE_PAGE);
  };
  return (
    <>
      <Text as="h2" typo="title1_24_B" color="darkBlack">
        <em color="primaryColor">
          {schoolName} 유치원 <br />
          가입 승인
        </em>
        이 완료되었습니다
      </Text>

      <StyledImgWrapper>
        <DogApprovalBgIcon />
      </StyledImgWrapper>

      <Box position="absolute" left={16} right={16} bottom={24}>
        <Button handleClick={handleConfirm}>시작하기</Button>
      </Box>
    </>
  );
};

export default MemberApprovalSuccess;
