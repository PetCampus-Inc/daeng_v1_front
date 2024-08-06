import { Layout } from "components/common";
import Header from "components/common/Header";
import PolicyInfo from "components/Setting/Policy";

const PolicyPage = () => {
  return (
    <>
      <Header type="text" text="정책" />
      <Layout bgColor="white" px={16}>
        <PolicyInfo />
      </Layout>
    </>
  );
};

export default PolicyPage;
