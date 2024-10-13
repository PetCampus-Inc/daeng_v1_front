import PlayIcon from "assets/svg/play-icon";
import { Box } from "components/common/Box";
import { ImgHTMLAttributes, useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { getVideoThumb } from "utils/thumb";

interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  ratio?: string;
  showVideoIcon?: boolean;
}

export const Image = ({ src, ratio, showVideoIcon, ...props }: ImageProps) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  const getVideoThumbnail = useCallback(async () => {
    try {
      const response = await fetch(src);
      const blob = await response.blob();
      const file = new File([blob], "video.mp4", { type: "video/mp4" });

      const videoThumb = await getVideoThumb(file);
      return videoThumb.thumbnail;
    } catch (error) {
      return src;
    }
  }, [src]);

  useEffect(() => {
    const loadSrc = async () => {
      if (src.endsWith(".mp4")) {
        const videoThumbnail = await getVideoThumbnail();
        setImageSrc(videoThumbnail);
      } else setImageSrc(src);
    };

    loadSrc();
  }, [src, getVideoThumbnail]);

  if (!imageSrc) return <ImageSkeleton ratio={ratio} />;
  return (
    <>
      <StyledImage src={imageSrc} ratio={ratio} {...props} /> {/* 비디오 아이콘 */}
      {src.endsWith(".mp4") && showVideoIcon && (
        <Box position="absolute" bottom={4} right={4}>
          <PlayIcon w={18} h={18} />
        </Box>
      )}
    </>
  );
};

const StyledImage = styled.img.withConfig({
  shouldForwardProp: (prop) => prop !== "ratio"
})<{ ratio?: string }>`
  width: 100%;
  height: 100%;
  object-fit: cover;
  aspect-ratio: ${({ ratio }) => ratio};
`;

const ImageSkeleton = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "ratio"
})<{ ratio?: string }>`
  width: 100%;
  height: 100%;
  aspect-ratio: ${({ ratio }) => ratio};
  background-color: ${({ theme }) => theme.colors.gray_4};
`;
