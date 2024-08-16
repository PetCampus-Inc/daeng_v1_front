import { PATH } from "constants/path";

import { BottomButtonWrapper } from "components/Admin/MyPage/styles";
import { BottomButton } from "components/common/Button";
import { useOverlay } from "hooks/common/useOverlay";
import { useNavigate } from "react-router-dom";
import { AUTH_KEY } from "store/auth";

import LogoutModal from "../modal/LogoutModal";

const LogOutButton = () => {
  const navigate = useNavigate();
  const overlay = useOverlay();

  const openPopup = () =>
    overlay.open(({ isOpen, close }) => (
      <LogoutModal
        isOpen={isOpen}
        close={close}
        action={() => {
          window.localStorage.removeItem(AUTH_KEY);
          navigate(PATH.LOGIN);
        }}
      />
    ));

  return (
    <>
      <BottomButtonWrapper>
        <BottomButton colorScheme="gray_4" onClick={openPopup}>
          로그아웃
        </BottomButton>
      </BottomButtonWrapper>
    </>
  );
};

export default LogOutButton;
