import { useState } from "react";
import { FieldValues } from "react-hook-form";
import InputField from "../index";
import type { InputFieldProps } from "../index";

import * as S from "./styles";

interface SearchInputFieldProps<TFieldValues extends FieldValues>
  extends Omit<InputFieldProps<TFieldValues>, "type"> {
  onSearch: (value: string) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchInputField = <TFieldValues extends FieldValues>({
  name,
  onSearch,
  ...props
}: SearchInputFieldProps<TFieldValues>) => {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    props.onChange && props.onChange(e);
  };

  const handleClear = () => {
    setInputValue("");
  };

  const handleSearch = () => {
    onSearch(inputValue);
  };

  return (
    <S.SearchInputWrapper>
      <InputField<TFieldValues>
        {...props}
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
      />
      {!inputValue ? (
        <S.SearchInputButton onClick={() => onSearch(inputValue)}>
          <img src="/images/search.png" alt="search-icon" />
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
