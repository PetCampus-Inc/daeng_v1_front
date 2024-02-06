import { FieldValues } from "react-hook-form";
import InputField from "../index";
import type { InputFieldProps } from "../index";

import * as S from "./styles";

interface SearchInputFieldProps<TFieldValues extends FieldValues>
  extends Omit<InputFieldProps<TFieldValues>, "type"> {
  onSearch?: (value: string) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  setValue: (value: string) => void;
}

const SearchInputField = <TFieldValues extends FieldValues>({
  name,
  onSearch,
  value,
  setValue,
  ...props
}: SearchInputFieldProps<TFieldValues>) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    props.onChange && props.onChange(e);
  };

  const handleClear = () => {
    setValue("");
  };

  const handleSearch = () => {
<<<<<<< HEAD
    onSearch && onSearch(value);
=======
    onSearch && onSearch(inputValue);
>>>>>>> a7fe806 (Feat: Change inputbox to inputfield component in BreedInput)
  };

  return (
    <S.SearchInputWrapper>
      <InputField<TFieldValues>
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
<<<<<<< HEAD
      {!value ? (
        <S.SearchInputButton onClick={() => onSearch && onSearch(value)}>
=======
      {!inputValue ? (
        <S.SearchInputButton onClick={handleSearch}>
>>>>>>> a7fe806 (Feat: Change inputbox to inputfield component in BreedInput)
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
