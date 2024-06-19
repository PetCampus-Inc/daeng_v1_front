import { Layout, Text } from "components/common";
import Header from "components/common/Header";

interface PolicySettingProps {
  setStep: (step: number) => void;
}

const PolicySetting = ({ setStep }: PolicySettingProps) => {
  return (
    <>
      <Header type="text" text="정책" handleClick={() => setStep(0)} />
      <Layout type="page" pt="6vh">
        <Text></Text>
      </Layout>
    </>
  );
};

export default PolicySetting;
