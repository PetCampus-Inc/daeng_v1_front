import { FIELD } from "constants/field";
import { PHONE_REGEX } from "constants/validCheck";

import { Text } from "components/common";
import { TextInput } from "components/common";
import { Flex } from "components/common/Flex";
import SearchInputField from "components/common/Input/SearchInputField";
import Postcode from "components/common/Postcode";
import SingleRadio from "components/common/Select/SingleRadio";
import * as useOverlay from "hooks/common/useOverlay/useOverlay";
import { useFormContext } from "react-hook-form";
import { formatPhoneNumber } from "utils/formatter";

import * as S from "./styles";

const MyInfoEdit = () => {
  const { register, setValue } = useFormContext();
  const overlay = useOverlay.useOverlay();

  const handleChangeNumber = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const formattedValue = formatPhoneNumber(value);
    setValue(field, formattedValue, { shouldDirty: true });
  };

  const handleClear = () => {
    setValue(FIELD.MEMBER_ADDRESS, "");
    setValue(FIELD.MEMBER_ADDRESS_DETAIL, "", { shouldDirty: true, shouldValidate: true });
  };

  const handleCompleteAddress = (value: string) => {
    setValue(FIELD.MEMBER_ADDRESS, value);
  };

  const openPopup = () =>
    overlay.open(({ isOpen, close }) => (
      <Postcode isOpen={isOpen} close={close} onComplete={handleCompleteAddress} />
    ));

  return (
    <S.ProfileEditWrapper>
      <Flex direction="column" gap={7}>
        <Text typo="label2_14_R" color="darkBlack">
          이름
        </Text>
        <TextInput
          name={FIELD.MEMBER_NAME}
          register={register}
          required
          placeholder="견주 이름을 입력해주세요"
        />
      </Flex>

      <Flex direction="column" gap={7}>
        <Text typo="label2_14_R" color="darkBlack">
          성별
        </Text>
        <SingleRadio name={FIELD.MEMBER_GENDER} radiosText={["남", "여"]} isRequired />
      </Flex>

      <Flex direction="column" gap={7}>
        <Text typo="label2_14_R" color="darkBlack">
          주소
        </Text>
        <SearchInputField
          name={FIELD.MEMBER_ADDRESS}
          register={register}
          onSearch={openPopup}
          onClick={openPopup}
          onClear={handleClear}
          required
          readOnly
          placeholder="주소를 입력해주세요"
          inputType="memberEdit"
        />
        <TextInput
          name={FIELD.MEMBER_ADDRESS_DETAIL}
          register={register}
          placeholder="상세 주소를 입력해주세요"
        />
      </Flex>

      <Flex direction="column" gap={7}>
        <Text typo="label2_14_R" color="darkBlack">
          연락처
        </Text>
        <TextInput
          name={FIELD.MEMBER_PHONE}
          register={register}
          rules={{
            pattern: PHONE_REGEX
          }}
          onChange={handleChangeNumber(FIELD.MEMBER_PHONE)}
          placeholder="연락처를 입력해주세요"
          type="tel"
          required
        />
      </Flex>

      <Flex direction="column" gap={7}>
        <Text typo="label2_14_R" color="darkBlack">
          비상 연락처
        </Text>
        <TextInput
          name={FIELD.EMERGENCY_NUMBER}
          register={register}
          onChange={handleChangeNumber(FIELD.EMERGENCY_NUMBER)}
          rules={{
            pattern: PHONE_REGEX
          }}
          placeholder="비상 연락처를 입력해주세요"
          type="tel"
          required
        />
      </Flex>
    </S.ProfileEditWrapper>
  );
};

export default MyInfoEdit;
