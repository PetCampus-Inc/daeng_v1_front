import { ID_REGEX, PW_REGEX } from "constants/validCheck";

import { isAxiosError } from "axios";
import { ButtonInput, Flex, PasswordInput, Text } from "components/common";
import { useCheckId } from "hooks/api/signup";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

const AccountInfo = () => {
  const {
    register,
    watch,
    getFieldState,
    getValues,
    setError,
    clearErrors,
    formState: { errors }
  } = useFormContext();

  const id = watch("id");
  const idFieldState = getFieldState("id");
  const password = watch("pwd");

  const [isValidId, setIsValidId] = useState<boolean>(false);

  const { mutateCheckId } = useCheckId();

  useEffect(() => {
    if (idFieldState.isDirty) {
      setIsValidId(false);
    }
  }, [id, idFieldState.isDirty]);

  const handleCheckId = () => {
    const idValue = getValues("id");
    mutateCheckId(idValue, {
      onSuccess: (res) => {
        if (res === 200) {
          clearErrors("id");
          setIsValidId(true);
        }
      },
      onError: (error) => {
        if (isAxiosError(error) && error.response) {
          if (error.response.status === 409) {
            setError("id", { type: "manual", message: "이미 사용중인 ID입니다." });
            setIsValidId(false);
          }
        }
      }
    });
  };

  return (
    <Flex direction="column" gap={24}>
      <Flex direction="column" gap={8}>
        <Flex justify="space-between" align="center">
          <Text as="label" name="name" typo="body2_16_R" color="darkBlack">
            아이디
          </Text>
          {errors.id && (
            <Text as="span" typo="caption1_12_R" color="red_1">
              {errors.id.message || "유효한 아이디를 입력해주세요."}
            </Text>
          )}
          {isValidId && !errors.id && (
            <Text as="span" typo="caption1_12_R" color="primaryColor">
              사용 가능한 ID입니다.
            </Text>
          )}
        </Flex>
        <ButtonInput
          key="id"
          name="id"
          register={register}
          placeholder="영문 소문자, 숫자포함 6~12자"
          handleClick={handleCheckId}
          rules={{
            pattern: { value: ID_REGEX, message: "영문 소문자와 숫자 포함, 6~12자로 입력해주세요." }
          }}
          enabled={!errors.id && !idFieldState.invalid && idFieldState.isDirty}
          required
        />
      </Flex>
      <Flex direction="column" gap={8}>
        <Flex justify="space-between" align="center">
          <Text as="label" name="pwd" typo="body2_16_R" color="darkBlack">
            비밀번호
          </Text>
          {errors.pwd && (
            <Text as="span" typo="caption1_12_R" color="red_1">
              {errors.pwd.message}
            </Text>
          )}
        </Flex>
        <PasswordInput
          key="pwd"
          name="pwd"
          register={register}
          placeholder="영문 대소문자, 숫자포함 8~20자"
          className={errors.pwd ? "error-input" : ""}
          autoComplete="new-password"
          rules={{
            pattern: {
              value: PW_REGEX,
              message: "영문 대소문자, 숫자포함 8~20자로 입력해주세요."
            }
          }}
          required
        />
      </Flex>
      <Flex direction="column" gap={8}>
        <Flex justify="space-between" align="center">
          <Text as="label" name="confirmPwd" typo="body2_16_R" color="darkBlack">
            비밀번호 확인
          </Text>
          {errors.confirmPwd && (
            <Text as="span" typo="caption1_12_R" color="red_1">
              {errors.confirmPwd.message}
            </Text>
          )}
        </Flex>
        <PasswordInput
          key="confirmPwd"
          name="confirmPwd"
          register={register}
          rules={{
            validate: (value) => value === password || "비밀번호가 일치하지 않습니다."
          }}
          placeholder="영문 대소문자, 숫자포함 8~20자  "
          className={errors.confirmPwd ? "error-input" : ""}
          required
        />
      </Flex>
    </Flex>
  );
};

export default AccountInfo;
