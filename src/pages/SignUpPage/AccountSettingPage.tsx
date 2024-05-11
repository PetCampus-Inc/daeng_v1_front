import { Box, Text, Layout } from "components/common";
import Header from "components/common/Header";
import AccountInfo from "components/SignUp/form/AccountInfo";
import NextButton from "components/SignUp/form/NextButton";
import { useTeacherSinUp } from "hooks/api/signup";
import { FieldValues, useFormContext } from "react-hook-form";
import { useRecoilValue } from "recoil";
import { schoolIdAtom } from "store/form";

import { Role } from "./AdminSignUpFunnel";
interface IStepProps {
  type: Role;
  onNextStep: () => void;
}

const AccountSettingPage = ({ type, onNextStep }: IStepProps) => {
  if (!type) new Error("Role is required");
  const { handleSubmit } = useFormContext();
  const schoolId = useRecoilValue(schoolIdAtom);

  const { mutateTeacherSignUp } = useTeacherSinUp();

  const onSubmit = (data: FieldValues) => {
    const req = {
      id: data.id,
      pwd: data.pwd,
      name: data.name,
      phoneNumber: data.phoneNumber,
      schoolId: schoolId ?? -1
    };

    mutateTeacherSignUp(req, {
      onSuccess: () => {
        onNextStep();
      }
    });
  };

  const handleConditionalSubmit = () => {
    if (type === "TEACHER") {
      handleSubmit(onSubmit)();
    } else {
      onNextStep();
    }
  };

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
        <NextButton
          type={type === "TEACHER" ? "submit" : "button"}
          onNextStep={handleConditionalSubmit}
        >
          가입
        </NextButton>
      </Layout>
    </>
  );
};

export default AccountSettingPage;
