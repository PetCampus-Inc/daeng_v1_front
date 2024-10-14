import PauseIcon from "assets/svg/pause-icon";
import PlayIcon from "assets/svg/play-icon";
import { useCallback, useEffect, useRef, useState, VideoHTMLAttributes } from "react";

import * as S from "./style";

interface VideoPlayerProps extends VideoHTMLAttributes<HTMLVideoElement> {
  onProgressUpdate?: (progress: number) => void;
  mediaKey?: number; // key 속성을 추가하여 렌더링 유도
}

export const VideoPlayer = ({ onProgressUpdate, mediaKey, ...props }: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<string>("00:00");
  const [duration, setDuration] = useState<string>("00:00"); // 전체 재생 시간 저장

  /** 재생/중지 토글 */
  const handlePlayToggle = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      if (videoRef.current) isPlaying ? pause() : play();
    },
    [isPlaying]
  );

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
  };

  /** 시간 포맷 */
  const formatTime = (timeInSeconds: number): string => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

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

    /** 비디오 메타데이터 로드 시, 전체 길이 설정 */
    const handleLoadedMetadata = () => {
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

  /** 선택된 미디어가 변경될 때마다 상태 초기화 */
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    setIsPlaying(false);
    setCurrentTime("00:00");
    setDuration("00:00");
  }, [mediaKey]);

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
