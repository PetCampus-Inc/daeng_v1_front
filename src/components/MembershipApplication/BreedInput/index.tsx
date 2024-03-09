import BreedDropDown from "components/common/Dropdown/BreedDropdown";
import SearchInputField, {
  type SearchInputFieldProps
} from "components/common/InputField/SearchInputField";
import useGetBreed from "hooks/api/useGetBreed";
import useDetectClose from "hooks/common/useDetectClose";
import { useEffect, useRef } from "react";
import { FieldValues, UseFormSetValue, UseFormWatch } from "react-hook-form";
import showToast from "utils/showToast";

interface IBreedInput extends SearchInputFieldProps {
  name: string;
  setValue: UseFormSetValue<FieldValues>;
  watch: UseFormWatch<FieldValues>;
  isRequired?: boolean;
}

const BreedInput = ({ name, setValue, watch, isRequired = false }: IBreedInput) => {
  const dropDownRef = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useDetectClose(dropDownRef, false);
  const value = watch(`${name}`) ? watch(`${name}`) : "";
  const { data, refetch, isSuccess, error } = useGetBreed(value);
  const breedId = watch("breedId");

  useEffect(() => {
    // 아무것도 입력되지 않았거나 정상적으로 선택되었을 때
    if (!value || breedId) {
      setIsOpen(false);
      return;
    }
    // 견종 검색 API 호출
    const timer = setTimeout(async () => {
      await refetch();
    }, 270);
    setIsOpen(true);
    return () => clearTimeout(timer);
  }, [value, breedId]);

  if (error) {
    showToast("견종을 불러오는 데 실패했습니다. 다시 시도해주세요", "bottom");
  }

  return (
    <div ref={dropDownRef} style={{ position: "relative" }}>
      <SearchInputField
        name={name}
        placeholder="견종을 입력해주세요"
        onChange={() => {
          setValue("breedId", 0);
        }}
        value={value}
        setValue={setValue}
        isRequired={isRequired}
      />
      {isOpen && isSuccess && data && (
        <BreedDropDown
          dropDownList={data.data}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          value={value}
          setValue={setValue}
        />
      )}
    </div>
  );
};

export default BreedInput;
