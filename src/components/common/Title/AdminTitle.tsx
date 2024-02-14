import Badge from "../Badge";
import ToggleBadge from "../Badge/ToggleBadge";
import type { ToggleBadgeProps } from "../Badge/ToggleBadge";

import { Label, Container } from "./style";

interface AdminTitleProps extends Omit<ToggleBadgeProps, "control" | "name"> {
  htmlFor: string;
  control: ToggleBadgeProps["control"];
  name: ToggleBadgeProps["name"];
  hasBadge?: boolean;
}

const AdminTitle = ({
  children,
  htmlFor,
  control,
  name,
  readOnly,
  hasBadge = false,
  ...props
}: AdminTitleProps) => {
  return (
    <Label htmlFor={htmlFor}>
      <Container>
        {children}
        {hasBadge && <Badge type="adminRequired" />}
      </Container>
      <ToggleBadge name={name} control={control} {...props} readOnly={readOnly} />
    </Label>
  );
};

export default AdminTitle;
