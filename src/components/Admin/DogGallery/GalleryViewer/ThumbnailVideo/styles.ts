import styled from "styled-components";

export const VideoContainer = styled.div`
  position: relative;
`;

export const VideoProgressBar = styled.div<{ $progress: number }>`
  position: absolute;
  bottom: 0;
  left: ${({ $progress }) => $progress}%;
  width: 10%;
  height: 100px;
  background-color: #f6f6f6;
`;
