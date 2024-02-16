import Portal from "../Modal/portal";
import * as S from "./styles";

interface Props {
  children?: React.ReactNode;
  maintext: string;
  subtext: string;
  closebutton?: string;
  actionbutton?: string;
  closefunc?: () => void | Promise<void>;
  actionfunc?: () => void | Promise<void>;
}

const ButtonModal = ({
  children,
  maintext,
  subtext,
  closebutton,
  actionbutton,
  closefunc,
  actionfunc
}: Props) => {
  return (
    <Portal>
      <S.BackDrop>
        <S.MainWrapper>
          {children}
          <S.TextWrapper>
            <S.MainText>{maintext}</S.MainText>
            <S.SubText>{subtext}</S.SubText>
          </S.TextWrapper>
          <S.ButtonWrapper>
            {closebutton && <S.CloseButton onClick={closefunc}>{closebutton}</S.CloseButton>}
            {actionbutton && <S.ActButton onClick={actionfunc}>{actionbutton}</S.ActButton>}
          </S.ButtonWrapper>
        </S.MainWrapper>
      </S.BackDrop>
    </Portal>
  );
};

export default ButtonModal;
