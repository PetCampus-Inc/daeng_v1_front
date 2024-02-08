import { FieldValues, UseFormSetValue } from "react-hook-form";
import InputField from "../index";
import type { InputFieldProps } from "../index";

import * as S from "./styles";

interface SearchInputFieldProps extends Omit<InputFieldProps, "type"> {
  onSearch?: (value: string) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  setValue: UseFormSetValue<FieldValues>;
}

const SearchInputField = ({ name, onSearch, value, setValue, ...props }: SearchInputFieldProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(name, e.target.value);
    props.onChange && props.onChange(e);
  };

  const handleClear = () => {
    setValue(name, "");
  };

  const handleSearch = () => {
    onSearch && onSearch(value);
  };

  return (
    <S.SearchInputWrapper>
      <InputField
        {...props}
        type="search"
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
        <S.SearchInputButton onClick={handleSearch}>
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
