import * as S from "./styles";

export interface ButtonBadgeProps {
  type: "delete" | "cancel";
  handleTouch: () => void;
}

const ButtonBadge = ({ type, handleTouch }: ButtonBadgeProps) => {
  const text = new Map([
    ["delete", "삭제"],
    ["cancel", "취소"]
  ]);

  return (
    <S.Badge
      type={type}
      onClick={handleTouch}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      {text.get(type)}
    </S.Badge>
  );
};

export default ButtonBadge;
