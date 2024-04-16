import Header from "components/common/Header";
import PolicyInfo from "components/Setting/Policy";
import { PageContainer } from "styles/StyleModule";

const PolicyPage = () => {
  return (
    <>
      <Header type="text" text="정책" />
      <PageContainer color="white"><PolicyInfo /></PageContainer>
    </>
  );
};

export default PolicyPage;
