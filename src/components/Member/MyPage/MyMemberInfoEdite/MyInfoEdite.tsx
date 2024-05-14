import { GENDER_DATA } from "constants/gender";
import { ITEM_KEYS } from "constants/item";
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
import { IMemberInfoEdite } from "types/Member.type";
import { formatPhoneNumber } from "utils/formatter";

import * as S from "./styles";

// TODO 코드 리팩토링 필요
const MyInfoEdite = ({ requiredItems, handleFocus, handleBlur, memberData }: IMemberInfoEdite) => {
  const { register, setValue, watch } = useFormContext();
  const [isAddressActive, setIsAddressActive] = useState(false);
  const overlay = useOverlay.useOverlay();

  const addressStreet = "address.street";
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
    setValue("address.detail", "");
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
          name="memberName"
          register={register}
          required
          placeholder="견주 이름을 입력해주세요"
          defaultValue={memberData.memberName}
          value={watch("memberName")}
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
          name="memberGender"
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
          onSearch={() => openPopup()}
          onClick={() => openPopup()}
          onClear={handleClear}
          defaultValue={memberData.address}
          value={watchAddress}
          required={requiredItems?.get(ITEM_KEYS.MEMBER_ADDRESS)}
          readOnly
          placeholder="주소를 입력해주세요"
          inputType="memberEdite"
          className="defaultValue"
        />
        <TextInput
          name="address.detail"
          register={register}
          defaultValue={memberData.addressDetail}
          value={watch("address.detail")}
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
          name="phoneNumber"
          register={register}
          rules={{
            pattern: PHONE_REGEX
          }}
          onChange={handleChangeNumber("phoneNumber")}
          placeholder="연락처를 입력해주세요"
          defaultValue={memberData.phoneNumber}
          value={watch("phoneNumber")}
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
          name="emergencyNumber"
          register={register}
          onChange={handleChangeNumber("emergencyNumber")}
          rules={{
            pattern: PHONE_REGEX
          }}
          placeholder="비상 연락처를 입력해주세요"
          defaultValue={memberData.emergencyPhoneNumber}
          value={watch("emergencyNumber")}
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
