import { GENDER_DATA } from "constants/gender";
import { ITEM_KEYS } from "constants/item";
import { PHONE_REGEX } from "constants/validCheck";

import { Flex } from "components/common/Flex";
import InputField from "components/common/InputField";
import SearchInputField from "components/common/InputField/SearchInputField";
import Postcode from "components/common/Postcode";
import SingleRadio from "components/common/Select/SingleRadio";
import Typo from "components/common/Typo";
import * as useOverlay from "hooks/common/useOverlay/useOverlay";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { ThemeConfig } from "styles/ThemeConfig";
import { IMemberInfoEdite } from "types/Member.type";
import { formatPhoneNumber } from "utils/formatter";

import * as S from "./styles";

// TODO 코드 리팩토링 필요
const MyInfoEdite = ({ requiredItems, handleFocus, handleBlur, memberData }: IMemberInfoEdite) => {
  const { register, setValue, watch } = useFormContext();
  const [isAddressActive, setIsAddressActive] = useState(false);
  const overlay = useOverlay.useOverlay();

  const addressStreet = "address.street";
  const watchAddress = watch(addressStreet, "");

  const handleChangeNumber = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const formattedValue = formatPhoneNumber(value);
    setValue(field, formattedValue);
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.name, e.target.value);
    console.log("test", e.target.name, e.target.value);
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
        <Typo text="이름" color={ThemeConfig.colors.darkBlack} size="14px" />
        <InputField
          name="memberName"
          register={register}
          isRequired
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
        <Typo text="성별" color={ThemeConfig.colors.darkBlack} size="14px" />
        <SingleRadio
          name="memberGender"
          radiosText={["남", "여"]}
          defaultSelect={GENDER_DATA[memberData.memberGender][0]}
        />
      </Flex>

      <Flex direction="column" gap={7}>
        <Typo text="주소" color={ThemeConfig.colors.darkBlack} size="14px" />
        <SearchInputField
          name={addressStreet}
          register={register}
          onSearch={() => openPopup()}
          onClick={() => openPopup()}
          onClear={handleClear}
          value={watchAddress}
          isRequired={requiredItems?.get(ITEM_KEYS.MEMBER_ADDRESS)}
          readOnly
          placeholder="주소를 입력해주세요"
          inputType="memberEdite"
          className="defaultValue"
        />
        <InputField
          name="address.detail"
          register={register}
          defaultValue={memberData.memberName}
          value={watch("address.detail")}
          placeholder="상세 주소를 입력해주세요"
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChangeInput}
          className="defaultValue"
        />
      </Flex>

      <Flex direction="column" gap={7}>
        <Typo text="연락처" color={ThemeConfig.colors.darkBlack} size="14px" />
        <InputField
          name="phoneNumber"
          register={register}
          isRequired
          pattern={PHONE_REGEX}
          onChange={handleChangeNumber("phoneNumber")}
          placeholder="연락처를 입력해주세요"
          defaultValue={memberData.phoneNumber}
          value={watch("phoneNumber")}
          type="tel"
          onFocus={handleFocus}
          onBlur={handleBlur}
          className="defaultValue"
        />
      </Flex>

      <Flex direction="column" gap={7}>
        <Typo text="비상 연락처" color={ThemeConfig.colors.darkBlack} size="14px" />
        <InputField
          name="emergencyNumber"
          register={register}
          isRequired
          pattern={PHONE_REGEX}
          onChange={handleChangeNumber("emergencyNumber")}
          placeholder="비상 연락처를 입력해주세요"
          defaultValue={memberData.emergencyNumber}
          value={watch("emergencyNumber")}
          type="tel"
          onFocus={handleFocus}
          onBlur={handleBlur}
          className="defaultValue"
        />
      </Flex>
    </S.ProfileEditeWrapper>
  );
};

export default MyInfoEdite;
