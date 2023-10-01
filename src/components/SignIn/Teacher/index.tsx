import { memo, Dispatch, SetStateAction } from "react";
import Step1 from "../Step/step1";

interface Props {
  searchText: string;
  setSearchText: Dispatch<SetStateAction<string>>;
  searchResultText: string[];
  setSearchResultText: Dispatch<SetStateAction<string[]>>;
  selectedSearchText: string;
  setSelectedSearchText: Dispatch<SetStateAction<string>>;
}

const Teacher = ({
  searchText,
  setSearchText,
  searchResultText,
  setSearchResultText,
  selectedSearchText,
  setSelectedSearchText,
}: Props) => {
  return (
    <Step1
      searchText={searchText}
      setSearchText={setSearchText}
      searchResultText={searchResultText}
      setSearchResultText={setSearchResultText}
      selectedSearchText={selectedSearchText}
      setSelectedSearchText={setSelectedSearchText}
    />
  );
};

export default memo(Teacher);
