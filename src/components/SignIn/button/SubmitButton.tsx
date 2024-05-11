import { isAxiosError } from "axios";
import { Text } from "components/common";
import { useAdminLogin } from "hooks/api/signin";
import { type FieldValues, useFormContext } from "react-hook-form";

import { StyledButton } from "../styles";

const SubmitButton = () => {
  const { handleSubmit, setError } = useFormContext();
  const { mutateLogin } = useAdminLogin();

  const onSubmit = (data: FieldValues) => {
    const req = {
      inputId: data.inputId,
      inputPw: data.inputPw
    };

    mutateLogin(req, {
      onError: (error) => {
        if (!isAxiosError(error)) throw error;

        // FIXME: 에러코드 정의 따로 해두기!!!
        if (error?.response?.data.code === "COMMON-400-1") {
          setError("inputId", {
            type: "manual",
            message: "잘못된 아이디입니다."
          });
        } else if (error?.response?.data.code === "AUTH-401-1") {
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
