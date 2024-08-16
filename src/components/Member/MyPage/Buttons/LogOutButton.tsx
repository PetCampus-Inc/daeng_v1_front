import { BottomButton } from "components/common/Button";
import { BottomButtonWrapper } from "components/Member/MyPage/styles";

const LogOutButton = () => {
  return (
    <BottomButtonWrapper>
      <BottomButton colorScheme="gray_4">로그아웃</BottomButton>
    </BottomButtonWrapper>
  );
};

export default LogOutButton;
