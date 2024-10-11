import PauseIcon from "assets/svg/pause-icon";
import PlayIcon from "assets/svg/play-icon";
import { Box } from "components/common/Box";
import { useCallback, useEffect, useRef, useState, VideoHTMLAttributes } from "react";

import * as S from "./style";

interface VideoPlayerProps extends VideoHTMLAttributes<HTMLVideoElement> {
  onProgressUpdate?: (progress: number) => void;
}

export const VideoPlayer = ({ onProgressUpdate, ...props }: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<string>("00:00");
  const [duration, setDuration] = useState<string>("00:00"); // 전체 재생 시간 저장
  const [isShowController, setIsShowController] = useState<boolean>(true);

  /** 재생/중지 토글 */
  const handlePlayToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (videoRef.current) isPlaying ? pause() : play();
    setIsShowController(true);
  };

  /** 슬라이더 컨트롤러 클릭 시, 이벤트 전파 중지 */
  const handleStopPropagation = (e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation();

  /** 비디오 재생 */
  const play = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  /** 비디오 일시정지 */
  const pause = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  /** 시간 포맷 */
  const formatTime = (timeInSeconds: number): string => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  /** 컨트롤러 숨김 */

  /** 비디오 재생 타임 업데이트 */
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // 비디오 재생 타임 업데이트
    const updateProgress = () => {
      const progress = (video.currentTime / video.duration) * 100;
      onProgressUpdate?.(progress); // Update progress through callback

      setCurrentTime(formatTime(video.currentTime));
    };

    // 비디오 메타데이터 로드 시, 전체 길이 설정
    const handleLoadedMetadata = () => {
      if (!isLoaded) {
        setIsLoaded(true);
        video.pause();
      }

      setDuration(formatTime(video.duration));
    };

    const handlePause = () => {
      setIsPlaying(false);
    };

    video.addEventListener("timeupdate", updateProgress);
    video.addEventListener("loadedmetadata", handleLoadedMetadata); // 전체 길이 업데이트
    video.addEventListener("pause", handlePause);

    return () => {
      video.removeEventListener("timeupdate", updateProgress);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("pause", handlePause);
    };
  }, [props.src]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [isPlaying, isShowController]);

  return (
    <S.Container>
      <S.VideoWrapper>
        <S.Video ref={videoRef} controls={false} playsInline autoPlay {...props}>
          <source type="video/mp4" src={props.src} />
        </S.Video>
        <S.VideoControlButton onClick={(e) => handlePlayToggle(e)}>
          <S.TimeDisplay>
            {/* 재생 여부에 따라 화살표 일시정시 표시 */}
            {isPlaying ? (
              <PauseIcon w={20} h={20} circle={false} color="white" />
            ) : (
              <PlayIcon w={20} h={20} circle={false} color="white" />
            )}
            {currentTime} / {duration}
          </S.TimeDisplay>
        </S.VideoControlButton>
      </S.VideoWrapper>
    </S.Container>
  );
};
