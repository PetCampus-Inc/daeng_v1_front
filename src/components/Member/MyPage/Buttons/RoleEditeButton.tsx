import { ThemeConfig } from "styles/ThemeConfig";

import * as S from "./styles";

interface IProps {
  isShowRoles: boolean;
  handleShowRoles: () => void;
}

const RoleEditeButton = ({ isShowRoles, handleShowRoles }: IProps) => {
  return (
    <>
      <S.RoleEditeButton
        width="100%"
        height="49px"
        textcolor={ThemeConfig.colors.gray_1}
        backcolor={ThemeConfig.colors.white}
        handleClick={handleShowRoles}
      >
        아빠
      </S.RoleEditeButton>
      {isShowRoles && (
        <>
          <S.RoleSelectButton
            width="100%"
            height="49px"
            textcolor={ThemeConfig.colors.gray_3}
            backcolor={ThemeConfig.colors.gray_4}
          >
            엄마
          </S.RoleSelectButton>
          <S.RoleSelectButton
            width="100%"
            height="49px"
            textcolor={ThemeConfig.colors.gray_3}
            backcolor={ThemeConfig.colors.gray_4}
          >
            언니/누나
          </S.RoleSelectButton>
          <S.RoleSelectButton
            width="100%"
            height="49px"
            textcolor={ThemeConfig.colors.gray_3}
            backcolor={ThemeConfig.colors.gray_4}
          >
            오빠/형
          </S.RoleSelectButton>
          <S.RoleSelectButton
            width="100%"
            height="49px"
            textcolor={ThemeConfig.colors.gray_3}
            backcolor={ThemeConfig.colors.gray_4}
          >
            친구
          </S.RoleSelectButton>
        </>
      )}
    </>
  );
};

export default RoleEditeButton;
