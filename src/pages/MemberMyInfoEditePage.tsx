import Header from "components/common/Header";
import MyInfoEdite from "components/Member/MyPage/MyMemberInfoEdite";
import { PageContainer } from "styles/StyleModule";

const MemberMyInfoEditePage = () => {
  return (
    <>
      <Header type="text" text="프로필 수정" transparent />
      <PageContainer pt="1" color="br_5">
        <MyInfoEdite />
      </PageContainer>
    </>
  );
};

export default MemberMyInfoEditePage;
