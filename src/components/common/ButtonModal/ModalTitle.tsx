import { MainText, SubText, TextWrapper } from "./styles";

export interface ModalTitleProps {
  title: string;
  subtitle: string | React.ReactNode;
}

const ModalTitle = ({ title, subtitle }: ModalTitleProps) => {
  return (
    <TextWrapper>
      <MainText>{title}</MainText>
      <SubText>{subtitle}</SubText>
    </TextWrapper>
  );
};

export default ModalTitle;
