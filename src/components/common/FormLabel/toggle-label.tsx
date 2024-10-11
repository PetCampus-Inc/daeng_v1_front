import { forwardRef, type ReactNode } from "react";

import { FormLabel } from "./form-label";
import Badge from "../Badge";
import { ToggleBadge, type ToggleBadgeProps } from "../Badge/ToggleBadge/toggle-badge";

interface LabelProps extends ToggleBadgeProps {
  showBadge?: boolean;
  showToggle?: boolean;
  children: ReactNode;
}

export const ToggleLabel = forwardRef<HTMLInputElement, LabelProps>((props: LabelProps, ref) => {
  const { children, showBadge, showToggle, ...rest } = props;

  return (
    <FormLabel
      text={children}
      leftContent={showBadge && <Badge variant="yellow" text="원장 필수입력" />}
      rightContent={showToggle && <ToggleBadge ref={ref} {...rest} />}
    />
  );
});

ToggleLabel.displayName = "ToggleLabel";
