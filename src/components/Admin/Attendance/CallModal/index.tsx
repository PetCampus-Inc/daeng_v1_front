import { Dispatch, SetStateAction, memo } from "react";
import { Container, StyledMainWrapper } from "../SortModal/styles";
import Text from "components/common/Text";
import { ThemeConfig } from "styles/ThemeConfig";
import { StyledButtonWrapper, StyledTitleWrapper } from "./styles";
import Button from "components/common/Button";
import BasicPhoneIcon from "assets/svg/phone-basic";
import XIcon from "assets/svg/x-icon";

interface Props {
  setIsCallModalOpen: Dispatch<SetStateAction<boolean>>;
  memberPhone: string;
  dogName: string;
}

const CallModal = ({ setIsCallModalOpen, memberPhone, dogName }: Props) => {
  return (
    <Container>
      <StyledMainWrapper height="30%" paddingtop="20%" style={{ position: "relative" }}>
        <div
          onClick={() => setIsCallModalOpen(false)}
          style={{
            position: "absolute",
            top: "20px",
            right: "20px"
          }}
        >
          <XIcon />
        </div>
        <StyledTitleWrapper>
          <BasicPhoneIcon />
          <Text text={`${dogName} 견주`} size="1.2rem" weight="700" />
        </StyledTitleWrapper>
        <Text text={memberPhone} weight="600" color={ThemeConfig.colors.gray_2} margintop="3%" />
        <StyledButtonWrapper>
          {/* *****통화하기 기능 수정 필요***** */}
          <Button text="전화 걸기" width="100%" height="60%" weight="700" />
        </StyledButtonWrapper>
      </StyledMainWrapper>
    </Container>
  );
};

export default memo(CallModal);
