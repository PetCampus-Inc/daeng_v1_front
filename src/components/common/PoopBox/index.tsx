import PoopHard from "assets/svg/poop-hard";
import PoopHealthy from "assets/svg/poop-healthy";
import PoopNotBrown from "assets/svg/poop-not-brown";
import PoopWarning from "assets/svg/poop-warning";
import PoopWatery from "assets/svg/poop-watery";
import { Dispatch, SetStateAction } from "react";
import { IPoop } from "types/admin.attendance.type";

import * as S from "./styles";

interface PoopBoxProps {
  selected: IPoop;
  setPoopStatus?: Dispatch<SetStateAction<IPoop>>;
}

const PoopBox = ({ selected, setPoopStatus }: PoopBoxProps) => {
  return (
    <S.PoopCardContainer>
      <S.PoopCard onClick={() => setPoopStatus && setPoopStatus("HARD")}>
        <PoopHard poop={selected} />
        딱딱함
      </S.PoopCard>
      <S.PoopCard onClick={() => setPoopStatus && setPoopStatus("HEALTHY")}>
        <PoopHealthy poop={selected} />
        건강함
      </S.PoopCard>
      <S.PoopCard onClick={() => setPoopStatus && setPoopStatus("WATERY")}>
        <PoopWatery poop={selected} />
        묽은 변
      </S.PoopCard>
      <S.PoopCard onClick={() => setPoopStatus && setPoopStatus("NOT_BROWN")}>
        <PoopNotBrown poop={selected} />
        갈색이 아닌
      </S.PoopCard>
      <S.PoopCard onClick={() => setPoopStatus && setPoopStatus("WARNING")}>
        <PoopWarning poop={selected} />
        주의필요
      </S.PoopCard>
    </S.PoopCardContainer>
  );
};

export default PoopBox;
