import { routes } from "constants/path";

import DogWaitingBgIcon from "assets/svg/dog-waiting-bg-icon";
import { Box, Flex, Text, Button } from "components/common";
import { MoreButton } from "components/common/Button/Templates";
import { BasicModal } from "components/common/Modal";
import { useTeacherSignUpCancel } from "hooks/api/signup";
import { useOverlay } from "hooks/common/useOverlay";
import { useNavigate } from "react-router-dom";
import { User } from "types/common/role.types";

import { StyledImgWrapper } from "./styles";

interface ApprovalSuccessProps {
  user: User;
  schoolName: string;
}

export default function ApprovalPending({ user, schoolName }: ApprovalSuccessProps) {
  const navigate = useNavigate();
  const overlay = useOverlay();

  const { mutateTeacherSignUpCancel } = useTeacherSignUpCancel();

  const handleConfirm = () => navigate(routes.admin.login.root);
  const handleCancel = () => {
    if (user === User.ADMIN)
      mutateTeacherSignUpCancel(undefined, {
        onSuccess: () => navigate(routes.admin.login.root)
      });
    // else if (type === User.MEMBER) mutateMemberSignUpCancel(userId, { onSuccess: () => navigate() });
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
          <Text as="em" typo="inherit" color="primaryColor">
            {schoolName} 유치원 <br />
            {user === User.MEMBER ? "가입 " : ""}승인 신청
          </Text>
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
          <MoreButton
            type="submit"
            onClick={openCancelPopup}
            typo="label2_14_M"
            color="gray_2"
            iconSize={24}
          >
            승인 신청 취소
          </MoreButton>
          <Button onClick={handleConfirm} width="full">
            확인
          </Button>
        </Flex>
      </Box>
    </>
  );
}
