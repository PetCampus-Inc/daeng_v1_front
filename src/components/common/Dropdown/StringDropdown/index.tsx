import { useEffect, useRef } from "react";
import * as S from "../styles";
import { CommonDropdownProps } from "../dropdown.type";

interface IStringDropdown extends CommonDropdownProps {
  name: string;
  dropDownList: string[];
}

const StringDropdown = ({ dropDownList, setIsOpen, value, setValue, name }: IStringDropdown) => {
  // 선택된 값이 가장 상단에 위치
  const chosenItemRef = useRef<HTMLLIElement | null>(null);
  useEffect(() => {
    if (chosenItemRef.current) {
      const topOffset = chosenItemRef.current.offsetTop;
      chosenItemRef.current.parentElement!.scrollTop = topOffset;
    }
  }, [value]);

  const handleClick = (e: React.MouseEvent<HTMLLIElement>, item: string) => {
    e.stopPropagation();
    setValue && setValue(name, item);
    setIsOpen(false);
  };

  return (
    <S.List>
      {dropDownList.map((item, index) => (
        <S.ListItem
          key={index}
          className={value === item ? "chosen" : ""}
          onClick={(e) => handleClick(e, item)}
          ref={value === item ? chosenItemRef : null}
        >
          {item}
        </S.ListItem>
      ))}
    </S.List>
  );
};

export default StringDropdown;
