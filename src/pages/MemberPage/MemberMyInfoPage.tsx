import { routes } from "constants/path";

import { Layout } from "components/common";
import Header from "components/common/Header";
import MyInfo from "components/Member/MyPage/MyMemberinfo";
import { FootIconItem } from "components/Member/MyPage/MyMemberinfo/styles";
import { useNavigate } from "react-router-dom";

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
      <Layout pt="calc(5vh + 1rem)" pb="calc(5vh + 1rem)" px="1rem" bg="br_5">
        <MyInfo />
        <FootIconItem className="br4-foot" />
        <FootIconItem className="y2-foot" />
      </Layout>
    </>
  );
};

export default MemberMyInfoPage;
