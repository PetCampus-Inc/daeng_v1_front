import * as S from "./styles";

export interface BadgeProps {
  type: "required" | "optional" | "adminRequired";
}

const Badge = ({ type }: BadgeProps) => {
  const text = new Map([
    ["required", "필수 입력"],
    ["optional", "선택 입력"],
    ["adminRequired", "원장 입력사항"]
  ]);

  return <S.Badge type={type}>{text.get(type)}</S.Badge>;
};

export default Badge;
