import SearchIcon from "assets/svg/search-icon";
import XCircleIcon from "assets/svg/x-circle-icon";
import { forwardRef, type ForwardedRef } from "react";

import * as S from "./styles";
import InputField from "../index";

import type { InputFieldProps } from "../index";

export interface SearchInputFieldProps extends Omit<InputFieldProps, "type"> {
  onSearch?: (value: string) => void;
  onClear?: () => void;
  inputType?: string;
}

const SearchInputField = forwardRef(function SearchInputField(
  {
    name,
    value,
    onSearch,
    onClear,
    disabled = false,
    readOnly = false,
    inputType,
    ...props
  }: SearchInputFieldProps,
  ref: ForwardedRef<HTMLInputElement>
) {
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
        ref={ref}
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
      {!inputType && value ? ( // FIXME: inputType 여부 재고필요.
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
});

export default SearchInputField;
