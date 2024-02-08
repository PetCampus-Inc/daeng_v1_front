import { useEffect, useRef } from "react";
import { Control, FieldValues, UseFormSetValue, UseFormWatch } from "react-hook-form";
import useDetectClose from "hooks/common/useDetectClose";
import useGetBreed from "hooks/api/useGetBreed";
import SearchInputField from "components/common/InputField/SearchInputField";
import BreedDropDown from "components/common/Dropdown/BreedDropdown";

interface IBreedInput {
  name: string;
  width?: string;
  control: Control<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
  watch: UseFormWatch<FieldValues>;
}

const BreedInput = ({ name, control, width = "100%", setValue, watch }: IBreedInput) => {
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
          width={width}
        />
      )}
      {/* TODO: 기획에 질문 에러 발생 시 재시도 해달라는 모달 or 바텀시트 생기게 수정  */}
      {error && <div>추후 토스트 처리</div>}
    </div>
  );
};

export default BreedDropDown;
