import { Flex, FlexOptions } from "components/common/Flex";
import { Text } from "components/common/Text";
import { ReactNode } from "react";

interface FieldProps extends FlexOptions {
  label?: string;
  children?: ReactNode;
}

export const Field = ({ label, children, ...props }: FieldProps) => {
  return (
    <Flex direction="column" gap={8} width="100%" {...props}>
      {label && <Text>{label}</Text>}
      {children}
    </Flex>
  );
};
