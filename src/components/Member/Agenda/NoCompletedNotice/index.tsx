import NoNoteDog from "assets/svg/no-note-dog";
import moment from "moment";

import * as S from "../CompletedNotice/styles";

const NoCompletedNotice = () => {
  const date = moment().format("YYYY.MM.DD");
  return (
    <S.CompleteNoteContainer>
      <S.NoteSpring />
      <S.NoteOuterContainer>
        <S.NoteText className="title main">{date}</S.NoteText>
        <S.NoNoteInnerContainer>
          <NoNoteDog />
          작성된 알림장이 없어요
        </S.NoNoteInnerContainer>
      </S.NoteOuterContainer>
    </S.CompleteNoteContainer>
  );
};

export default NoCompletedNotice;
