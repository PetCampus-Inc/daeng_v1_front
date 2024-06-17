import Header from "components/common/Header";

interface AlertSettingProps {
  setStep: (step: number) => void;
}

const AlertSetting = ({ setStep }: AlertSettingProps) => {
  return (
    <>
      <Header type="text" text="설정" handleClick={() => setStep(0)} />
    </>
  );
};

export default AlertSetting;
