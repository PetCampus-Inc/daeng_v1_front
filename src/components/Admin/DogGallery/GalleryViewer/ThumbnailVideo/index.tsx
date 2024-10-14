import { Image } from "components/common/Image";

import * as S from "./styles";

interface ThumbnailItemProps {
  handleClick?: (index: number) => void;
  uri: string;
  progress?: number;
}

const ThumbnailVideo = ({ uri, progress = 0 }: ThumbnailItemProps) => {
  return (
    <>
      <S.VideoContainer>
        {progress > 0 ? <S.VideoProgressBar $progress={progress} /> : ""}
        <Image src={uri} />
      </S.VideoContainer>
    </>
  );
};

export default ThumbnailVideo;
