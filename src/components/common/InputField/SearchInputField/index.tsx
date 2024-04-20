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
  onClear,
  disabled = false,
  readOnly = false,
  ...props
}: SearchInputFieldProps) => {
  const handleClear = () => {
    onClear?.();
  };

  const handleSearch = () => {
    value && onSearch?.(value.toString());
  };

  return (
    <S.SearchInputWrapper>
      <InputField
        type="search"
        name={name}
        value={value}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            handleSearch();
          }
        }}
        disabled={disabled}
        readOnly={readOnly}
        {...props}
      />
      {value ? (
        <S.SearchInputButton onClick={handleClear}>
          <XCircleIcon />
        </S.SearchInputButton>
      ) : (
        <S.SearchInputButton onClick={handleSearch} disabled={readOnly || disabled}>
          <SearchIcon />
        </S.SearchInputButton>
      )}
    </S.SearchInputWrapper>
  );
};

export default SearchInputField;
