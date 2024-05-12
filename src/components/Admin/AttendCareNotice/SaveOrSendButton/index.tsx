import * as S from "./styles";

interface SaveOrSendButtonProps {
  save: () => void;
  send: () => void;
}

const SaveOrSendButton = ({ save, send }: SaveOrSendButtonProps) => {
  return (
    <S.ButtonWrapper>
      <S.PrevButton onClick={save}>임시저장 </S.PrevButton>
      <S.Button onClick={send}>전송하기</S.Button>
    </S.ButtonWrapper>
  );
};

export default SaveOrSendButton;
