import { BackgroundButton } from "components/common/Button";
import { BackgroundButtonWrapper } from "components/Member/MyPage/styles";

const LogOutButton = () => {
  return (
    <BackgroundButtonWrapper>
      <BackgroundButton backgroundColor="white" buttonBackgroundColor="gray_4">
        로그아웃
      </BackgroundButton>
    </BackgroundButtonWrapper>
  );
};

export default LogOutButton;
