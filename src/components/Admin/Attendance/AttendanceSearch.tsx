import React, { useState, useCallback } from "react";

import AttendanceSearchInput from "./AttendanceInput/AttendanceSearchInput";
import { useSearchContext } from "./hooks/useSearchContext";

export function AttendanceSearch() {
  const [inputText, setInputText] = useState("");
  const { setSearchText, setIsFocused } = useSearchContext();

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
