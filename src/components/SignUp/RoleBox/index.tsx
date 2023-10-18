import { memo } from "react";
import { StyledMainWrapper, StyledIcon } from "./styles";
import Text from "components/common/Text";

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
        color={selected ? "#E9E9E9" : undefined}
      />
      <Text text={subText} color={selected ? "#E9E9E9" : undefined} />
    </StyledMainWrapper>
  );
};
export default memo(RoleBox);
