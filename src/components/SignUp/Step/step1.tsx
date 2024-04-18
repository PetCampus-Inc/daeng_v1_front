import { DOGOWNER } from "constants/className";

import Button from "components/common/Button";
import Header from "components/common/Header";
import InputBox from "components/common/InputBox";
import Text from "components/common/Text";
import { memo, Dispatch, SetStateAction, ChangeEvent } from "react";
import { ThemeConfig } from "styles/ThemeConfig";
import { ISchoolInfo } from "types/admin/school.types";

import {
  Container,
  TextWrapper,
  StyledBottomWrapper,
  InputBoxWrapper,
  StyledSearchResultWrapper,
  StyledSearchResult
} from "./styles";

interface Props {
  searchText: string;
  setSearchText: Dispatch<SetStateAction<string>>;
  searchResultText: ISchoolInfo[] | any;
  setSearchResultText: Dispatch<SetStateAction<ISchoolInfo[]>>;
  selectedSearchText: string;
  setSelectedSearchText: Dispatch<SetStateAction<string>>;
  handlerGetSearchResult: () => void | Promise<void>;
  handlerDeleteSearchResult: () => void | Promise<void>;
  schoolId: number;
  setSchoolId: Dispatch<SetStateAction<number>>;
  currentMainStep: number;
  setCurrentMainStep: Dispatch<SetStateAction<number>>;
  currentStep: number;
  setCurrentStep: Dispatch<SetStateAction<number>>;
  className?: string;
}

const Step1 = ({
  searchText,
  setSearchText,
  searchResultText,
  setSearchResultText,
  selectedSearchText,
  setSelectedSearchText,
  handlerGetSearchResult,
  handlerDeleteSearchResult,
  schoolId,
  setSchoolId,
  currentStep,
  setCurrentStep,
  currentMainStep,
  setCurrentMainStep,
  className
}: Props) => {
  return (
    <>
      <Container>
        <Header
          type="back"
          handleClick={() => {
            className === DOGOWNER
              ? setCurrentMainStep(0)
              : setCurrentMainStep(currentMainStep - 1);
          }}
        />
        <TextWrapper>
          <Text
            text={
              className === DOGOWNER
                ? "안녕하세요 견주님\n어떤 유치원을 찾고 계시나요?"
                : "안녕하세요 선생님\n어떤 유치원을 찾고 계시나요?"
            }
            size="1.4rem"
            weight="bold"
            height="2rem"
          />
        </TextWrapper>

        <InputBoxWrapper>
          <InputBox
            height="100%"
            width="100%"
            color={ThemeConfig.colors.gray_1}
            placeholdText="검색어를 입력해 주세요"
            type="search"
            inputValue={searchText}
            selectedSearchText={selectedSearchText}
            setInputValue={(e: ChangeEvent<HTMLInputElement>) => {
              setSelectedSearchText("");
              setSearchText(e.target.value);
            }}
            handleClick={!selectedSearchText ? handlerGetSearchResult : handlerDeleteSearchResult}
          />
        </InputBoxWrapper>

        <StyledSearchResultWrapper>
          {!selectedSearchText &&
            searchResultText.map((item: ISchoolInfo, index: number) => {
              return (
                <StyledSearchResult
                  key={index}
                  radius_top={index === 0 ? "first" : ""}
                  radius_bottom={
                    searchResultText.length > 1 && index === searchResultText.length - 1
                      ? "last"
                      : searchResultText.length === 1
                        ? "last"
                        : ""
                  }
                  onClick={() => {
                    setSelectedSearchText(item.name);
                    setSearchText(item.name);
                    setSchoolId(item.schoolId);
                  }}
                >
                  <Text text={item.name} color={ThemeConfig.colors.gray_1} />
                  <Text text={item.address} size="0.9rem" color={ThemeConfig.colors.gray_3} />
                </StyledSearchResult>
              );
            })}
        </StyledSearchResultWrapper>

        <StyledBottomWrapper>
          <Button
            width="90%"
            height="70%"
            text="다음"
            weight="bold"
            size="1.1rem"
            handleClick={() => {
              if (selectedSearchText !== "") {
                setCurrentStep(currentStep + 1);
              }
            }}
            backcolor={
              selectedSearchText === ""
                ? ThemeConfig.colors.gray_5
                : ThemeConfig.colors.primaryColor
            }
            textcolor={
              selectedSearchText === "" ? ThemeConfig.colors.gray_2 : ThemeConfig.colors.white
            }
          />
        </StyledBottomWrapper>
      </Container>
    </>
  );
};

export default memo(Step1);
