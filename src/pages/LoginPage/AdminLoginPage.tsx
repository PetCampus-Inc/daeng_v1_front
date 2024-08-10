import { Box, Flex, Layout, Text } from "components/common";
import Header from "components/common/Header";
import LinkButton from "components/SignIn/button/LinkButton";
import SubmitButton from "components/SignIn/button/SubmitButton";
import SigninForm from "components/SignIn/form/SigninForm";
import { FormProvider, useForm } from "react-hook-form";

const AdminLoginPage = () => {
  const methods = useForm({ mode: "onSubmit" });

  return (
    <>
      <Header type="back" />
      <Layout px={16} pt={76}>
        <Text typo="title1_24_B" color="darkBlack">
          똑독 관리자로 시작하기
        </Text>
        <FormProvider {...methods}>
          <Box mt={56}>
            <SigninForm />
          </Box>
          <Box position="absolute" left={16} right={16} bottom={24}>
            <Flex direction="column" justify="center" align="center" gap={24}>
              <LinkButton />
              <SubmitButton />
            </Flex>
          </Box>
        </FormProvider>
      </Layout>
    </>
  );
};

export default AdminLoginPage;
