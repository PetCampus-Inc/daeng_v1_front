import { Flex, FlexOptions } from "components/common/Flex";
import { Text } from "components/common/Text";
import { ReactNode } from "react";

interface FieldProps extends FlexOptions {
  label?: string;
  children?: ReactNode;
  caption?: string;
}

export const Field = ({ label, caption, children, ...props }: FieldProps) => {
  return (
    <Flex direction="column" gap={8} width="100%" {...props}>
      {label && <Text>{label}</Text>}
      {caption && (
        <Text typo="caption1_12_R" color="gray_3">
          {caption}
        </Text>
      )}
      {children}
    </Flex>
  );
};
