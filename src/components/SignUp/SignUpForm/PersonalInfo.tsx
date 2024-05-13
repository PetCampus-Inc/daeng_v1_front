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
  };

  return (
    <Flex direction="column" gap={24}>
      <Flex direction="column" gap={8}>
        <Flex justify="space-between" align="center">
          <Text as="label" name="name" typo="body2_16_R" color="darkBlack">
            이름
          </Text>
        </Flex>
        <TextInput
          name="name"
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
          <Text as="label" name="phoneNumber" typo="body2_16_R" color="darkBlack">
            연락처
          </Text>
        </Flex>

        <TextInput
          name="phoneNumber"
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
