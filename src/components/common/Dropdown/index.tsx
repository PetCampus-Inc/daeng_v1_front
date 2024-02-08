import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import * as S from "./styles";
import Button from "../Button";
import { FieldValues, UseFormSetValue } from "react-hook-form";

interface IDropDown {
  dropDownList: { breedId: number; breedName: string }[] | string[];
  isOpen: boolean | Dispatch<SetStateAction<boolean>>;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  inputValue?: string;
  setInputValue?: Dispatch<SetStateAction<string>>;
  width: string;
  setValue?: UseFormSetValue<FieldValues>;
}

// 온보딩 - 생일 선택, 견종 선택에서 쓰이는 드롭다운
const DropDown = ({
  dropDownList,
  isOpen,
  setIsOpen,
  inputValue,
  setInputValue,
  width,
  setValue
}: IDropDown) => {
  // 생일 드롭다운 : 선택된 값이 가장 상단에 위치
  const chosenItemRef = useRef<HTMLLIElement | null>(null);
  useEffect(() => {
    if (chosenItemRef.current) {
      const topOffset = chosenItemRef.current.offsetTop;
      chosenItemRef.current.parentElement!.scrollTop = topOffset;
    }
  }, [inputValue]);

  const handleClick = (
    e: React.MouseEvent<HTMLLIElement>,
    value: { breedName: string; breedId: number } | string
  ) => {
    e.stopPropagation();
    if (typeof value === "object") {
      // 견종 드롭다운
      setValue && setValue("dogBreed", value.breedName);
      setValue!("breedId", value.breedId);
    } else {
      // 생일 드롭다운
      setInputValue && setInputValue(value);
    }
    setIsOpen(false);
  };

  // 견종 드롭다운 (검색 결과X)
  if (!dropDownList || dropDownList.length === 0) {
    return (
      <S.List width={width} className="no-list">
        <S.BoldText>
          검색 결과가 없어요
          <br />
          견종을 정확히 입력해주세요
        </S.BoldText>
        <S.ThinText>ex) 몰티즈(x) → 말티즈(O)</S.ThinText>
        <Button width="100%" height="48px" margintop="20px" handleClick={() => setIsOpen(!isOpen)}>
          견종 등록하기
        </Button>
      </S.List>
    );
  }
  // 견종 드롭다운 (검색 결과 O) & 생일 드롭다운
  return (
    <S.List width={width}>
      {dropDownList.map((value, index) => (
        <S.ListItem
          key={index}
          className={inputValue === value ? "chosen" : ""}
          onClick={(e) => handleClick(e, value)}
          ref={inputValue === value ? chosenItemRef : null}
        >
          {typeof value === "object" && "breedName" in value ? value.breedName : value}
        </S.ListItem>
      ))}
    </S.List>
  );
};

export default DropDown;
