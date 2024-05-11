import SearchIcon from "assets/svg/search-icon";
import XCircleIcon from "assets/svg/x-circle-icon";
import { forwardRef, type ForwardedRef } from "react";

import { StyledInputButton, StyledInputWrapper } from "../styles";
import TextInputField, { type InputFieldProps } from "../TextInputField";

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
  ref?: ForwardedRef<HTMLInputElement>
) {
  const handleClear = () => {
    onClear?.();
  };

  const handleSearch = () => {
    value && onSearch?.(value.toString());
  };

  return (
    <StyledInputWrapper>
      <TextInputField
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
        <StyledInputButton onClick={handleClear}>
          <XCircleIcon />
        </StyledInputButton>
      ) : (
        <StyledInputButton onClick={handleSearch} disabled={readOnly || disabled}>
          <SearchIcon />
        </StyledInputButton>
      )}
    </StyledInputWrapper>
  );
});

export default SearchInputField;
