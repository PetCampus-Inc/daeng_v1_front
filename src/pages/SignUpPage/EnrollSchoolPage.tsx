import { Box, Layout, Text } from "components/common";
import Header from "components/common/Header";
import NextButton from "components/SignUp/SignUpForm/NextButton";
import SchoolInfo from "components/SignUp/SignUpForm/SchoolInfo";
import { useAdminLogin } from "hooks/api/signin";
import { useOwnerSinUp } from "hooks/api/signup";
import useNativeAction from "hooks/native/useNativeAction";
import { type FieldValues, useFormContext } from "react-hook-form";

interface IStepProps {
  onNextStep: (schoolName: string) => void;
}

const EnrollSchoolPage = ({ onNextStep }: IStepProps) => {
  const { getValues, handleSubmit } = useFormContext();
  const { getFcmToken } = useNativeAction();
  const name = getValues("name");

  const { mutateOwnerSignUp } = useOwnerSinUp();
  const { mutateLogin } = useAdminLogin();

  const onSubmit = async (data: FieldValues) => {
    const fcmToken = await getFcmToken();

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
        mutateLogin(
          { inputId: data.id, inputPw: data.pwd, fcmToken },
          {
            onSuccess: () => {
              onNextStep(data.schoolName);
            }
          }
        );
      }
    });
  };

  return (
    <>
      <Header type="back" />
      <Layout bgColor="white" px={16} pt={76} pb={24}>
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
