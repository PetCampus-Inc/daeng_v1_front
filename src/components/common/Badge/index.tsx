import * as S from "./styles";

export interface BadgeProps {
  type: "required" | "optional" | "adminRequired" | "neutralized" | "vaccinated" | "pickdrop";
}

const Badge = ({ type }: BadgeProps) => {
  const text = new Map([
    ["required", "필수 입력"],
    ["optional", "선택 입력"],
    ["adminRequired", "원장 입력사항"],
    ["neutralized", "중성화 완료"],
    ["vaccinated", "예방접종 완료"],
    ["pickdrop", "픽드랍 신청"]
  ]);

  return <S.Badge type={type}>{text.get(type)}</S.Badge>;
};

export default Badge;
