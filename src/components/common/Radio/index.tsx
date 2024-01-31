import Text from "../Text";
import * as S from "./styles";
import { useFormContext } from "react-hook-form";

interface IRadio {
  title: string;
  caption?: string;
  badgeText?: string;
  badgeType?: string;
  radiosText: string[];
}

const Radio = ({
  title,
  caption,
  badgeText = "선택 입력",
  badgeType = "optional",
  radiosText
}: IRadio) => {
  const { register } = useFormContext();

  return (
    <S.Container>
      <S.TitleContainer>
        <Text text={title} />
        {/* <Badge text={badgeText} type={badgeType}/>  */}
      </S.TitleContainer>
      {caption && <S.Caption>{caption}</S.Caption>}
      <S.RadioContainer>
        {radiosText.map((text) => (
          <div style={{ width: "100%" }} key={text}>
            <S.StyledInput id={text} type="radio" {...register(`${title}`)} value={text} />
            <S.StyledLabel htmlFor={text}>{text}</S.StyledLabel>
          </div>
        ))}
      </S.RadioContainer>
    </S.Container>
  );
};
export default Radio;
