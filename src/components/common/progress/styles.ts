import styled, { keyframes } from "styled-components";

export const ProgressBar = styled.div`
  width: 100%;
  height: 20px;
  background-color: hsla(0, 0%, 40%, 0.75);
  border-radius: 12px;
  overflow: hidden;

  margin-top: 8px;
`;

export const progressAnimation = keyframes`
  0% { width: 0; }
  100% { width: 100%; }
`;

export const ProgressFill = styled.div<{ width: number }>`
  width: ${(props) => props.width}%;
  height: 100%;
  background-color: hsla(0, 0%, 100%, 0.75);
  transition: width 0.5s ease;
  position: relative;
  border-radius: 0 12px 12px 0;

  &:after {
    content: "";
    display: block;
    width: 23px;
    height: 23px;
    position: absolute;
    right: 0;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.colors.primaryColor};
    -webkit-mask-image: url(/images/foot-icon.svg);
    -webkit-mask-repeat: no-repeat;
    -webkit-mask-position: center;
    -webkit-mask-size: 16px 16px;
    mask-image: url(/images/foot-icon.svg);
    mask-repeat: no-repeat;
    mask-position: center;
    mask-size: 16px 16px;
  }
`;
