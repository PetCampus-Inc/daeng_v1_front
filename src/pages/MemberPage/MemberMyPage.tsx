import { routes } from "constants/path";

import placeholderImg from "assets/images/placeholder-dog.png";
import Header from "components/common/Header";
import { NavBar } from "components/common/NavBar";
import LogOutButton from "components/Member/MyPage/Buttons/LogOutButton";
import { LayoutContainer, PageContainer } from "components/Member/MyPage/Container/styles";
import MemberProfile from "components/Member/MyPage/MemberProfile";
import MyDogInfo from "components/Member/MyPage/MyDogInfo";
import { CardContainer, ContentContainer } from "components/Member/MyPage/styles";
import { useGetMemberInfo } from "hooks/api/member/member";
import { useNavigate } from "react-router-dom";

const MemberMyPage = () => {
  const navigate = useNavigate();
  const { data } = useGetMemberInfo();

  return (
    <>
      <LayoutContainer type="main">
        <PageContainer pt="1" imageUrl={data.memberProfileUri ?? placeholderImg}>
          <Header
            type="setting"
            text="마이페이지"
            position="absolute"
            handleClick={() => navigate(routes.member.mypage.setting.root)}
            transparent
          />
          <ContentContainer>
            <MemberProfile data={data} />
            <CardContainer>
              <MyDogInfo data={data} />
            </CardContainer>
          </ContentContainer>
        </PageContainer>
        <LogOutButton />
        <NavBar />
      </LayoutContainer>
    </>
  );
};

export default MemberMyPage;
