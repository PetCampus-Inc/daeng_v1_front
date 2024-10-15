import type { PropsWithChildren } from "react";

import { Button, type ButtonProps } from "../Button";

/**
 * `WideButton` 컴포넌트는 버튼의 너비를 최대로 설정합니다.
 *  주로 하단 버튼으로 사용됩니다.
 * @default size: "lg", variant: "rectangle", width: "full", typo="body1_18_B"
 */
export const WideButton = ({ children, ...props }: PropsWithChildren<ButtonProps<"button">>) => {
  return (
    <Button size="lg" typo="body1_18_B" variant="rectangle" width="full" {...props}>
      {children}
    </Button>
  );
};
