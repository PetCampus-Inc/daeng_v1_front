import Header from "components/common/Header";
import { PageContainer } from "components/Member/MyPage/Container/styles";
import MyInfoEdite from "components/Member/MyPage/MyMemberInfoEdite";
import { ContentContainer } from "components/Member/MyPage/styles";

const MemberMyInfoEditePage = () => {
  return (
    <>
      <Header type="text" text="프로필 수정" transparent />
      <PageContainer pt="1" color="br_5">
        <MyInfoEdite />
        <ContentContainer px="1.5" py="1"></ContentContainer>
      </PageContainer>
    </>
  );
};

export default MemberMyInfoEditePage;
