import { PHONE_REGEX } from "constants/validCheck";

import { Flex, Text, TextInput } from "components/common";
import { useFormContext } from "react-hook-form";
import { formatPhoneNumber } from "utils/formatter";

const PersonalInfo = () => {
  const { register, setValue } = useFormContext();

  const handleChangeNumber = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const formattedValue = formatPhoneNumber(value);
    setValue(field, formattedValue);

    // 정규식 테스트 통과 시 블러 처리
    if (PHONE_REGEX.test(formattedValue)) e.target.blur();
  };

  return (
    <Flex direction="column" gap={24}>
      <Flex direction="column" gap={8}>
        <Flex justify="space-between" align="center">
          <Text as="label" htmlFor="name" typo="body2_16_R" color="darkBlack">
            이름
          </Text>
        </Flex>
        <TextInput
          name="name"
          autoFocus
          inputMode="text"
          register={register}
          rules={{
            maxLength: { value: 10, message: "이름은 10자 이내로 입력해주세요" }
          }}
          placeholder="홍길동"
          required
        />
      </Flex>
      <Flex direction="column" gap={8}>
        <Flex justify="space-between" align="center">
          <Text as="label" htmlFor="phoneNumber" typo="body2_16_R" color="darkBlack">
            연락처
          </Text>
        </Flex>

        <TextInput
          name="phoneNumber"
          inputMode="tel"
          register={register}
          rules={{
            pattern: {
              value: PHONE_REGEX,
              message: "올바른 연락처를 입력해주세요"
            }
          }}
          placeholder="연락처를 입력해 주세요"
          onChange={handleChangeNumber("phoneNumber")}
          required
        />
      </Flex>
    </Flex>
  );
};

export default PersonalInfo;
