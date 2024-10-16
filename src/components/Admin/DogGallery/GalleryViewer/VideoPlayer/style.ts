import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  height: calc(100vh - 48px - 180px);
  width: 100%;
`;

export const VideoWrapper = styled.div`
  position: relative;
`;

export const Video = styled.video`
  width: 100%;
`;

export const PlayButton = styled.button`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: opacity 200ms ease-in-out;
  opacity: 0.9;

  &[data-show-controller="false"] {
    opacity: 0;
    pointer-events: none;
  }
`;

export const VideoControlButton = styled.button`
  position: absolute;
  left: calc(50% - 4rem);
  bottom: 1rem;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 20px;
  padding: 3px 6px;
  color: #fff;
  font-size: 12px;
`;

export const TimeDisplay = styled.div`
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  padding-right: 8px;
`;
