import ToggleBadge from "../Badge/ToggleBadge";
import type { ToggleBadgeProps } from "../Badge/ToggleBadge";

import { Label } from "./style";

interface AdminTitleProps extends Omit<ToggleBadgeProps, "control" | "name"> {
  htmlFor: string;
  control: ToggleBadgeProps["control"];
  name: ToggleBadgeProps["name"];
}

const AdminTitle = ({ children, htmlFor, control, name, readOnly, ...props }: AdminTitleProps) => {
  return (
    <Label htmlFor={htmlFor}>
      {children}
      <ToggleBadge name={name} control={control} {...props} readOnly={readOnly} />
    </Label>
  );
};

export default AdminTitle;
