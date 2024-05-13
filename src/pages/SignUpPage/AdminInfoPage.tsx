import { Box, Layout, Text } from "components/common";
import Header from "components/common/Header";
import NextButton from "components/SignUp/SignUpForm/NextButton";
import PersonalInfo from "components/SignUp/SignUpForm/PersonalInfo";
import { memo } from "react";

import type { ITeacherInfo } from "./AdminSignUpFunnel";

interface IStepProps {
  onNextStep: (data: ITeacherInfo) => void;
}

const AdminInfoPage = ({ onNextStep }: IStepProps) => {
  return (
    <>
      <Header type="back" />
      <Layout type="page" pt={76} pb={24}>
        <Text typo="title1_24_B" color="darkBlack">
          정보를 입력해주세요
        </Text>
        <Box mt={56}>
          <PersonalInfo />
        </Box>
        <NextButton onNextStep={onNextStep}>다음</NextButton>
      </Layout>
    </>
  );
};

export default memo(AdminInfoPage);
