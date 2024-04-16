import * as S from "./styles";

interface ISinglePictureProps {
  picture: string;
  mode: "view" | "edit";
}

const SinglePicture = ({ picture, mode }: ISinglePictureProps) => {
  const handleTouch = () => {
    if (mode === "edit") {
      // 선택하기
    } else if (mode === "view") {
      // TODO: 확대 보기 열기
    }
  };

  return (
    <button onClick={handleTouch}>
      <S.SinglePictureImg src={picture} />
    </button>
  );
};

export default SinglePicture;
