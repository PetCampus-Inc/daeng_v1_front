import { memo, Dispatch, SetStateAction } from "react";
import Step1 from "../Step/step1";
import useSignIn from "hooks/useSignIn";

interface Props {
  currentMainStep: number;
  setCurrentMainStep: Dispatch<SetStateAction<number>>;
}

const Teacher = ({ currentMainStep, setCurrentMainStep }: Props) => {
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
      currentMainStep={currentMainStep}
      setCurrentMainStep={setCurrentMainStep}
    />
  );
};

export default memo(Teacher);
