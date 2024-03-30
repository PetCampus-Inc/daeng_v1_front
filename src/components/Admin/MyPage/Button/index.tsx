import { BackgroundButtonWrapper } from "components/Admin/MyPage/styles";
import BackgroundGrayButton from "components/common/Button/BackgroundGrayButton";

const LogOutButton = () => {
  const handleLogOut = () => {
    console.log("logout"); // TODO: 로그아웃 이벤트 추가
  };

  return (
    <>
      <BackgroundButtonWrapper>
        <BackgroundGrayButton onClick={handleLogOut}>
          {" "}
          {/* 버튼 색상 변경 */}
          로그아웃
        </BackgroundGrayButton>
      </BackgroundButtonWrapper>
    </>
  );
};

export default LogOutButton;
