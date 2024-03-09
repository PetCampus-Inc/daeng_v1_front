import * as S from "./styles";

export interface BadgeProps {
  variant: "brown" | "gray" | "yellow" | "orange" | "lightBrown";
  text?: string;
}

const Badge = ({ variant, text }: BadgeProps) => {
  const defaultText = new Map([
    ["brown", "필수 입력"],
    ["gray", "선택 입력"],
    ["yellow", "원장 입력사항"],
    ["orange", "중성화 완료"],
    ["lightBrown", "픽드랍 신청"]
  ]);
  return <S.Badge variant={variant}>{text || defaultText.get(variant)}</S.Badge>;
};

export default Badge;
