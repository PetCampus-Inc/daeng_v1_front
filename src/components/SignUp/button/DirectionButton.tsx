import type { ButtonHTMLAttributes, PropsWithChildren } from "react";

import ArrowRightSquare from "assets/svg/arrow-right-square-icon";
import SimpleButton from "components/common/Button/SimpleButton";
import { css } from "styled-components";

interface DirectionButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  handleClick?: () => void;
}

const DirectionButton = ({
  children,
  handleClick,
  ...props
}: PropsWithChildren<DirectionButton>) => {
  return (
    <SimpleButton
      onClick={handleClick}
      rightAddon={<ArrowRightSquare w={24} h={24} />}
      css={ButtonStyle}
      {...props}
    >
      {children}
    </SimpleButton>
  );
};

export default DirectionButton;

const ButtonStyle = css`
  padding: 0;
  gap: 0;

  background-color: unset;
  color: ${({ theme }) => theme.colors.gray_2};

  ${({ theme }) => theme.typo.label2_14_M};
`;
