import * as Styled from "./styles";
import { Flex } from "../Flex";

export interface FormLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  text: React.ReactNode;
  leftContent?: React.ReactNode;
  rightContent?: React.ReactNode;
}

export function FormLabel(props: FormLabelProps) {
  const { text, leftContent, rightContent, ...rest } = props;
  return (
    <Styled.Label {...rest}>
      <Flex flex={1} gap={8}>
        {text}
        {leftContent && leftContent}
      </Flex>
      {rightContent && rightContent}
    </Styled.Label>
  );
}
