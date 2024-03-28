import Button from "components/common/Button";
import { Dispatch, SetStateAction, useRef } from "react";

import * as S from "../styles";
import { CommonDropdownProps } from "../type";

interface IBreedDropdown extends CommonDropdownProps {
  isOpen: boolean | Dispatch<SetStateAction<boolean>>;
  dropDownList: { breedId: number; breedName: string }[];
}

const BreedDropDown = ({ dropDownList, isOpen, setIsOpen, value, setValue }: IBreedDropdown) => {
  const chosenItemRef = useRef<HTMLLIElement | null>(null);

  const handleClick = (
    e: React.MouseEvent<HTMLLIElement>,
    item: { breedName: string; breedId: number }
  ) => {
    e.stopPropagation();
    setValue("newBreed", item.breedName);
    setValue("breedId", item.breedId);
    setIsOpen(false);
  };

  // 견종 드롭다운 (검색 결과 X)
  if (!dropDownList || dropDownList.length === 0) {
    return (
      <S.List className="no-list">
        <S.BoldText>
          검색 결과가 없어요
          <br />
          견종을 정확히 입력해주세요
        </S.BoldText>
        <S.ThinText>ex) 밀티즈(x) → 말티즈(O)</S.ThinText>
        <Button width="100%" height="48px" margintop="20px" handleClick={() => setIsOpen(!isOpen)}>
          견종 등록하기
        </Button>
      </S.List>
    );
  }
  // 견종 드롭다운 (검색 결과 O)
  return (
    <S.List>
      {dropDownList.map((item, index) => (
        <S.ListItem
          key={index}
          className={value === item.breedName ? "chosen" : ""}
          onClick={(e) => handleClick(e, item)}
          ref={value === item.breedName ? chosenItemRef : null}
        >
          {item.breedName}
        </S.ListItem>
      ))}
    </S.List>
  );
};

export default BreedDropDown;
