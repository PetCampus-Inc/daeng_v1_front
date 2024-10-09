import { Button } from "components/common/Button";
import useLogout from "hooks/common/useLogout";
import { useOverlay } from "hooks/common/useOverlay";

import LogoutModal from "../modal/LogoutModal";

const LogOutButton = () => {
  const overlay = useOverlay();
  const logout = useLogout();

  const openPopup = () =>
    overlay.open(({ isOpen, close }) => (
      <LogoutModal isOpen={isOpen} close={close} action={logout} />
    ));

  return (
    <Button width="full" colorScheme="gray_4" onClick={openPopup} mt={32}>
      로그아웃
    </Button>
  );
};

export default LogOutButton;
