import { Box, Text, Layout } from "components/common";
import Header from "components/common/Header";
import AccountInfo from "components/SignUp/form/AccountInfo";
import NextButton from "components/SignUp/form/NextButton";
interface IStepProps {
  onNextStep: () => void;
}

const AccountSettingPage = ({ onNextStep }: IStepProps) => {
  return (
    <>
      <Header type="back" />
      <Layout type="page" pt={76} pb={24}>
        <Text typo="title1_24_B" color="darkBlack">
          회원가입을 완료해주세요
        </Text>
        <Box mt={56}>
          <AccountInfo />
        </Box>
        <NextButton onNextStep={onNextStep} />
      </Layout>
    </>
  );
};

export default AccountSettingPage;
