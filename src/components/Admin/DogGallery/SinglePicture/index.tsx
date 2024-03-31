import * as S from "./styles";

interface ISinglePictureProps {
  picture: string;
}

const SinglePicture = ({ picture }: ISinglePictureProps) => {
  return (
    <button>
      <S.SinglePictureImg src={picture} />
    </button>
  );
};

export default SinglePicture;
