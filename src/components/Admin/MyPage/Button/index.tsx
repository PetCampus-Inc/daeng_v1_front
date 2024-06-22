import { BackgroundButtonWrapper } from "components/Admin/MyPage/styles";
import { BackgroundButton } from "components/common/Button";

const LogOutButton = () => {
  const handleLogOut = () => {
    console.log("logout"); // TODO: 로그아웃 이벤트 추가
  };

  return (
    <>
      <BackgroundButtonWrapper>
        <BackgroundButton onClick={handleLogOut} className="logOut">
          로그아웃
        </BackgroundButton>
      </BackgroundButtonWrapper>
    </>
  );
};

export default LogOutButton;
