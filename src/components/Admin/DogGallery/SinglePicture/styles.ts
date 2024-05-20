import { styled } from "styled-components";
import { ThemeConfig } from "styles/ThemeConfig";

export const SinglePictureInput = styled.input`
  display: none;
  &:checked + label {
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.5) 100%);
    border: 2px solid ${ThemeConfig.colors.primary_2};
  }
`;

export const SinglePictureLabel = styled.label`
  position: relative;
  width: 100%;
  box-sizing: border-box;

  &::before {
    content: "";
    display: block;
    padding-top: 100%;
  }
`;

export const SinglePictureImg = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  height: 100%;
  width: 100%;
  object-fit: cover;
  overflow: hidden;
`;

export const CircleSelectIconWrapper = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
`;

export const ZoomInIconWrapper = styled.button`
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 8px;
  background: transparent;
`;
