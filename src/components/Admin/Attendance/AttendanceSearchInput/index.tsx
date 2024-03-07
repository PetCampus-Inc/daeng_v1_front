import CloseIcon from "assets/svg/close-icon";
import SearchIcon from "assets/svg/search-icon";
import { useState } from "react";

import * as S from "./styles";

type AttendanceSearchInputProps = {
  name?: string;
  onSearch?: (value: string) => void;
} & React.InputHTMLAttributes<HTMLInputElement>;

const AttendanceSearchInput = ({ name, onSearch, ...props }: AttendanceSearchInputProps) => {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleClear = () => {
    setInputValue("");
  };

  const handleSearch = () => {
    onSearch && onSearch(inputValue);
  };

  const disabled = !inputValue.trim();

  return (
    <S.SearchInputContainer>
      <S.SearchInput
        type="search"
        name={name}
        value={inputValue}
        onChange={handleChange}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            handleSearch();
          }
        }}
        {...props}
      />
      {inputValue ? (
        <S.SearchInputButton onClick={handleClear}>
          <CloseIcon className="close-icon" />
        </S.SearchInputButton>
      ) : (
        <S.SearchInputButton onClick={handleSearch} disabled={disabled}>
          <SearchIcon className="search-icon" />
        </S.SearchInputButton>
      )}
    </S.SearchInputContainer>
  );
};

export default AttendanceSearchInput;
