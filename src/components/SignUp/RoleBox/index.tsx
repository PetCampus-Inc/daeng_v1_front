import { memo } from "react";
import { StyledMainWrapper } from "./styles";
import Text from "components/common/Text";
import { ThemeConfig } from "styles/ThemeConfig";
import TeacherIcon from "assets/svg/teacher-icon";
import PrincipalIcon from "assets/svg/principal-icon";
import TeacherSelectedIcon from "assets/svg/teacher-selected-icon";
import PrincipalSelectedIcon from "assets/svg/principal-selected-icon";

interface Props {
  selected: boolean;
  Role: number;
  mainText: string;
  subText: string;
  handleClick: () => void | Promise<void>;
}

const RoleBox = ({ selected, Role, mainText, subText, handleClick }: Props) => {
  return (
    <StyledMainWrapper selected={selected} onClick={handleClick}>
      {Role === 0 && selected ? (
        <TeacherSelectedIcon />
      ) : Role === 0 ? (
        <TeacherIcon />
      ) : Role === 1 && selected ? (
        <PrincipalSelectedIcon />
      ) : (
        <PrincipalIcon />
      )}
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
