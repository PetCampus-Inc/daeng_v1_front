import { Layout, Text } from "components/common";
import Header from "components/common/Header";

interface PolicySettingProps {
  setStep: (step: number) => void;
}

const PolicySetting = ({ setStep }: PolicySettingProps) => {
  return (
    <>
      <Header type="text" text="정책" handleClick={() => setStep(0)} />
      <Layout type="detail" paddingTop="1.5rem" paddingX="1rem">
        <Text typo="label2_14_R" color="gray_1">
          App Store의 기본 원칙은 간단합니다. 사용자에게는 안전하게 앱을 이용할 수 있는 경험,
          개발자에게는 뛰어난 앱을 개발할 수 있는 훌륭한 기회를 제공하는 것입니다. 이를 위해
          Apple에서는 모든 콘텐츠를 세심하게 엄선한 App Store를 제공합니다. App Store의 모든 앱은
          전문가들이 심사하고 에디터 팀은 사용자가 매일 새로운 앱을 발견하도록 콘텐츠를 작성합니다.
          그 외 모든 것은 언제든 인터넷을 사용하면 됩니다. App Store 모델 및 지침이 여러분의 앱 또는
          비즈니스 아이디어에 적합하지 않다면, 뛰어난 웹 환경을 제공하는 Safari를 통해서도 여러분의
          서비스를 제공할 수 있습니다. 랫폼을 구축하기 위해 최선을 다하고 있습니다.
          <br />
          <br />
          App Store의 기본 원칙은 간단합니다. 사용자에게는 안전하게 앱을 이용할 수 있는 경험,
          개발자에게는 뛰어난 앱을 개발할 수 있는 훌륭한 기회를 제공하는 것입니다. 이를 위해
          Apple에서는 모든 콘텐츠를 세심하게 엄선한 App Store를 제공합니다. App Store의 모든 앱은
          전문가들이 심사하고 에디터 팀은 사용자가 매일 새로운 앱을 발견하도록 콘텐츠를 작성합니다.
          그 외 모든 것은 언제든 인터넷을 사용하면 됩니다. App Store 모델 및 지침이 여러분의 앱 또는
          비즈니스 아이디어에 적합하지 않다면, 뛰어난 웹 환경을 제공하는 Safari를 통해서도 여러분의
          서비스를 제공할 수 있습니다. 랫폼을 구축하기 위해 최선을 다하고 있습니다.App Store의 기본
          원칙은 간단합니다. 사용자에게는 안전하게 앱을 이용할 수 있는 경험, 개발자에게는 뛰어난
          앱을 개발할 수 있는 훌륭한 기회를 제공하는 것입니다. 이를 위해 Apple에서는 모든 콘텐츠를
          세심하게 엄선한 App Store를 제공합니다. App Store의 모든 앱은 전문가들이 심사하고 에디터
          팀은 사용자가 매일 새로운 앱을 발견하도록 콘텐츠를 작성합니다. 그 외 모든 것은 언제든
          인터넷을 사용하면 됩니다. App Store 모델 및 지침이 여러분의 앱 또는 비즈니스 아이디어에
          적합하지 않다면, 뛰어난 웹 환경을 제공하는 Safari를 통해서도 여러분의 서비스를 제공할 수
          있습니다. 랫폼을 구축하기 위해 최선을 다하고 있습니다.
        </Text>
      </Layout>
    </>
  );
};

export default PolicySetting;
