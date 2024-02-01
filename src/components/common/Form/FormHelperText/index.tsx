import * as S from "./styles";

interface Props extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
}

const FormHelperText = ({ children }: Props) => {
  return <S.Text>{children}</S.Text>;
};

export default FormHelperText;
