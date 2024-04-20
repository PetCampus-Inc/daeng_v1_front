import SearchInputField, {
  type SearchInputFieldProps
} from "components/common/InputField/SearchInputField";
import BreedDropDown from "components/Enrollment/Input/BreedDropDown";
import useGetBreed from "hooks/api/useGetBreed";
import { useClickOutSide } from "hooks/common/useClickOutSide";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { FieldValues, UseFormRegister, UseFormSetValue, UseFormWatch } from "react-hook-form";
import showToast from "utils/showToast";

interface IBreedInput extends SearchInputFieldProps {
  name: string;
  setValue: UseFormSetValue<FieldValues>;
  register: UseFormRegister<FieldValues>;
  watch: UseFormWatch<FieldValues>;
  isRequired?: boolean;
}

const BreedInput = ({ name, register, setValue, watch, isRequired = false }: IBreedInput) => {
  const dropDownRef = useRef<HTMLDivElement | null>(null);
  const [isDropdownOpen, isSetDropdownOpen] = useState<boolean>(false);

  const watchInputValue = watch(name);
  const { data, refetch, isSuccess, error } = useGetBreed(watchInputValue);
  const breedId = watch("breedId");

  useEffect(() => {
    // 아무것도 입력되지 않았거나 정상적으로 선택되었을 때
    if (!watchInputValue || breedId) {
      return isSetDropdownOpen(false);
    }
    // 견종 검색 API 호출
    const timer = setTimeout(async () => {
      await refetch();
    }, 270);

    isSetDropdownOpen(true);
    return () => clearTimeout(timer);
  }, [watchInputValue]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setValue(name, value);
    setValue("breedId", 0); // 드롭다운 제어를 위한 breedId 초기화
  };

  // dropdown 열기/닫기 관리
  useClickOutSide({
    enabled: isDropdownOpen,
    targetRef: dropDownRef,
    onClickOutside: () => isSetDropdownOpen(false)
  });

  if (error) {
    showToast("견종을 불러오는 데 실패했습니다. 다시 시도해주세요", "bottom");
  }

  return (
    <div ref={dropDownRef} style={{ position: "relative" }}>
      <SearchInputField
        name={name} // newBreed
        register={register}
        value={watchInputValue}
        onChange={handleInputChange}
        onClick={() => {
          if (!watchInputValue) return;
          isSetDropdownOpen(true);
        }} // 검색창을 클릭했을 때 드롭다운 표시, but 아무 값도 입력하지 않았을 땐 X
        onClear={() => setValue(name, "")}
        isRequired={isRequired}
        placeholder="견종을 입력해주세요"
      />
      {isDropdownOpen && isSuccess && data && (
        <BreedDropDown
          dropDownList={data.data}
          setIsOpen={isSetDropdownOpen}
          value={watchInputValue}
          setValue={setValue}
        />
      )}
    </div>
  );
};

export default BreedInput;
