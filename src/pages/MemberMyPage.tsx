import NavBar from "components/common/NavBar";

import { PageContainer } from "../components/Member/MyPage/Container/styles";

const MemberMyPage = () => {
  return (
    <>
      <NavBar />
      <PageContainer
        pt="7"
        imageUrl={
          "https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
      ></PageContainer>
    </>
  );
};

export default MemberMyPage;
