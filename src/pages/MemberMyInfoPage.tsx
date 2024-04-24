import Header from "components/common/Header";
import MyInfo from "components/Member/MyPage/MyInfo";
import { PageContainer } from "styles/StyleModule";

const MemberMyInfoPage = () => {
  return (
    <>
      <Header type="text" text="내프로필" transparent={true} />
      <PageContainer pt="7" color="br_5">
        <MyInfo />
      </PageContainer>
    </>
  );
};

export default MemberMyInfoPage;
