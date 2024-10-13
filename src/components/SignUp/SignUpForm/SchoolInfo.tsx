import { REGISTRATION_REGEX, SCHOOL_PHONE_REGEX } from "constants/validCheck";

import { ButtonInput, Flex, SearchInput, Text, TextInput } from "components/common";
import Postcode from "components/common/Postcode";
import { useCheckRegNum } from "hooks/api/signup";
import { useOverlay } from "hooks/common/useOverlay";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { formatBusinessNumber, formatSchoolNumber } from "utils/formatter";

import AddressModifyBottomSheet from "../modal/AddressModifyBottomSheet";

const SchoolInfo = () => {
  const {
    register,
    unregister,
    setValue,
    watch,
    getFieldState,
    getValues,
    setError,
    clearErrors,
    formState: { errors }
  } = useFormContext();

  const isValidRegNumber = watch("regNumberValid");
  const regNumber = watch("registrationNumber");
  const regNumFieldState = getFieldState("registrationNumber");
  const watchAddress = watch("schoolAddress", "");

  const { mutateCheckRegNum } = useCheckRegNum();
  const overlay = useOverlay();

  useEffect(() => {
    register("regNumberValid", { required: true, value: false });
    return () => unregister("regNumberValid");
  }, [register, unregister]);

  const handleValid = () => {
    const schoolNum = getValues("registrationNumber").replace(/-/g, "");
    mutateCheckRegNum(schoolNum, {
      onSuccess: (res) => {
        if (res === "01") {
          clearErrors("registrationNumber");
          setValue("regNumberValid", true);
        } else {
          setValue("regNumberValid", false);
          setError("registrationNumber", {
            type: "manual",
            message: "올바르지 않은 사업자 등록 번호입니다."
          });
        }
      }
    });
  };

  const handleChangeNumber = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const formattedValue = formatSchoolNumber(value);
    setValue(field, formattedValue);
  };

  const handleChangeBusinessNumber =
    (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      const formattedValue = formatBusinessNumber(value);
      setValue(field, formattedValue);
    };

  const handleAddressFieldClick = () => {
    if (watchAddress.length > 0) {
      openAddressModifyPopup();
    } else {
      openPostCodePopup();
    }
  };

  const handleClearAddress = () => {
    setValue("schoolAddress", "");
  };

  const handleCompleteAddress = (value: string) => {
    setValue("schoolAddress", value);
  };

  const openPostCodePopup = () =>
    overlay.open(({ isOpen, close }) => (
      <Postcode isOpen={isOpen} close={close} onComplete={handleCompleteAddress} />
    ));

  const openAddressModifyPopup = () =>
    overlay.open(({ isOpen, close }) => (
      <AddressModifyBottomSheet
        isOpen={isOpen}
        close={close}
        action={openPostCodePopup}
        address={watchAddress}
      />
    ));

  return (
    <Flex direction="column" gap={24}>
      <Flex direction="column" gap={8}>
        <Text as="label" htmlFor="schoolName" typo="body2_16_R" color="darkBlack">
          유치원명
        </Text>
        <TextInput
          name="schoolName"
          register={register}
          placeholder="유치원 이름을 입력해 주세요"
          autoFocus
          rules={{
            maxLength: 20
          }}
          required
        />
      </Flex>
      <Flex direction="column" gap={8}>
        <Text as="label" htmlFor="schoolPhoneNumber" typo="body2_16_R" color="darkBlack">
          유치원 연락처
        </Text>
        <TextInput
          name="schoolPhoneNumber"
          inputMode="tel"
          register={register}
          placeholder="유치원 연락처를 입력해 주세요"
          rules={{
            pattern: {
              value: SCHOOL_PHONE_REGEX,
              message: "올바른 연락처를 입력해주세요"
            }
          }}
          onChange={handleChangeNumber("schoolPhoneNumber")}
          required
        />
      </Flex>
      <Flex direction="column" gap={8}>
        <Text as="label" htmlFor="schoolAddress" typo="body2_16_R" color="darkBlack">
          유치원 주소
        </Text>
        <SearchInput
          name="schoolAddress"
          register={register}
          placeholder="주소를 검색해 주세요"
          onSearch={openPostCodePopup}
          onClick={handleAddressFieldClick}
          onClear={handleClearAddress}
          value={watchAddress}
          readOnly
          required
        />
        <TextInput
          name="schoolAddressDetail"
          register={register}
          placeholder="상세주소를 입력해 주세요"
          autoFocus
        />
      </Flex>

      <Flex direction="column" gap={8}>
        <Flex justify="space-between" align="center">
          <Text as="label" htmlFor="registrationNumber" typo="body2_16_R" color="darkBlack">
            사업자 등록번호
          </Text>
          {errors.registrationNumber && (
            <Text as="span" typo="caption1_12_R" color="red_1">
              {errors.registrationNumber.message?.toString()}
            </Text>
          )}
          {isValidRegNumber && !errors.registrationNumber && (
            <Text as="span" typo="caption1_12_R" color="green">
              인증되었습니다.
            </Text>
          )}
        </Flex>
        <ButtonInput
          name="registrationNumber"
          label="인증하기"
          register={register}
          inputMode="numeric"
          btnHidden={isValidRegNumber}
          placeholder="사업자 등록번호를 입력해 주세요"
          onChange={(e) => {
            setValue("regNumberValid", false);
            handleChangeBusinessNumber("registrationNumber")(e);
            register("registrationNumber").onChange(e);
          }}
          handleClick={handleValid}
          rules={{
            pattern: REGISTRATION_REGEX
          }}
          enabled={regNumber && !isValidRegNumber && regNumFieldState.isDirty}
          required
        />
      </Flex>
    </Flex>
  );
};

export default SchoolInfo;
