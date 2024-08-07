import { Text } from "components/common";
import { Button } from "components/common/Button";
import { useRef } from "react";

import * as S from "../../common/Dropdown/StringDropdown/styles";
import { CommonDropdownProps } from "../../common/Dropdown/StringDropdown/type";

interface IBreedDropdown extends CommonDropdownProps {
  dropDownList: { breedId: number; breedName: string }[];
}

const BreedDropDown = ({ dropDownList, setIsOpen, value, setValue }: IBreedDropdown) => {
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
        <Text typo="body2_16_B" color="gray_1">
          검색 결과가 없어요
          <br />
          견종을 정확히 입력해주세요
        </Text>
        <Text typo="label2_14_R" color="gray_2">
          ex) 밀티즈(x) → 말티즈(O)
        </Text>
        <Button
          width="full"
          onClick={() => setIsOpen(false)}
          css={{
            height: "48px",
            marginTop: "20px"
          }}
        >
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
