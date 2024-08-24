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

export const RoleEditButton = styled.input<StyleProps>`
  min-width: 112px;
  min-height: 49px;
  ${({ theme }) => theme.typo.body2_16_R};
  color: ${({ color, theme }) => theme.colors[color || "gray_3"]};
  background-color: ${({ theme, bg }) => theme.colors[bg || "gray_4"]};
  border: 0;
  border-radius: 8px;
  cursor: pointer;
`;

export const RoleSelectButton = styled(Button)`
  max-width: 112px;
  min-height: 49px;
`;

export const RoleEditContainer = styled.div`
  position: relative;
`;

export const RoleSelectWrapper = styled(Flex)`
  position: absolute;
  display: flex;
  flex-direction: column;
  margin-top: 6px;
  gap: 6px;
  width: 100%;
`;

export const ProfileBox = styled.label<StyleProps>`
  position: relative;
  width: 100%;
  max-width: ${({ w }) => (w ? `${w}px` : "160px")};
`;

// TODO UploadProfileButton, UploadProfileBox 하나의 스타일로 통일 시키기
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
      display: block;
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

  .active {
    display: none;
  }

  &:focus {
    .active {
      display: block;
    }
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

export const ActiveBox = styled.div``;

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

export const SavaProfileButton = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
`;
