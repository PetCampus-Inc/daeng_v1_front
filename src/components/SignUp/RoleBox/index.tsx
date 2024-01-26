import { memo } from "react";
import { StyledMainWrapper, StyledIcon } from "./styles";
import Text from "components/common/Text";
import { ThemeConfig } from "styles/ThemeConfig";

interface Props {
  selected: boolean;
  mainText: string;
  subText: string;
  handleClick: () => void | Promise<void>;
}

const RoleBox = ({ selected, mainText, subText, handleClick }: Props) => {
  return (
    <StyledMainWrapper selected={selected} onClick={handleClick}>
      <StyledIcon selected={selected} />
      <Text
        size="1.3rem"
        weight="bold"
        text={mainText}
        color={ThemeConfig.darkBlack}
      />
      <Text text={subText} color={ThemeConfig.darkBlack} />
    </StyledMainWrapper>
  );
};
export default memo(RoleBox);
