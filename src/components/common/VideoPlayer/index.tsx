import PauseIcon from "assets/svg/pause-icon";
import PlayIcon from "assets/svg/play-icon";
import { Box } from "components/common/Box";
import { useCallback, useEffect, useRef, useState, VideoHTMLAttributes } from "react";

import * as S from "./style";

export const VideoPlayer = (props: VideoHTMLAttributes<HTMLVideoElement>) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<string>("00:00");
  const [isShowController, setIsShowController] = useState<boolean>(true);

  /** 재생/중지 토글 */
  const handlePlayToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (videoRef.current) isPlaying ? pause() : play();
    setIsShowController(true);
    hideControllerAfterDelay();
  };

  /** 컨테이너 클릭 시, 컨트롤러 보이기/숨기기 */
  const handleContainerClick = () => setIsShowController((prev) => !prev);

  /** 비디오 슬라이더 */
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) return;
    pause();

    const time = (parseFloat(e.target.value) / 100) * videoRef.current.duration;
    videoRef.current.currentTime = time;
    setProgress(parseFloat(e.target.value));
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
  const hideControllerAfterDelay = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setIsShowController(false), 2000);
  }, []);

  /** 비디오 재생 타임 업데이트 */
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // 비디오 재생 타임 업데이트
    const updateProgress = () => {
      const progress = (video.currentTime / video.duration) * 100;
      setProgress(progress);
      setCurrentTime(formatTime(video.currentTime));
    };

    // 네이티브에서 autoPlay={true}일 때만 비디오가 로드돼서 첫 플레이 시 일시정지 처리했습니다.
    const handleLoadedVideo = () => {
      if (!isLoaded) {
        setIsLoaded(true);
        video.pause();
      }
    };

    video.addEventListener("timeupdate", updateProgress);
    video.addEventListener("play", handleLoadedVideo);

    return () => {
      video.removeEventListener("timeupdate", updateProgress);
      video.removeEventListener("play", handleLoadedVideo);
    };
  }, [isLoaded]);

  useEffect(() => {
    if (isPlaying && isShowController) hideControllerAfterDelay();

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [isPlaying, isShowController, hideControllerAfterDelay]);

  return (
    <S.Container onClick={handleContainerClick}>
      <S.Video ref={videoRef} controls={false} playsInline autoPlay {...props}>
        <source type="video/mp4" src={props.src} />
      </S.Video>

      <S.PlayButton onClick={handlePlayToggle} data-show-controller={isShowController}>
        {isPlaying ? <PauseIcon w={50} h={50} /> : <PlayIcon w={50} h={50} />}
      </S.PlayButton>

      <S.VideoControllerWrap
        data-show-controller={isShowController}
        onClick={handleStopPropagation}
      >
        <Box position="relative" width="100%">
          <S.RangeInput
            type="range"
            min="0"
            max="100"
            value={progress}
            data-time={currentTime}
            onChange={handleSliderChange}
            onMouseDown={pause}
            onTouchStart={pause}
          />

          <Box position="absolute" left={0} right={0} top={0} mx={10}>
            <S.TimeToolTip style={{ left: `${progress}%` }}>{currentTime}</S.TimeToolTip>
          </Box>
        </Box>
      </S.VideoControllerWrap>
    </S.Container>
  );
};
