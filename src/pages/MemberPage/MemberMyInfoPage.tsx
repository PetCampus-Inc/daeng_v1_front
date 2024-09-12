import { routes } from "constants/path";

import Header from "components/common/Header";
import MyInfo from "components/Member/MyPage/MyMemberinfo";
import { FootIconItem } from "components/Member/MyPage/MyMemberinfo/styles";
import { useNavigate } from "react-router-dom";
import { PageContainer } from "styles/StyleModule";

const MemberMyInfoPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <Header
        type="edit"
        text="내프로필"
        actionFn={() => navigate(routes.member.mypage.profile.edit.root)}
        transparent
      />
      <PageContainer pt="1" color="br_5">
        <MyInfo />
        <FootIconItem className="br4-foot" />
        <FootIconItem className="y2-foot" />
      </PageContainer>
    </>
  );
};

export default MemberMyInfoPage;
