import * as S from "./styles";

export interface BadgeProps {
  type: "required" | "optional";
}

const Badge = ({ type }: BadgeProps) => {
  const text = type === "required" ? "필수 입력" : "선택 입력";

  return <S.Badge type={type}>{text}</S.Badge>;
};

export default Badge;
