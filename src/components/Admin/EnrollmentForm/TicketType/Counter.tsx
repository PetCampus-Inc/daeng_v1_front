import AddBIcon from "assets/svg/add-b-icon";
import SubtractBIcon from "assets/svg/subtract-b-icon";
import { useRecoilState } from "recoil";
import { ticketCounterState } from "store/form";

import * as Styled from "./styles";

const INIT_COUNTER = 2;

interface CounterProps {
  type: "ROUND" | "MONTHLY";
  isDuplication: boolean;
}

export function Counter({ type, isDuplication }: CounterProps) {
  const text = type === "ROUND" ? "회차권" : "정기권";
  const times = type === "ROUND" ? "회" : "주";

  const [counter, setCounter] = useRecoilState(ticketCounterState);

  return (
    <>
      <Styled.TextWrapper>
        <Styled.Title>{text} 유형을 추가해 주세요</Styled.Title>
        {isDuplication && (
          <Styled.ErrorMessage>이미 추가되어 있어요. 횟수를 변경해 주세요.</Styled.ErrorMessage>
        )}
      </Styled.TextWrapper>
      <Styled.CounterWrapper>
        <Styled.Counter>
          <Styled.Button
            onClick={() => setCounter((prev) => (prev > INIT_COUNTER ? prev - 1 : prev))}
          >
            <SubtractBIcon />
          </Styled.Button>
          <Styled.Text>
            {counter} <span>{times}</span>
          </Styled.Text>
          <Styled.Button onClick={() => setCounter((prev) => prev + 1)}>
            <AddBIcon />
          </Styled.Button>
        </Styled.Counter>
      </Styled.CounterWrapper>
    </>
  );
}
