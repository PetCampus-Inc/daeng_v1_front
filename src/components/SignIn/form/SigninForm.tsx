import { Flex, PasswordInput, Text, TextInput } from "components/common";
import { useFormContext } from "react-hook-form";

const SigninForm = () => {
  const {
    register,
    formState: { errors }
  } = useFormContext();
  return (
    <Flex direction="column" gap={24}>
      <Flex direction="column" gap={8}>
        <Flex justify="space-between" align="center">
          <Text as="label" htmlFor="inputId" typo="body2_16_R" color="darkBlack">
            아이디
          </Text>
          {errors.inputId && (
            <Text as="span" typo="caption1_12_R" color="red_1">
              {errors.inputId.message?.toString()}
            </Text>
          )}
        </Flex>
        <TextInput
          name="inputId"
          register={register}
          placeholder="아이디를 입력해 주세요"
          className={errors.inputId ? "error-input" : ""}
          required
        />
      </Flex>
      <Flex direction="column" gap={8}>
        <Flex justify="space-between" align="center">
          <Text as="label" htmlFor="inputPw" typo="body2_16_R" color="darkBlack">
            비밀번호
          </Text>
          {errors.inputPw && (
            <Text as="span" typo="caption1_12_R" color="red_1">
              {errors.inputPw.message?.toString()}
            </Text>
          )}
        </Flex>
        <PasswordInput
          name="inputPw"
          register={register}
          placeholder="비밀번호를 입력해 주세요"
          className={errors.inputPw ? "error-input" : ""}
          required
        />
      </Flex>
    </Flex>
  );
};

export default SigninForm;
