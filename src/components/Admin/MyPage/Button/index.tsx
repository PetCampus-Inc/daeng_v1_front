import { BottomButtonWrapper } from "components/Admin/MyPage/styles";
import { BottomButton } from "components/common/Button";
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
    <>
      <BottomButtonWrapper>
        <BottomButton wrapColor="transparent" colorScheme="gray_4" onClick={openPopup}>
          로그아웃
        </BottomButton>
      </BottomButtonWrapper>
    </>
  );
};

export default LogOutButton;
