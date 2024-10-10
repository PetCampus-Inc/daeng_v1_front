import { useEffect, useState } from "react";
import { getVideoThumb } from "utils/thumb";

interface ThumbnailItemProps {
  handleClick?: (index: number) => void;
  uri: string;
}

const ThumbnaiVideo = ({ uri }: ThumbnailItemProps) => {
  const [imageSrc, setImageSrc] = useState<string>(uri);

  /** 비디오 썸네일 로드 */
  useEffect(() => {
    const loadSrc = async () => {
      try {
        const response = await fetch(uri);
        const blob = await response.blob();

        const fileName = "video.mp4";
        const fileType = "video/mp4";
        const file = new File([blob], fileName, { type: fileType });

        const videoThumb = await getVideoThumb(file);
        setImageSrc(videoThumb.thumbnail);
      } catch (error) {
        console.error(error);
        setImageSrc(uri);
      }
    };

    loadSrc();
  }, [uri]);

  return <img src={imageSrc} />;
};

export default ThumbnaiVideo;
