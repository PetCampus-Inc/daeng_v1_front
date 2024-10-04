import { Button } from "components/common/Button";
import { Flex } from "components/common/Flex";
import { styled } from "styled-components";
import { ColorKeys } from "styles/types";

interface StyleProps {
  w?: string;
  h?: string;
  br?: string;
  color?: ColorKeys;
  bg?: ColorKeys;
  typo?: string;
}

export const RoleEditButton = styled.button<StyleProps>`
  min-width: 112px;
  min-height: 49px;
  ${({ theme }) => theme.typo.body2_16_R};
  color: ${({ color, theme }) => theme.colors[color || "gray_3"]};
  background-color: ${({ theme, bg }) => theme.colors[bg || "gray_4"]};
  border: 0;
  border-radius: 8px;
  cursor: pointer;
`;

export const RoleSelectLabel = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 112px;
  min-height: 49px;
  ${({ theme }) => theme.typo.body2_16_R};
  color: ${({ theme }) => theme.colors.gray_3};
  background-color: ${({ theme }) => theme.colors.gray_4};
  border: 0;
  border-radius: 8px;
  cursor: pointer;
  width: 100%;
  min-height: 49px;
`;

export const RadioInput = styled.input`
  display: none;

  &:checked + label {
    background-color: ${({ theme }) => theme.colors.br_4};
    border: 1px solid ${({ theme }) => theme.colors.br_3};
    color: ${({ theme }) => theme.colors.primaryColor};
  }
`;

export const RoleSelectButton = styled(Button)`
  width: 100%;
  min-height: 49px;
`;

export const RoleEditContainer = styled.div`
  position: relative;
`;

export const RoleSelectWrapper = styled(Flex)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin-top: 6px;
  gap: 6px;
  width: 100%;
  z-index: 1;
`;

export const ProfileBox = styled.div<StyleProps>`
  position: relative;
  width: 100%;
  max-width: ${({ w }) => (w ? `${w}px` : "160px")};
  height: ${({ h }) => (h ? `${h}px` : "160px")};
  border-radius: 40px;
`;

export const ProfileLabel = styled.label`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 1;
  cursor: pointer;
`;

export const UploadProfileButton = styled.button<StyleProps>`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: ${({ br }) => (br ? `${br}px` : "40px")};
  width: 100%;
  background-color: ${({ theme }) => theme.colors.white};
  overflow: hidden;
  position: relative;

  aspect-ratio: 1/1;

  .GalleryIcon {
    position: relative;
    z-index: 1;
  }

  .active {
    display: none;
  }

  &:focus {
    .active {
      display: flex;
    }
  }
`;

export const UploadProfileBox = styled.div<StyleProps>`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: ${({ br }) => (br ? `${br}px` : "40px")};
  width: 100%;
  background-color: ${({ theme }) => theme.colors.white};
  overflow: hidden;
  position: relative;

  aspect-ratio: 1/1;

  .GalleryIcon {
    position: relative;
    z-index: 1;
  }
`;

export const PencilIconBox = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 0;
  bottom: 0;
  border-radius: 50px;
  width: 28px;
  height: 28px;
  background-color: ${({ theme }) => theme.colors.br_4};
  border: 2px solid ${({ theme }) => theme.colors.white};
`;

export const ActiveBox = styled.label`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 1;
  justify-content: center;
  align-items: center;

  & > svg {
    z-index: 1;
  }
`;

export const BackDropBorder = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  border: 5px solid ${({ theme }) => theme.colors.primary_4};
  border-radius: 40px;
  z-index: 1;
`;

export const BackDrop = styled.div`
  position: absolute;
  background-color: ${({ theme }) => theme.colors.black};
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  opacity: 0.3;
`;

export const UploadImage = styled.img`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const StyledHiddenUpload = styled.input`
  display: none;
`;

export const SaveProfileButton = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
`;
