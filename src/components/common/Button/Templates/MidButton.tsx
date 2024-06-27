import type { PropsWithChildren } from "react";

import { Button } from "../Button";

import type { ButtonProps } from "../types";

interface MidButtonProps extends ButtonProps<"button"> {
  colorScheme: "red_2";
}

/**
 * `MidButton` 컴포넌트는 "이용권 갱신"이나 "만료됨"을 나타내는 버튼으로 사용됩니다.
 * @default size: "md", variant: "pill", colorScheme: "red_2", typo="label2_14_B"
 */
export const MidButton = ({
  colorScheme,
  children,
  ...props
}: PropsWithChildren<MidButtonProps>) => {
  return (
    <Button size="md" typo="label2_14_B" colorScheme={colorScheme} variant="pill" {...props}>
      {children}
    </Button>
  );
};
