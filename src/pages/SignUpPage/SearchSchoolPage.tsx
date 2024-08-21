import { Box, Layout, Text } from "components/common";
import Header from "components/common/Header";
import { StyledButton } from "components/SignIn/styles";
import SchoolSearchInputBox from "components/SignUp/SearchSchool/SchoolSearchInputBox";
import { memo, useState } from "react";
import { useRecoilValue } from "recoil";
import { schoolIdAtom } from "store/form";
import { Role } from "types/common/role.types";

interface SearchSchoolPageProps {
  type: typeof Role.ROLE_TEACHER | typeof Role.ROLE_MEMBER;
  onNextStep: (id: number) => void;
}

// TODO: useFormProvider 이용!!
const SearchSchoolPage = ({ type, onNextStep }: SearchSchoolPageProps) => {
  const schoolId = useRecoilValue(schoolIdAtom);

  const [searchText, setSearchText] = useState("");

  return (
    <>
      <Header type="back" />
      <Layout pt={60} px={16} pb={24}>
        <Text typo="title1_24_B" color="darkBlack">
          안녕하세요 {type === Role.ROLE_TEACHER ? "선생님" : "견주님"}
          <br />
          어떤 유치원을 찾고 계시나요?
        </Text>
        <Box mt={70}>
          <SchoolSearchInputBox searchText={searchText} setSearchText={setSearchText} />
        </Box>

        <Box position="absolute" left={16} right={16} bottom={24}>
          <StyledButton
            type="button"
            bg="primaryColor"
            onClick={() => onNextStep(schoolId ?? -1)}
            disabled={!schoolId || !searchText}
          >
            <Text
              className={schoolId && searchText ? "" : "inactive"}
              typo="label1_16_B"
              color="white"
            >
              다음
            </Text>
          </StyledButton>
        </Box>
      </Layout>
    </>
  );
};

export default memo(SearchSchoolPage);
