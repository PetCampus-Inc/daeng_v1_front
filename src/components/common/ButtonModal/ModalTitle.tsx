import { MainText, SubText, TextWrapper } from "./styles";

interface ModalTitleProps {
  title: string;
  subtitle: string;
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
