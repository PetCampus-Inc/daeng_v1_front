import type { ReactNode } from "react";

import { FormLabel } from "./form-label";
import Badge from "../Badge";

interface BadgeLabelProps {
  children: ReactNode;
  isRequired?: boolean;
}

export function BadgeLabel({ children, isRequired, ...props }: BadgeLabelProps) {
  return (
    <FormLabel
      {...props}
      text={children}
      rightContent={
        <Badge
          variant={isRequired ? "brown" : "gray"}
          text={isRequired ? "필수 입력" : "선택 입력"}
        />
      }
    />
  );
}
