import { useEffect, useRef } from "react";
import { Control, FieldValues, UseFormSetValue, UseFormWatch } from "react-hook-form";
import useDetectClose from "hooks/common/useDetectClose";
import useGetBreed from "hooks/api/useGetBreed";
import SearchInputField from "components/common/InputField/SearchInputField";
import BreedDropDown from "components/common/Dropdown/BreedDropdown";
import showToast from "utils/showToast";

interface IBreedInput {
  name: string;
  control: Control<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
  watch: UseFormWatch<FieldValues>;
}

const BreedInput = ({ name, control, setValue, watch }: IBreedInput) => {
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
        control={control}
        placeholder="견종을 입력해주세요"
        onChange={() => {
          setValue("breedId", 0);
        }}
        value={value}
        setValue={setValue}
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
