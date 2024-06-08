import { PATH } from "constants/path";

import { BackgroundButtonWrapper } from "components/Admin/MyPage/styles";
import BackgroundButton from "components/common/Button/BackgroundButton";
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
      <BackgroundButtonWrapper>
        <BackgroundButton onClick={openPopup} className="logOut">
          로그아웃
        </BackgroundButton>
      </BackgroundButtonWrapper>
    </>
  );
};

export default LogOutButton;
