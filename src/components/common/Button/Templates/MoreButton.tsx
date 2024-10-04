import type { PropsWithChildren } from "react";

import ArrowRightIcon from "assets/svg/arrow-right-icon";

import { Button, type ButtonProps } from "../Button";

interface MoreButtonProps extends ButtonProps<"button"> {
  color?: "gray_1" | "gray_2" | "white";
  iconColorScheme?: "gray_1" | "gray_2" | "gray_3";
  iconSize?: number;
}
/**
 * `MoreButton` 컴포넌트는 더보기 버튼을 나타냅니다.
 * @default color: "gray_1", typo: "label2_14_R", iconSize: 20, gap: 0, padding: 0
 */
export const MoreButton = ({
  color = "gray_1",
  iconColorScheme,
  iconSize = 20,
  children,
  ...props
}: PropsWithChildren<MoreButtonProps>) => {
  return (
    <Button
      asChild
      typo="label2_14_R"
      color={color}
      bgColor="transparent"
      paddingBlock={0}
      paddingInline={0}
      gap={0}
      rightAddon={<ArrowRightIcon colorScheme={iconColorScheme} size={iconSize} />}
      {...props}
    >
      <a>{children}</a>
    </Button>
  );
};
