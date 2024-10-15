import AddIcon from "assets/svg/add-icon";
import SubtractIcon from "assets/svg/subtract-icon";
import { useRecoilState } from "recoil";
import { ticketCounterState } from "store/form";

import * as Styled from "./styles";

const INIT_COUNTER = 2;

interface CounterProps {
  type: "ROUND" | "MONTHLY";
}

export function Counter({ type }: CounterProps) {
  const times = type === "ROUND" ? "회" : "주";

  const [counter, setCounter] = useRecoilState(ticketCounterState);

  return (
    <Styled.CounterWrapper>
      <Styled.Counter>
        <Styled.CounterButton
          onClick={() => setCounter((prev) => (prev > INIT_COUNTER ? prev - 1 : prev))}
        >
          <SubtractIcon size={20} color="darkBlack" />
        </Styled.CounterButton>
        <Styled.Text>
          {counter} <span>{times}</span>
        </Styled.Text>
        <Styled.CounterButton onClick={() => setCounter((prev) => prev + 1)}>
          <AddIcon size={20} color="darkBlack" />
        </Styled.CounterButton>
      </Styled.Counter>
    </Styled.CounterWrapper>
  );
}
