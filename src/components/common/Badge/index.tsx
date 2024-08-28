import * as S from "./styles";

import type { TypoKeys } from "styles/types";

export interface BadgeProps {
  variant: "brown" | "gray" | "yellow" | "orange" | "lightBrown";
  text?: string;
  handleTouch?: () => void;
  typo?: TypoKeys;
}

/**
 * 뱃지 UI 컴포넌트 -
 * 주로 상태를 표시하기 위한 용도로 사용됩니다.
 */
const Badge = ({ variant, text, handleTouch, ...props }: BadgeProps) => {
  const defaultText = new Map([
    ["brown", "필수 입력"],
    ["gray", "선택 입력"],
    ["yellow", "원장 입력사항"],
    ["orange", "중성화 완료"],
    ["lightBrown", "픽드랍 신청"]
  ]);
  return (
    <S.Badge variant={variant} onClick={handleTouch} {...props}>
      {text || defaultText.get(variant)}
    </S.Badge>
  );
};

export default Badge;
