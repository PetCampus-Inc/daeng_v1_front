import React, { useEffect, useRef } from "react";
import DropDown from "components/common/Dropdown";
import Title from "components/common/Title";
import InputBox from "components/common/InputBox";
import useDetectClose from "hooks/useDetectClose";

interface IBreedInput {
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  chosenBreedId: number | null;
  setChosenBreedId: React.Dispatch<React.SetStateAction<number | null>>;
  width?: string;
}

const BreedInput = ({
  inputValue,
  setInputValue,
  chosenBreedId,
  setChosenBreedId,
  width = "100%"
}: IBreedInput) => {
  const dropDownRef = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useDetectClose(dropDownRef, false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setChosenBreedId(null);
  };
  useEffect(() => {
    if (!inputValue || chosenBreedId) {
      setIsOpen(false);
      return;
    }
    const timer = setTimeout(() => {
      // 여기서 API 호출
      setIsOpen(true);
      console.log("API 호출 with:", inputValue);
    }, 600);
    return () => clearTimeout(timer);
  }, [inputValue]);

  const test = [
    {
      breedId: 10,
      breedName: "마렘마 십독"
    },
    {
      breedId: 11,
      breedName: "말티즈(몰티즈)"
    },
    {
      breedId: 12,
      breedName: "맨체스터 테리어"
    },
    {
      breedId: 13,
      breedName: "멕시칸 헤어리스 도그"
    },
    {
      breedId: 14,
      breedName: "미니어처 핀셔"
    }
  ];

  return (
    <div ref={dropDownRef}>
      <Title isRequired>견종</Title>
      <InputBox
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
      />
      {isOpen && (
        <DropDown
          dropDownList={test}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          setInputValue={setInputValue}
          width={width}
          setChosenBreedId={setChosenBreedId}
        />
      )}
    </div>
  );
};

export default BreedInput;
