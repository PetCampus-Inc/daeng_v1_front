import SearchInputField, {
  type SearchInputFieldProps
} from "components/common/InputField/SearchInputField";
import BreedDropDown from "components/Enrollment/Input/BreedDropDown";
import { useGetBreed } from "hooks/api/member/enroll";
import { useClickOutSide } from "hooks/common/useClickOutSide";
import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [debouncedValue, setDebouncedValue] = useState<string>("");
  const watchInputValue = watch(name);
  const { data, error } = useGetBreed(debouncedValue);
  const breedId = watch("breedId");

  useEffect(() => {
    const shouldCloseDropdown = !watchInputValue || breedId;
    setIsDropdownOpen(!shouldCloseDropdown);
  }, [watchInputValue, breedId]);

  useEffect(() => {
    if (!isDropdownOpen || !watchInputValue) return;

    const timer = setTimeout(() => {
      setDebouncedValue(watchInputValue);
    }, 270);

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [isDropdownOpen, watchInputValue]);

  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setValue(name, value);
      setValue("breedId", 0); // breedId 초기화
    },
    [name, setValue]
  );

  useClickOutSide({
    enabled: isDropdownOpen,
    targetRef: dropDownRef,
    onClickOutside: () => setIsDropdownOpen(false)
  });

  if (error) {
    showToast("견종을 불러오는 데 실패했습니다. 다시 시도해주세요", "bottom");
  }

  return (
    <div ref={dropDownRef} style={{ position: "relative" }}>
      <SearchInputField
        name={name}
        register={register}
        value={watchInputValue}
        onChange={handleInputChange}
        onClick={() => setIsDropdownOpen(!!watchInputValue)}
        onClear={() => setValue(name, "")}
        isRequired={isRequired}
        placeholder="견종을 입력해주세요"
      />
      {isDropdownOpen && data && (
        <BreedDropDown
          dropDownList={data.data}
          setIsOpen={setIsDropdownOpen}
          value={watchInputValue}
          setValue={setValue}
        />
      )}
    </div>
  );
};

export default BreedInput;
