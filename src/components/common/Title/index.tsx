import Badge from "components/common/Badge";
import { Label } from "./style";

export interface FormLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
  isRequired?: boolean;
}

const Title = ({ children, isRequired, ...props }: FormLabelProps) => {
  return (
    <Label {...props}>
      {children}
      <Badge type={isRequired ? "required" : "optional"} />
    </Label>
  );
};

export default Title;
