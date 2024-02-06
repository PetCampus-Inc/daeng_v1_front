import Badge from "components/common/Badge";
import * as S from "./style";

export interface FormLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
  isRequired?: boolean;
}

const Title = ({ children, isRequired, ...props }: FormLabelProps) => {
  return (
    <S.Label {...props}>
      {children}
      <Badge type={isRequired ? "required" : "optional"} />
    </S.Label>
  );
};

export default Title;
