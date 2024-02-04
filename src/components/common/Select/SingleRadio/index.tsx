import Text from "../../Text";
import { ISelect } from "../select.type";
import { useFormContext } from "react-hook-form";
import * as S from "../styles";

interface ISingleRadio extends ISelect {
  radiosText: string[];
}

const SingleRadio = ({
  title,
  caption,
  badgeText = "선택 입력",
  badgeType = "optional",
  radiosText
}: ISingleRadio) => {
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
export default SingleRadio;
