import { DOGOWNER } from "constants/className";

import Header from "components/common/Header";
import SchoolSearch from "components/Member/SchoolInfo/SchoolSearch";
import useSignUp from "hooks/api/useSignUp";

const SchoolSearchPage = () => {
  const {
    currentMainStep,
    setCurrentMainStep,
    currentStep,
    setCurrentStep,
    searchText,
    setSearchText,
    searchResultText,
    setSearchResultText,
    selectedSearchText,
    setSelectedSearchText,
    handlerGetSearchResult,
    handlerDeleteSearchResult,
    schoolId,
    setSchoolId
  } = useSignUp();
  return (
    <>
      <Header type="back" />
      <SchoolSearch
        searchText={searchText}
        setSearchText={setSearchText}
        searchResultText={searchResultText}
        setSearchResultText={setSearchResultText}
        selectedSearchText={selectedSearchText}
        setSelectedSearchText={setSelectedSearchText}
        handlerGetSearchResult={handlerGetSearchResult}
        handlerDeleteSearchResult={handlerDeleteSearchResult}
        schoolId={schoolId}
        setSchoolId={setSchoolId}
        currentMainStep={currentMainStep}
        setCurrentMainStep={setCurrentMainStep}
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        className={DOGOWNER}
      />
    </>
  );
};

export default SchoolSearchPage;
