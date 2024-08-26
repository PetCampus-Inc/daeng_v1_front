import { PATH } from "constants/path";

import Header from "components/common/Header";
import { NavBar } from "components/common/NavBar";
import LogOutButton from "components/Member/MyPage/Buttons/LogOutButton";
import { PageContainer } from "components/Member/MyPage/Container/styles";
import MemberProfile from "components/Member/MyPage/MemberProfile";
import MyDogInfo from "components/Member/MyPage/MyDogInfo";
import { CardContainer, ContentContainer } from "components/Member/MyPage/styles";
import { useGetMemberInfo } from "hooks/api/member/member";
import { useLocalStorageValue } from "hooks/common/useLocalStorage";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AUTH_MEMBER_ID } from "store/auth";

const MemberMyPage = () => {
  const navigate = useNavigate();
  const memberId = useLocalStorageValue<string>(AUTH_MEMBER_ID) ?? null;
  const { data } = useGetMemberInfo(String(memberId));

  useEffect(() => {
    // FIXME memberId가 없을 경우 예외처리 필요 (임시로 추가)
    if (!memberId) {
      navigate(PATH.LOGIN);
    }
  }, []);

  return (
    <>
      <Header type="setting" text="마이페이지" transparent />
      <PageContainer
        pt="4"
        imageUrl={
          "https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
      >
        <ContentContainer>
          <MemberProfile data={data} memberId={String(memberId)} />
          <CardContainer>
            <MyDogInfo data={data} />
          </CardContainer>
        </ContentContainer>
      </PageContainer>
      <LogOutButton />
      <NavBar />
    </>
  );
};

export default MemberMyPage;
