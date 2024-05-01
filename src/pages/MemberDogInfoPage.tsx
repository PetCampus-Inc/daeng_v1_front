import Header from "components/common/Header";
import { PageContainer } from "styles/StyleModule";

const MemberDogInfoPage = () => {
  return (
    <>
      <Header type="text" text="뽀뽀의 상세정보" shadow={true} />
      <PageContainer color="gray_5"></PageContainer>
    </>
  );
};

export default MemberDogInfoPage;
