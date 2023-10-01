import { memo, Dispatch, SetStateAction, ChangeEvent } from "react";
import { Container, TextWrapper } from "./styles";
import Text from "components/common/Text";
import Header from "components/common/Header";
import InputBox from "components/common/InputBox";

interface Props {
  searchText: string;
  setSearchText: Dispatch<SetStateAction<string>>;
}

const Step1 = ({ searchText, setSearchText }: Props) => {
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
        <InputBox
          height="7%"
          width="100%"
          placeholdText={"유치원을 입력해주세요"}
          type="search"
          inputValue={searchText}
          setInputValue={(e: ChangeEvent<HTMLInputElement>) =>
            setSearchText(e.target.value)
          }
        />
      </Container>
    </>
  );
};

export default memo(Step1);
