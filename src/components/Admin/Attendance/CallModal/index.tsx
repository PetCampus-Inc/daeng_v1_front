import { Dispatch, SetStateAction, memo } from "react";
import { Container, StyledMainWrapper } from "../SortModal/styles";
import Text from "components/common/Text";
import { ThemeConfig } from "styles/ThemeConfig";
import { StyledButtonWrapper } from "./styles";
import Button from "components/common/Button";

interface Props {
  setIsCallModalOpen: Dispatch<SetStateAction<boolean>>;
}

const CallModal = ({ setIsCallModalOpen }: Props) => {
  return (
    <Container>
      <StyledMainWrapper height="30%" paddingtop="20%">
        <Text text={`견주`} size="1.2rem" weight="700" />
        <Text
          text={`010-0000-0000`}
          weight="600"
          color={ThemeConfig.gray_2}
          margintop="3%"
        />
        <StyledButtonWrapper>
          <Button
            text="닫기"
            width="49%"
            height="70%"
            backcolor={ThemeConfig.gray_4}
            textcolor={ThemeConfig.gray_2}
            handleClick={() => {
              setIsCallModalOpen(false);
            }}
          />
          <Button text="통화하기" width="49%" height="70%" weight="700" />
        </StyledButtonWrapper>
      </StyledMainWrapper>
    </Container>
  );
};

export default memo(CallModal);
