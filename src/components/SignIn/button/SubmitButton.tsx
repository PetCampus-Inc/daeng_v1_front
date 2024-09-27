import { Text } from "components/common";
import { useAdminLogin } from "hooks/api/signin";
import useNativeAction from "hooks/native/useNativeAction";
import { type FieldValues, useFormContext } from "react-hook-form";

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
      onError: ({ code, message }) => {
        if (code === "ADMIN-404-1") setError("inputId", { type: "manual", message });
        else if (code === "AUTH-401-1") setError("inputPw", { type: "manual", message });
        else {
          // TODO: API 호출 전에 처리해야 함
          setError("inputId", {
            type: "manual",
            message: "아이디 또는 패스워드 형식이 맞지 않습니다."
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
