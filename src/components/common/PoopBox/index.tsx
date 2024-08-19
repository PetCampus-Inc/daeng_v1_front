import PoopHard from "assets/svg/poop-hard";
import PoopHealthy from "assets/svg/poop-healthy";
import PoopNotBrown from "assets/svg/poop-not-brown";
import PoopWarning from "assets/svg/poop-warning";
import PoopWatery from "assets/svg/poop-watery";
import { POOP_STATUS, type PoopStatus } from "types/member/dogs";

import * as S from "./styles";

interface PoopBoxProps {
  variant?: "sm" | "lg";
  selected?: PoopStatus;
}

/**
 * @todo SVG 컴포넌트에서 리액트 코드를 제외하고, SVG 파일만을 추출하는 작업이 필요합니다.
 */
const PoopBox = ({ variant = "lg", selected }: PoopBoxProps) => {
  return (
    <S.PoopCardContainer variant={variant}>
      <S.PoopCard active={selected === POOP_STATUS.HARD}>
        <PoopHard poop={selected} />
        딱딱함
      </S.PoopCard>
      <S.PoopCard active={selected === POOP_STATUS.HEALTHY}>
        <PoopHealthy poop={selected} />
        건강함
      </S.PoopCard>
      <S.PoopCard active={selected === POOP_STATUS.WATERY}>
        <PoopWatery poop={selected} />
        묽은 변
      </S.PoopCard>
      <S.PoopCard active={selected === POOP_STATUS.NOT_BROWN}>
        <PoopNotBrown poop={selected} />
        갈색이 아닌
      </S.PoopCard>
      <S.PoopCard active={selected === POOP_STATUS.WARNING}>
        <PoopWarning poop={selected} />
        주의필요
      </S.PoopCard>
    </S.PoopCardContainer>
  );
};

export default PoopBox;
