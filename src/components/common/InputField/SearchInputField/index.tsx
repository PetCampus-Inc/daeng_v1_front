import SearchIcon from "assets/svg/search-icon";
import { FieldValues, UseFormSetValue } from "react-hook-form";

import * as S from "./styles";
import InputField from "../index";

import type { InputFieldProps } from "../index";

export interface SearchInputFieldProps extends Omit<InputFieldProps, "type"> {
  onSearch?: (value: string) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  setValue?: UseFormSetValue<FieldValues>;
}

const SearchInputField = ({
  name,
  onSearch,
  value,
  setValue,
  disabled = false,
  ...props
}: SearchInputFieldProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue && setValue(name, e.target.value);
    props.onChange && props.onChange(e);
  };

  const handleClear = () => {
    setValue && setValue(name, "");
  };

  const handleSearch = () => {
    value && onSearch && onSearch(value);
  };

  return (
    <S.SearchInputWrapper>
      <InputField
        {...props}
        type="search"
        disabled={disabled}
        name={name}
        value={value}
        onChange={handleChange}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            handleSearch();
          }
        }}
      />
      {!value ? (
        <S.SearchInputButton onClick={handleSearch} disabled={disabled}>
          <SearchIcon />
        </S.SearchInputButton>
      ) : (
        <S.SearchInputButton onClick={handleClear}>
          <img src="/images/x-box.png" alt="x-box" />
        </S.SearchInputButton>
      )}
    </S.SearchInputWrapper>
  );
};

export default SearchInputField;
