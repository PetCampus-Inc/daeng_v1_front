import { USER_TYPE_KEY } from "constants/storage";

import { Box, Layout, Text } from "components/common";
import Header from "components/common/Header";
import AccountInfo from "components/SignUp/SignUpForm/AccountInfo";
import NextButton from "components/SignUp/SignUpForm/NextButton";
import { useAdminLogin } from "hooks/api/signin";
import { useTeacherSinUp } from "hooks/api/signup";
import { useSetLocalStorage } from "hooks/common/useLocalStorage";
import useNativeAction from "hooks/native/useNativeAction";
import { FieldValues, useFormContext } from "react-hook-form";
import { AdminRole, Role, User } from "types/common/role.types";

import { type ITeacherInfo } from "./AdminSignUpFunnel";

interface IStepProps {
  type?: Role;
  info?: ITeacherInfo;
  onNextStep?: (data: ITeacherInfo) => void;
}

const AccountSettingPage = ({ type, info, onNextStep }: IStepProps) => {
  if (!type) new Error("Role is required");
  const { handleSubmit } = useFormContext();

  const setLocalStorage = useSetLocalStorage();
  const { mutateTeacherSignUp } = useTeacherSinUp();
  const { mutateLogin } = useAdminLogin();
  const { getFcmToken } = useNativeAction();

  const onSubmit = async (data: FieldValues) => {
    setLocalStorage(USER_TYPE_KEY, User.ADMIN);

    const formData = {
      id: data.id,
      pwd: data.pwd
    };

    if (type === AdminRole.ROLE_TEACHER) {
      const fcmToken = await getFcmToken();

      const req = {
        ...formData,
        name: data.name,
        phoneNumber: data.phoneNumber,
        schoolId: info?.schoolId ?? -1
      };

      mutateTeacherSignUp(req, {
        onSuccess: (res) => {
          mutateLogin(
            { inputId: data.id, inputPw: data.pwd, fcmToken },
            {
              onSuccess: () =>
                onNextStep?.({ role: res.role, adminId: res.adminId, schoolName: res.schoolName })
            }
          );
        }
      });
    } else {
      // 원장인 경우
      onNextStep?.({});
    }
  };

  return (
    <>
      <Header type="back" />
      <Layout bgColor="white" px={16} pt={76} pb={24}>
        <Text typo="title1_24_B" color="darkBlack">
          회원가입을 완료해주세요
        </Text>
        <Box mt={56}>
          <AccountInfo />
        </Box>
        <NextButton type="submit" onNextStep={handleSubmit(onSubmit)}>
          가입
        </NextButton>
      </Layout>
    </>
  );
};

export default AccountSettingPage;
