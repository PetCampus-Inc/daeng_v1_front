import LogoutModal from "components/Admin/MyPage/modal/LogoutModal";
import { BottomButton } from "components/common/Button";
import { BottomButtonWrapper } from "components/Member/MyPage/styles";
import useLogout from "hooks/common/useLogout";
import { useOverlay } from "hooks/common/useOverlay";

const LogOutButton = () => {
  const overlay = useOverlay();
  const logout = useLogout();

  const openPopup = () =>
    overlay.open(({ isOpen, close }) => (
      <LogoutModal isOpen={isOpen} close={close} action={logout} />
    ));

  return (
    <BottomButtonWrapper>
      <BottomButton colorScheme="gray_4" onClick={openPopup}>
        로그아웃
      </BottomButton>
    </BottomButtonWrapper>
  );
};

export default LogOutButton;
