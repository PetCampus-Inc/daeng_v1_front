import Badge from "../Badge";
import ToggleBadge from "../Badge/ToggleBadge";
import type { ToggleBadgeProps } from "../Badge/ToggleBadge";

import { Label, Container } from "./style";

interface AdminTitleProps extends Omit<ToggleBadgeProps, "control" | "name"> {
  control: ToggleBadgeProps["control"];
  name: ToggleBadgeProps["name"];
  hasBadge?: boolean;
}

const AdminTitle = ({
  children,
  control,
  name,
  readOnly,
  hasBadge = false,
  hasToggle = false,
  ...props
}: AdminTitleProps) => {
  return (
    <Label htmlFor={name + ".label"}>
      <Container>
        {children}
        {hasBadge && <Badge type="adminRequired" />}
      </Container>
      <ToggleBadge
        name={name}
        control={control}
        hasToggle={hasToggle}
        {...props}
        readOnly={readOnly}
      />
    </Label>
  );
};

export default AdminTitle;
