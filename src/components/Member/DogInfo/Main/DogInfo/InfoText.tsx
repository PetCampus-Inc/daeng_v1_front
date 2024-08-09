import * as S from "../../styles";

interface IProps {
  icon: React.ReactNode;
  text: string;
}

const InfoText = ({ text, icon }: IProps) => {
  return (
    <S.InfoText>
      <S.Icon>{icon}</S.Icon>
      {text}
    </S.InfoText>
  );
};

export default InfoText;
