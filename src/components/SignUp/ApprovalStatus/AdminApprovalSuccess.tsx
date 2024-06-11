import React from "react";
import { useNavigate } from "react-router-dom";

import { StyledImgWrapper } from "./styles";
import DogApprovalBgIcon from "../../../assets/svg/dog-approval-bg-icon";
import { PATH } from "../../../constants/path";
import { Box, Text } from "../../common";
import Button from "../button/Button";

interface ApprovalSuccessProps {
  schoolName?: string;
}

const AdminApprovalSuccess = ({ schoolName }: ApprovalSuccessProps) => {
  const navigate = useNavigate();

  const handleConfirm = () => {
    // MEMO: 출석 페이지로 이동 (교사홈)
    navigate(PATH.ADMIN_ATTENDANCE);
  };
  return (
    <>
      <Text as="h2" typo="title1_24_B" color="darkBlack">
        <em color="primaryColor">
          {schoolName} 유치원 <br />
          승인
        </em>
        이 완료되었습니다
      </Text>

      <StyledImgWrapper>
        <DogApprovalBgIcon />
      </StyledImgWrapper>

      <Box position="absolute" left={16} right={16} bottom={24}>
        <Button handleClick={handleConfirm}>시작</Button>
      </Box>
    </>
  );
};

export default AdminApprovalSuccess;
