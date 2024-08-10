import { REGISTRATION_REGEX, SCHOOL_PHONE_REGEX } from "constants/validCheck";

import { ButtonInput, Flex, SearchInput, Text, TextInput } from "components/common";
import Postcode from "components/common/Postcode";
import { useCheckRegNum } from "hooks/api/signup";
import { useOverlay } from "hooks/common/useOverlay";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { formatBusinessNumber, formatSchoolNumber } from "utils/formatter";

const SchoolInfo = () => {
  const {
    register,
    setValue,
    watch,
    getFieldState,
    getValues,
    setError,
    clearErrors,
    formState: { errors }
  } = useFormContext();

  const regNum = watch("registrationNumber");
  const regNumFieldState = getFieldState("registrationNumber");
  const watchAddress = watch("schoolAddress", "");

  const [isValidRegNum, setIsValidRegNum] = useState<boolean>(false);

  const { mutateCheckRegNum } = useCheckRegNum();
  const overlay = useOverlay();

  useEffect(() => {
    if (regNumFieldState.isDirty) {
      setIsValidRegNum(false);
    }
  }, [regNum, regNumFieldState.isDirty]);

  const handleValid = () => {
    const schoolNum = getValues("registrationNumber").replace(/-/g, "");
    mutateCheckRegNum(schoolNum, {
      onSuccess: (res) => {
        if (res === "01") {
          clearErrors("registrationNumber");
          setIsValidRegNum(true);
        } else {
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

  const handleClear = () => {
    setValue("schoolAddress", "");
  };

  const openPostCodePopup = () =>
    overlay.open(({ isOpen, close }) => (
      <Postcode isOpen={isOpen} close={close} field={"schoolAddress"} setValue={setValue} />
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
          onClick={openPostCodePopup}
          onClear={handleClear}
          value={watchAddress}
          readOnly
          required
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
          {isValidRegNum && !errors.registrationNumber && (
            <Text as="span" typo="caption1_12_R" color="green">
              인증되었습니다.
            </Text>
          )}
        </Flex>
        <ButtonInput
          name="registrationNumber"
          register={register}
          placeholder="사업자 등록번호를 입력해 주세요"
          onChange={(e) => {
            handleChangeBusinessNumber("registrationNumber")(e);
            register("registrationNumber").onChange(e);
          }}
          handleClick={handleValid}
          rules={{
            pattern: REGISTRATION_REGEX
          }}
          enabled={
            !errors.registrationNumber && !regNumFieldState.invalid && regNumFieldState.isTouched
          }
          required
        />
      </Flex>
    </Flex>
  );
};

export default SchoolInfo;
