import PoopHard from "assets/svg/poop-hard";
import PoopHealthy from "assets/svg/poop-healthy";
import PoopNotBrown from "assets/svg/poop-not-brown";
import PoopWarning from "assets/svg/poop-warning";
import PoopWatery from "assets/svg/poop-watery";
import { Poop } from "types/admin/attendance.type";

import * as S from "./styles";

interface PoopBoxProps {
  selected?: Poop;
}

const PoopBox = ({ selected }: PoopBoxProps) => {
  return (
    <S.PoopCardContainer>
      <S.PoopCard>
        <PoopHard poop={selected} />
        딱딱함
      </S.PoopCard>
      <S.PoopCard>
        <PoopHealthy poop={selected} />
        건강함
      </S.PoopCard>
      <S.PoopCard>
        <PoopWatery poop={selected} />
        묽은 변
      </S.PoopCard>
      <S.PoopCard>
        <PoopNotBrown poop={selected} />
        갈색이 아닌
      </S.PoopCard>
      <S.PoopCard>
        <PoopWarning poop={selected} />
        주의필요
      </S.PoopCard>
    </S.PoopCardContainer>
  );
};

export default PoopBox;
