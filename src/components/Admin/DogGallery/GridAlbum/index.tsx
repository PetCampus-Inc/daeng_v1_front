import * as S from "./styles";
import SinglePicture from "../SinglePicture";

interface IGridAlbumProps {
  mode: "view" | "edit";
}

const GridAlbum = ({ mode }: IGridAlbumProps) => {
  // FIXME: 데이터가 [{"2024.03.31":[사진 목록]},{"2024.03.31":[사진 목록]},{"2024.03.31":[사진 목록]}...] 형태로 온다고 가정하고 작성함.
  // TODO: 무한스크롤 / windowing 적용
  const dummy = [
    {
      "2024.03.31": ["https://i.pinimg.com/736x/73/be/39/73be396c6ebfa53a14cf6f2282ebc001.jpg"]
    },
    {
      "2024.04.01": [
        "https://i.pinimg.com/564x/5c/e2/c1/5ce2c1ca9f223453f573f4599e36aebd.jpg",
        "https://i.pinimg.com/564x/25/69/d8/2569d89a06b4fb56cb66acb256ad8fca.jpg",
        "https://i.pinimg.com/564x/44/27/b6/4427b695e48f110d6edb9d1d16754ded.jpg",
        "https://i.pinimg.com/736x/9b/6c/d9/9b6cd98f361ea2bc9a729c3df5acfb3d.jpg"
      ]
    },
    {
      "2024.04.02": [
        "https://i.pinimg.com/736x/73/be/39/73be396c6ebfa53a14cf6f2282ebc001.jpg",
        "https://i.pinimg.com/736x/73/be/39/73be396c6ebfa53a14cf6f2282ebc001.jpg"
      ]
    },
    {
      "2024.04.03": [
        "https://i.pinimg.com/736x/73/be/39/73be396c6ebfa53a14cf6f2282ebc001.jpg",
        "https://i.pinimg.com/736x/73/be/39/73be396c6ebfa53a14cf6f2282ebc001.jpg",
        "https://i.pinimg.com/736x/73/be/39/73be396c6ebfa53a14cf6f2282ebc001.jpg"
      ]
    },
    {
      "2024.04.04": [
        "https://i.pinimg.com/736x/73/be/39/73be396c6ebfa53a14cf6f2282ebc001.jpg",
        "https://i.pinimg.com/736x/73/be/39/73be396c6ebfa53a14cf6f2282ebc001.jpg",
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
              {mode === "view" && <S.CountText>{`${pictures.length}장`}</S.CountText>}
            </S.TextContainer>
            <S.GridPictures key={index}>
              {pictures.map((picture: string, index: number) => (
                <SinglePicture key={index} picture={picture} mode={mode} />
              ))}
            </S.GridPictures>
          </S.GridAlbumContainer>
        );
      })}
    </S.GridAlbumContainer>
  );
};

export default GridAlbum;
