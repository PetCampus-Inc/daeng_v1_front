import { Text } from "components/common";
import { useAdminLogin } from "hooks/api/signin";
import useNativeAction from "hooks/native/useNativeAction";
import { type FieldValues, useFormContext } from "react-hook-form";
import { isCustomError } from "utils/is";

import { StyledButton } from "../styles";

const SubmitButton = () => {
  const { handleSubmit, setError } = useFormContext();
  const { mutateLogin } = useAdminLogin();
  const { getFcmToken } = useNativeAction();

  const onSubmit = async (data: FieldValues) => {
    const fcmToken = await getFcmToken();
    const req = {
      inputId: data.inputId,
      inputPw: data.inputPw,
      fcmToken
    };

    mutateLogin(req, {
      onError: (error) => {
        if (!isCustomError(error)) throw error;

        // FIXME: 에러코드 변경 예정
        if (error?.data.code === "ADMIN-404-1") {
          setError("inputId", {
            type: "manual",
            message: "잘못된 아이디입니다."
          });
        } else if (error?.data.code === "AUTH-401-1") {
          setError("inputPw", {
            type: "manual",
            message: "잘못된 비밀번호입니다."
          });
        }
      }
    });
  };

  return (
    <StyledButton type="submit" bg="primaryColor" onClick={handleSubmit(onSubmit)}>
      <Text typo="label1_16_B" color="white">
        로그인
      </Text>
    </StyledButton>
  );
};

export default SubmitButton;
