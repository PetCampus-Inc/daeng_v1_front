import Header from "components/common/Header";

interface PolicySettingProps {
  setStep: (step: number) => void;
}

const PolicySetting = ({ setStep }: PolicySettingProps) => {
  return (
    <>
      <Header type="text" text="정책" handleClick={() => setStep(0)} />
    </>
  );
};

export default PolicySetting;
