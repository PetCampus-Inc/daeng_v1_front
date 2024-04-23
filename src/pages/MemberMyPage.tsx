import Header from "components/common/Header";
import NavBar from "components/common/NavBar";
import { PageContainer } from "components/Member/MyPage/Container/styles";
import MemberProfile from "components/Member/MyPage/MemberProfile";
import MyDogInfo from "components/Member/MyPage/MyDogInfo";
import { CardContainer, ContentContainer } from "components/Member/MyPage/styles";

const MemberMyPage = () => {
  return (
    <>
      <Header type="setting" text="마이페이지" transparent={true} />
      <PageContainer
        pt="7"
        imageUrl={
          "https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
      >
        <ContentContainer>
          <MemberProfile />
          <CardContainer>
            <MyDogInfo />
          </CardContainer>
        </ContentContainer>
      </PageContainer>
      <NavBar type="member" />
    </>
  );
};

export default MemberMyPage;
