import { memo, Dispatch, SetStateAction } from "react";
import Step1 from "../Step/step1";
import useSignIn from "hooks/useSignIn";

const Teacher = () => {
  const {
    searchText,
    setSearchText,
    searchResultText,
    setSearchResultText,
    selectedSearchText,
    setSelectedSearchText,
    handlerGetSearchResult,
  } = useSignIn();
  return (
    <Step1
      searchText={searchText}
      setSearchText={setSearchText}
      searchResultText={searchResultText}
      setSearchResultText={setSearchResultText}
      selectedSearchText={selectedSearchText}
      setSelectedSearchText={setSelectedSearchText}
      handlerGetSearchResult={handlerGetSearchResult}
    />
  );
};

export default memo(Teacher);
