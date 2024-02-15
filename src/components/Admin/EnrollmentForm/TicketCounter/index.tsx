import type { Dispatch, SetStateAction } from "react";
import AddIcon from "assets/svg/add-icon";
import SubtractIcon from "assets/svg/subtract-icon";
import * as S from "./styles";

interface Props {
  type: "ROUND" | "MONTHLY";
  initial: number;
  counter: number;
  setCounter: Dispatch<SetStateAction<number>>;
}

const TicketCounter = ({ type, initial, counter, setCounter }: Props) => {
  const text = type === "ROUND" ? "회차권" : "정기권";
  const times = type === "ROUND" ? "회" : "주";
  return (
    <S.ContentWrapper>
      <S.TextWrapper>
        <S.Title>{text} 유형을 추가해 주세요</S.Title>
        <S.ErrorMessage>이미 추가되어 있어요 횟수를 변경해 주세요</S.ErrorMessage>
      </S.TextWrapper>
      <S.Counter>
        <S.Button onClick={() => setCounter((prev) => (prev > initial ? prev - 1 : prev))}>
          <SubtractIcon />
        </S.Button>
        <S.Text>
          {counter} <span>{times}</span>
        </S.Text>
        <S.Button onClick={() => setCounter((prev) => prev + 1)}>
          <AddIcon />
        </S.Button>
      </S.Counter>
    </S.ContentWrapper>
  );
};

export default TicketCounter;
