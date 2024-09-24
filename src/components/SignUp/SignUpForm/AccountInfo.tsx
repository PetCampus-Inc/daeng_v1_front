import { ID_REGEX, PW_REGEX } from "constants/validCheck";

import { ButtonInput, Flex, PasswordInput, Text } from "components/common";
import { useCheckId } from "hooks/api/signup";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

const AccountInfo = () => {
  const {
    register,
    unregister,
    watch,
    getFieldState,
    getValues,
    setValue,
    setError,
    clearErrors,
    formState: { errors }
  } = useFormContext();

  const id = watch("id");
  const idFieldState = getFieldState("id");
  const isValidId = watch("idValid");
  const password = watch("pwd");

  const { mutateCheckId } = useCheckId();

  useEffect(() => {
    register("idValid", { required: true, value: false });
    return () => unregister("idValid");
  }, [register, unregister]);

  const handleChangeId = (e: React.ChangeEvent<HTMLInputElement>) => {
    register("id").onChange(e);
    setValue("idValid", false);
    clearErrors("id");
  };

  const handlePasswordChange = async () => {
    clearErrors("pwd");
  };

  const handleCheckId = () => {
    const idValue = getValues("id");

    mutateCheckId(idValue, {
      onSuccess: (res) => {
        if (res === 200) {
          clearErrors("id");
          setValue("idValid", true);
        }
      },
      onError: (error) => {
        setError("id", { type: "manual", message: error.message });
        setValue("idValid", false);
      }
    });
  };

  return (
    <Flex direction="column" gap={24}>
      <Flex direction="column" gap={8}>
        <Flex justify="space-between" align="center">
          <Text as="label" htmlFor="name" typo="body2_16_R" color="darkBlack">
            아이디
          </Text>
          {errors.id && (
            <Text as="span" typo="caption1_12_R" color="red_1">
              {errors.id.message?.toString()}
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
          label="중복확인"
          register={register}
          autoFocus
          regex={/^[a-z0-9]*$/}
          placeholder="영문 소문자, 숫자포함 6~12자"
          handleClick={handleCheckId}
          onChange={handleChangeId}
          rules={{
            pattern: {
              value: ID_REGEX,
              message: "영문 소문자와 숫자 포함, 6~12자로 입력해주세요."
            }
          }}
          btnHidden={isValidId || !!errors.id}
          enabled={id && idFieldState.isDirty && !isValidId}
          required
        />
      </Flex>
      <Flex direction="column" gap={8}>
        <Flex justify="space-between" align="center">
          <Text as="label" htmlFor="pwd" typo="body2_16_R" color="darkBlack">
            비밀번호
          </Text>
          {errors.pwd && (
            <Text as="span" typo="caption1_12_R" color="red_1">
              {errors.pwd.message?.toString()}
            </Text>
          )}
        </Flex>
        <PasswordInput
          key="pwd"
          name="pwd"
          register={register}
          placeholder="영문 대소문자, 숫자포함 8~20자"
          className={errors.pwd ? "error-input" : ""}
          onChange={(e) => {
            register("pwd").onChange(e);
            handlePasswordChange();
          }}
          autoComplete="new-password"
          rules={{
            pattern: {
              value: PW_REGEX,
              message: "잘못된 비밀번호 입니다."
            }
          }}
          required
        />
      </Flex>
      <Flex direction="column" gap={8}>
        <Flex justify="space-between" align="center">
          <Text as="label" htmlFor="confirmPwd" typo="body2_16_R" color="darkBlack">
            비밀번호 확인
          </Text>
          {errors.confirmPwd && (
            <Text as="span" typo="caption1_12_R" color="red_1">
              {errors.confirmPwd.message?.toString()}
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
          placeholder="영문 대소문자, 숫자포함 8~20자"
          className={errors.confirmPwd ? "error-input" : ""}
          required
        />
      </Flex>
    </Flex>
  );
};

export default AccountInfo;
