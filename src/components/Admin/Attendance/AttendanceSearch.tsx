import { useState, useCallback } from "react";

import AttendanceSearchInput from "./AttendanceInput/AttendanceSearchInput";

type AttendanceSearchProps = {
  setSearchText: (text: string) => void;
  setIsFocused: (focused: boolean) => void;
};

export function AttendanceSearch({ setSearchText, setIsFocused }: AttendanceSearchProps) {
  const [inputText, setInputText] = useState("");

  const handleSearch = useCallback(
    (value: string) => {
      setSearchText(value);
    },
    [setSearchText]
  );

  const handleClear = useCallback(() => {
    setInputText("");
    setSearchText("");
  }, [setSearchText]);

  return (
    <AttendanceSearchInput
      name="dogSearch"
      placeholder="검색"
      onChange={(e) => setInputText(e.target.value)}
      onSearch={handleSearch}
      onClear={handleClear}
      value={inputText}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    />
  );
}
