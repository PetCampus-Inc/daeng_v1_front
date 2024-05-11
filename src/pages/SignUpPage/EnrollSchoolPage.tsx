import { Box, Layout, Text } from "components/common";
import Header from "components/common/Header";
import NextButton from "components/SignUp/form/NextButton";
import SchoolInfo from "components/SignUp/form/SchoolInfo";
import { useFormContext } from "react-hook-form";

interface IStepProps {
  onNextStep: () => void;
}

const EnrollSchoolPage = ({ onNextStep }: IStepProps) => {
  const { getValues } = useFormContext();
  const name = getValues("name");
  return (
    <>
      <Header type="back" />
      <Layout type="page" pt={76} pb={24}>
        <Text typo="title1_24_B" color="darkBlack">
          {name} 원장님
          <br />
          유치원 정보를 등록해주세요
        </Text>
        <Box mt={56}>
          <SchoolInfo />
        </Box>
        <NextButton onNextStep={onNextStep}>등록</NextButton>
      </Layout>
    </>
  );
};

export default EnrollSchoolPage;
