import * as S from "./styles";
import SinglePicture from "../SinglePicture";

const GridAlbum = () => {
  // FIXME: 데이터가 [{"2024.03.31":[사진 목록]},{"2024.03.31":[사진 목록]},{"2024.03.31":[사진 목록]}...] 형태로 온다고 가정하고 작성함.
  const dummy = [
    {
      "2024.03.31": ["https://i.pinimg.com/736x/73/be/39/73be396c6ebfa53a14cf6f2282ebc001.jpg"]
    },
    {
      "2024.04.01": [
        "https://i.pinimg.com/736x/73/be/39/73be396c6ebfa53a14cf6f2282ebc001.jpg",
        "https://i.pinimg.com/736x/73/be/39/73be396c6ebfa53a14cf6f2282ebc001.jpg",
        "https://i.pinimg.com/736x/73/be/39/73be396c6ebfa53a14cf6f2282ebc001.jpg",
        "https://i.pinimg.com/736x/73/be/39/73be396c6ebfa53a14cf6f2282ebc001.jpg"
      ]
    },
    {
      "2024.04.02": [
        "https://i.pinimg.com/736x/73/be/39/73be396c6ebfa53a14cf6f2282ebc001.jpg",
        "https://i.pinimg.com/736x/73/be/39/73be396c6ebfa53a14cf6f2282ebc001.jpg"
      ]
    }
  ];
  return (
    <S.GridAlbumContainer>
      {dummy.map((item, index) => {
        const date = Object.keys(item)[0];
        const pictures = Object.values(item)[0];
        return (
          <S.GridAlbumContainer className="inner" key={index}>
            <S.TextContainer>
              <S.DateText>{date}</S.DateText>
              <S.CountText>{`${pictures.length}장`}</S.CountText>
            </S.TextContainer>
            <S.GridPictures key={index}>
              {pictures.map((picture: string, index: number) => (
                <SinglePicture key={index} picture={picture} />
              ))}
            </S.GridPictures>
          </S.GridAlbumContainer>
        );
      })}
    </S.GridAlbumContainer>
  );
};

export default GridAlbum;
