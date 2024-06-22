import type { PropsWithChildren } from "react";

import { Button } from "../Button";

import type { ButtonProps } from "../types";

interface XSmallButtonProps extends ButtonProps<"button"> {
  colorScheme: "yellow_3" | "gray_4" | "gray_5" | "white";
}
/**
 * `XSmallButton` 컴포넌트는 Badge 요소에 클릭 이벤트가 있는 버튼입니다.
 * @default size: "sm", variant: "pill", colorScheme: "yellow_3"
 */
export const XSmallButton = ({
  colorScheme,
  children,
  ...props
}: PropsWithChildren<XSmallButtonProps>) => {
  return (
    <Button size="xs" colorScheme={colorScheme} variant="pill" {...props}>
      {children}
    </Button>
  );
};
