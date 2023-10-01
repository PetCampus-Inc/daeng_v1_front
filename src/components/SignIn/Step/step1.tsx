import { memo, Dispatch, SetStateAction, ChangeEvent } from "react";
import {
  Container,
  TextWrapper,
  StyledBottomWrapper,
  InputBoxWrapper,
} from "./styles";
import Text from "components/common/Text";
import Header from "components/common/Header";
import InputBox from "components/common/InputBox";
import Button from "components/common/Button";

interface Props {
  searchText: string;
  setSearchText: Dispatch<SetStateAction<string>>;
  searchResultText: string[];
  setSearchResultText: Dispatch<SetStateAction<string[]>>;
  selectedSearchText: string;
  setSelectedSearchText: Dispatch<SetStateAction<string>>;
}

const Step1 = ({
  searchText,
  setSearchText,
  searchResultText,
  setSearchResultText,
  selectedSearchText,
  setSelectedSearchText,
}: Props) => {
  return (
    <>
      <Header type="back" />
      <Container>
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
            placeholdText={"유치원을 입력해주세요"}
            type="search"
            inputValue={searchText}
            setInputValue={(e: ChangeEvent<HTMLInputElement>) =>
              setSearchText(e.target.value)
            }
          />
        </InputBoxWrapper>

        <StyledBottomWrapper>
          <Button
            width="90%"
            height="70%"
            text="다음"
            weight="bold"
            size="1.1rem"
            handleClick={() => {
              //setCurrentMainStep(currentMainStep + 1);
            }}
            backColor={selectedSearchText === "" ? "#F6F6F6" : "#525252"}
            textColor={selectedSearchText === "" ? "#B5B5B5" : "#FFFFFF"}
          />
        </StyledBottomWrapper>
      </Container>
    </>
  );
};

export default memo(Step1);
