import React, { useEffect, useRef, useState } from "react";
import DropDown from "components/common/Dropdown";
import useDetectClose from "hooks/common/useDetectClose";
import useGetBreed from "hooks/api/useGetBreed";
import SearchInputField from "components/common/InputField/SearchInputField";
import { Control, FieldValues } from "react-hook-form";

interface IBreedInput {
  name: string;
  chosenBreedId: number | null;
  setChosenBreedId: React.Dispatch<React.SetStateAction<number | null>>;
  width?: string;
  control: Control<FieldValues>;
}

const BreedInput = ({
  name,
  chosenBreedId,
  setChosenBreedId,
  control,
  width = "100%"
}: IBreedInput) => {
  const dropDownRef = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useDetectClose(dropDownRef, false);
  const [breedValue, setBreedValue] = useState<string>("");
  const { data, refetch, isSuccess, error } = useGetBreed(breedValue);

  useEffect(() => {
    // 아무것도 입력되지 않았거나 정상적으로 선택되었을 때
    if (!breedValue || chosenBreedId) {
      setIsOpen(false);
      return;
    }
    // 견종 검색 API 호출
    const timer = setTimeout(async () => {
      await refetch();
    }, 270);
    setIsOpen(true);
    return () => clearTimeout(timer);
  }, [breedValue, chosenBreedId]);

  return (
    <div ref={dropDownRef} style={{ position: "relative" }}>
      <SearchInputField
        name={name}
        control={control}
        placeholder="견종을 입력해주세요"
        onChange={() => {
          setChosenBreedId(null);
        }}
        value={breedValue}
        setValue={setBreedValue}
      />
      {isOpen && isSuccess && data && (
        <DropDown
          dropDownList={data.data}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          setInputValue={setBreedValue}
          width={width}
          setChosenBreedId={setChosenBreedId}
        />
      )}
      {/* TODO: 기획에 질문 에러 발생 시 재시도 해달라는 모달 or 바텀시트 생기게 수정  */}
      {error && <div>추후 토스트 처리</div>}
    </div>
  );
};

export default BreedInput;
