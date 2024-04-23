import Header from "components/common/Header";
import { PageContainer } from "styles/StyleModule";

const MemberMyInfoPage = () => {
  return (
    <>
      <Header type="text" text="내프로필" transparent={true} />
      <PageContainer pt="7"></PageContainer>
    </>
  );
};

export default MemberMyInfoPage;
