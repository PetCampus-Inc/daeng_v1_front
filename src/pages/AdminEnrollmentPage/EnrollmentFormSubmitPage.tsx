import { Box, Flex, Layout, Text, TextInput } from "components/common";
import Header from "components/common/Header";
import { useCreateAdminEnrollment } from "hooks/api/admin/enroll";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { getCurrentDate } from "utils/date";

import type { AdminEnrollmentInfoType } from "types/admin/enrollment.types";

interface SubmitFormProps {
  formInfo?: AdminEnrollmentInfoType;
}

const EnrollmentFormSubmitPage = ({ formInfo }: SubmitFormProps) => {
  const { handleSubmit, register } = useForm();

  const { mutateForm } = useCreateAdminEnrollment();

  const defaultFormName = `가입신청서_${getCurrentDate()}`;

  const onSubmit = handleSubmit((data) => {
    if (!formInfo) {
      console.error("Form submission failed: No form info provided.");
      return;
    }

    const formName: string = data.formName || defaultFormName;

    const requestData = {
      ...formInfo,
      formName
    };

    // FIXME: 에러 핸들링 필요
    mutateForm(requestData);
  });
  // FIXME: floating button으로 변경해야함
  return (
    <>
      <Header type="text" text="가입신청서" />
      <Layout type="page" bg="BGray" pt={72}>
        <form>
          <Flex direction="column" gap={8}>
            <Text typo="title2_20_B" color="black">
              가입신청서의 이름을 작성해주세요
            </Text>
            <TextInput name="formName" register={register} placeholder={defaultFormName} />
          </Flex>
          <Box position="absolute" right={16} left={16} bottom={24}>
            <Button type="submit" onClick={onSubmit} aria-label="제출하기">
              완료
            </Button>
          </Box>
        </form>
      </Layout>
    </>
  );
};

export default EnrollmentFormSubmitPage;

const Button = styled.button`
  width: 100%;

  display: flex;
  padding: 10px 0;
  justify-content: center;
  align-items: center;

  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.primaryColor};

  ${({ theme }) => theme.typo.label1_16_B};
  color: ${({ theme }) => theme.colors.white};
`;
