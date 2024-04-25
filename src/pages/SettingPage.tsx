import Header from "components/common/Header";
import SettingInfo from "components/Setting";
import { PageContainer } from "styles/StyleModule";

const SettingPage = () => {
  return (
    <>
      <Header type="text" text="설정" />
      <PageContainer color="white">
        <SettingInfo />
      </PageContainer>
    </>
  );
};

export default SettingPage;