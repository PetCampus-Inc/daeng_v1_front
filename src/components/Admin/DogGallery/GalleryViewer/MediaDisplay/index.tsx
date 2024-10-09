import * as S from "./styles";

interface MediaDisplayProps {
  src: string;
  isVideo: boolean;
}

const MediaDisplay: React.FC<MediaDisplayProps> = ({ src, isVideo }) => (
  <S.DisplayContainer>
    {isVideo ? <video src={src} controls /> : <S.DisplayMedia src={src} alt="Main Display" />}
  </S.DisplayContainer>
);

export default MediaDisplay;
