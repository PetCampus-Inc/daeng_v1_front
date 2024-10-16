import { routes } from "constants/path";
import { SCHOOL_NAME_KEY } from "constants/storage";

import { Box, Layout, Text } from "components/common";
import Header from "components/common/Header";
import { PreventLeaveModal } from "components/common/Modal";
import { StyledButton } from "components/SignIn/styles";
import SchoolSearchInputBox from "components/SignUp/SearchSchool/SchoolSearchInputBox";
import { useSetLocalStorage } from "hooks/common/useLocalStorage";
import { memo, useState } from "react";
import { useBlocker, useNavigate } from "react-router-dom";
import { User } from "types/common/role.types";

export interface SelectedSchool {
  id: number;
  name: string;
}

interface SearchSchoolPageProps {
  type: User;
  btnText?: string;
  onNextStep: (id: number) => void;
}

const SearchSchoolPage = ({ type, onNextStep, btnText }: SearchSchoolPageProps) => {
  const navigate = useNavigate();
  const setLocalStorage = useSetLocalStorage();
  const [selectedSchool, setSelectedSchool] = useState<SelectedSchool | null>(null);
  const [isNextClicked, setIsNextClicked] = useState(false);

  const handleSelect = (id: number, name: string) => setSelectedSchool({ id, name });
  const handleClear = () => setSelectedSchool(null);
  const handleNextClick = () => {
    if (!selectedSchool) return;
    onNextStep(selectedSchool.id);
    setLocalStorage(SCHOOL_NAME_KEY, selectedSchool.name);
  };

  const handleBackClick = () => {
    // 첫 진입 페이지일 경우 뒤로가기 시 로그인 페이지로 이동
    if (window.history.length <= 3) navigate(routes.login.root);
    else navigate(-1);
  };

  const blocker = useBlocker(() => !!selectedSchool && !isNextClicked);

  return (
    <>
      {blocker.state === "blocked" ? (
        <PreventLeaveModal
          isOpen={true}
          close={() => blocker.reset()}
          action={() => blocker.proceed()}
        />
      ) : null}
      <Header type="back" handleClick={handleBackClick} />
      <Layout pt={60} px={16} pb={24}>
        <Text typo="title1_24_B" color="darkBlack">
          안녕하세요 {type === User.ADMIN ? "선생님" : "견주님"}
          <br />
          어떤 유치원을 찾고 계시나요?
        </Text>
        <Box mt={70}>
          <SchoolSearchInputBox onSelect={handleSelect} onClear={handleClear} />
        </Box>

        <Box position="absolute" left={16} right={16} bottom={24}>
          <StyledButton
            type="button"
            bg="primaryColor"
            onClick={() => {
              handleNextClick();
              setIsNextClicked(true);
            }}
            disabled={!selectedSchool}
          >
            <Text className={selectedSchool ? "" : "inactive"} typo="label1_16_B" color="white">
              {btnText ? btnText : "다음"}
            </Text>
          </StyledButton>
        </Box>
      </Layout>
    </>
  );
};

export default memo(SearchSchoolPage);
