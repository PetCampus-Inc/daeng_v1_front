import SearchIcon from "assets/svg/search-icon";
import XCircleIcon from "assets/svg/x-circle-icon";

import * as S from "./styles";
import InputField from "../index";

import type { InputFieldProps } from "../index";

export interface SearchInputFieldProps extends Omit<InputFieldProps, "type"> {
  onSearch?: (value: string) => void;
  onClear?: () => void;
}

const SearchInputField = ({
  name,
  value,
  onSearch,
  onChange,
  onClear,
  disabled = false,
  ...props
}: SearchInputFieldProps) => {
  const handleClear = () => {
    onClear?.();
  };

  const handleSearch = () => {
    value && onSearch?.(value.toString());
  };

  const searchDisabled = !value?.toString().trim();

  return (
    <S.SearchInputWrapper>
      <InputField
        {...props}
        type="search"
        name={name}
        value={value}
        onChange={onChange}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            handleSearch();
          }
        }}
        disabled={disabled}
      />
      {value ? (
        <S.SearchInputButton onClick={handleClear}>
          <XCircleIcon />
        </S.SearchInputButton>
      ) : (
        <S.SearchInputButton onClick={handleSearch} disabled={searchDisabled}>
          <SearchIcon />
        </S.SearchInputButton>
      )}
    </S.SearchInputWrapper>
  );
};

export default SearchInputField;
