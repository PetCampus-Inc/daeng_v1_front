import { Flex } from "components/common";
import SearchInputField from "components/common/Input/SearchInputField";
import { useGetSchool } from "hooks/api/signup";
import { useClickOutSide } from "hooks/common/useClickOutSide";
import { type RefObject, useCallback, useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { schoolIdAtom } from "store/form";

import SchoolListDropdown from "./SchoolListDropdown";

interface SchoolSearchInputBoxProps {
  searchText: string;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
}

const SchoolSearchInputBox = ({ searchText, setSearchText }: SchoolSearchInputBoxProps) => {
  const contentRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  const [schoolId, setSchoolId] = useRecoilState(schoolIdAtom);

  const { data } = useGetSchool(searchQuery);

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    setShowDropdown(true);
  };

  const handleClear = () => {
    setSearchText("");
    setSearchQuery("");
    setSchoolId(null);
    setShowDropdown(false);
  };

  const handleItemSelect = useCallback((id: number, name: string) => {
    setSchoolId(id);
    setSearchText(name);
    setShowDropdown(false);
  }, []);

  useClickOutSide({
    enabled: showDropdown,
    targetRef: contentRef,
    onClickOutside: () => setShowDropdown(false)
  });

  useEffect(
    function handleDropdown() {
      const shouldCloseDropdown = !searchText || schoolId;
      setShowDropdown(!shouldCloseDropdown);
    },
    [searchText, schoolId]
  );

  return (
    <Flex ref={contentRef} direction="column" gap={8}>
      <SearchInputField
        name="schoolSearch"
        placeholder="검색어를 입력해주세요"
        value={searchText}
        onSearch={handleSearch}
        onClear={handleClear}
        onChange={(e) => {
          setSchoolId(null);
          setSearchText(e.target.value);
        }}
      />
      {data && showDropdown && <SchoolListDropdown list={data} handleSelected={handleItemSelect} />}
    </Flex>
  );
};

export default SchoolSearchInputBox;
