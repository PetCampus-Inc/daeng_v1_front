import Header from "components/common/Header";
import MyInfo from "components/Member/MyPage/MyMemberinfo";
import { PageContainer } from "styles/StyleModule";

const MemberMyInfoPage = () => {
  return (
    <>
      <Header type="modify" text="내프로필" transparent={true} />
      <PageContainer pt="1" color="br_5">
        <MyInfo />
      </PageContainer>
    </>
  );
};

export default MemberMyInfoPage;
