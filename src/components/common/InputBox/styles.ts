import styled from "styled-components";

export const StyledMainWrapper = styled.div<{ width: string; height: string }>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  display: flex;
  position: relative;
`;

export const StyledWrapper = styled.input<{ color?: string }>`
  width: 100%;
  height: 100%;
  border: 1px solid ${(props) => props.theme.gray_3};
  border-radius: 8px;
  padding-left: 5%;
  font-size: 1rem;
  color: ${(props) => (props.color ? props.color : props.theme.black)};
`;

export const StyledButtonWrapper = styled.div`
  height: 100%;
  width: 17%;
  margin-right: 5%;
  aspect-ratio: 1/1;
  cursor: pointer;
  position: absolute;
  right: 0;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

export const StyledImage = styled.img<{
  src: string;
  alt: string;
}>``;
