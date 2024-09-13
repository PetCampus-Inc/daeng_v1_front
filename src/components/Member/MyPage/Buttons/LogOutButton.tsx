import LogoutModal from "components/Admin/MyPage/modal/LogoutModal";
import { BottomButton } from "components/common/Button";
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
    <BottomButton colorScheme="gray_4" position="relative" wrapPb={28} onClick={openPopup}>
      로그아웃
    </BottomButton>
  );
};

export default LogOutButton;
