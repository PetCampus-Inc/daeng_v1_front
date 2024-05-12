import { PATH } from "constants/path";

import Header from "components/common/Header";
import MyInfo from "components/Member/MyPage/MyMemberinfo";
import { FootIconItem } from "components/Member/MyPage/MyMemberinfo/styles";
import { useNavigate, useParams } from "react-router-dom";
import { PageContainer } from "styles/StyleModule";

const MemberMyInfoPage = () => {
  const navigate = useNavigate();
  const { memberId } = useParams();
  return (
    <>
      <Header
        type="edite"
        text="내프로필"
        actionFn={() => navigate(PATH.MEMBER_MY_INFO_EDITE_PAGE(memberId))}
        transparent
      />
      <PageContainer pt="1" color="br_5">
        <MyInfo memberId={String(memberId)} />
        <FootIconItem className="br4-foot" />
        <FootIconItem className="y2-foot" />
      </PageContainer>
    </>
  );
};

export default MemberMyInfoPage;
