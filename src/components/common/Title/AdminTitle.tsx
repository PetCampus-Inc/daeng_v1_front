import { Label, Container } from "./style";
import Badge from "../Badge";
import ToggleBadge from "../Badge/ToggleBadge";

import type { ToggleBadgeProps } from "../Badge/ToggleBadge";

interface AdminTitleProps extends Omit<ToggleBadgeProps, "control" | "name"> {
  control: ToggleBadgeProps["control"];
  name: ToggleBadgeProps["name"];
  hasBadge?: boolean;
  noToggle?: boolean;
}

const AdminTitle = ({
  children,
  control,
  name,
  readOnly,
  noToggle = false,
  hasBadge = false,
  ...props
}: AdminTitleProps) => {
  const showToggle = !noToggle;

  return (
    <Label htmlFor={name + ".label"}>
      <Container>
        {children}
        {hasBadge && <Badge variant="yellow" />}
      </Container>
      {showToggle && <ToggleBadge name={name} control={control} {...props} readOnly={readOnly} />}
    </Label>
  );
};

export default AdminTitle;
