import { Button, Flex } from "components/common";
import SearchInputField from "components/common/Input/SearchInputField";
import { useGetSchool } from "hooks/api/signup";
import { useClickOutSide } from "hooks/common/useClickOutSide";
import { useKeyboardAwareView } from "hooks/common/useKeyboardAwareView";
import { ChangeEvent, type RefObject, useCallback, useRef, useState } from "react";

import SchoolListDropdown from "./SchoolListDropdown";

interface SchoolSearchInputBoxProps {
  onSelect?: (id: number, name: string) => void;
  onClear?: () => void;
}

const SchoolSearchInputBox = ({ onSelect, onClear }: SchoolSearchInputBoxProps) => {
  const contentRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");

  const { data } = useGetSchool(searchQuery);
  const { isKeyboardOpen, style } = useKeyboardAwareView();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    onClear?.();
  };

  const handleInputSearch = (value: string) => {
    setSearchQuery(value);
    setShowDropdown(true);
    onClear?.();
  };

  const handleInputClear = () => {
    setSearchQuery("");
    setShowDropdown(false);
    setInputValue("");
    onClear?.();
  };

  const handleItemSelect = useCallback(
    (id: number, name: string) => {
      setInputValue(name);
      setShowDropdown(false);
      onSelect?.(id, name);
    },
    [onSelect]
  );

  useClickOutSide({
    enabled: showDropdown,
    targetRef: contentRef,
    onClickOutside: () => setShowDropdown(false)
  });

  // useEffect(
  //   function handleDropdown() {
  //     const shouldCloseDropdown = !searchText || schoolId;
  //     setShowDropdown(!shouldCloseDropdown);
  //   },
  //   [searchText, schoolId]
  // );

  return (
    <Flex ref={contentRef} direction="column" gap={8}>
      <SearchInputField
        name="schoolSearch"
        placeholder="검색어를 입력해주세요"
        value={inputValue}
        onSearch={handleInputSearch}
        onClear={handleInputClear}
        onChange={handleInputChange}
      />
      {data && showDropdown && <SchoolListDropdown list={data} onSelect={handleItemSelect} />}
      {isKeyboardOpen && (
        <Button style={style} disabled={!inputValue} onClick={() => handleInputSearch(inputValue)}>
          검색
        </Button>
      )}
    </Flex>
  );
};

export default SchoolSearchInputBox;
