import { Dispatch, SetStateAction } from "react";
import * as S from "./styles";
import Button from "../Button";

interface IDropDown {
  dropDownList: { breedId: number; breedName: string }[];
  isOpen: boolean | Dispatch<SetStateAction<boolean>>;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setInputValue: Dispatch<SetStateAction<string | number>>;
  width: string;
  setChosenBreedId: Dispatch<SetStateAction<number | null>>;
}

const DropDown = ({
  dropDownList,
  isOpen,
  setIsOpen,
  setInputValue,
  width,
  setChosenBreedId
}: IDropDown) => {
  const handleClick = (value: { breedName: string; breedId: number }) => {
    setInputValue(value.breedName);
    setIsOpen(!isOpen);
    setChosenBreedId(value.breedId);
  };

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
  return (
    <S.List width={width}>
      {dropDownList.map((value, index) => (
        <S.ListItem key={index} onClick={() => handleClick(value)}>
          {value.breedName}
        </S.ListItem>
      ))}
    </S.List>
  );
};

export default DropDown;
