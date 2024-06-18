import { PATH } from "constants/path";

import DogWaitingBgIcon from "assets/svg/dog-waiting-bg-icon";
import { Box, Flex, Text } from "components/common";
import { BasicModal } from "components/common/Modal";
import { useTeacherSinUpCancel } from "hooks/api/signup";
import { useOverlay } from "hooks/common/useOverlay";
import { useNavigate } from "react-router-dom";

import { StyledImgWrapper } from "./styles";
import Button from "../button/Button";
import DirectionButton from "../button/DirectionButton";

interface ApprovalSuccessProps {
  schoolName?: string;
  adminId?: number;
  onNextStep?: () => void;
}

const ApprovalPending = ({ schoolName, adminId, onNextStep }: ApprovalSuccessProps) => {
  const { mutateTeacherSignUpCancel } = useTeacherSinUpCancel();
  const navigate = useNavigate();
  const overlay = useOverlay();

  const handleConfirm = () => {
    // MEMO: 소셜 로그인 페이지로 이동)
    navigate(PATH.ADMIN_LOGIN);
  };

  const handleCancel = () => {
    if (!adminId) throw new Error("AdminId is required");
    mutateTeacherSignUpCancel(adminId, {
      onSuccess: () => {
        // MEMO: 역할 선택 페이지로 이동
        // TODO: 폼 초기화하기
        console.log("승인 신청이 취소되었습니다");
        onNextStep?.();
      }
    });
  };

  const openCancelPopup = () =>
    overlay.open(({ isOpen, close }) => (
      <BasicModal
        isOpen={isOpen}
        close={close}
        title="승인 신청을 취소하고 싶으신가요?"
        subtitle="다른 유치원을 검색 후 승인 재신청을 해주세요"
        actionText="승인취소"
        actionFn={handleCancel}
        closeText="닫기"
      />
    ));

  return (
    <>
      <Flex direction="column" gap={3}>
        <Text as="h2" typo="title1_24_B" color="darkBlack">
          <em color="primaryColor">
            {schoolName} 유치원 <br />
            승인 신청{" "}
          </em>
          이 완료되었습니다
        </Text>
        <Text typo="body2_16_R" color="gray_3">
          승인 완료시 알림으로 알려드릴게요
        </Text>
      </Flex>

      <StyledImgWrapper>
        <DogWaitingBgIcon />
      </StyledImgWrapper>

      <Box position="absolute" left={16} right={16} bottom={24}>
        <Flex direction="column" justify="center" align="center" gap={24}>
          <DirectionButton type="submit" handleClick={openCancelPopup}>
            승인 신청 취소
          </DirectionButton>
          <Button handleClick={handleConfirm}>확인</Button>
        </Flex>
      </Box>
    </>
  );
};

export default ApprovalPending;
