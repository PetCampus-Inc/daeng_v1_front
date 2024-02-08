import { Dispatch, SetStateAction, memo } from "react";
import { Container, StyledMainWrapper } from "../SortModal/styles";
import Text from "components/common/Text";
import { ThemeConfig } from "styles/ThemeConfig";
import { StyledButtonWrapper } from "./styles";
import Button from "components/common/Button";

interface Props {
  setIsCallModalOpen: Dispatch<SetStateAction<boolean>>;
  memberPhone: string;
  dogName: string;
}

const CallModal = ({ setIsCallModalOpen, memberPhone, dogName }: Props) => {
  return (
    <Container>
      <StyledMainWrapper height="30%" paddingtop="20%">
        <Text text={`${dogName} 견주`} size="1.2rem" weight="700" />
        <Text
          text={memberPhone}
          weight="600"
          color={ThemeConfig.colors.gray_2}
          margintop="3%"
        />
        <StyledButtonWrapper>
          <Button
            text="닫기"
            width="49%"
            height="70%"
            backcolor={ThemeConfig.colors.gray_4}
            textcolor={ThemeConfig.colors.gray_2}
            handleClick={() => {
              setIsCallModalOpen(false);
            }}
          />
          {/* *****통화하기 기능 수정 필요***** */}
          <Button text="통화하기" width="49%" height="70%" weight="700" />
        </StyledButtonWrapper>
      </StyledMainWrapper>
    </Container>
  );
};

export default memo(CallModal);
