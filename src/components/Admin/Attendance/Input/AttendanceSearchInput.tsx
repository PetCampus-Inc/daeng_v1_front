import SearchIcon from "assets/svg/search-icon";
import XCircleIcon from "assets/svg/x-circle-icon";

import * as S from "./styles";

type AttendanceSearchInputProps = {
  name?: string;
  onSearch?: (value: string) => void;
  onClear?: () => void;
} & React.InputHTMLAttributes<HTMLInputElement>;

const AttendanceSearchInput = ({
  name,
  value,
  onSearch,
  onChange,
  onClear,
  ...props
}: AttendanceSearchInputProps) => {
  const handleClear = () => {
    onClear && onClear();
  };

  const handleSearch = () => {
    value && onSearch && onSearch(value?.toString());
  };

  const disabled = !value?.toString().trim();

  return (
    <S.SearchInputContainer>
      <S.SearchInput
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
        {...props}
      />
      {value ? (
        <S.SearchInputButton onClick={handleClear}>
          <XCircleIcon className="close-icon" colorScheme="brown" />
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
