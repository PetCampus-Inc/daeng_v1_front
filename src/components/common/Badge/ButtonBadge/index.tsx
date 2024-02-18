import * as S from "./styles";

export interface ButtonBadgeProps {
  type: "delete" | "cancel" | "edit" | "redDelete";
  handleTouch: () => void;
}

const ButtonBadge = ({ type, handleTouch }: ButtonBadgeProps) => {
  const text = new Map([
    ["delete", "삭제"],
    ["cancel", "취소"],
    ["edit", "편집"],
    ["redDelete", "삭제"]
  ]);

  if (type === "redDelete") {
    return (
      <S.Badge
        key={type}
        type={type}
        onClick={handleTouch}
        initial={{ scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.7 }}
        whileTap={{ scale: 0.9 }}
        transition={{
          type: "spring",
          stiffness: 600,
          damping: 25,
          duration: 1
        }}
      >
        {text.get("redDelete")}
      </S.Badge>
    );
  }

  return (
    <S.Badge
      type={type}
      onClick={handleTouch}
      whileTap={{ scale: 0.9 }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 10
      }}
    >
      {text.get(type)}
    </S.Badge>
  );
};

export default ButtonBadge;
