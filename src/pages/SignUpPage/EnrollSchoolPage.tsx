import { Box, Layout, Text } from "components/common";
import Header from "components/common/Header";
import NextButton from "components/SignUp/form/NextButton";
import SchoolInfo from "components/SignUp/form/SchoolInfo";
import { useOwnerSinUp } from "hooks/api/signup";
import { type FieldValues, useFormContext } from "react-hook-form";

interface IStepProps {
  onNextStep: () => void;
}

const EnrollSchoolPage = ({ onNextStep }: IStepProps) => {
  const { getValues, handleSubmit } = useFormContext();
  const name = getValues("name");

  const { mutateOwnerSignUp } = useOwnerSinUp();

  const onSubmit = (data: FieldValues) => {
    const req = {
      id: data.id,
      pwd: data.pwd,
      name: data.name,
      phoneNumber: data.phoneNumber,
      schoolName: data.schoolName,
      schoolPhoneNumber: data.schoolPhoneNumber,
      schoolAddress: data.schoolAddress,
      registrationNumber: data.registrationNumber
    };
    mutateOwnerSignUp(req, {
      onSuccess: () => {
        onNextStep();
      }
    });
  };

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
        <NextButton type="submit" onNextStep={handleSubmit(onSubmit)}>
          등록
        </NextButton>
      </Layout>
    </>
  );
};

export default EnrollSchoolPage;
