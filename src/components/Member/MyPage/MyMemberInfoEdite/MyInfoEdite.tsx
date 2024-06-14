import { FIELD, FIELD_KEYS } from "constants/field";
import { GENDER_DATA } from "constants/gender";
import { PHONE_REGEX } from "constants/validCheck";

import { Text } from "components/common";
import { TextInput } from "components/common";
import { Flex } from "components/common/Flex";
import SearchInputField from "components/common/Input/SearchInputField";
import Postcode from "components/common/Postcode";
import SingleRadio from "components/common/Select/SingleRadio";
import * as useOverlay from "hooks/common/useOverlay/useOverlay";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { formatPhoneNumber } from "utils/formatter";

import * as S from "./styles";

import type { IMemberInfoEdite } from "types/member/member.types";

// TODO 코드 리팩토링 필요
// NOTE: 여기서 handleFocus, handleBlur는 어떤 동작을 하고 있는건가요?

const MyInfoEdite = ({ requiredItems, handleFocus, handleBlur, memberData }: IMemberInfoEdite) => {
  const { register, setValue, watch } = useFormContext();
  const [isAddressActive, setIsAddressActive] = useState(false);
  const overlay = useOverlay.useOverlay();

  const addressStreet = FIELD.MEMBER_ADDRESS;
  const watchAddress = watch(addressStreet);

  const handleChangeNumber = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const formattedValue = formatPhoneNumber(value);
    setValue(field, formattedValue);
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.name, e.target.value);
  };

  const handleClear = () => {
    setValue(addressStreet, "");
    setValue(FIELD.MEMBER_ADDRESS_DETAIL, "");
    setIsAddressActive(false);
  };

  const openPopup = () =>
    overlay.open(({ isOpen, close }) => (
      <Postcode
        isOpen={isOpen}
        close={close}
        field={addressStreet}
        setValue={setValue}
        setIsAddressActive={setIsAddressActive}
      />
    ));

  //TODO input value 연동 작업하기
  return (
    <S.ProfileEditeWrapper>
      <Flex direction="column" gap={7}>
        <Text typo="label2_14_R" color="darkBlack">
          이름
        </Text>
        <TextInput
          name={FIELD.MEMBER_NAME}
          register={register}
          required
          placeholder="견주 이름을 입력해주세요"
          defaultValue={memberData.memberName}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChangeInput}
          className="defaultValue"
        />
      </Flex>

      <Flex direction="column" gap={7}>
        <Text typo="label2_14_R" color="darkBlack">
          성별
        </Text>
        <SingleRadio
          name={FIELD.MEMBER_GENDER}
          radiosText={["남", "여"]}
          defaultSelect={GENDER_DATA[memberData.memberGender][0]}
        />
      </Flex>

      <Flex direction="column" gap={7}>
        <Text typo="label2_14_R" color="darkBlack">
          주소
        </Text>
        <SearchInputField
          name={addressStreet}
          register={register}
          onSearch={openPopup}
          onClick={openPopup}
          onClear={handleClear}
          defaultValue={memberData.address}
          value={watchAddress}
          required={requiredItems?.get(FIELD_KEYS.MEMBER_ADDRESS)}
          readOnly
          placeholder="주소를 입력해주세요"
          inputType="memberEdite"
          className="defaultValue"
        />
        <TextInput
          name={FIELD.MEMBER_ADDRESS_DETAIL}
          register={register}
          defaultValue={memberData.addressDetail}
          placeholder="상세 주소를 입력해주세요"
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChangeInput}
          className="defaultValue"
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
          defaultValue={memberData.phoneNumber}
          type="tel"
          onFocus={handleFocus}
          onBlur={handleBlur}
          className="defaultValue"
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
          defaultValue={memberData.emergencyPhoneNumber}
          type="tel"
          onFocus={handleFocus}
          onBlur={handleBlur}
          className="defaultValue"
          required
        />
      </Flex>
    </S.ProfileEditeWrapper>
  );
};

export default MyInfoEdite;
