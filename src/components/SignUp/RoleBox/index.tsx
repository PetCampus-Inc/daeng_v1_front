import PrincipalIcon from "assets/svg/principal-icon";
import PrincipalSelectedIcon from "assets/svg/principal-selected-icon";
import TeacherIcon from "assets/svg/teacher-icon";
import TeacherSelectedIcon from "assets/svg/teacher-selected-icon";
import Typo from "components/common/Typo";
import { memo } from "react";
import { ThemeConfig } from "styles/ThemeConfig";

import { StyledMainWrapper } from "./styles";

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
      <Typo size="1.3rem" weight="bold" text={mainText} color={ThemeConfig.colors.darkBlack} />
      <Typo text={subText} color={ThemeConfig.colors.darkBlack} />
    </StyledMainWrapper>
  );
};
export default memo(RoleBox);
