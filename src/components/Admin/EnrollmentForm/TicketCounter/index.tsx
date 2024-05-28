import { INIT_COUNTER } from "constants/option";

import AddBIcon from "assets/svg/add-b-icon";
import SubtractBIcon from "assets/svg/subtract-b-icon";
import { useRecoilState } from "recoil";
import { ticketCounterState } from "store/form";

import * as S from "./styles";

interface Props {
  type: "ROUND" | "MONTHLY";
  isDuplication: boolean;
}

const TicketCounter = ({ type, isDuplication }: Props) => {
  const text = type === "ROUND" ? "회차권" : "정기권";
  const times = type === "ROUND" ? "회" : "주";

  const [counter, setCounter] = useRecoilState(ticketCounterState);

  return (
    <>
      <S.TextWrapper>
        <S.Title>{text} 유형을 추가해 주세요</S.Title>
        {isDuplication && (
          <S.ErrorMessage>이미 추가되어 있어요. 횟수를 변경해 주세요.</S.ErrorMessage>
        )}
      </S.TextWrapper>
      <S.CounterWrapper>
        <S.Counter>
          <S.Button onClick={() => setCounter((prev) => (prev > INIT_COUNTER ? prev - 1 : prev))}>
            <SubtractBIcon />
          </S.Button>
          <S.Text>
            {counter} <span>{times}</span>
          </S.Text>
          <S.Button onClick={() => setCounter((prev) => prev + 1)}>
            <AddBIcon />
          </S.Button>
        </S.Counter>
      </S.CounterWrapper>
    </>
  );
};

export default TicketCounter;
