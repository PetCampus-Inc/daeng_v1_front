import { memo, Dispatch, SetStateAction, ChangeEvent } from "react";
import {
  Container,
  TextWrapper,
  StyledBottomWrapper,
  InputBoxWrapper,
  StyledSearchResultWrapper,
  StyledSearchResult,
} from "./styles";
import Text from "components/common/Text";
import Header from "components/common/Header";
import InputBox from "components/common/InputBox";
import Button from "components/common/Button";
import { ISchoolInfo } from "types/School.type";

interface Props {
  searchText: string;
  setSearchText: Dispatch<SetStateAction<string>>;
  searchResultText: ISchoolInfo[] | any;
  setSearchResultText: Dispatch<SetStateAction<ISchoolInfo[]>>;
  selectedSearchText: string;
  setSelectedSearchText: Dispatch<SetStateAction<string>>;
  handlerGetSearchResult: () => void | Promise<void>;
  currentMainStep: number;
  setCurrentMainStep: Dispatch<SetStateAction<number>>;
  currentStep: number;
  setCurrentStep: Dispatch<SetStateAction<number>>;
}

const Step1 = ({
  searchText,
  setSearchText,
  searchResultText,
  setSearchResultText,
  selectedSearchText,
  setSelectedSearchText,
  handlerGetSearchResult,
  currentStep,
  setCurrentStep,
  currentMainStep,
  setCurrentMainStep,
}: Props) => {
  return (
    <>
      <Container>
        <Header
          type="back"
          handleClick={() => {
            setCurrentMainStep(currentMainStep - 1);
          }}
        />
        <TextWrapper>
          <Text
            text={"안녕하세요 선생님\n어떤 유치원을 찾고계신가요?"}
            size="1.4rem"
            weight="bold"
            height="2rem"
          />
        </TextWrapper>

        <InputBoxWrapper>
          <InputBox
            height="100%"
            width="100%"
            placeholdText={"유치원을 입력해 주세요"}
            type="search"
            inputValue={searchText}
            setInputValue={(e: ChangeEvent<HTMLInputElement>) => {
              setSelectedSearchText("");
              setSearchText(e.target.value);
            }}
            handleClick={handlerGetSearchResult}
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
                    searchResultText.length > 1 &&
                    index === searchResultText.length - 1
                      ? "last"
                      : searchResultText.length === 1
                      ? "last"
                      : ""
                  }
                  onClick={() => {
                    setSelectedSearchText(item.name);
                    setSearchText(item.name);
                  }}
                >
                  <Text text={item.name} />
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
              setCurrentStep(currentStep + 1);
            }}
            backcolor={selectedSearchText === "" ? "#F6F6F6" : "#525252"}
            textcolor={selectedSearchText === "" ? "#B5B5B5" : "#FFFFFF"}
          />
        </StyledBottomWrapper>
      </Container>
    </>
  );
};

export default memo(Step1);
