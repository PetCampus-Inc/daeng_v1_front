import Header from "components/common/Header";
import UnregisterInfo from "components/Unregister";
import { PageContainer } from "styles/StyleModule";

const UnregisterPage = () => {
  return (
    <>
      <Header type="back" />
      <PageContainer color="white">
        <UnregisterInfo />
      </PageContainer>
    </>
  );
};

export default UnregisterPage;