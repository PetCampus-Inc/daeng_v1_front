import { Layout } from "components/common";
import Header from "components/common/Header";
import UnregisterInfo from "components/Unregister";

const UnregisterPage = () => {
  return (
    <>
      <Header type="back" />
      <Layout bgColor="white" px={16}>
        <UnregisterInfo />
      </Layout>
    </>
  );
};

export default UnregisterPage;
