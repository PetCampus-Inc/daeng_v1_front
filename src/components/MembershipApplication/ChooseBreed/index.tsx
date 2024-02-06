import React, { useEffect, useRef } from "react";
import DropDown from "components/common/Dropdown";
import useDetectClose from "hooks/useDetectClose";
import useGetBreed from "hooks/useGetBreed";
import SearchInputField from "components/common/InputField/SearchInputField";
import { useFormContext } from "react-hook-form";

interface IBreedInput {
  name: string;
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  chosenBreedId: number | null;
  setChosenBreedId: React.Dispatch<React.SetStateAction<number | null>>;
  width?: string;
}

const BreedInput = ({
  name,
  inputValue,
  setInputValue,
  chosenBreedId,
  setChosenBreedId,
  width = "100%"
}: IBreedInput) => {
  const { control } = useFormContext();
  const dropDownRef = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useDetectClose(dropDownRef, false);
  const { data, refetch, isSuccess, error } = useGetBreed(inputValue);

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setInputValue(e.target.value);
  //   setChosenBreedId(null);
  // };

  useEffect(() => {
    // 아무것도 입력되지 않았거나 정상적으로 선택되었을 때
    if (!inputValue || chosenBreedId) {
      setIsOpen(false);
      return;
    }
    // 견종 검색 API 호출
    const timer = setTimeout(async () => {
      await refetch();
    }, 270);
    setIsOpen(true);
    return () => clearTimeout(timer);
  }, [inputValue, chosenBreedId]);

  return (
    <div ref={dropDownRef} style={{ position: "relative" }}>
      <SearchInputField
        name={name}
        control={control}
        placeholder="견종을 입력해주세요"
        onChange={() => {
          setChosenBreedId(null);
        }}
      />
      {/* <InputBox
        type="search"
        width={width}
        height="48px"
        radius="5px"
        color="black"
        border="1px solid #e0e0e0"
        placeholdText="견종을 입력해주세요"
        inputValue={inputValue}
        setInputValue={setInputValue}
        onChange={handleChange}
        handleClick={() => {
          setInputValue("");
          setChosenBreedId(null);
        }}
      /> */}
      {isOpen && isSuccess && data && (
        <DropDown
          dropDownList={data.data}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          setInputValue={setInputValue}
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
