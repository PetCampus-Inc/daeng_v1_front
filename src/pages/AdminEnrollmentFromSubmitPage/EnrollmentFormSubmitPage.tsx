import { routes } from "constants/path";

import { Box, Flex, Layout, Text, TextInput, WideButton } from "components/common";
import Header from "components/common/Header";
import { useCreateSchoolForm } from "hooks/api/admin/enroll";
import { useAdminInfo } from "hooks/common/useAdminInfo";
import { useKeyboardAwareView } from "hooks/common/useKeyboardAwareView";
import { Adapter, CreateSchoolForm2BeAdapter } from "libs/adapters";
import { type FieldValues, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { getCurrentDateString } from "utils/date";
import showToast from "utils/showToast";

import type { AdminEnrollmentInfoType } from "types/admin/enrollment.types";

interface SubmitFormProps {
  formValue?: FieldValues;
}

const EnrollmentFormSubmitPage = ({ formValue }: SubmitFormProps) => {
  const { handleSubmit, register } = useForm();

  const navigate = useNavigate();
  const { schoolId } = useAdminInfo();
  const { mutateForm } = useCreateSchoolForm();
  const { style } = useKeyboardAwareView();

  const defaultFormName = `가입신청서_${getCurrentDateString()}`;

  const onSubmit = (data: FieldValues) => {
    if (!formValue) {
      console.error("폼 입력값이 존재하지 않습니다");
      return;
    }

    const formName: string = data.formName || defaultFormName;

    const formattedData = Adapter.from({ schoolId, formName, ...formValue }).to<
      FieldValues,
      AdminEnrollmentInfoType
    >((item) => new CreateSchoolForm2BeAdapter(item).adapt());

    mutateForm(formattedData, {
      onSuccess: () => {
        showToast("가입신청서 등록이 완료되었습니다", "bottom");
        navigate(routes.admin.school.enrollment.root);
      }
    });
  };
  return (
    <>
      <Header type="text" text="가입신청서" />
      <Layout bg="BGray" pt={72} px={16}>
        <form>
          <Flex direction="column" gap={8}>
            <Text typo="title2_20_B" color="black">
              가입신청서의 이름을 작성해주세요
            </Text>
            <TextInput name="formName" register={register} placeholder={defaultFormName} />
          </Flex>
          <WideButton
            type="submit"
            onClick={handleSubmit(onSubmit)}
            aria-label="제출하기"
            style={style}
          >
            완료
          </WideButton>
          <Box position="absolute" right={16} left={16} bottom={24}>
            <WideButton type="submit" onClick={handleSubmit(onSubmit)} aria-label="제출하기">
              완료
            </WideButton>
          </Box>
        </form>
      </Layout>
    </>
  );
};

export default EnrollmentFormSubmitPage;
