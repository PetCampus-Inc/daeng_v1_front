import type { PropsWithChildren } from "react";

import { Button, type ButtonProps } from "../Button";

interface SmallButtonProps extends ButtonProps<"button"> {
  colorScheme?: "br_4" | "gray_4";
}
/**
 * `SmallButton` 컴포넌트는 "전체 선택", "전체 해제" 등의 역할로 사용됩니다.
 * @default size: "sm", variant: "rectangle", colorScheme: "br_4", typo="label2_14_M"
 */
export const SmallButton = ({
  colorScheme = "br_4",
  children,
  ...props
}: PropsWithChildren<SmallButtonProps>) => {
  return (
    <Button size="sm" typo="label2_14_M" colorScheme={colorScheme} variant="rectangle" {...props}>
      {children}
    </Button>
  );
};
